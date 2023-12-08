import { Logger } from '@soralinks/logger';
import playwright from 'playwright-aws-lambda';
import { NewsScraperSource, NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_AP_SCRAPER, } = process.env;
export class APScraper {
    source;
    logger;
    constructor() {
        this.source = NewsScraperSource.AP;
        if (LOGGING_AP_SCRAPER && LOGGING_AP_SCRAPER === 'on') {
            this.logger = new Logger({ logVerbose: true, logError: true });
        }
        else {
            this.logger = new Logger({ logError: true });
        }
    }
    async scrapePolitics() {
        let headlines = [];
        let browser;
        try {
            browser = await playwright.launchChromium();
            const context = await browser.newContext();
            const page = await context.newPage();
            const response = await page.goto('https://apnews.com/politics', { waitUntil: 'domcontentloaded' });
            if (!response || !response.ok()) {
                throw new Error(`page.goto() returned status: ${response?.status()}, statusText: ${response?.statusText()}`);
            }
            await page.waitForSelector('.PagePromo-title .Link');
            const headlineElements = await page.$$('.PagePromo-title .Link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = headlineElements[x];
                let href = await headlineElement.getAttribute('href');
                if (href)
                    href = href.trim();
                let title;
                const titleElement = await headlineElement.$('.PagePromoContentIcons-text');
                if (titleElement) {
                    title = await titleElement.textContent();
                    if (title)
                        title = title.trim();
                }
                if (href && title) {
                    headlines.push({
                        title,
                        url: href,
                    });
                }
            }
        }
        catch (error) {
            this.logger.error('APScraper.scrape error: %s', error.message);
            throw error;
        }
        finally {
            if (browser) {
                await browser.close();
            }
        }
        const response = {
            source: this.source,
            type: NewsScraperType.POLITICS,
            headlines,
        };
        this.logger.verbose('APScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

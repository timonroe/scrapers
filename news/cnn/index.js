import { Logger } from '@soralinks/logger';
import { chromium } from 'playwright';
import { NewsScraperSource, NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_CNN_SCRAPER, } = process.env;
export class CNNScraper {
    source;
    logger;
    constructor() {
        this.source = NewsScraperSource.CNN;
        if (LOGGING_CNN_SCRAPER && LOGGING_CNN_SCRAPER === 'on') {
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
            browser = await chromium.launch();
            const page = await browser.newPage();
            const response = await page.goto('https://www.cnn.com/politics', { waitUntil: 'domcontentloaded' });
            if (!response || !response.ok()) {
                throw new Error(`page.goto() returned status: ${response?.status()}, statusText: ${response?.statusText()}`);
            }
            await page.waitForSelector('.layout__main');
            const headlineElements = await page.$$('.container_lead-plus-headlines__link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = headlineElements[x];
                let href = await headlineElement.getAttribute('href');
                if (href)
                    href = href.trim();
                let title;
                const titleElement = await headlineElement.$('.container__headline-text');
                if (titleElement) {
                    title = await titleElement.textContent();
                    if (title)
                        title = title.trim();
                }
                if (href && title) {
                    headlines.push({
                        title,
                        url: `https://www.cnn.com${href}`,
                    });
                }
            }
        }
        catch (error) {
            this.logger.error('CNNScraper.scrape error: %s', error.message);
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
        this.logger.verbose('CNNScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

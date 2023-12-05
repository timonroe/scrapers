import { Logger } from '@soralinks/logger';
import { chromium } from 'playwright';
import { NewsScraperSource, NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_FOX_SCRAPER, } = process.env;
export class FoxScraper {
    source;
    logger;
    constructor() {
        this.source = NewsScraperSource.FOX;
        if (LOGGING_FOX_SCRAPER && LOGGING_FOX_SCRAPER === 'on') {
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
            const response = await page.goto('https://www.foxnews.com/politics', { waitUntil: 'domcontentloaded' });
            if (!response || !response.ok()) {
                throw new Error(`page.goto() returned status: ${response?.status()}, statusText: ${response?.statusText()}`);
            }
            await page.waitForSelector('.collection-article-list');
            const headlineElements = await page.$$('.article-list .article .info .title');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = headlineElements[x];
                let href;
                let title;
                if (headlineElement) {
                    const aElement = await headlineElement.$('a');
                    if (aElement) {
                        href = await aElement.getAttribute('href');
                        if (href)
                            href = href.trim();
                        title = await aElement.textContent();
                        if (title)
                            title = title.trim();
                    }
                }
                if (href && title) {
                    headlines.push({
                        title,
                        url: `https://www.foxnews.com${href}`
                    });
                }
            }
        }
        catch (error) {
            this.logger.error('FoxScraper.scrape error: %s', error.message);
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
        this.logger.verbose('FoxScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

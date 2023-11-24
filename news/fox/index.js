import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
import { NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_FOX_SCRAPER, } = process.env;
export class FoxScraper {
    logger;
    constructor() {
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
            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.goto('https://www.foxnews.com/politics');
            await page.waitForSelector('.collection-article-list'); // Wait for it to load
            headlines = await page.evaluate(() => {
                const data = [];
                const headlines = document.querySelectorAll('.article-list .article .info .title');
                headlines.forEach((headlineElement) => {
                    let href;
                    let title;
                    if (headlineElement) {
                        const aElement = headlineElement.querySelector('a');
                        if (aElement) {
                            href = aElement.getAttribute('href');
                            if (href)
                                href = href.trim();
                            if (aElement.textContent)
                                title = aElement.textContent.trim();
                        }
                    }
                    if (href && title) {
                        data.push({
                            title,
                            url: `https://www.foxnews.com${href}`
                        });
                    }
                });
                return data;
            });
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
        this.logger.verbose('FoxScraper.scrape: %s', JSON.stringify(headlines, null, 2));
        return {
            source: 'fox',
            type: NewsScraperType.POLITICS,
            headlines,
        };
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented yet`);
    }
}

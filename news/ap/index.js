import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
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
            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.goto('https://apnews.com/politics');
            await page.waitForSelector('.Page-oneColumn'); // Wait for it to load
            headlines = await page.evaluate(() => {
                const data = [];
                const headlines = document.querySelectorAll('.PagePromo-title .Link');
                headlines.forEach((headlineElement) => {
                    let href = headlineElement.getAttribute('href');
                    if (href)
                        href = href.trim();
                    let title;
                    const titleElement = headlineElement.querySelector('.PagePromoContentIcons-text');
                    if (titleElement) {
                        title = titleElement.textContent;
                        if (title)
                            title = title.trim();
                    }
                    if (href && title) {
                        data.push({
                            title,
                            url: href,
                        });
                    }
                });
                return data;
            });
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

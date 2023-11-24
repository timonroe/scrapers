import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
import { NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_CNN_SCRAPER, } = process.env;
export class CNNScraper {
    logger;
    constructor() {
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
            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.goto('https://www.cnn.com/politics');
            await page.waitForSelector('.layout__main'); // Wait for it to load
            headlines = await page.evaluate(() => {
                const data = [];
                const headlines = document.querySelectorAll('.container_lead-plus-headlines__link');
                headlines.forEach((headlineElement) => {
                    let href = headlineElement.getAttribute('href');
                    if (href)
                        href = href.trim();
                    let title;
                    const titleElement = headlineElement.querySelector('.container__headline-text');
                    if (titleElement) {
                        title = titleElement.textContent;
                        if (title)
                            title = title.trim();
                    }
                    if (href && title) {
                        data.push({
                            title,
                            url: `https://www.cnn.com${href}`,
                        });
                    }
                });
                return data;
            });
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
        this.logger.verbose('CNNScraper.scrape: %s', JSON.stringify(headlines, null, 2));
        return {
            source: 'cnn',
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

import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
const { LOGGING_CNN_SCRAPER, } = process.env;
export class CNNScraper {
    logger;
    constructor() {
        let logging;
        if (LOGGING_CNN_SCRAPER && LOGGING_CNN_SCRAPER === 'on') {
            this.logger = new Logger({ logInfo: true, logVerbose: false, logWarning: false, logError: true });
        }
        else {
            this.logger = new Logger({ logInfo: false, logVerbose: false, logWarning: false, logError: false });
        }
    }
    async scrape() {
        let headlines = [];
        let browser;
        try {
            browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.goto('https://www.cnn.com/politics');
            await page.waitForSelector('.container__field-links'); // Wait for it to load
            headlines = await page.evaluate(() => {
                const data = [];
                const headlines = document.querySelectorAll('.container__headline-text');
                headlines.forEach((headline) => {
                    if (headline && headline.textContent) {
                        data.push(headline.textContent.trim());
                    }
                });
                return data;
            });
        }
        catch (error) {
            throw error;
        }
        finally {
            if (browser) {
                await browser.close();
            }
        }
        this.logger.info('CNNScraper.scrape: %s', `${JSON.stringify(headlines, null, 2)}`);
        return headlines;
    }
}

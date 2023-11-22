import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
import { NewsScraper, NewsScraperResponse, NewsScraperResponseHeadline } from '../common/interfaces.js';

const {
  LOGGING_FOX_SCRAPER,
} = process.env;

export class FoxScraper implements NewsScraper {
  logger: Logger;

  constructor() {
    if (LOGGING_FOX_SCRAPER && LOGGING_FOX_SCRAPER === 'on') {
      this.logger = new Logger({ logVerbose: true, logError: true });
    } else {
      this.logger = new Logger({ logError: true });
    }
  }

  async scrape(): Promise<NewsScraperResponse> {
    let headlines: NewsScraperResponseHeadline[] = [];
    let browser;
    try {
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto('https://www.foxnews.com/politics');
      await page.waitForSelector('.collection-article-list');  // Wait for it to load
      headlines = await page.evaluate(() => {
        const data: NewsScraperResponseHeadline[] = [];
        const headlines = document.querySelectorAll('.article-list .article .info .title');
        headlines.forEach((headline) => {
          if (headline && headline.textContent) {
            data.push({
              title: headline.textContent.trim(),
              url: '',
            });
          }
        });
        return data;
      });
    } catch (error: any) {
      this.logger.error('FoxScraper.scrape error: %s', error.message);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
    this.logger.verbose('FoxScraper.scrape: %s', JSON.stringify(headlines, null, 2));
    return {
      source: 'fox',
      headlines,
    }
  }
}

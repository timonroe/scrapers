import { Logger } from '@soralinks/logger';
import { chromium } from 'playwright';
import {
  NewsScraperSource,
  NewsScraperType,
  NewsScraperHeadline,
  NewsScraperResponse,
  NewsScraper,
} from '../common/interfaces.js';

const {
  LOGGING_FOX_SCRAPER,
} = process.env;

export class FoxScraper implements NewsScraper {
  source: NewsScraperSource;
  logger: Logger;

  constructor() {
    this.source = NewsScraperSource.FOX;
    if (LOGGING_FOX_SCRAPER && LOGGING_FOX_SCRAPER === 'on') {
      this.logger = new Logger({ logVerbose: true, logError: true });
    } else {
      this.logger = new Logger({ logError: true });
    }
  }

  async scrapePolitics(): Promise<NewsScraperResponse> {
    let headlines: NewsScraperHeadline[] = [];
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
            if (href) href = href.trim();
            title = await aElement.textContent();
            if (title) title = title.trim();
          }
        }
        if (href && title) {
          headlines.push({
            title,
            url: `https://www.foxnews.com${href}`
          });
        }
      }
    } catch (error: any) {
      this.logger.error('FoxScraper.scrape error: %s', error.message);
      throw error;
    } finally {
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

  async scrape(type: NewsScraperType = NewsScraperType.POLITICS): Promise<NewsScraperResponse> {
    if (type === NewsScraperType.POLITICS) return this.scrapePolitics();
    throw new Error(`scaping type: ${type} is not implemented`);
  }
}

import { Logger } from '@soralinks/logger';
import puppeteer from 'puppeteer';
import {
  NewsScraperSource,
  NewsScraperType,
  NewsScraperResponseHeadline,
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
        headlines.forEach((headlineElement) => {
          let href;
          let title;
          if (headlineElement) {
            const aElement = headlineElement.querySelector('a');
            if (aElement) {
              href = aElement.getAttribute('href');
              if (href) href = href.trim();
              if (aElement.textContent) title = aElement.textContent.trim();
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

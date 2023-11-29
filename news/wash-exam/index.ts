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
  LOGGING_WASH_EXAM_SCRAPER,
} = process.env;

export class WashExamScraper implements NewsScraper {
  source: NewsScraperSource;
  logger: Logger;

  constructor() {
    this.source = NewsScraperSource.WASH_EXAM;
    if (LOGGING_WASH_EXAM_SCRAPER && LOGGING_WASH_EXAM_SCRAPER === 'on') {
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
      await page.goto('https://www.washingtonexaminer.com/politics');
      await page.waitForSelector('.SectionList-items-item');  // Wait for it to load
      headlines = await page.evaluate(() => {
        const data: NewsScraperResponseHeadline[] = [];
        const headlines = document.querySelectorAll('.SectionPromo-title .Link');
        headlines.forEach((headlineElement) => {
          let href = headlineElement.getAttribute('href');
          if (href) href = href.trim();
          let title = headlineElement.textContent;
          if (title) title = title.trim();
          if (href && title) {
            data.push({
              title,
              url: href,
            });
          }
        });
        return data;
      });
    } catch (error: any) {
      this.logger.error('WashExamScraper.scrape error: %s', error.message);
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
    this.logger.verbose('WashExamScraper.scrape: %s', JSON.stringify(response, null, 2));
    return response;
  }

  async scrape(type: NewsScraperType = NewsScraperType.POLITICS): Promise<NewsScraperResponse> {
    if (type === NewsScraperType.POLITICS) return this.scrapePolitics();
    throw new Error(`scaping type: ${type} is not implemented`);
  }
}

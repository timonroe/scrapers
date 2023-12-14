import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
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
    try {
      const response = await fetch('https://www.foxnews.com/politics');
      const htmlDocument = await response.text();
      const $ = cheerio.load(htmlDocument);
      const headlineElements = $('.article-list .article .info .title a');
      for (let x = 0; x < headlineElements.length; x++) {
        const headlineElement = $(headlineElements[x]);  // Convert the current element to a Cheerio object
        let href = headlineElement.attr('href');
        if (!href) continue;
        href = href.trim();
        if (!href) continue;
        const url = href.includes('https') ? href : `https://www.foxnews.com${href}`;
        if (headlines.find(headline => headline.url === url)) continue;  // Get rid of dups
        let title = headlineElement.text();
        if (!title) continue;
        title = title.trim();
        if (!title) continue;    
        headlines.push({
          title,
          url,
        });
      }
    } catch (error: any) {
      this.logger.error('FoxScraper.scrape error: %s', error.message);
      throw error;
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

import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import {
  NewsScraperType,
  NewsScraperSource,
  NewsScraperHeadline,
  NewsScraperResponse,
  NewsScraper,
} from '../common/types.js';
import {
  newsScraperSources,
} from '../common/sources.js';

const {
  LOGGING_CNN_SCRAPER,
} = process.env;

export class CNNScraper implements NewsScraper {
  source: NewsScraperSource;
  logger: Logger;

  constructor() {
    this.source = newsScraperSources.CNN;
    if (LOGGING_CNN_SCRAPER && LOGGING_CNN_SCRAPER === 'on') {
      this.logger = new Logger({ logVerbose: true, logError: true });
    } else {
      this.logger = new Logger({ logError: true });
    }
  }

  async scrapePolitics(): Promise<NewsScraperResponse> {
    let headlines: NewsScraperHeadline[] = [];
    try {
      const response = await fetch(this.source.urlPolitics);
      const htmlDocument = await response.text();
      const $ = cheerio.load(htmlDocument);
      const headlineElements = $('a.container_lead-plus-headlines__link');
      for (let x = 0; x < headlineElements.length; x++) {
        const headlineElement = $(headlineElements[x]);  // Convert the current element to a Cheerio object
        let href = headlineElement.attr('href');
        if (!href) continue;
        href = href.trim();
        if (!href) continue;
        const url = href.includes('https') ? href : `${this.source.url}${href}`;
        if (headlines.find(headline => headline.url === url)) continue;  // Get rid of dups
        const titleElement = headlineElement.find('div > div > span');
        if (!titleElement) continue;
        let title = titleElement.text();
        if (!title) continue;
        title = title.trim();
        if (!title) continue;
        headlines.push({
          title,
          url,
        });
      }
    } catch (error: any) {
      this.logger.error('CNNScraper.scrape error: %s', error.message);
      throw error;
    }
    const response = {
      type: NewsScraperType.POLITICS,
      source: this.source,
      headlines,
    };
    this.logger.verbose('CNNScraper.scrape: %s', JSON.stringify(response, null, 2));
    return response;
  }

  async scrape(type: NewsScraperType = NewsScraperType.POLITICS): Promise<NewsScraperResponse> {
    if (type === NewsScraperType.POLITICS) return this.scrapePolitics();
    throw new Error(`scaping type: ${type} is not implemented`);
  }
}

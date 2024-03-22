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

const {
  LOGGING_WSJ_SCRAPER,
} = process.env;

const NAME = 'The Wall Street Journal';
const SHORT_NAME = 'WSJ';
const URL = 'https://www.wsj.com';
const URL_POLITICS = 'https://www.wsj.com/politics';

export class WsjScraper implements NewsScraper {
  source: NewsScraperSource;
  name: string;
  shortName: string;
  url: string;
  urlPolitics: string;
  logger: Logger;

  constructor() {
    this.source = NewsScraperSource.WSJ;
    this.name = NAME;
    this.shortName = SHORT_NAME;
    this.url = URL;
    this.urlPolitics = URL_POLITICS;
    if (LOGGING_WSJ_SCRAPER && LOGGING_WSJ_SCRAPER === 'on') {
      this.logger = new Logger({ logVerbose: true, logError: true });
    } else {
      this.logger = new Logger({ logError: true });
    }
  }

  async scrapePolitics(): Promise<NewsScraperResponse> {
    const headlines: NewsScraperHeadline[] = [];
    try {
      const response = await fetch(this.urlPolitics);
      const htmlDocument = await response.text();
      const $ = cheerio.load(htmlDocument, null, false);
      const headlineElements = $('h3.css-fsvegl');
      for (let x = 0; x < headlineElements.length; x++) {
        const headlineElement = $(headlineElements[x]);  // Convert the current element to a Cheerio object
        const anchorElement = headlineElement.find('a');
        if (!anchorElement) continue;
        let href = anchorElement.attr('href');
        if (!href) continue;
        href = href.trim();
        if (!href) continue;
        const url = href.includes('https') ? href : `${this.url}${href}`;
        if (headlines.find(headline => headline.url === url)) continue;  // Get rid of dup
        const pElement = anchorElement.find('p');
        if (!pElement) continue;
        let title = pElement.text();
        if (!title) continue;
        title = title.trim();
        if (!title) continue;
        headlines.push({
          title,
          url,
        });
      }
    } catch (error: any) {
      this.logger.error('WsjScraper.scrape error: %s', error.message);
      throw error;
    }
    const response = {
      type: NewsScraperType.POLITICS,
      source: this.source,
      name: this.name,
      shortName: this.shortName,
      url: this.url,
      urlPolitics: this.urlPolitics,
      headlines,
    };
    this.logger.verbose('WsjScraper.scrape: %s', JSON.stringify(response, null, 2));
    return response;
  }

  async scrape(type: NewsScraperType = NewsScraperType.POLITICS): Promise<NewsScraperResponse> {
    if (type === NewsScraperType.POLITICS) return this.scrapePolitics();
    throw new Error(`scraping type: ${type} is not implemented`);
  }
}

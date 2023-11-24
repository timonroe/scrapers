import {
  NewsScraperType,
  NewsScraperResponse,
  NewsScraper,
} from './common/interfaces.js';

export declare class CNNScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class FoxScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

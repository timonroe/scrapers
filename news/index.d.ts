import { NewsScraper, NewsScraperResponse } from './common/interfaces.js';

export declare class CNNScraper implements NewsScraper {
  constructor();
  scrape(): Promise<NewsScraperResponse>;
}

export declare class FoxScraper implements NewsScraper {
  constructor();
  scrape(): Promise<NewsScraperResponse>;
}

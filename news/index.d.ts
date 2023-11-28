import {
  NewsScraper,
} from './common/interfaces.js';

export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export declare type NewsScraperResponseHeadline = {
  title: string;
  url: string;
}

export declare type NewsScraperResponse = {
  source: string;
  type: string,
  headlines: NewsScraperResponseHeadline[];
}

export declare class APScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class CNNScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class FoxScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

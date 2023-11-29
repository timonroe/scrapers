import {
  NewsScraper,
} from './common/interfaces.js';

export declare enum NewsScraperSource {
  AP = 'Associated Press',
  CNN = 'Cable News Network',
  FOX = 'Fox News',
  WASH_EXAM = 'Washington Examiner',
}

export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export declare type NewsScraperResponseHeadline = {
  title: string;
  url: string;
}

export declare type NewsScraperResponse = {
  source: NewsScraperSource;
  type: NewsScraperType,
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

export declare class WashExamScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

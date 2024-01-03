import { NewsScraper } from './common/types.js';

export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export declare type NewsScraperSource = {
  name: string,
  shortName: string,
  url: string,
  urlPolitics: string,
};

export declare type NewsScraperSources = {
  AP: NewsScraperSource,
  CNN: NewsScraperSource,
  EPOCH_TIMES: NewsScraperSource,
  FOX: NewsScraperSource,
  WASH_EXAM: NewsScraperSource,
};

export declare type NewsScraperHeadline = {
  title: string;
  url: string;
}

export declare type NewsScraperResponse = {
  type: NewsScraperType,
  source: NewsScraperSource;
  headlines: NewsScraperHeadline[];
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

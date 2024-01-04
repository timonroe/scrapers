export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export enum NewsScraperSource {
  AP = 'ap',
  CNN = 'cnn',
  EPOCH_TIMES = 'epochtimes',
  FOX = 'fox',
  WASH_EXAM = 'washexam',
}

export declare type NewsScraperHeadline = {
  title: string;
  url: string;
}

export declare type NewsScraperResponse = {
  type: NewsScraperType,
  source: NewsScraperSource;
  headlines: NewsScraperHeadline[];
}

export interface NewsScraper {
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class APScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class CNNScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class EpochTimesScraper implements NewsScraper {
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

export declare class NewsScraperFactor {
  constructor();
  createScrapers(sources: NewsScraperSource[]): Promise<NewsScraper[]>;
}

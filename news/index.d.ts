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

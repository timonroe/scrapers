export enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
};

export enum NewsScraperSource {
  ABC = 'abc',
  AP = 'ap',
  BBC = 'bbc',
  CNN = 'cnn',
  CS_MONITOR = 'csmonitor',
  EPOCH_TIMES = 'epochtimes',
  FOX = 'fox',
  NEWSNATION = 'newsnation',
  NEWSWEEK = 'newsweek',
  NY_POST = 'nypost',
  // WASH_EXAM = 'washexam',
  WSJ = 'wsj',
};

export type NewsScraperHeadline = {
  title: string;
  url: string;
};

export type NewsScraperResponse = {
  type: NewsScraperType,
  source: NewsScraperSource;
  headlines: NewsScraperHeadline[];
};

export interface NewsScraper {
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
};

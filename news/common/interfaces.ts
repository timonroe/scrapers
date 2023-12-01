export enum NewsScraperSource {
  AP = 'Associated Press',
  CNN = 'Cable News Network',
  FOX = 'Fox News',
  WASH_EXAM = 'Washington Examiner',
};

export enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
};

export type NewsScraperHeadline = {
  title: string;
  url: string;
};

export type NewsScraperResponse = {
  source: NewsScraperSource;
  type: NewsScraperType,
  headlines: NewsScraperHeadline[];
};

export interface NewsScraper {
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
};

export enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
};

export type NewsScraperSource = {
  name: string,
  shortName: string,
  url: string,
  urlPolitics: string,
};

export type NewsScraperSources = {
  AP: NewsScraperSource,
  CNN: NewsScraperSource,
  EPOCH_TIMES: NewsScraperSource,
  FOX: NewsScraperSource,
  WASH_EXAM: NewsScraperSource,
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

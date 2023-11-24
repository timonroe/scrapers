export enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
};

export type NewsScraperResponseHeadline = {
  title: string;
  url: string;
}

export type NewsScraperResponse = {
  source: string;
  type: string,
  headlines: NewsScraperResponseHeadline[];
}

export interface NewsScraper {
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

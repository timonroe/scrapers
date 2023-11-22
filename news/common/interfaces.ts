
export type NewsScraperResponseHeadline = {
  title: string;
  url: string;
}

export type NewsScraperResponse = {
  source: string;
  headlines: NewsScraperResponseHeadline[];
}

export interface NewsScraper {
  scrape(): Promise<NewsScraperResponse>;
}

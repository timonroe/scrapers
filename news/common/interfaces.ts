
export type NewsScraperResponse = {
  source: string;
  headlines: string[];
}

export interface NewsScraper {
  scrape(): Promise<NewsScraperResponse>;
}

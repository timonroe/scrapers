
export interface NewsScraper {
  scrape(): Promise<string[]>;
}

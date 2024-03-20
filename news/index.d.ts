export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export declare enum NewsScraperSource {
  AP = 'ap',
  BBC = 'bbc',
  CNN = 'cnn',
  EPOCH_TIMES = 'epochtimes',
  FOX = 'fox',
  NEWSWEEK = 'newsweek',
  // WASH_EXAM = 'washexam',
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

export declare interface NewsScraper {
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class APScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class BBCScraper implements NewsScraper {
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

export declare class NewsweekScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class WashExamScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class NewsScraperFactory {
  constructor();
  createScrapers(sources: NewsScraperSource[]): Promise<NewsScraper[]>;
}

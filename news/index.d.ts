export declare enum NewsScraperType {
  POLITICS = 'politics',
  SPORTS = 'sports',
}

export declare enum NewsScraperSource {
  ABC = 'abc',
  AP = 'ap',
  BBC = 'bbc',
  CNN = 'cnn',
  CS_MONITOR = 'csmonitor',
  DISPATCH = 'dispatch',
  EPOCH_TIMES = 'epochtimes',
  FOX = 'fox',
  NEWSNATION = 'newsnation',
  NEWSWEEK = 'newsweek',
  NY_POST = 'nypost',
  // WASH_EXAM = 'washexam',
  WSJ = 'wsj',
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

export declare class ABCScraper implements NewsScraper {
  constructor();
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

export declare class CSMonitorScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class DispatchScraper implements NewsScraper {
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

export declare class NewsnationScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class NewsweekScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class NYPostScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class WashExamScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class WSJScraper implements NewsScraper {
  constructor();
  scrape(type: NewsScraperType): Promise<NewsScraperResponse>;
}

export declare class NewsScraperFactory {
  constructor();
  createScrapers(sources: NewsScraperSource[]): Promise<NewsScraper[]>;
}

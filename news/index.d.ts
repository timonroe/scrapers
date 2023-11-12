import { NewsScraper } from './common/interfaces.js';

export declare class CNNScraper implements NewsScraper {
  scrape(): Promise<string[]>;
}

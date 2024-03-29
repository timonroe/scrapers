import {
  NewsScraperSource,
  NewsScraper,
} from '../common/types.js';
import { ABCScraper } from '../abc/index.js';
import { APScraper } from '../ap/index.js';
import { BBCScraper } from '../bbc/index.js';
import { CNNScraper } from '../cnn/index.js';
import { CSMonitorScraper } from '../chris-sci-monitor/index.js';
import { DispatchScraper } from '../dispatch/index.js';
import { EpochTimesScraper } from '../epoch-times/index.js';
import { FoxScraper } from '../fox/index.js';
import { NewsweekScraper } from '../newsweek/index.js';
import { NewsnationScraper } from '../newsnation/index.js';
import { NYPostScraper } from '../ny-post/index.js';
// import { WashExamScraper } from '../wash-exam/index.js';
import { WSJScraper } from '../wall-street-journal/index.js';

export class NewsScraperFactory {
  constructor() {
  }
  async createScrapers(sources: NewsScraperSource[] = []): Promise<NewsScraper[]> {
    // If no sources specified, create all scrapers
    if (sources.length === 0) {
      sources.push(...Object.values(NewsScraperSource).map(source => source));
    }
    return sources.map(source => {
      if (source === NewsScraperSource.ABC) return new ABCScraper();
      else if (source === NewsScraperSource.AP) return new APScraper();
      else if (source === NewsScraperSource.BBC) return new BBCScraper();
      else if (source === NewsScraperSource.CNN) return new CNNScraper();
      else if (source === NewsScraperSource.CS_MONITOR) return new CSMonitorScraper();
      else if (source === NewsScraperSource.DISPATCH) return new DispatchScraper();
      else if (source === NewsScraperSource.EPOCH_TIMES) return new EpochTimesScraper();
      else if (source === NewsScraperSource.FOX) return new FoxScraper();
      else if (source === NewsScraperSource.NEWSNATION) return new NewsnationScraper();
      else if (source === NewsScraperSource.NEWSWEEK) return new NewsweekScraper();
      else if (source === NewsScraperSource.NY_POST) return new NYPostScraper();
      // else if (source === NewsScraperSource.WASH_EXAM) return new WashExamScraper();
      else if (source === NewsScraperSource.WSJ) return new WSJScraper();
      else throw new Error(`news scraper source: ${source} is invalid`);
    });
  }
}

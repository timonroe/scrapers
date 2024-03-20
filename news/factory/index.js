import { NewsScraperSource, } from '../common/types.js';
import { APScraper } from '../ap/index.js';
import { BBCScraper } from '../bbc/index.js';
import { CNNScraper } from '../cnn/index.js';
import { EpochTimesScraper } from '../epoch-times/index.js';
import { FoxScraper } from '../fox/index.js';
import { NewsweekScraper } from '../newsweek/index.js';
import { NewsnationScraper } from '../newsnation/index.js';
// import { WashExamScraper } from '../wash-exam/index.js';
export class NewsScraperFactory {
    constructor() {
    }
    async createScrapers(sources = []) {
        // If no sources specified, create all scrapers
        if (sources.length === 0) {
            sources.push(...Object.values(NewsScraperSource).map(source => source));
        }
        return sources.map(source => {
            if (source === NewsScraperSource.AP)
                return new APScraper();
            else if (source === NewsScraperSource.BBC)
                return new BBCScraper();
            else if (source === NewsScraperSource.CNN)
                return new CNNScraper();
            else if (source === NewsScraperSource.EPOCH_TIMES)
                return new EpochTimesScraper();
            else if (source === NewsScraperSource.FOX)
                return new FoxScraper();
            else if (source === NewsScraperSource.NEWSNATION)
                return new NewsnationScraper();
            else if (source === NewsScraperSource.NEWSWEEK)
                return new NewsweekScraper();
            // else if (source === NewsScraperSource.WASH_EXAM) return new WashExamScraper();
            else
                throw new Error(`news scraper source: ${source} is invalid`);
        });
    }
}

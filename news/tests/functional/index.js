import 'dotenv/config';
import { NewsScraperType } from '../../common/types.js';
import { NewsScraperFactor } from '../../factory/index.js';
(async () => {
    const factory = new NewsScraperFactor();
    /*
    const sources: NewsScraperSource[] = [NewsScraperSource.AP];
    const scrapers = await factory.createScrapers(sources);
    */
    const scrapers = await factory.createScrapers();
    const results = await Promise.allSettled(scrapers.map(async (scraper) => {
        return scraper.scrape(NewsScraperType.POLITICS);
    }));
    // @ts-ignore
    const scraperResponses = results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        }
        return undefined;
    }).filter(Boolean);
    console.log(`scraperResponses: ${JSON.stringify(scraperResponses, null, 2)}`);
})();

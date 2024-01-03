import 'dotenv/config';
import { NewsScraperType, APScraper, CNNScraper, FoxScraper, WashExamScraper, newsScraperSources, } from '../../index.js';
function createScrapers(sources) {
    return Object.values(sources).map(source => {
        if (source.name === newsScraperSources.AP.name)
            return new APScraper();
        else if (source.name === newsScraperSources.CNN.name)
            return new CNNScraper();
        else if (source.name === newsScraperSources.EPOCH_TIMES.name)
            return undefined;
        else if (source.name === newsScraperSources.FOX.name)
            return new FoxScraper();
        else if (source.name === newsScraperSources.WASH_EXAM.name)
            return new WashExamScraper();
        else
            throw new Error(`news scraper source: ${source} is invalid`);
    }).filter(Boolean);
}
(async () => {
    const sources = newsScraperSources;
    const scrapers = createScrapers(newsScraperSources);
    const results = await Promise.allSettled(scrapers.map(async (scraper) => {
        return scraper.scrape(NewsScraperType.POLITICS);
    }));
    const scraperResponses = results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        }
        return undefined;
    }).filter(Boolean);
    console.log(`scraperResponses: ${JSON.stringify(scraperResponses, null, 2)}`);
})();

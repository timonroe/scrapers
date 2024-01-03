import 'dotenv/config';
import {
  NewsScraperType,
  NewsScraperSources,
  NewsScraperResponse,
  APScraper,
  CNNScraper,
  EpochTimesScraper,
  FoxScraper,
  WashExamScraper,
  newsScraperSources,
} from '../../index.js';

function createScrapers(sources: NewsScraperSources): any[] {
  return Object.values(sources).map(source => {
    if (source.name === newsScraperSources.AP.name) return new APScraper();
    else if (source.name === newsScraperSources.CNN.name) return new CNNScraper();
    else if (source.name === newsScraperSources.EPOCH_TIMES.name) return new EpochTimesScraper();
    else if (source.name === newsScraperSources.FOX.name) return new FoxScraper();
    else if (source.name === newsScraperSources.WASH_EXAM.name) return new WashExamScraper();
    else throw new Error(`news scraper source: ${source} is invalid`);
  }).filter(Boolean);
}

(async () => {
  const sources: NewsScraperSources = newsScraperSources;
  const scrapers = createScrapers(newsScraperSources);
  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      return scraper.scrape(NewsScraperType.POLITICS);
    }),
  );
  const scraperResponses: NewsScraperResponse[] = results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return undefined;
  }).filter(Boolean);
  console.log(`scraperResponses: ${JSON.stringify(scraperResponses, null, 2)}`);

})();

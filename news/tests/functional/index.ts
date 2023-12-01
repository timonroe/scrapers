import 'dotenv/config';
import {
  NewsScraperType,
  NewsScraperSource,
  NewsScraperResponse,
  APScraper,
  CNNScraper,
  FoxScraper,
  WashExamScraper,
} from '../../index.js';

function createScrapers(sources: NewsScraperSource[]): any[] {
  return sources.map(source => {
    if (source === NewsScraperSource.AP) return new APScraper();
    else if (source === NewsScraperSource.CNN) return new CNNScraper();
    else if (source === NewsScraperSource.FOX) return new FoxScraper();
    else if (source === NewsScraperSource.WASH_EXAM) return new WashExamScraper();
    else throw new Error(`news scraper source: ${source} is invalid`);
  });
}

(async () => {
  const sources: NewsScraperSource[] = [
    NewsScraperSource.AP,
    NewsScraperSource.CNN,
    NewsScraperSource.FOX,
    NewsScraperSource.WASH_EXAM
  ];
  const scrapers = createScrapers(sources);
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

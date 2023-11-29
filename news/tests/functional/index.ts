import 'dotenv/config';
import {
  NewsScraperType,
  APScraper,
  CNNScraper,
  FoxScraper,
  WashExamScraper,
} from '../../index.js';

(async () => {
  const apScraper: APScraper = new APScraper();
  const cnnScraper: CNNScraper = new CNNScraper();
  const foxScraper: FoxScraper = new FoxScraper();
  const washExamScraper: WashExamScraper = new WashExamScraper();
  const scrapers = [
    apScraper,
    cnnScraper,
    foxScraper,
    washExamScraper,
  ];

  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      return scraper.scrape(NewsScraperType.POLITICS);
    }),
  );

  const responses = results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return undefined;
  }).filter(Boolean);
  console.log('headlines: ', JSON.stringify(responses, null, 2));

})();

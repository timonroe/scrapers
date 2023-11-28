import 'dotenv/config';
import {
  APScraper,
  CNNScraper,
  FoxScraper
} from '../../index.js';

(async () => {
  const apScraper: APScraper = new APScraper();
  const cnnScraper: CNNScraper = new CNNScraper();
  const foxScraper: FoxScraper = new FoxScraper();
  const scrapers = [
    apScraper,
    cnnScraper,
    foxScraper,
  ];

  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      return scraper.scrape();
    }),
  );
  // console.log('results: ', JSON.stringify(results, null, 2));

  const responses = results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return undefined;
  }).filter(Boolean);
  console.log('headlines: ', JSON.stringify(responses, null, 2));

})();

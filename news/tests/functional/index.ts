import 'dotenv/config';
import { CNNScraper } from '../../index.js';

(async () => {
  const cnnScraper: CNNScraper = new CNNScraper();
  const cnnHeadlines: string[] = await cnnScraper.scrape();
  console.log(JSON.stringify(cnnHeadlines, null, 2));
})();

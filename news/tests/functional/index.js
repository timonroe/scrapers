import 'dotenv/config';
import { CNNScraper } from '../../index.js';
(async () => {
    const cnnScraper = new CNNScraper();
    const cnnHeadlines = await cnnScraper.scrape();
    console.log(JSON.stringify(cnnHeadlines, null, 2));
})();

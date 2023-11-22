import 'dotenv/config';
import { CNNScraper } from '../../index.js';
(async () => {
    const cnnScraper = new CNNScraper();
    // const foxScraper: FoxScraper = new FoxScraper();
    const scrapers = [
        cnnScraper,
        // foxScraper,
    ];
    const results = await Promise.allSettled(scrapers.map(async (scraper) => {
        return scraper.scrape();
    }));
    console.log('results: ', JSON.stringify(results, null, 2));
    const responses = results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        }
        return undefined;
    }).filter(Boolean);
    console.log('headlines: ', JSON.stringify(responses, null, 2));
})();

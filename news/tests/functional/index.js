import 'dotenv/config';
import { CNNScraper, FoxScraper } from '../../index.js';
(async () => {
    const cnnScraper = new CNNScraper();
    const foxScraper = new FoxScraper();
    const scrapers = [
        cnnScraper,
        foxScraper,
    ];
    const results = await Promise.allSettled(scrapers.map(async (scraper) => {
        return scraper.scrape();
    }));
    console.log('results: ', JSON.stringify(results, null, 2));
    const headlines = results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        }
        return undefined;
    }).filter(Boolean);
    console.log('all headlines: ', JSON.stringify(headlines, null, 2));
})();

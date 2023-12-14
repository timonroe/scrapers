import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import { NewsScraperSource, NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_CNN_SCRAPER, } = process.env;
export class CNNScraper {
    source;
    logger;
    constructor() {
        this.source = NewsScraperSource.CNN;
        if (LOGGING_CNN_SCRAPER && LOGGING_CNN_SCRAPER === 'on') {
            this.logger = new Logger({ logVerbose: true, logError: true });
        }
        else {
            this.logger = new Logger({ logError: true });
        }
    }
    async scrapePolitics() {
        let headlines = [];
        try {
            const response = await fetch('https://www.cnn.com/politics');
            const htmlDocument = await response.text();
            const $ = cheerio.load(htmlDocument);
            const headlineElements = $('a.container_lead-plus-headlines__link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = $(headlineElements[x]); // Convert the current element to a Cheerio object
                let href = headlineElement.attr('href');
                if (!href)
                    continue;
                href = href.trim();
                if (!href)
                    continue;
                const url = href.includes('https') ? href : `https://www.cnn.com${href}`;
                if (headlines.find(headline => headline.url === url))
                    continue; // Get rid of dups
                const spanElement = headlineElement.find('div > div > span');
                let title = spanElement.text();
                if (!title)
                    continue;
                title = title.trim();
                if (!title)
                    continue;
                headlines.push({
                    title,
                    url,
                });
            }
        }
        catch (error) {
            this.logger.error('CNNScraper.scrape error: %s', error.message);
            throw error;
        }
        const response = {
            source: this.source,
            type: NewsScraperType.POLITICS,
            headlines,
        };
        this.logger.verbose('CNNScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

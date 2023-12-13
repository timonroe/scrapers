import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import { NewsScraperSource, NewsScraperType, } from '../common/interfaces.js';
const { LOGGING_AP_SCRAPER, } = process.env;
export class APScraper {
    source;
    logger;
    constructor() {
        this.source = NewsScraperSource.AP;
        if (LOGGING_AP_SCRAPER && LOGGING_AP_SCRAPER === 'on') {
            this.logger = new Logger({ logVerbose: true, logError: true });
        }
        else {
            this.logger = new Logger({ logError: true });
        }
    }
    async scrapePolitics() {
        let headlines = [];
        try {
            const response = await fetch('https://apnews.com/politics');
            const htmlDocument = await response.text();
            const $ = cheerio.load(htmlDocument, null, false);
            const headlineElements = $('.PagePromo-title .Link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = headlineElements[x];
                let href = $(headlineElement).attr('href');
                if (!href)
                    continue;
                href = href.trim();
                if (!href)
                    continue;
                const url = href.includes('https') ? href : `https://www.apnews.com${href}`;
                // Get rid of dups
                if (headlines.find(headline => headline.url === href))
                    continue;
                const titleElement = $(headlineElement, '.PagePromoContentIcons-text');
                if (!titleElement)
                    continue;
                let title = $(titleElement).text();
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
            this.logger.error('APScraper.scrape error: %s', error.message);
            throw error;
        }
        const response = {
            source: this.source,
            type: NewsScraperType.POLITICS,
            headlines,
        };
        this.logger.verbose('APScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

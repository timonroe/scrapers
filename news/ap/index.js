import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { NewsScraperType, } from '../common/types.js';
import { newsScraperSources, } from '../common/sources.js';
const { LOGGING_AP_SCRAPER, } = process.env;
export class APScraper {
    source;
    logger;
    constructor() {
        this.source = newsScraperSources.AP;
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
            const response = await fetch(this.source.urlPolitics);
            const htmlDocument = await response.text();
            const $ = cheerio.load(htmlDocument, null, false);
            const headlineElements = $('.PagePromo-title .Link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = $(headlineElements[x]); // Convert the current element to a Cheerio object
                let href = headlineElement.attr('href');
                if (!href)
                    continue;
                href = href.trim();
                if (!href)
                    continue;
                const url = href.includes('https') ? href : `${this.source.url}${href}`;
                if (headlines.find(headline => headline.url === href))
                    continue; // Get rid of dups
                const titleElement = headlineElement.find('.PagePromoContentIcons-text');
                if (!titleElement)
                    continue;
                let title = titleElement.text();
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
            type: NewsScraperType.POLITICS,
            source: this.source,
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

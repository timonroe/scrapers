import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { NewsScraperType, NewsScraperSource, } from '../common/types.js';
const { LOGGING_EPOCH_TIMES_SCRAPER, } = process.env;
const NAME = 'The Epoch Times';
const SHORT_NAME = 'Epoch Times';
const URL = 'https://www.theepochtimes.com';
const URL_POLITICS = 'https://www.theepochtimes.com/us/us-politics';
export class EpochTimesScraper {
    source;
    name;
    shortName;
    url;
    urlPolitics;
    logger;
    constructor() {
        this.source = NewsScraperSource.EPOCH_TIMES;
        this.name = NAME;
        this.shortName = SHORT_NAME;
        this.url = URL;
        this.urlPolitics = URL_POLITICS;
        if (LOGGING_EPOCH_TIMES_SCRAPER && LOGGING_EPOCH_TIMES_SCRAPER === 'on') {
            this.logger = new Logger({ logVerbose: true, logError: true });
        }
        else {
            this.logger = new Logger({ logError: true });
        }
    }
    async scrapePolitics() {
        const headlines = [];
        try {
            const response = await fetch(this.urlPolitics);
            const htmlDocument = await response.text();
            const $ = cheerio.load(htmlDocument);
            const headlineElements = $('div.grid.grid-cols-4.gap-x-9.border-b');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = $(headlineElements[x]); // Convert the current element to a Cheerio object
                const divElement = headlineElement.children('div');
                if (!divElement)
                    continue;
                const aElement = divElement.children('a[href]');
                if (!aElement)
                    continue;
                let href = aElement.attr('href');
                if (!href)
                    continue;
                href = href.trim();
                if (!href)
                    continue;
                const url = href.includes('https') ? href : `${this.url}${href}`;
                if (headlines.find(headline => headline.url === url))
                    continue; // Get rid of dups
                const h3Element = headlineElement.find('h3');
                if (!h3Element)
                    continue;
                let title = h3Element.text();
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
            this.logger.error('EpochTimesScraper.scrape error: %s', error.message);
            throw error;
        }
        const response = {
            type: NewsScraperType.POLITICS,
            source: this.source,
            name: this.name,
            shortName: this.shortName,
            url: this.url,
            urlPolitics: this.urlPolitics,
            headlines,
        };
        this.logger.verbose('EpochTimesScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scraping type: ${type} is not implemented`);
    }
}

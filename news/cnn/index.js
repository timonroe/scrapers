import { Logger } from '@soralinks/logger';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { NewsScraperType, NewsScraperSource, } from '../common/types.js';
const { LOGGING_CNN_SCRAPER, } = process.env;
const NAME = 'Cable News Network';
const SHORT_NAME = 'CNN';
const URL = 'https://www.cnn.com';
const URL_POLITICS = 'https://www.cnn.com/politics';
export class CNNScraper {
    source;
    name;
    shortName;
    url;
    urlPolitics;
    logger;
    constructor() {
        this.source = NewsScraperSource.CNN;
        this.name = NAME;
        this.shortName = SHORT_NAME;
        this.url = URL;
        this.urlPolitics = URL_POLITICS;
        if (LOGGING_CNN_SCRAPER && LOGGING_CNN_SCRAPER === 'on') {
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
            const headlineElements = $('a.container__link');
            for (let x = 0; x < headlineElements.length; x++) {
                const headlineElement = $(headlineElements[x]); // Convert the current element to a Cheerio object
                let href = headlineElement.attr('href');
                if (!href)
                    continue;
                href = href.trim();
                if (!href)
                    continue;
                const url = href.includes('https') ? href : `${this.url}${href}`;
                if (headlines.find(headline => headline.url === url))
                    continue; // Get rid of dups
                const titleElement = headlineElement.find('span.container__headline-text');
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
            /*
            const headlineElements = $('a.container_lead-plus-headlines__link');
            for (let x = 0; x < headlineElements.length; x++) {
              const headlineElement = $(headlineElements[x]);  // Convert the current element to a Cheerio object
              let href = headlineElement.attr('href');
              if (!href) continue;
              href = href.trim();
              if (!href) continue;
              const url = href.includes('https') ? href : `${this.url}${href}`;
              if (headlines.find(headline => headline.url === url)) continue;  // Get rid of dups
              const titleElement = headlineElement.find('div > div > span');
              if (!titleElement) continue;
              let title = titleElement.text();
              if (!title) continue;
              title = title.trim();
              if (!title) continue;
              headlines.push({
                title,
                url,
              });
            }
            */
        }
        catch (error) {
            this.logger.error('CNNScraper.scrape error: %s', error.message);
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
        this.logger.verbose('CNNScraper.scrape: %s', JSON.stringify(response, null, 2));
        return response;
    }
    async scrape(type = NewsScraperType.POLITICS) {
        if (type === NewsScraperType.POLITICS)
            return this.scrapePolitics();
        throw new Error(`scaping type: ${type} is not implemented`);
    }
}

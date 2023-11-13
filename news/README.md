# news-scrapers
Scraping news organizations' websites for headlines

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import { CNNScraper } from '@soralinks/news-scrapers';

const cnnScraper: CNNScraper = new CNNScraper();
const cnnHeadlines: string[] = await cnnScraper.scrape();
console.log(JSON.stringify(cnnHeadlines, null, 2));

```

## Logging
```javascript
// To turn on logging, set the environment variable: LOGGING_CNN_SCRAPER = 'on'
// Note that error logging is always on

```

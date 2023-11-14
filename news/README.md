# news-scrapers
Scraping news organizations' websites for headlines

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import { CNNScraper, FoxScraper } from '@soralinks/news-scrapers';

const cnnScraper: CNNScraper = new CNNScraper();
const foxScraper: FoxScraper = new FoxScraper();
const scrapers = [
  cnnScraper,
  foxScraper,
];

const results = await Promise.allSettled(
  scrapers.map(async (scraper) => {
    return scraper.scrape();
  }),
);
console.log('results: ', JSON.stringify(results, null, 2));

const responses = results.map(result => {
  if (result.status === 'fulfilled') {
    return result.value;
  }
  return undefined;
}).filter(Boolean);
console.log('headlines: ', JSON.stringify(responses, null, 2));

```

## Logging
```javascript
// To turn on logging, set the following environment variables:
//   LOGGING_CNN_SCRAPER = 'on'
//   LOGGING_FOX_SCRAPER = 'on'
// Note that error logging is always on

```

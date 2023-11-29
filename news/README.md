# news-scrapers
Scraping news organizations' websites for headlines

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import {
  APScraper,
  CNNScraper,
  FoxScraper,
  WashExamScraper,
} from '@soralinks/news-scrapers';

const apScraper: APScraper = new APScraper();
const cnnScraper: CNNScraper = new CNNScraper();
const foxScraper: FoxScraper = new FoxScraper();
const washExamScraper: WashExamScraper = new WashExamScraper();
const scrapers = [
  apScraper,
  cnnScraper,
  foxScraper,
  washExamScraper,
];

const results = await Promise.allSettled(
  scrapers.map(async (scraper) => {
    return scraper.scrape();
  }),
);

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
//   LOGGING_AP_SCRAPER = 'on'
//   LOGGING_CNN_SCRAPER = 'on'
//   LOGGING_FOX_SCRAPER = 'on'
//   LOGGING_WASH_EXAM_SCRAPER = 'on'
// Note that error logging is always on

```

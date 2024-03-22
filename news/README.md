# news-scrapers
Scraping news organizations' websites for headlines

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import {
  NewsScraperType,
  NewsScraperResponse,
  NewsScraperFactory
} from '@soralinks/news-scrapers';

(async () => {
  const factory = new NewsScraperFactory();
  const scrapers = await factory.createScrapers();
  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      return scraper.scrape(NewsScraperType.POLITICS);
    }),
  );
  // @ts-ignore
  const scraperResponses: NewsScraperResponse[] = results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return undefined;
  }).filter(Boolean);
  console.log(`scraperResponses: ${JSON.stringify(scraperResponses, null, 2)}`);

})();
```

## Logging
```javascript
// To turn on logging, set the following environment variables:
//   LOGGING_AP_SCRAPER = 'on'
//   LOGGING_BBC_SCRAPER = 'on'
//   LOGGING_CNN_SCRAPER = 'on'
//   LOGGING_EPOCH_TIMES_SCRAPER='on'
//   LOGGING_FOX_SCRAPER = 'on'
//   LOGGING_NEWSNATION_SCRAPER = 'on'
//   LOGGING_NEWSWEEK_SCRAPER = 'on'
//   LOGGING_WASH_EXAM_SCRAPER = 'on'
//   LOGGING_WSJ_SCRAPER = 'on'
// Note that error logging is always on
```

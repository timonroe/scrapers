# news-scrapers
Scraping news organizations' websites for headlines

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import {
  NewsScraperType,
  NewsScraperSource,
  NewsScraperResponse,
  APScraper,
  CNNScraper,
  FoxScraper,
  WashExamScraper,
} from '@soralinks/news-scrapers';

function createScrapers(sources: NewsScraperSource[]): any[] {
  return sources.map(source => {
    if (source === NewsScraperSource.AP) return new APScraper();
    else if (source === NewsScraperSource.CNN) return new CNNScraper();
    else if (source === NewsScraperSource.FOX) return new FoxScraper();
    else if (source === NewsScraperSource.WASH_EXAM) return new WashExamScraper();
    else throw new Error(`news scraper source: ${source} is invalid`);
  });
}

const sources: NewsScraperSource[] = [
    NewsScraperSource.AP,
    NewsScraperSource.CNN,
    NewsScraperSource.FOX,
    NewsScraperSource.WASH_EXAM
  ];
  const scrapers = createScrapers(sources);
  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      return scraper.scrape(NewsScraperType.POLITICS);
    }),
  );

  const scraperResponses: NewsScraperResponse[] = results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return undefined;
  }).filter(Boolean);
  console.log(`scraperResponses: ${JSON.stringify(scraperResponses, null, 2)}`);

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

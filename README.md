# scrapers
Data scraping used for extracting data from websites

## Install

`npm install @soralinks/news-scrapers`

## Use in your app

```javascript
import { CNNScraper } from '@soralinks/news-scrapers';

const cnnScraper: CNNScraper = new CNNScraper();
const cnnHeadlines: string[] = await cnnScraper.scrape();
console.log(JSON.stringify(cnnHeadlines, null, 2));

```
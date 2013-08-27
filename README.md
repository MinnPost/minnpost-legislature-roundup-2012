Minnesota state legislative roundup.  The goal of this project is to create a visualization
that explores the bills of the Legislative Session 87 (2011-2012).

Final application can be seen: http://www.minnpost.com/data/2012/05/2012-legislative-session-what-did-they-pass

## Data Processing

 - List of bills that have been signed or vetoed gleaned manually from http://mn.gov/governor/policy/legislation/, added to a list
 - build-bills-json.py loops through each bill in the list, using the OpenStates API to get information like bill title, sponsors and sponsor info, starting date, ending date, whether the bill was signed or vetoed, and the house votes for or against.
 - OpenStates unfortunately lacks data on Minnesota Senate votes, so build-bills-json pulls those from a scraper (https://scraperwiki.com/scrapers/mn_bills/)
     - ScraperWiki is changing its platform, so an export of the scraper is in this repo and this needs to be updated to be able to run successfully.
 - All the data gets written to ```bills.json```
 
## Application

 - The application (found at ```vis/index.html```) runs from the produced ```bills.json```.  This data file is uploaded to S3 for the live application.  Change reference as needed.
 - Please update the Open States API key to your own.

## Technologies used

 - Raphael.js
 - jQuery
 - Backbone
 - Underscore
 - MapQuest
 - Open States
 - Many thanks to [Jim Vallandingham](http://vallandingham.me/bubble_charts_in_d3.html) for his post on bubble charts in D3.js
Minnesota state legislative roundup.  The goal of this project is to create a visualization
that explores the bills of the Legislative Session 87 (2011-2012).

## Technologies used

 - Many thanks to [Jim Vallandingham](http://vallandingham.me/bubble_charts_in_d3.html) for his post on bubble charts in D3.js

## Data Processing

 - List of bills that have been signed or vetoed gleaned manually from http://mn.gov/governor/policy/legislation/, added to a list
 
 - build-bills-json.py loops through each bill in the list, using the OpenStates API to get information like bill title, sponsors and sponsor info, starting date, ending date, whether the bill was signed or vetoed, and the house votes for or against.
 
 -OpenStates unfortunately lacks data on Minnesota Senate votes, so build-bills-json pulls those from a scraper (https://scraperwiki.com/scrapers/mn_bills/)
 
 -All the data gets written to bills.json
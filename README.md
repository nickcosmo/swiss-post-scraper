# Swiss Post Scraper

I took the advice of many of the programming articles out there and I automated the boring stuff! In this case I used [Node.js](https://nodejs.org/en/) to assist me.

## Background

I am moving across the world at the moment and I have many parcels in the mail that I am routinely tracking. Instead of checking this every day, why not write some code to do this for me!?

Tools I found useful for this project were [Puppeteer](https://pptr.dev/) and the [Google Sheets API](https://developers.google.com/sheets/api).

## How It Works

<div style="text-align:center; align-items:center;"><img src="/diagram.png"/></div>

1. Establish and authorize a connection with Google Sheets via Google Sheets API
1. Get the list of tracking numbers from the Google Sheet
1. Using puppeteer, go to Swiss Post website, input each tracking number, and scrape updated shipment data
1. Update Google Sheet with updated shipment data

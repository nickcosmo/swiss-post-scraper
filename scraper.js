const puppeteer = require('puppeteer');

exports.getUpdatedData = async (num) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://service.post.ch/ekp-web/ui/list');
        await page.waitForSelector('form');
        await page.type('[placeholder = "Consignment number / collection code"]', num);
        await page.click('[name="searchresults"]');
        await page.waitForSelector('.ekp-sub-title', { visible: true });
        const status = await page.evaluate(() => {
            return document.querySelector('.ekp-sub-title').innerHTML;
        });
        await page.click('ekp-shipment-item > div > div > div > span > .btn');
        await page.waitForSelector('ekp-event-item > div > div > .row > .col-12 > div:nth-child(1)', { visible: true });
        const details = await page.evaluate(() => {
            return document.querySelector('ekp-event-item > div > div > .row > .col-12 > div:nth-child(1)').innerHTML;
        });
        const date = await page.evaluate(() => {
            return document.querySelector('ekp-event-day:nth-child(1) > div > div > div > div > div > span').innerHTML;
        });
        await page.waitForTimeout(5000);
        await browser.close();
        return [status, details, date];
    } catch (err) {
        console.log(err);
    }
};

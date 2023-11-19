// import { puppeteer } from 'puppeteer';
const puppeteer = require('puppeteer');

async function getAll(page) {
    let data = [];

    let url = "#root > main > div > div.Market_real-price-area__p5dNX > div:nth-child(2) > div > table > tbody > tr";
    await page.waitForSelector(url);
    const number = await page.$$eval(url, (data) => data.length);
    
    console.log("number : " + number);

    for(let index=0; index<number; index++) {
        data.push(await getOne(page, index + 1));
    }
    return data;
}

async function getOne(page, index) {
    let data = {};

    let nameUrl = "#root > main > div > div.Market_real-price-area__p5dNX > div:nth-child(2) > div > table > tbody > tr:nth-child(" + index + ") > td:nth-child(1) > div > p > a > strong > span.MarketRow_market-coin__name__fxXGN";
    data.name = await page.$eval(nameUrl, (data) => { return data.textContent; });

    let engNameUrl = "#root > main > div > div.Market_real-price-area__p5dNX > div:nth-child(2) > div > table > tbody > tr:nth-child(" + index + ") > td:nth-child(1) > div > p > a > span";
    let tmpData= await page.$eval(engNameUrl, (data) => { return data.textContent; });
    data.engName = tmpData.split('/')[0];
    data.currencyUnit = tmpData.split('/')[1];

    let costUrl = "#root > main > div > div.Market_real-price-area__p5dNX > div:nth-child(2) > div > table > tbody > tr:nth-child(" + index + ") > td:nth-child(2) > div > strong";
    data.cost = await page.$eval(costUrl,
        (data) => { return data.textContent.split(" ")[0]; }
    );

    let marketCapUrl = "#root > main > div > div.Market_real-price-area__p5dNX > div:nth-child(2) > div > table > tbody > tr:nth-child(" + index + ") > td:nth-child(5) > strong";
    data.marketCap = await page.$eval(marketCapUrl, (data) => { return data.textContent; });

    return Promise.resolve(data);
}

export const bitcoinCrawling = async () => {
    const browser = await puppeteer.connect({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.goto('https://www.bithumb.com/react/');
    

    let data = await getAll(page);
    
    console.log(data);

    
    await browser.close();
};

export default bitcoinCrawling;
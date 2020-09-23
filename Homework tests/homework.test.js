const playwright = require('playwright-chromium');

jest.setTimeout(60000);
let browser, context, page;

beforeAll(async()=>{
  browser = await playwright.chromium.launch({
    headless: false, slowMo: 100,
  })
});

afterEach(async() => {
  await context.close();
});

afterAll(async () => {
  await browser.close();
});

describe("Homework tests", () => {
    test('homework1 - iframe', async() => {
      
      context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://www.w3schools.com/html/html_iframe.asp');

      //Looking for frame
      const frame = await page.frame({url:'https://www.w3schools.com/html/default.asp'});

      //Typing in frame's input
      await frame.type('.exerciseprecontainer > input:nth-child(1)', 'title');
      await page.waitForTimeout(1000);
  });
  
  test("homework2 - bitaps block search", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://bitaps.com");
    
    //Search block
    await page.click('#search-box');
    await page.type('#search-box', '0000000000000000000adac413e2dc96092b449b1ec9d0763be74dcfd313f807');
    await page.keyboard.press('Enter');

    //Assertion
    await page.waitForSelector('text = 649210');
    await page.waitForTimeout(1000);
  });
  
  test("homework3 - bitaps BTC address search", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://bitaps.com");
    
    //Search BTC address
    await page.click('#search-box');
    await page.type('#search-box', '1Krd6pVawBzzydPm5BnrQPtBQsZ7z1HU8d');
    await page.keyboard.press('Enter');

    //Assertion
    await page.waitForSelector('[href="/1Krd6pVawBzzydPm5BnrQPtBQsZ7z1HU8d"]');
    await page.waitForTimeout(1000);
  });

  test("homework4 - search transaction ID", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://bitaps.com");
    
    //Search transaction ID
    await page.click('#search-box');
    await page.type('#search-box', 'b80fb707f5a022fa82a3a0557adff88d71435e185705f13bbc28c50311f55a43');
    await page.keyboard.press('Enter');
    
    //Assertion
    //Witness ID
    await page.waitForSelector('text=46e07d6daa0cc7e36840d67571c7c3d3d88f9368a37144d51646be6d75b5d389');
    await page.waitForTimeout(1000);
  });
  
  test("homework5 - day/night mode", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://bitaps.com");
    
    //Night mode
    await page.click('#sticky > div.container-fluid.col-xl-11 > div > div.col.menu-picto-wrap.moon > i');
    await page.waitForSelector('[data-theme="dark"]');

    //Day mode
    await page.click('#sticky > div.container-fluid.col-xl-11 > div > div.col.menu-picto-wrap.moon > i');
    await page.waitForSelector('[data-theme="light"]');
    await page.waitForTimeout(1000);
  });
  
  test("homework6 - switch to LTC", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://bitaps.com");
    
    //Open menu
    await page.click('#top-menu > div.btn-group > div:nth-child(1) > div > a');

    //Switch to LTC
    await page.click('#collapse-menu-net > a.dropdown-item.litecoin-logo-menu');
    
    //Assertion
    await page.waitForSelector('text=LTC/USD');
  });
  
  
});


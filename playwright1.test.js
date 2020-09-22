const playwright = require('playwright-chromium');

jest.setTimeout(60000);
let browser;
let context;

beforeAll(async()=>{
  browser = await playwright.chromium.launch({
    headless: false, slowMo: 100,
  })
});

afterEach(async()=>{
  await context.close();
});

afterAll(async () => {
  await browser.close();
});

describe("UI", () =>{
  let page;
  test("test 1 - Launch browser > open page", async()=>{
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/");
    //await browser.close();
  });

  test("test2 - add/remove elements", async()=>{
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/')
  
    //click on "Add Element" button
    await page.waitForSelector('button[onclick="addElement()"]')
    await page.click('button[onclick="addElement()"]');

    //check that "Delete" button appears
    await page.waitForSelector(".added-manually");
    await page.waitForTimeout(1000);
  });
  
  test("test3 - auth", async() => {
    context = await browser.newContext({
        httpCredentials:{
        username: 'admin',
        password: 'admin',
        }
    });
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForTimeout(1000);
  });

  test("test4 - checkboxes", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    await page.check('#checkboxes [type="checkbox"]:nth-child(1)');
    await page.uncheck('#checkboxes [type="checkbox"]:nth-child(3)');
    await page.waitForTimeout(1000);
  });

  // test("test5 - context menu", async() => {
  //   context = await browser.newContext();
  //   page = await context.newPage();
  //   await page.goto("https://the-internet.herokuapp.com/context_menu");

  //   await page.click('#hot-spot', {button: 'right'});
  //   await page.waitForTimeout(2000);
  // });
  
  test("test6 - auth", async() => {
    context = await browser.newContext({
      httpCredentials:{
        username: 'admin',
        password: 'admin',
        }
    });
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/digest_auth");

    //assertion
    await page.waitForSelector('text=Congratulations! You must have the proper credentials.');
    await page.waitForTimeout(1000);
  });
  
  test("test7 - dropdown", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.selectOption('#dropdown', '2');

    await page.waitForTimeout(1000);
  });
  
  test("test8 - disabled input", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    
    await page.click('#input-example [type="button"]');
    await page.waitForSelector('[type="text"]:not([disabled])');

    await page.waitForTimeout(1000);
  });
  
  test("test9 - login form", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/login");
    
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'SuperSecretPassword!');
    await page.click('[type="submit"]');
    
    await page.waitForSelector('[href="/logout"]');
    await page.waitForTimeout(1000);
  });
  
  
  
  test("test10 - notifications", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/notification_message_rendered");
    
    
    await page.click('[href="/notification_message"]');
    await page.waitForSelector('#flash');
    await page.click('[href="/notification_message"]');
    await page.waitForTimeout(1000);
  });
  
  test("test11 - emulation", async() => {
    const {webkit, devices} = require('playwright-chromium');
    context = await browser.newContext(devices['Pixel 2']);
    page = await context.newPage();
    await page.goto("https://github.com/");
    
    
    await page.click('[class="btn-link d-lg-none mt-1 js-details-target"]');
    await page.waitForSelector('[href="/login"]');
    await page.click('[href="/login"]');
    await page.waitForTimeout(1000);
  });
  
  test("test12 - mobile", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");
    
    await page.click('[href="/windows/new"]');
    
    await context.waitForEvent('page');
    
    const pages = await context.pages();
    const page2 = pages[1];
    await page2.waitForSelector('body>div.example>h3', {timeout:3000})
    await page.waitForTimeout(1000);
  });
  
  test("test13 - keys", async() => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/key_presses");
    await page.waitForSelector('#target');
    await page.type('#target','Hello world!');
    await page.click('#target');
    await page.keyboard.press('Backspace');
    await page.waitForSelector('#result');
    await page.waitForSelector('text = You entered: BACK_SPACE');
    await page.waitForTimeout(1000);
  });

});
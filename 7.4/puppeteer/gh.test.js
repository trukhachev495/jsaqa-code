let page;
afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForTimeout(3000);
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });
  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
    });


  test('The page contains Get started with Team', async() => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
    const btnSelector1 = ".btn-mktg.flex-sm-self-center.btn-large-mktg";
    await page.waitForSelector(btnSelector1, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector1, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  })
  test('The page contains Get started with Team', async() => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
    const btn = ".btn-mktg.flex-sm-self-center.btn-large-mktg";
    await page.click(btn);
    await page.waitForSelector('h1.d-none.d-md-block.mt-0.mb-3.text-center.h1.lh-condensed-ultra');
    // Получаем текст элемента
    const textContent = await page.$eval('h1.d-none.d-md-block.mt-0.mb-3.text-center.h1.lh-condensed-ultra', element => element.textContent);
    // Проверяем, что текст соответствует ожидаемому
    expect(textContent).toEqual("First, let's create your user account");
  })
  test('Go to the Actions tab and view the title', async() => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
    const btn = "body > div.logged-out.env-production.page-responsive > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > nav > ul > li:nth-child(1) > button"
    await page.click(btn);
    const btn1 = ".color-fg-default.h4";
    await page.click(btn1);
    await page.waitForSelector('.h2-mktg.mb-3.mx-auto');
    // Получаем текст элемента
    const textContent = await page.$eval('.h2-mktg.mb-3.mx-auto', element => element.textContent);
    // Проверяем, что текст соответствует ожидаемому
    expect(textContent).toEqual("Automate your workflow from idea to production");
  })



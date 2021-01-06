const t = require('tap');

const { Builder, By } = require('selenium-webdriver');
let fs = require('fs');

t.test('Selenium', (t) => {
  t.test('Open browser', async (t) => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.kinopoisk.ru/');

    await driver.manage().window().maximize();
    const image64 = await driver.takeScreenshot();
    fs.writeFileSync('./images/openBrowser.png', image64, 'base64');

    await driver.quit();

    t.ok(driver, 'The browser should open');

    t.end();
  });

  t.test('Open browser', async (t) => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.kinopoisk.ru/');

    await driver.manage().window().maximize();
    const buttons = await driver.findElements(
      By.className('_2Qgi-A90mMUOTbOm_3H84K')
    );
    await buttons[15].click();

    const image64 = await driver.takeScreenshot();
    fs.writeFileSync('./images/openPage.png', image64, 'base64');

    const url = await driver.getCurrentUrl();

    await driver.quit();

    t.same(
      url,
      'https://www.kinopoisk.ru/lists/top250/',
      'URL should be https://www.kinopoisk.ru/lists/top250/'
    );

    t.end();
  });

  t.test('Get first entity', async (t) => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.kinopoisk.ru/lists/top250/');
    const entityText = await driver
      .findElement(By.className('selection-film-item-meta__name'))
      .getText();

    await driver.quit();

    t.notSame(entityText, null, "Name of entity shouldn't be null");

    t.end();
  });

  t.test('Pagination', async (t) => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.kinopoisk.ru/lists/top250/');
    const firstPageEntity = await driver
      .findElement(By.className('selection-film-item-meta__name'))
      .getText();

    await (
      await driver.findElements(By.className('paginator__page-number'))
    )[1].click();

    const secondPageEntity = await driver
      .findElement(By.className('selection-film-item-meta__name'))
      .getText();

    await driver.quit();

    t.notSame(firstPageEntity, secondPageEntity, "Names shouldn't be equals");

    t.end();
  });

  t.test('Open entity', async (t) => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.kinopoisk.ru/lists/top250/');

    const entityTextInList = await driver
      .findElement(By.className('selection-film-item-meta__name'))
      .getText();

    await (
      await driver.findElement(By.className('selection-film-item-meta__link'))
    ).click();

    await driver.manage().window().maximize();
    const image64 = await driver.takeScreenshot();
    fs.writeFileSync('./images/openEntity.png', image64, 'base64');

    const entityTextOutList = await driver
      .findElement(By.className('styles_title__2l0HH'))
      .getText();

    await driver.quit();

    t.same(entityTextInList, entityTextOutList, 'Names should be equals');

    t.end();
  });

  t.end();
});

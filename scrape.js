const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [63,64,65,66,67,68,69,70,71,72];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText))
           .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();

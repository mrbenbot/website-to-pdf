const puppeteer = require("puppeteer");

let browser;

(async function () {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  console.log("browser initiated");
})();

module.exports = {
  getPdf: async (url) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4" });
    await page.close();
    return pdf;
  },
  getContent: async (url) => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.keyboard.down("Meta");
    await page.keyboard.press("KeyS");
    await page.keyboard.up("Meta");
    const code = await page.evaluate(() => {
      const html = document.querySelector("#id_code_html").value;
      const css = document.querySelector("#id_code_css").value;
      const js = document.querySelector("#id_code_js").value;
      return { html, css, js };
    });
    await page.close();
    return code;
  },
};

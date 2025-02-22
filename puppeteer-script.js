const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: puppeteer.executablePath()  // Corrected this line
        });

        const page = await browser.newPage();
        await page.goto('https://www.linkedin.com');

        console.log("Opened LinkedIn!");
    } catch (error) {
        console.error("Error launching Puppeteer:", error);
    }
})();

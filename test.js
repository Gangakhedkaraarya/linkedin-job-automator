const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching Puppeteer...");
        const browser = await puppeteer.launch({ 
            headless: false,
            dumpio: true // Show all errors in the terminal
        });

        console.log("Browser launched successfully!");
        await browser.close();
    } catch (error) {
        console.error("Error launching Puppeteer:", error);
    }
})();


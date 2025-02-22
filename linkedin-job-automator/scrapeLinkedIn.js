const puppeteer = require('puppeteer');  

(async () => {  
    console.log("Launching browser...");  
    const browser = await puppeteer.launch({  
        headless: false,  
        executablePath: puppeteer.executablePath()  // Ensure correct Chrome path  
    });  
    const page = await browser.newPage();  
    await page.goto('https://www.linkedin.com');  

    console.log("Opened LinkedIn!");  
})();

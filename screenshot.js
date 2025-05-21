/**
 * Script to take screenshots of the app
 * 
 * You can use this with Puppeteer to capture screenshots:
 * 
 * 1. Install puppeteer: npm install puppeteer
 * 2. Run this script: node screenshot.js
 */

const puppeteer = require('puppeteer');

async function takeScreenshots() {
    console.log('Taking screenshots of the wallet app...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to mobile dimensions
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

    // Navigate to app
    console.log('Navigating to app...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

    // Take main screen screenshot
    console.log('Taking screenshot of main screen...');
    await page.screenshot({ path: './screenshots/main-screen.png' });

    // Click on a transaction
    console.log('Clicking on a transaction...');
    await page.click('.transactionItem');

    // Wait for navigation
    await page.waitForSelector('.transactionDetailContainer');

    // Take detail screen screenshot
    console.log('Taking screenshot of detail screen...');
    await page.screenshot({ path: './screenshots/detail-screen.png' });

    await browser.close();
    console.log('Screenshots saved to ./screenshots/ directory');
}

// Create screenshots directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./screenshots')) {
    fs.mkdirSync('./screenshots');
}

takeScreenshots().catch(error => {
    console.error('Error taking screenshots:', error);
    process.exit(1);
}); 
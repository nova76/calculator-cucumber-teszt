const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

let browser, page;

// ⚙️ KONFIGURÁCIÓS BEÁLLÍTÁSOK
const DEBUG_MODE = process.env.DEBUG === 'true'; // Környezeti változóval vezérelhető
const CONFIG = {
    headless: DEBUG_MODE ? false : 'new',    // DEBUG: látható, NORMÁL: headless
    slowMo: DEBUG_MODE ? 500 : 0,            // DEBUG: lassú, NORMÁL: gyors
    timeout: DEBUG_MODE ? 2000 : 300         // DEBUG: hosszú várakozás, NORMÁL: rövid
};

console.log(`🔧 Teszt mód: ${DEBUG_MODE ? '🔍 DEBUG (látható)' : '⚡ GYORS (headless)'}`);

// Browser indítása minden teszt előtt
Before({timeout: 30000}, async function () {
    try {
        console.log('🚀 Browser indítása...');
        browser = await puppeteer.launch({
            headless: CONFIG.headless,
            slowMo: CONFIG.slowMo,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-extensions'
            ]
        });

        console.log('📄 Új lap létrehozása...');
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        // 🔹 Szerver URL használata a file:// helyett
        const appUrl = 'http://localhost:3000';
        console.log('🌐 Oldal betöltése:', appUrl);

        await page.goto(appUrl, {
            waitUntil: 'networkidle0',
            timeout: 15000
        });

        // Ellenőrizzük, hogy az oldal betöltődött
        await page.waitForSelector('#number1', { timeout: 5000 });
        console.log('✅ Számológép sikeresen betöltve!');

    } catch (error) {
        console.error('❌ Hiba a browser indításakor:', error);
        if (browser) {
            await browser.close();
        }
        throw error;
    }
});

// Browser bezárása minden teszt után
After({timeout: 10000}, async function () {
    try {
        if (browser) {
            console.log('🖼️ Browser bezárása...');
            await browser.close();
            browser = null;
            page = null;
        }
    } catch (error) {
        console.error('⚠️ Hiba a browser bezárásakor:', error);
    }
});

// Háttér lépés
Given('hogy megnyitottam a számológép alkalmazást', async function () {
    // Ellenőrizzük, hogy a page objektum elérhető
    if (!page) {
        throw new Error('A browser page objektum nem elérhető');
    }

    const title = await page.title();
    console.log(`📜 Oldal címe: "${title}"`);
    expect(title).to.equal('Egyszerű Számológép');
});

// Adatok bevitele
Given('hogy beírom az első számot: {string}', { timeout: 45000 }, async function (number) {
    console.log(``);
    console.log(`🔢 Első szám beírása (debug-barát): ${number}`);

    // 🔹 Várunk, hogy a #number1 input megjelenjen a DOM-ban
    //    waitForSelector biztosítja, hogy az elem létezik, a timeout 10s-re növelve
    await page.waitForSelector('#number1', { visible: true, timeout: 10000 });

    // 🔹 Biztosítjuk, hogy az elem fókuszban legyen, mielőtt gépelünk
    await page.focus('#number1');

    // 🔹 Kitöröljük a meglévő értéket az input mezőből
    await page.evaluate(() => document.getElementById('number1').value = '');

    // 🔹 Beírjuk a kívánt számot
    //    slowMo debug módban már van, de itt várhatunk egy rövid delay-et is, ha nagyon lassú gép
    await page.type('#number1', number);

    // 🔹 Ellenőrizzük, hogy a beírás sikeres volt
    const value = await page.$eval('#number1', el => el.value);
    console.log(`✅ Első szám beírva: "${value}"`);

    // 🔹 Extra: kis késleltetés, hogy slowMo-val kompatibilis legyen
    await new Promise(resolve => setTimeout(resolve, 500));
});


Given('beírom a második számot: {string}', { timeout: 45000 }, async function (number) {
    console.log(``);
    console.log(`🔢 Második szám beírása: ${number}`);
    await page.waitForSelector('#number2', { visible: true, timeout: 10000  });

    // 🔹 Biztosítjuk, hogy az elem fókuszban legyen, mielőtt gépelünk
    await page.focus('#number2');

    await page.evaluate(() => document.getElementById('number2').value = '');
    await page.type('#number2', number);

    // Ellenőrizzük, hogy sikeresen be lett írva
    const value = await page.$eval('#number2', el => el.value);
    console.log(`✅ Második szám beírva: "${value}"`);
});

Given('nem írok be második számot', { timeout: 45000 }, async function () {
    await page.evaluate(() => document.getElementById('number2').value = '');
});

// Műveletek végrehajtása
When('rákattintok a {string} gombra', { timeout: 45000 }, async function (operation) {
    console.log(``);
    console.log(`🔵 Gomb megnyomása: "${operation}"`);

    let buttonId;
    switch(operation) {
        case '+':
            buttonId = '#add-btn';
            break;
        case '-':
            buttonId = '#subtract-btn';
            break;
        case '×':
            buttonId = '#multiply-btn';
            break;
        case '÷':
            buttonId = '#divide-btn';
            break;
        case 'Törlés':
            buttonId = '#clear-btn';
            break;
        default:
            throw new Error(`Ismeretlen művelet: ${operation}`);
    }

    // Várunk, amig a gomb elérhető lesz
    await page.waitForSelector(buttonId, { timeout: 5000 });
    await page.click(buttonId);

    console.log(`✅ Gomb megnyomva: ${buttonId}`);

    // Várakozás konfiguráció alapján
    await new Promise(resolve => setTimeout(resolve, CONFIG.timeout));
});

// Eredmények ellenőrzése
Then('az eredmény {string} lesz', { timeout: 45000 }, async function (expectedResult) {
    console.log(``);
    console.log(`🎯 Eredmény ellenőrzése. Várt: "${expectedResult}"`);

    // Várunk az eredményre
    await page.waitForSelector('#result', { timeout: 5000 });
    const result = await page.$eval('#result', el => el.textContent);

    console.log(`🔍 Kapott eredmény: "${result}"`);
    expect(result).to.equal(expectedResult);
    console.log(`✅ Eredmény ellenőrzés sikeres!`);
});

Then('hibaüzenetet kapok: {string}', { timeout: 45000 }, async function (expectedError) {
    const result = await page.$eval('#result', el => el.textContent);
    expect(result).to.equal(expectedError);

    // Ellenőrizzük, hogy az eredmény div error stílusú-e
    const hasErrorClass = await page.$eval('#result', el => el.classList.contains('error'));
    expect(hasErrorClass).to.be.true;
});

Then('mindkét mező üres lesz', { timeout: 45000 }, async function () {
    const value1 = await page.$eval('#number1', el => el.value);
    const value2 = await page.$eval('#number2', el => el.value);

    expect(value1).to.equal('');
    expect(value2).to.equal('');
});
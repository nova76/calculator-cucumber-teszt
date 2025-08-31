# Calculator Cucumber Tests

Behavior-Driven Development (BDD) tesztek a számológép alkalmazáshoz Cucumber és Puppeteer használatával. A tesztek természetes nyelvű Gherkin szintaxissal íródtak magyar nyelven.

![BDD Testing](https://via.placeholder.com/600x200/4CAF50/white?text=BDD+Testing+with+Cucumber)

## Jellemzők

- 🥒 **Cucumber BDD**: Gherkin szintaxis magyar nyelven
- 🎭 **Puppeteer**: Headless Chrome automatizálás
- 📊 **HTML jelentések**: Részletes teszt eredmények
- ✅ **Természetes nyelv**: Üzleti követelmények olvasható formában  
- 🔄 **CI/CD támogatás**: Automatizált teszt futtatás
- 📸 **Screenshot support**: Hibák esetén képernyőkép készítés

## Technológiák

- **Test Framework**: Cucumber.js
- **Browser Automation**: Puppeteer
- **Assertion Library**: Chai
- **Language**: JavaScript (ES6+)
- **Reporting**: HTML/JSON reports
- **Gherkin Language**: Hungarian

## Telepítés

1. **Klónozzuk a repository-t:**
   ```bash
   git clone https://github.com/yourusername/calculator-cucumber-teszt.git
   cd calculator-cucumber-teszt
   ```

2. **Függőségek telepítése:**
   ```bash
   npm install
   ```

3. **Számológép alkalmazás indítása:**
   ```bash
   # Másik terminálban vagy háttérben
   cd ../calculator-project
   npm start
   ```

## Használat

### Tesztek futtatása

```bash
# Minden teszt futtatása
npm test

# Debug mód (részletes kimenet)
npm run test:debug

# Nyers futtatás (cross-env nélkül)
npm run test-raw
```

### Cucumber jelentések

A tesztek futtatása után a következő jelentések készülnek:

- **HTML Report**: `cucumber_report.html` - Vizuális jelentés böngészőben
- **JSON Report**: `cucumber_report.json` - Programozható adatok

```bash
# HTML jelentés megnyitása
start cucumber_report.html  # Windows
open cucumber_report.html   # macOS
xdg-open cucumber_report.html # Linux
```

## Projekt struktúra

```
calculator-cucumber-teszt/
├── features/
│   └── calculator.feature      # Gherkin feature fájl
├── step_definitions/
│   └── calculator_steps.js     # Step definition implementációk
├── cucumber.js                 # Cucumber konfigurációs fájl
├── package.json               # NPM konfigurációk és függőségek
├── package-lock.json          # Függőség lock fájl
├── cucumber_report.html       # Generált HTML jelentés
├── cucumber_report.json       # Generált JSON jelentés
├── .gitignore                # Git ignore szabályok
└── README.md                 # Ez a fájl
```

## Feature fájlok

### `features/calculator.feature`

```gherkin
# language: hu
Jellemző: Egyszerű számológép teszt
  Mint egy felhasználó
  Szeretnék egy egyszerű számológépet használni
  Hogy matematikai műveleteket hajthassak végre

  Háttér:
    Adott hogy megnyitottam a számológép alkalmazást

  Forgatókönyv: Egyszerű összeadás
    Adott hogy beírom az első számot: "10"
    És beírom a második számot: "5"
    Amikor rákattintok a "+" gombra
    Akkor az eredmény "10 + 5 = 15" lesz
```

## Step Definitions

A step definition-ök a `step_definitions/calculator_steps.js` fájlban találhatók és implementálják a Gherkin lépéseket:

- **Given (Adott hogy)**: Előfeltételek beállítása
- **When (Amikor)**: Akciók végrehajtása  
- **Then (Akkor)**: Eredmények ellenőrzése

## Cucumber vs Playwright

### Cucumber előnyök:
- 📝 **Természetes nyelv**: Üzleti stakeholderek is megértik
- 🔄 **Újrafelhasználhatóság**: Step definition-ök megoszthatók
- 📚 **Dokumentáció**: Living documentation
- 🎯 **BDD**: Behavior-driven development

### Playwright előnyök:
- ⚡ **Gyorsaság**: Direktebb API hívások
- 🔧 **Fejlesztő-barát**: TypeScript támogatás
- 🌐 **Multi-browser**: Chromium, Firefox, Safari
- 📊 **Beépített jelentések**: Rich HTML reports

## Tesztelési stratégia

### Lefedett funkciók:

1. **Alapműveletek**:
   - Összeadás, kivonás, szorzás, osztás
   - Eredmény megjelenítés
   - Input validáció

2. **Hibakezelés**:
   - Nullával osztás
   - Érvénytelen input értékek
   - Üres mezők kezelése

3. **UI funkciók**:
   - Törlés funkció
   - Gombok működése
   - Eredmény formázás

### Teszt adatok:

- **Pozitív tesztek**: Helyes műveletek
- **Negatív tesztek**: Hibás input adatok
- **Határ értékek**: Nagyon nagy/kis számok
- **Edge case-ek**: Speciális esetek

## Debug és hibaelhárítás

### Debug mód engedélyezése:

```bash
npm run test:debug
```

### Puppeteer debug:

```javascript
// Headful mód (látható böngésző)
const browser = await puppeteer.launch({ 
  headless: false,
  devtools: true 
});

// Lassú végrehajtás
await page.goto('http://localhost:3000', { 
  waitUntil: 'networkidle0' 
});
```

### Gyakori hibák:

1. **Port hiba**: Számológép alkalmazás nem fut
2. **Timeout**: Lassú betöltés vagy elemek hiánya
3. **Selector hiba**: HTML elemek megváltoztak

## CI/CD integráció

### GitHub Actions példa:

```yaml
name: Cucumber Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: cucumber-reports
          path: cucumber_report.html
```

## Fejlesztés

### Új tesztek hozzáadása:

1. **Feature fájl bővítése**:
   ```gherkin
   Forgatókönyv: Új funkcionalitás
     Adott hogy ...
     Amikor ...
     Akkor ...
   ```

2. **Step definitions implementálása**:
   ```javascript
   Given('új feltétel', async function() {
     // Implementáció
   });
   ```

### Best practices:

- 📝 Rövid, egyértelmű step-ek
- 🎯 Egy funkcionalitás per forgatókönyv
- 🔄 Háttér lépések használata közös setup-hoz
- 📊 Scenario Outline data-driven tesztekhez

## Közreműködés

1. Fork-old a repository-t
2. Hozz létre feature branch-et: `git checkout -b feature-name`
3. Commit-old a változásokat: `git commit -m 'Add some feature'`
4. Push-old a branch-re: `git push origin feature-name`
5. Nyiss pull request-et

## Licensz

Ez a projekt MIT licensz alatt áll - lásd a [LICENSE](#licensz) szekciót lentebb.

---

## Licensz

MIT License

Copyright (c) 2025 Calculator Cucumber Tests

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"# calculator-cucumber-teszt" 

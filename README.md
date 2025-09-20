
# DOAR Asigurări – Site static

## Structură
- `index.html`, `servicii.html`, `avantaje.html`, `intrebari.html`, `rca-calculator.html`, `contact.html`
- `assets/styles.css`, `assets/app.js`, `assets/ocr.js`
- `robots.txt`, `sitemap.xml`, `favicon.svg`, `.nojekyll`

## Publicare GRATUITĂ
### Variante recomandate
1) **GitHub Pages**
- Creează un repo, urcă toate fișierele în rădăcină.
- Settings → Pages → Deploy from branch (main / root). Salvează.
- (Opțional) Domeniu propriu: adaugă DNS CNAME spre `username.github.io`. Creează fișier `CNAME` în root cu numele domeniului.

2) **Cloudflare Pages**
- Import din GitHub, proiect nou → Framework: None; Build command: `-` ; Output: `/`.
- Setează domeniu gratuit `.pages.dev` sau atașează domeniul tău (DNS + SSL gratuit).

3) **Netlify**
- Drag&drop folderul în Netlify app sau conectează repo Git. (Plan gratuit, bandă inclusă).

## Formular contact (gratuit, fără server)
- În `assets/app.js` înlocuiește `CONTACT_ENDPOINT` cu URL-ul Web App-ului de **Google Apps Script** (vezi `guide.apps-script.md` sau instrucțiunile din chat).
- Datele vor ajunge într-un Google Sheet; Apps Script poate trimite *auto-reply* și crea evenimente calendar.

## Calculator RCA (OCR)
- Pagina `rca-calculator.html` folosește **Tesseract.js** (browser) pentru a extrage nr. înmatriculare, VIN, CNP, nume din fotografii.
- Este un demo. Pentru ofertare reală trebuie integrare cu API de broker/asigurător.

## SEO
- Completează `<title>`, `<meta name="description">`, adresa/telefon reale și verifică site-ul în **Google Search Console**. 
- `sitemap.xml` și `robots.txt` sunt incluse; actualizează domeniul în ele.
- Optimizează imaginile (WebP), folosește texte unice pe pagini, și adaugă pagini de conținut (blog/ghiduri).

## Remindere expirare RCA
- Folosește **Google Apps Script + Triggers** (gratuit) pentru emailuri automate cu 30 zile înainte de expirare.
- Alternativ: **Cloudflare Workers Cron** sau **Netlify Scheduled Functions** cu un serviciu mail (poate implica limite).

## GDPR
- Adaugă paginile: Politica de confidențialitate, Termeni, Politica cookies.
- Stochează doar datele necesare, cu consimțământ explicit (checkbox).

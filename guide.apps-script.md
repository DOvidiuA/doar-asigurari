
// Google Apps Script – endpoint gratuit pentru formulare + reminder RCA
// 1) În Google Drive → Nou → Apps Script
// 2) Înlocuiește conținutul cu codul de mai jos -> Salvează -> Deploy → New deployment → type: Web app
//    Who has access: Anyone (or Anyone with the link) -> copy URL și pune-l în CONTACT_ENDPOINT din assets/app.js
// 3) Crează un Google Sheet și notează ID-ul (din URL). Pune-l la SHEET_ID.
// 4) Triggers: Add Trigger → funcția reminderJob → Head → Time-driven → Day timer (ziar) -> Save.

const SHEET_ID = 'REPLACE_WITH_SHEET_ID';
const SHEET_NAME = 'Leads';

function ensureSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  // Header
  if (sh.getLastRow() === 0) {
    sh.appendRow(['timestamp','nume','email','telefon','tip','mesaj','expiry_date','consent']);
  }
  return sh;
}

function doPost(e) {
  const sh = ensureSheet();
  const data = JSON.parse(e.postData.contents || '{}');
  const { nume, email, telefon, tip, mesaj } = data;
  // opțional: extrage expiry_date din mesaj sau form dedicat
  sh.appendRow([new Date(), nume||'', email||'', telefon||'', tip||'', mesaj||'', '', true]);
  // Auto-reply (schimbați expeditorul în Settings dacă e nevoie)
  if (email) {
    MailApp.sendEmail({
      to: email,
      subject: 'Confirmare cerere ofertă – DOAR Asigurări',
      htmlBody: 'Salut, ' + (nume||'') + ',<br>Mulțumim pentru solicitare! Revenim cu oferta în cel mai scurt timp.<br><br>— DOAR Asigurări'
    });
  }
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

// Rulează zilnic: trimite emailuri cu 30 zile înainte de expirare
function reminderJob() {
  const sh = ensureSheet();
  const values = sh.getDataRange().getValues();
  const today = new Date();
  for (let i=1; i<values.length; i++) {
    const row = values[i];
    const email = row[2];
    const expiryStr = row[6];
    if (!email || !expiryStr) continue;
    const expiry = new Date(expiryStr);
    const diffDays = Math.ceil((expiry - today) / (1000*60*60*24));
    if (diffDays === 30) {
      MailApp.sendEmail({
        to: email,
        subject: 'Reminder expirare RCA în 30 de zile',
        htmlBody: 'Salut!<br>Polița ta RCA expiră pe <b>' + expiry.toISOString().slice(0,10) + '</b>. Vrei să pregătim reînnoirea?<br><br>— DOAR Asigurări'
      });
    }
  }
}

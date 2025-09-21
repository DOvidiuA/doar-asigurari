
// Simple OCR demo for Romanian docs using Tesseract.js
const input = document.getElementById('imgInput');
const raw = document.getElementById('ocrRaw');
const progress = document.getElementById('ocrProgress');
const est = document.getElementById('est');
const nrEl = document.getElementById('nr');
const vinEl = document.getElementById('vin');
const numeEl = document.getElementById('nume');
const cnpEl = document.getElementById('cnp');
const ccEl = document.getElementById('cc');
const anEl = document.getElementById('an');
const estimateBtn = document.getElementById('estimateBtn');

function parseFields(text) {
  // Normalize
  const t = text.replace(/\s+/g,' ').toUpperCase();
  const nr = (t.match(/\b([A-Z]{1,2}\s?\d{2,3}\s?[A-Z]{3})\b/)||[])[1] || '';
  const vin = (t.match(/\b([A-HJ-NPR-Z0-9]{17})\b/)||[])[1] || '';
  const cnp = (t.match(/\b([1-8]\d{12})\b/)||[])[1] || '';
  // Try to get a name after fields like NUME / Nume
  let nume = '';
  const m = t.match(/NUME[:\s]+([A-ZĂÂÎȘȚ\- ]{3,})/);
  if (m) nume = m[1].trim();
  return { nr, vin, cnp, nume };
}

input?.addEventListener('change', async (e) => {
  raw.textContent = ''; est.textContent='';
  progress.style.display = 'block'; progress.value = 0;
  let allText = '';
  for (const file of e.target.files) {
    const { data } = await Tesseract.recognize(file, 'ron+eng', {
      logger: m => { if (m.status === 'recognizing text') progress.value = m.progress; }
    });
    allText += '\\n' + data.text;
  }
  progress.style.display = 'none';
  raw.textContent = allText.trim();
  const fields = parseFields(allText);
  if (fields.nr) nrEl.value = fields.nr;
  if (fields.vin) vinEl.value = fields.vin;
  if (fields.cnp) cnpEl.value = fields.cnp;
  if (fields.nume) numeEl.value = fields.nume;
});

estimateBtn?.addEventListener('click', () => {
  // Very rough demo estimator (NOT a real tariff engine)
  const cc = parseInt(ccEl.value || '1400', 10);
  const an = parseInt(anEl.value || (new Date().getFullYear()-8), 10);
  const age = Math.max(0, new Date().getFullYear() - an);
  let base = 450; // base lei / 6 luni
  base += (cc - 1200) * 0.06;
  base += age * 8;
  const sixMonths = Math.max(300, Math.round(base));
  const twelveMonths = Math.round(sixMonths * 1.85);
  est.innerHTML = `Estimare orientativă (demo): <b>${sixMonths} lei / 6 luni</b> sau <b>${twelveMonths} lei / 12 luni</b>.<br>
  Pentru ofertă oficială vor fi verificate clasele bonus-malus, vârsta, județul, asigurătorul etc.`;
});

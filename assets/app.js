
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-open');
  const opened = mobileMenu.classList.contains('mobile-open');
  mobileMenu.setAttribute('aria-hidden', opened ? 'false' : 'true');
});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileMenu.classList.remove('mobile-open'); mobileMenu.setAttribute('aria-hidden','true');
}));
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Contact form -> Google Apps Script endpoint (replace below)
const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYED_WEB_APP_URL/exec';
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!document.getElementById('consent').checked) { alert('Acceptă consimțământul GDPR.'); return; }
  try {
    const res = await fetch(CONTACT_ENDPOINT, { method:'POST', mode:'no-cors', body: JSON.stringify(data) });
    alert('Mulțumim! Cererea a fost trimisă.');
    form.reset();
  } catch (err) {
    alert('A apărut o eroare la trimitere. Te rugăm încearcă mai târziu.');
  }
});

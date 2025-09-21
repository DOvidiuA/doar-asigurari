
// Submit contact form via mailto (fără backend)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Cerere ofertă asigurare');
    const body = encodeURIComponent(
      `Nume: ${data.get('nume')}\nEmail: ${data.get('email')}\nTelefon: ${data.get('telefon')}\n` +
      `Tip: ${data.get('tip')}\nMesaj: ${data.get('mesaj')}`
    );
    window.location.href = `mailto:asigurari.europol@gmail.com?subject=${subject}&body=${body}`;
  });
});

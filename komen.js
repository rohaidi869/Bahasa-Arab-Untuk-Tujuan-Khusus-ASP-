function loadKomen(artikelId) {
  const komenKey = 'komen-' + artikelId;
  const data = JSON.parse(localStorage.getItem(komenKey) || '[]');
  const senarai = document.getElementById('senarai-komen');
  if (!senarai) return;
  if (data.length === 0) {
    senarai.innerHTML = "<p>Belum ada komen. Jadilah yang pertama!</p>";
    return;
  }
  senarai.innerHTML = data.map(k => `
    <div class="komen-item">
      <div class="komen-nama"><strong>${escapeHTML(k.nama)}</strong></div>
      <div class="komen-teks">${escapeHTML(k.teks)}</div>
      <div class="komen-tarikh">${k.tarikh}</div>
    </div>
  `).join('');
}

function submitKomen(e, artikelId) {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const teks = document.getElementById('komen').value.trim();
  if (!nama || !teks) return;
  const komenKey = 'komen-' + artikelId;
  const komen = JSON.parse(localStorage.getItem(komenKey) || '[]');
  komen.push({
    nama,
    teks,
    tarikh: new Date().toLocaleString('ms-MY')
  });
  localStorage.setItem(komenKey, JSON.stringify(komen));
  document.getElementById('komen-form').reset();
  loadKomen(artikelId);
}
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

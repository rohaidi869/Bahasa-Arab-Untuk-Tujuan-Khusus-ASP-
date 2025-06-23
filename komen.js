function loadKomen(artikelId) {
  const komenKey = 'komen-' + artikelId;
  const senarai = document.getElementById('senarai-komen');
  if (!senarai) {
    console.error('Elemen senarai-komen tidak ditemui');
    return;
  }
  const data = JSON.parse(localStorage.getItem(komenKey) || '[]');
  if (data.length === 0) {
    senarai.innerHTML = "<p>Belum ada komen. Jadilah yang pertama!</p>";
    return;
  }
  senarai.innerHTML = data.map(k => `
    <div class="komen-item">
      <div class="komen-nama"><strong>${DOMPurify.sanitize(k.nama)}</strong></div>
      <div class="komen-teks">${DOMPurify.sanitize(k.teks)}</div>
      <div class="komen-tarikh">${DOMPurify.sanitize(k.tarikh)}</div>
    </div>
  `).join('');
}

function submitKomen(e, artikelId) {
  e.preventDefault();
  const namaInput = document.getElementById('nama');
  const teksInput = document.getElementById('komen');
  const form = document.getElementById('komen-form');
  if (!namaInput || !teksInput || !form) {
    console.error('Elemen borang tidak ditemui');
    return;
  }
  const nama = DOMPurify.sanitize(namaInput.value.trim());
  const teks = DOMPurify.sanitize(teksInput.value.trim());
  if (!nama || !teks) {
    alert('Sila isi nama dan komen.');
    return;
  }
  if (nama.length > 50 || teks.length > 500) {
    alert('Nama maksimum 50 aksara, komen maksimum 500 aksara.');
    return;
  }
  const komenKey = 'komen-' + artikelId;
  const komen = JSON.parse(localStorage.getItem(komenKey) || '[]');
  komen.push({
    nama,
    teks,
    tarikh: new Date().toLocaleString('ms-MY')
  });
  localStorage.setItem(komenKey, JSON.stringify(komen));
  form.reset();
  loadKomen(artikelId);
}

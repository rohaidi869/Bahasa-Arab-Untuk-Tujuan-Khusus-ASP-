function loadKomen(artikel_id) {
  fetch('komen.php?artikel_id=' + encodeURIComponent(artikel_id))
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(k => {
        html += `<div class="komen-item"><strong>${k.nama}</strong>: ${k.komen} <span style="font-size:0.8em;color:#999">[${k.tarikh}]</span></div>`;
      });
      document.getElementById('senarai-komen').innerHTML = html;
    });
}
function submitKomen(ev, artikel_id) {
  ev.preventDefault();
  const nama = document.getElementById('nama').value;
  const komen = document.getElementById('komen').value;
  fetch('komen.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `artikel_id=${encodeURIComponent(artikel_id)}&nama=${encodeURIComponent(nama)}&komen=${encodeURIComponent(komen)}`
  }).then(res => res.json()).then(res => {
    if (res.status === "ok") {
      document.getElementById('komen-form').reset();
      loadKomen(artikel_id);
    }
  });
}

import {
  getCatalogue, saveRecord, deleteRecord, resetCatalogue,
  getPin, savePin, generateId, generateCoverUrl, MEDIA_TYPES
} from './data.js';

const $ = id => document.getElementById(id);
const dom = {
  pinGate: $('pinGate'), pinInput: $('pinInput'), pinSubmit: $('pinSubmit'),
  adminContent: $('adminContent'), statsBar: $('statsBar'),
  recordTable: $('recordTableBody'), addBtn: $('addBtn'),
  resetBtn: $('resetBtn'), logoutBtn: $('logoutBtn'),
  formOverlay: $('formOverlay'), formTitle: $('formTitle'),
  form: $('recordForm'), formCancel: $('formCancel'),
};

let catalogue = [], editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('admin-authed') === '1') showAdmin();
  dom.pinInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkPin(); });
  dom.pinSubmit.addEventListener('click',   checkPin);
  dom.addBtn.addEventListener('click',     () => openForm(null));
  dom.resetBtn.addEventListener('click',   doReset);
  dom.logoutBtn.addEventListener('click',  doLogout);
  dom.formCancel.addEventListener('click', closeForm);
  dom.form.addEventListener('submit',      onFormSubmit);
  dom.formOverlay.addEventListener('click', e => { if (e.target === dom.formOverlay) closeForm(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeForm(); });
  $('changePinBtn').addEventListener('click', () => {
    const p = prompt('Enter new PIN (4-8 digits):');
    if (!p) return;
    if (!/^\d{4,8}$/.test(p)) { alert('PIN must be 4-8 digits.'); return; }
    savePin(p); alert('PIN updated.');
  });
});

function checkPin() {
  if (dom.pinInput.value.trim() === getPin()) {
    sessionStorage.setItem('admin-authed', '1');
    showAdmin();
  } else {
    dom.pinInput.classList.add('invalid');
    dom.pinInput.value = '';
    setTimeout(() => dom.pinInput.classList.remove('invalid'), 500);
    dom.pinInput.focus();
  }
}

function showAdmin() {
  dom.pinGate.classList.add('hidden');
  dom.adminContent.classList.remove('hidden');
  catalogue = getCatalogue();
  renderStats(); renderTable();
}

function doLogout() {
  sessionStorage.removeItem('admin-authed');
  dom.adminContent.classList.add('hidden');
  dom.pinGate.classList.remove('hidden');
  dom.pinInput.value = ''; dom.pinInput.focus();
}

function renderStats() {
  const totals = {};
  catalogue.forEach(r => { totals[r.mediaType] = (totals[r.mediaType] || 0) + 1; });
  dom.statsBar.innerHTML =
    `<div class="stat-card"><div class="stat-value">${catalogue.length}</div><div class="stat-label">Total</div></div>` +
    MEDIA_TYPES.filter(t => totals[t]).map(t =>
      `<div class="stat-card"><div class="stat-value">${totals[t]}</div><div class="stat-label">${t}</div></div>`
    ).join('');
}

function renderTable() {
  if (!catalogue.length) {
    dom.recordTable.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--color-muted)">No records yet.</td></tr>';
    return;
  }
  const sorted = [...catalogue].sort((a, b) => a.artist.localeCompare(b.artist));
  dom.recordTable.innerHTML = sorted.map(r => {
    const cover   = r.coverUrl || generateCoverUrl(r.artist, r.title);
    const typeCls = 'badge-' + r.mediaType.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `<tr>
      <td class="td-cover"><img class="admin-cover-thumb" src="${esc(cover)}" alt=""></td>
      <td>${esc(r.artist)}</td><td>${esc(r.title)}</td><td>${r.year}</td>
      <td><span class="badge ${typeCls}">${esc(r.mediaType)}</span></td>
      <td>${esc(r.condition)}</td>
      <td class="td-actions">
        <button class="btn btn-secondary btn-sm" data-id="${r.id}" data-action="edit">Edit</button>
        <button class="btn btn-danger btn-sm"    data-id="${r.id}" data-action="del">Delete</button>
      </td></tr>`;
  }).join('');
  dom.recordTable.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.action === 'edit') openForm(btn.dataset.id);
      if (btn.dataset.action === 'del')  doDelete(btn.dataset.id);
    });
  });
}

function openForm(id) {
  editingId = id;
  const r = id ? catalogue.find(c => c.id === id) : null;
  dom.formTitle.textContent = r ? 'Edit Record' : 'Add Record';
  const f = dom.form.elements;
  f['title'].value     = r?.title    || '';
  f['artist'].value    = r?.artist   || '';
  f['year'].value      = r?.year     || new Date().getFullYear();
  f['label'].value     = r?.label    || '';
  f['mediaType'].value = r?.mediaType || 'LP';
  f['condition'].value = r?.condition || 'VG';
  f['genres'].value    = r?.genres?.join(', ') || '';
  f['coverUrl'].value  = r?.coverUrl  || '';
  f['notes'].value     = r?.notes     || '';
  f['tracklist'].value = r?.tracklist?.join('\n') || '';
  dom.formOverlay.classList.remove('hidden');
  f['title'].focus();
}

function closeForm() {
  dom.formOverlay.classList.add('hidden'); editingId = null;
}

function onFormSubmit(e) {
  e.preventDefault();
  const f = dom.form.elements;
  const record = {
    id:        editingId || generateId(),
    title:     f['title'].value.trim(),
    artist:    f['artist'].value.trim(),
    year:      parseInt(f['year'].value, 10),
    label:     f['label'].value.trim(),
    mediaType: f['mediaType'].value,
    condition: f['condition'].value,
    genres:    f['genres'].value.split(',').map(s => s.trim()).filter(Boolean),
    coverUrl:  f['coverUrl'].value.trim(),
    notes:     f['notes'].value.trim(),
    tracklist: f['tracklist'].value.split('\n').map(s => s.trim()).filter(Boolean),
  };
  catalogue = saveRecord(record);
  closeForm(); renderStats(); renderTable();
}

function doDelete(id) {
  const r = catalogue.find(c => c.id === id); if (!r) return;
  if (!confirm(`Delete "${r.artist} - ${r.title}"?`)) return;
  catalogue = deleteRecord(id); renderStats(); renderTable();
}

function doReset() {
  if (!confirm('Reset catalogue to defaults? All changes will be lost.')) return;
  catalogue = resetCatalogue(); renderStats(); renderTable();
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

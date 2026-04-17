import { getCatalogue, generateCoverUrl } from './data.js';

const state = {
  all: [], filtered: [], view: 'grid', search: '',
  filters: { mediaTypes: new Set(), genres: new Set(), conditions: new Set() },
  sort: 'artist',
  modal: { record: null, idx: 0 },
  cf: { index: 0, dragging: false, dragStartX: 0, dragDelta: 0 },
};

const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
let dom;

document.addEventListener('DOMContentLoaded', init);

function init() {
  dom = {
    searchInput: $('searchInput'), filterToggle: $('filterToggle'),
    filterPanel: $('filterPanel'), filterMT: $('filterMediaType'),
    filterGenre: $('filterGenre'), filterCond: $('filterCondition'),
    sortSelect: $('sortSelect'), clearFilters: $('clearFilters'),
    viewGrid: $('viewGrid'), viewFlow: $('viewFlow'),
    resultsCount: $('resultsCount'), catalogueGrid: $('catalogueGrid'),
    cfSection: $('cfSection'), cfStage: $('cfStage'),
    cfPrev: $('cfPrev'), cfNext: $('cfNext'),
    cfArtist: $('cfArtist'), cfTitle: $('cfTitle'), cfMeta: $('cfMeta'),
    cfOpenBtn: $('cfOpenBtn'), modalOverlay: $('modalOverlay'),
    modalClose: $('modalClose'), modalCover: $('modalCover'),
    modalArtist: $('modalArtist'), modalTitle: $('modalTitle'),
    modalDetails: $('modalDetails'), modalLabel: $('modalLabel'),
    modalGenres: $('modalGenres'), modalNotes: $('modalNotes'),
    modalTracklist: $('modalTracklist'),
    modalPrev: $('modalPrev'), modalNext: $('modalNext'),
  };
  state.all = getCatalogue();
  buildFilterOptions();
  applyFilters();
  bindEvents();
}

function applyFilters() {
  const q = state.search.trim().toLowerCase();
  const { mediaTypes, genres, conditions } = state.filters;
  state.filtered = state.all.filter(r => {
    if (mediaTypes.size > 0 && !mediaTypes.has(r.mediaType)) return false;
    if (conditions.size > 0 && !conditions.has(r.condition))  return false;
    if (genres.size > 0 && !r.genres.some(g => genres.has(g))) return false;
    if (q && !`${r.artist} ${r.title} ${r.label}`.toLowerCase().includes(q)) return false;
    return true;
  });
  state.filtered.sort((a, b) => {
    switch (state.sort) {
      case 'title':     return a.title.localeCompare(b.title);
      case 'year':      return a.year - b.year;
      case 'year-desc': return b.year - a.year;
      default:          return a.artist.localeCompare(b.artist);
    }
  });
  dom.resultsCount.textContent = `${state.filtered.length} of ${state.all.length} records`;
  dom.clearFilters.classList.toggle('hidden',
    mediaTypes.size + genres.size + conditions.size + (q ? 1 : 0) === 0);
  if (state.view === 'grid') renderGrid();
  else { state.cf.index = 0; buildCoverFlow(); }
}

function renderGrid() {
  if (!state.filtered.length) {
    dom.catalogueGrid.innerHTML = '<div class="empty-state"><strong>No records found</strong><p>Try adjusting your filters or search query.</p></div>';
    return;
  }
  dom.catalogueGrid.innerHTML = state.filtered.map((r, i) => {
    const cover   = r.coverUrl || generateCoverUrl(r.artist, r.title);
    const typeCls = 'badge-' + r.mediaType.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `<div class="record-card" data-idx="${i}" tabindex="0">
      <img class="record-card-cover" src="${esc(cover)}" alt="${esc(r.artist)} - ${esc(r.title)}" loading="lazy">
      <div class="record-card-body">
        <div class="record-card-artist">${esc(r.artist)}</div>
        <div class="record-card-title">${esc(r.title)}</div>
        <div class="record-card-meta">
          <span class="record-card-year">${r.year}</span>
          <span class="badge ${typeCls}">${esc(r.mediaType)}</span>
          ${r.genres.slice(0,2).map(g => `<span class="genre-tag">${esc(g)}</span>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
  dom.catalogueGrid.querySelectorAll('.record-card').forEach(el => {
    el.addEventListener('click',   () => openModal(+el.dataset.idx));
    el.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(+el.dataset.idx); });
  });
}

function buildCoverFlow() {
  const items = state.filtered;
  dom.cfStage.innerHTML = '';
  if (!items.length) {
    dom.cfStage.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:0.875rem">No records match filters.</div>';
    updateCfInfo(null); return;
  }
  items.forEach((r, i) => {
    const el  = document.createElement('div');
    el.className = 'cf-item'; el.tabIndex = 0;
    const img = document.createElement('img');
    img.src = r.coverUrl || generateCoverUrl(r.artist, r.title);
    img.alt = `${r.artist} - ${r.title}`; img.loading = 'lazy';
    el.appendChild(img);
    el.addEventListener('click', () => { if (i === state.cf.index) openModal(i); else cfGoTo(i); });
    dom.cfStage.appendChild(el);
  });
  positionAllCfItems();
  updateCfInfo(items[state.cf.index]);
  updateCfNav();
}

function positionAllCfItems() {
  dom.cfStage.querySelectorAll('.cf-item').forEach((el, i) =>
    positionCfItem(el, i - state.cf.index, i === state.cf.index));
}

function positionCfItem(el, offset, isActive) {
  const abs  = Math.abs(offset);
  const sign = offset === 0 ? 1 : Math.sign(offset);
  el.classList.toggle('cf-active', isActive);
  if (abs > 4) {
    el.style.opacity = '0'; el.style.zIndex = '0'; el.style.pointerEvents = 'none';
    el.style.transform = `translateX(${sign * 620}px) rotateY(${-sign * 85}deg) scale(0.35)`;
    return;
  }
  const cfg = [[0,0,1,1],[260,65,0.78,1],[390,73,0.67,0.82],[490,78,0.57,0.50],[565,82,0.48,0.22]][abs];
  el.style.opacity = String(cfg[3]); el.style.zIndex = String(10 - abs); el.style.pointerEvents = 'auto';
  el.style.transform = `translateX(${sign * cfg[0]}px) rotateY(${-sign * cfg[1]}deg) scale(${cfg[2]})`;
}

function cfGoTo(index) {
  const n = state.filtered.length; if (!n) return;
  state.cf.index = Math.max(0, Math.min(n - 1, index));
  positionAllCfItems();
  updateCfInfo(state.filtered[state.cf.index]);
  updateCfNav();
}

function updateCfInfo(r) {
  if (!r) { dom.cfArtist.textContent = dom.cfTitle.textContent = ''; dom.cfMeta.innerHTML = ''; return; }
  dom.cfArtist.textContent = r.artist;
  dom.cfTitle.textContent  = r.title;
  const tc = 'badge-' + r.mediaType.toLowerCase().replace(/[^a-z0-9]/g, '-');
  dom.cfMeta.innerHTML = `<span class="badge ${tc}">${esc(r.mediaType)}</span><span style="color:#64748b;font-size:0.8125rem">${r.year}</span>${r.genres.slice(0,2).map(g => `<span class="genre-tag">${esc(g)}</span>`).join('')}`;
}

function updateCfNav() {
  dom.cfPrev.disabled = state.cf.index <= 0;
  dom.cfNext.disabled = state.cf.index >= state.filtered.length - 1;
}

function openModal(idx) {
  state.modal.idx = idx; state.modal.record = state.filtered[idx];
  renderModal();
  dom.modalOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  dom.modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderModal() {
  const r = state.modal.record; if (!r) return;
  const cover  = r.coverUrl || generateCoverUrl(r.artist, r.title);
  const typeCls = 'badge-' + r.mediaType.toLowerCase().replace(/[^a-z0-9]/g, '-');
  dom.modalCover.src  = cover; dom.modalCover.alt = `${r.artist} - ${r.title}`;
  dom.modalArtist.textContent = r.artist;
  dom.modalTitle.textContent  = r.title;
  dom.modalDetails.innerHTML  = `<span class="badge ${typeCls}">${esc(r.mediaType)}</span><span>${r.year}</span><span class="badge badge-condition">${esc(r.condition)}</span>`;
  dom.modalLabel.textContent  = r.label;
  dom.modalGenres.innerHTML   = r.genres.map(g => `<span class="genre-tag">${esc(g)}</span>`).join('');
  if (r.notes) { dom.modalNotes.textContent = r.notes; dom.modalNotes.classList.remove('hidden'); }
  else dom.modalNotes.classList.add('hidden');
  if (r.tracklist && r.tracklist.length) {
    dom.modalTracklist.innerHTML = '<h4>Tracklist</h4><ol>' +
      r.tracklist.map((t, i) => `<li><span class="track-num">${i+1}</span>${esc(t)}</li>`).join('') + '</ol>';
    dom.modalTracklist.classList.remove('hidden');
  } else dom.modalTracklist.classList.add('hidden');
  dom.modalPrev.disabled = state.modal.idx <= 0;
  dom.modalNext.disabled = state.modal.idx >= state.filtered.length - 1;
}

function buildFilterOptions() {
  const all = state.all;
  const mtC = {}, gC = {}, cC = {};
  all.forEach(r => {
    mtC[r.mediaType] = (mtC[r.mediaType] || 0) + 1;
    cC[r.condition]  = (cC[r.condition]  || 0) + 1;
    r.genres.forEach(g => { gC[g] = (gC[g] || 0) + 1; });
  });
  dom.filterMT.innerHTML    = Object.entries(mtC).sort((a,b) => b[1]-a[1]).map(([v,n]) => filterItem(v, `${v} (${n})`)).join('');
  dom.filterGenre.innerHTML = Object.entries(gC).sort((a,b) => b[1]-a[1]).map(([v,n]) => filterItem(v, `${v} (${n})`)).join('');
  dom.filterCond.innerHTML  = ['Mint','VG+','VG','Good','Poor'].filter(c => cC[c]).map(c => filterItem(c, `${c} (${cC[c]})`)).join('');
  dom.filterMT.addEventListener('change',    onFilterChange);
  dom.filterGenre.addEventListener('change', onFilterChange);
  dom.filterCond.addEventListener('change',  onFilterChange);
}

function filterItem(value, label) {
  return `<label class="filter-item"><input type="checkbox" value="${esc(value)}"><span class="filter-item-label">${esc(label)}</span></label>`;
}

function onFilterChange() {
  state.filters.mediaTypes = new Set([...$$('#filterMediaType input:checked')].map(e => e.value));
  state.filters.genres     = new Set([...$$('#filterGenre input:checked')].map(e => e.value));
  state.filters.conditions = new Set([...$$('#filterCondition input:checked')].map(e => e.value));
  applyFilters();
}

function bindEvents() {
  dom.searchInput.addEventListener('input', () => { state.search = dom.searchInput.value; applyFilters(); });
  dom.sortSelect.addEventListener('change', () => { state.sort = dom.sortSelect.value; applyFilters(); });
  dom.clearFilters.addEventListener('click', () => {
    $$('#filterMediaType input,#filterGenre input,#filterCondition input').forEach(e => { e.checked = false; });
    state.filters = { mediaTypes: new Set(), genres: new Set(), conditions: new Set() };
    state.search = ''; dom.searchInput.value = ''; applyFilters();
  });
  dom.viewGrid.addEventListener('click', () => switchView('grid'));
  dom.viewFlow.addEventListener('click', () => switchView('flow'));
  dom.filterToggle.addEventListener('click', () => dom.filterPanel.classList.toggle('collapsed'));
  dom.cfPrev.addEventListener('click', () => cfGoTo(state.cf.index - 1));
  dom.cfNext.addEventListener('click', () => cfGoTo(state.cf.index + 1));
  dom.cfOpenBtn.addEventListener('click', () => { if (state.filtered.length) openModal(state.cf.index); });
  dom.cfStage.addEventListener('mousedown',  cfDragStart);
  dom.cfStage.addEventListener('touchstart', cfDragStart, { passive: true });
  dom.modalClose.addEventListener('click', closeModal);
  dom.modalOverlay.addEventListener('click', e => { if (e.target === dom.modalOverlay) closeModal(); });
  dom.modalPrev.addEventListener('click', () => openModal(state.modal.idx - 1));
  dom.modalNext.addEventListener('click', () => openModal(state.modal.idx + 1));
  document.addEventListener('keydown', e => {
    if (!dom.modalOverlay.classList.contains('hidden')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft'  && !dom.modalPrev.disabled) openModal(state.modal.idx - 1);
      if (e.key === 'ArrowRight' && !dom.modalNext.disabled) openModal(state.modal.idx + 1);
      return;
    }
    if (state.view === 'flow') {
      if (e.key === 'ArrowLeft')  cfGoTo(state.cf.index - 1);
      if (e.key === 'ArrowRight') cfGoTo(state.cf.index + 1);
      if (e.key === 'Enter')      openModal(state.cf.index);
    }
  });
}

function switchView(view) {
  state.view = view;
  dom.viewGrid.classList.toggle('active', view === 'grid');
  dom.viewFlow.classList.toggle('active', view === 'flow');
  dom.catalogueGrid.classList.toggle('hidden', view !== 'grid');
  dom.cfSection.classList.toggle('hidden', view !== 'flow');
  if (view === 'flow') { state.cf.index = 0; buildCoverFlow(); }
  else renderGrid();
}

function cfDragStart(e) {
  state.cf.dragging = true;
  state.cf.dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  state.cf.dragDelta  = 0;
  const onMove = ev => {
    if (!state.cf.dragging) return;
    const x = ev.type === 'touchmove' ? ev.touches[0].clientX : ev.clientX;
    state.cf.dragDelta = x - state.cf.dragStartX;
  };
  const onEnd = () => {
    if (!state.cf.dragging) return;
    state.cf.dragging = false;
    if (state.cf.dragDelta < -50)     cfGoTo(state.cf.index + 1);
    else if (state.cf.dragDelta > 50) cfGoTo(state.cf.index - 1);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onEnd);
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onEnd);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend',  onEnd);
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

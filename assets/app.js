(() => {
  'use strict';

  // Change this if the repo is renamed or moved.
  const REPO = 'Keerthithejaswi/Iris';
  const REPO_URL = `https://github.com/${REPO}`;
  const SUBMIT_URL = `${REPO_URL}/issues/new?template=submit-project.yml`;

  // ------------------------------------------------------------------ icons
  const ICONS = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    'arrow-right': '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    'arrow-down': '<path d="M12 5v14m7-7-7 7-7-7"/>',
    'arrow-up-right': '<path d="M7 7h10v10M7 17 17 7"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
    play: '<path d="m6 3 14 9-14 9V3z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    flask: '<path d="M9 3h6M10 3v6.5L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9.5V3"/><path d="M7 15h10"/>',
    pointer: '<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    enter: '<path d="M9 10 4 15l5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>',
    sort: '<path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  function icon(name, cls) {
    const s = document.createElement('span');
    s.dataset.icon = name;
    if (cls) s.className = cls;
    s.innerHTML = svg(name); // static, trusted markup only
    return s;
  }
  const hydrateIcons = (root = document) => root.querySelectorAll('[data-icon]:empty').forEach((n) => { n.innerHTML = svg(n.dataset.icon); });

  // ------------------------------------------------------------------ config
  const TYPES = {
    prototype: { label: 'Prototype', icon: 'pointer' },
    poc: { label: 'POC', icon: 'flask' },
    figma: { label: 'Figma', icon: 'figma' },
    'case-study': { label: 'Case study', icon: 'book' },
    other: { label: 'Other', icon: 'box' },
  };
  const STATUS_COLORS = {
    exploring: '#f59e0b', 'in-progress': '#3b82f6', 'in-review': '#a855f7', shipped: '#22c55e', archived: '#71717a',
  };
  const STATUS_ORDER = ['exploring', 'in-progress', 'in-review', 'shipped', 'archived'];
  const SORTS = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'az', label: 'Title A–Z' },
    { value: 'designer', label: 'Designer' },
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const state = { projects: [], q: '', type: '', team: '', status: '', tag: '', sort: 'newest', view: 'grid' };

  // ------------------------------------------------------------------ helpers
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'style') node.style.cssText = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat(Infinity)) {
      if (c == null || c === false || c === '') continue;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }
  function safeUrl(u) {
    if (!u) return '';
    try {
      const url = new URL(u, location.href);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
    } catch { return ''; }
  }
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const initials = (s) => (s || '?').split(/[\s,]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const typeInfo = (t) => TYPES[t] || { label: t ? t.replace(/-/g, ' ') : 'Other', icon: 'box' };
  const statusColor = (s) => STATUS_COLORS[slug(s)] || '#71717a';
  const time = (p) => Date.parse(p.createdAt) || 0;
  function fmtDate(d, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
    const date = new Date(d);
    return isNaN(date) ? '' : date.toLocaleDateString(undefined, opts);
  }
  function relTime(d) {
    const t = Date.parse(d);
    if (!t) return '';
    const days = Math.round((Date.now() - t) / 864e5);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.round(days / 30)}mo ago`;
    return `${Math.round(days / 365)}y ago`;
  }

  function meshStyle(seed) {
    const h = hash(seed);
    const base = h % 360;
    const p = (n) => ((h >>> n) % 80) + 10;
    const c = (o, l = 62) => `hsl(${(base + o) % 360} 85% ${l}%)`;
    return `background:
      radial-gradient(at ${p(3)}% ${p(7)}%, ${c(0)} 0, transparent 55%),
      radial-gradient(at ${p(11)}% ${p(15)}%, ${c(70)} 0, transparent 50%),
      radial-gradient(at ${p(19)}% ${p(23)}%, ${c(160, 58)} 0, transparent 50%),
      radial-gradient(at ${p(5)}% ${p(27)}%, ${c(250, 70)} 0, transparent 45%),
      hsl(${(base + 220) % 360} 45% 16%);`;
  }
  const gradStyle = (seed) => {
    const b = hash(seed) % 360;
    return `background: linear-gradient(135deg, hsl(${b} 80% 60%), hsl(${(b + 60) % 360} 80% 50%));`;
  };

  function normalize(p, i) {
    return {
      id: String(p.id || `p-${i}`),
      title: p.title || 'Untitled',
      description: p.description || '',
      designer: p.designer || 'Unknown',
      team: p.team || '',
      type: slug(p.type) || 'other',
      status: p.status || '',
      figma: safeUrl(p.figma),
      prototype: safeUrl(p.prototype),
      repo: safeUrl(p.repo),
      thumbnail: safeUrl(p.thumbnail),
      tags: Array.isArray(p.tags) ? p.tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean) : [],
      createdAt: p.createdAt || '',
      issue: safeUrl(p.issue),
    };
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  // ------------------------------------------------------------------ primitives
  function cover(p, { badges = true } = {}) {
    const box = el('div', { class: 'cover' });
    const mesh = el('div', { class: 'mesh', style: meshStyle(p.id + p.title) },
      el('span', { class: 'mesh-mono' }, initials(p.title)),
      el('span', { class: 'mesh-icon' }, icon(typeInfo(p.type).icon)),
    );
    if (p.thumbnail) {
      const img = el('img', { src: p.thumbnail, alt: '', loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer' });
      img.addEventListener('error', () => img.replaceWith(mesh));
      box.append(img);
    } else {
      box.append(mesh);
    }
    if (badges) {
      box.append(el('div', { class: 'cover-badges' },
        el('span', { class: 'chip' }, icon(typeInfo(p.type).icon), typeInfo(p.type).label)));
    }
    return box;
  }
  const avatar = (name) => el('span', { class: 'avatar', style: gradStyle(name), 'aria-hidden': 'true' }, initials(name));
  const status = (s, pill) => (s ? el('span', { class: `status${pill ? ' status-pill' : ''}` },
    el('span', { class: 'dot', style: `background:${statusColor(s)};box-shadow:0 0 0 3px ${statusColor(s)}22` }), s) : null);
  const person = (p, withTeam = true) => el('span', { class: 'person' }, avatar(p.designer),
    el('span', { class: 'name' }, p.designer, withTeam && p.team ? el('span', { class: 'team' }, ` · ${p.team}`) : null));

  // Accessible custom select (button + listbox popover)
  function createSelect({ prefix, options, value, onChange, iconName }) {
    let current = value;
    let active = -1;
    const root = el('div', { class: 'select' });
    const label = el('span', { class: 'select-value' });
    const btn = el('button', { class: 'select-btn', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false' },
      iconName && icon(iconName), prefix && el('span', { class: 'select-prefix' }, prefix), label, icon('chevron-down', 'chev'));
    const menu = el('ul', { class: 'select-menu', role: 'listbox', tabindex: '-1' });
    const items = options.map((o, i) => {
      const li = el('li', { class: 'select-option', role: 'option', 'aria-selected': 'false', dataset: { value: o.value } },
        o.label, icon('check', 'check'));
      li.addEventListener('click', () => { choose(o.value); close(); btn.focus(); });
      li.addEventListener('mousemove', () => setActive(i));
      return li;
    });
    menu.append(...items);
    root.append(btn, menu);

    function sync() {
      const o = options.find((x) => x.value === current) || options[0];
      label.textContent = o.label;
      items.forEach((li) => li.setAttribute('aria-selected', String(li.dataset.value === current)));
    }
    function setActive(i) {
      active = i;
      items.forEach((li, j) => li.classList.toggle('active', j === i));
    }
    function choose(v) { if (v !== current) { current = v; sync(); onChange(v); } }
    function open() {
      root.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
      setActive(Math.max(0, options.findIndex((o) => o.value === current)));
      menu.focus({ preventScroll: true });
      document.addEventListener('pointerdown', outside, true);
    }
    function close() {
      root.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('pointerdown', outside, true);
    }
    const outside = (e) => { if (!root.contains(e.target)) close(); };
    btn.addEventListener('click', () => (root.classList.contains('open') ? close() : open()));
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((active + 1) % items.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((active - 1 + items.length) % items.length); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(options[active].value); close(); btn.focus(); }
      else if (e.key === 'Escape' || e.key === 'Tab') { close(); btn.focus(); }
    });
    sync();
    return { el: root, set(v) { current = v; sync(); } };
  }

  // ------------------------------------------------------------------ filtering
  function matches(p, q) {
    if (!q) return true;
    const hay = [p.title, p.description, p.designer, p.team, p.status, typeInfo(p.type).label, ...p.tags].join(' ').toLowerCase();
    return q.split(/\s+/).every((w) => hay.includes(w));
  }
  function filtered() {
    const q = state.q.trim().toLowerCase();
    const list = state.projects.filter((p) =>
      (!state.type || p.type === state.type) &&
      (!state.team || p.team === state.team) &&
      (!state.status || p.status === state.status) &&
      (!state.tag || p.tags.includes(state.tag)) &&
      matches(p, q));
    const by = {
      newest: (a, b) => time(b) - time(a),
      oldest: (a, b) => time(a) - time(b),
      az: (a, b) => a.title.localeCompare(b.title),
      designer: (a, b) => a.designer.localeCompare(b.designer) || time(b) - time(a),
    }[state.sort];
    return list.sort(by);
  }
  function countBy(key) {
    const m = new Map();
    for (const p of state.projects) {
      for (const v of [].concat(p[key])) if (v) m.set(v, (m.get(v) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(b[0]));
  }

  // ------------------------------------------------------------------ URL state
  const FILTER_KEYS = ['q', 'type', 'team', 'status', 'tag', 'sort', 'view'];
  function readUrl() {
    const sp = new URLSearchParams(location.search);
    for (const k of FILTER_KEYS) if (sp.has(k)) state[k] = sp.get(k);
    if (!SORTS.some((s) => s.value === state.sort)) state.sort = 'newest';
    if (!['grid', 'list'].includes(state.view)) state.view = 'grid';
  }
  function writeUrl() {
    const sp = new URLSearchParams();
    for (const k of FILTER_KEYS) {
      const def = k === 'sort' ? 'newest' : k === 'view' ? 'grid' : '';
      if (state[k] && state[k] !== def) sp.set(k, state[k]);
    }
    const qs = sp.toString();
    history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
  }

  // ------------------------------------------------------------------ render: sidebar
  function sideItem({ pressed, onClick, lead, label, count }) {
    return el('button', { class: 'side-item', type: 'button', 'aria-pressed': String(pressed), onclick: onClick },
      lead, el('span', { class: 'label' }, label), count != null && el('span', { class: 'count' }, count));
  }
  function sideGroup(title, key, children) {
    return el('div', { class: 'side-group' },
      el('div', { class: 'side-title' }, el('span', {}, title),
        key && state[key] ? el('button', { type: 'button', onclick: () => setFilter(key, '') }, 'clear') : null),
      children);
  }
  function renderSidebar() {
    const types = countBy('type');
    const statuses = countBy('status').sort((a, b) => {
      const ia = STATUS_ORDER.indexOf(slug(a[0])), ib = STATUS_ORDER.indexOf(slug(b[0]));
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    const teams = countBy('team');
    const tags = countBy('tags').slice(0, 24);

    $('#sidebar-body').replaceChildren(
      sideGroup('Browse', null, [
        sideItem({ pressed: !state.type, onClick: () => setFilter('type', ''), lead: icon('layers'), label: 'All work', count: state.projects.length }),
        ...types.map(([t, n]) => sideItem({
          pressed: state.type === t, onClick: () => setFilter('type', state.type === t ? '' : t),
          lead: icon(typeInfo(t).icon), label: typeInfo(t).label, count: n,
        })),
      ]),
      statuses.length > 0 && sideGroup('Status', 'status', statuses.map(([s, n]) => sideItem({
        pressed: state.status === s, onClick: () => setFilter('status', state.status === s ? '' : s),
        lead: el('span', { class: 'dot', style: `background:${statusColor(s)}` }), label: s, count: n,
      }))),
      teams.length > 0 && sideGroup('Teams', 'team', teams.map(([t, n]) => sideItem({
        pressed: state.team === t, onClick: () => setFilter('team', state.team === t ? '' : t),
        lead: icon('users'), label: t, count: n,
      }))),
      tags.length > 0 && sideGroup('Tags', 'tag', el('div', { class: 'tag-cloud' }, tags.map(([t]) => el('button', {
        class: 'tag-btn', type: 'button', 'aria-pressed': String(state.tag === t),
        onclick: () => setFilter('tag', state.tag === t ? '' : t),
      }, `#${t}`)))),
      el('div', { class: 'side-cta' },
        el('h4', {}, 'Got something to show?'),
        el('p', {}, 'Share your POC, prototype or Figma file with the team.'),
        el('a', { class: 'btn btn-primary btn-sm', href: SUBMIT_URL, target: '_blank', rel: 'noopener' }, icon('plus'), 'Submit work')),
    );
  }

  // ------------------------------------------------------------------ render: results
  function card(p, i) {
    return el('button', {
      class: 'card', type: 'button', style: `--i:${Math.min(i, 12)}`,
      'aria-label': `${p.title} by ${p.designer}`, onclick: () => openDetail(p),
    },
      cover(p),
      el('div', { class: 'card-body' },
        el('h3', { class: 'card-title' }, el('span', {}, p.title), icon('arrow-up-right', 'arrow')),
        p.description && el('p', { class: 'card-desc' }, p.description),
        el('div', { class: 'card-foot' }, person(p), status(p.status)),
      ),
    );
  }
  function row(p, i) {
    return el('button', { class: 'row', type: 'button', style: `--i:${Math.min(i, 16)}`, onclick: () => openDetail(p) },
      cover(p, { badges: false }),
      el('div', { style: 'min-width:0' }, el('div', { class: 'row-title' }, p.title), el('div', { class: 'row-desc' }, p.description)),
      el('div', { class: 'row-person', style: 'min-width:0' }, person(p)),
      el('span', { class: 'row-type' }, icon(typeInfo(p.type).icon), typeInfo(p.type).label),
      status(p.status) || el('span'),
      el('span', { class: 'row-date' }, relTime(p.createdAt)),
    );
  }
  function renderActiveFilters(count) {
    const pills = [];
    const pill = (k, label, value) => pills.push(el('button', {
      class: 'filter-pill', type: 'button', onclick: () => setFilter(k, ''), 'aria-label': `Remove ${label} filter`,
    }, el('span', { class: 'k' }, `${label}:`), value, icon('x')));
    if (state.q) pill('q', 'Search', `"${state.q}"`);
    if (state.type) pill('type', 'Type', typeInfo(state.type).label);
    if (state.status) pill('status', 'Status', state.status);
    if (state.team) pill('team', 'Team', state.team);
    if (state.tag) pill('tag', 'Tag', `#${state.tag}`);
    $('#active-filters').replaceChildren(...pills);
    $('#result-count').textContent = `${count} of ${state.projects.length} ${state.projects.length === 1 ? 'project' : 'projects'}`;
  }
  function renderResults() {
    const list = filtered();
    const box = $('#results');
    box.className = `results ${state.view}-view`;
    box.replaceChildren(...list.map(state.view === 'list' ? row : card));
    $('#empty').hidden = list.length > 0;
    box.hidden = list.length === 0;
    renderActiveFilters(list.length);
    document.querySelectorAll('.segmented button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
  }
  function render() {
    renderSidebar();
    renderResults();
    writeUrl();
  }
  function setFilter(key, value) {
    state[key] = value;
    if (key === 'q') $('#search').value = value;
    render();
  }

  // ------------------------------------------------------------------ render: hero
  function renderStats() {
    const designers = new Set(state.projects.flatMap((p) => p.designer.split(/\s*,\s*/))).size;
    const teams = new Set(state.projects.map((p) => p.team).filter(Boolean)).size;
    const shipped = state.projects.filter((p) => slug(p.status) === 'shipped').length;
    const stat = (n, label) => {
      const dd = el('dd', { dataset: { to: n } }, '0');
      return el('div', { class: 'stat' }, el('dt', {}, label), dd);
    };
    $('#stats').replaceChildren(stat(state.projects.length, 'Projects'), stat(designers, 'Designers'), stat(teams, 'Teams'), stat(shipped, 'Shipped'));
    $('#stats').querySelectorAll('dd').forEach((dd) => {
      const to = +dd.dataset.to;
      const start = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - start) / 900);
        dd.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      setTimeout(() => { dd.textContent = to; }, 1000);
    });
  }
  function renderFeatured() {
    const latest = [...state.projects].sort((a, b) => time(b) - time(a))[0];
    if (!latest) { $('#featured').replaceChildren(); return; }
    $('#featured').replaceChildren(
      el('div', { class: 'feature-glow' }),
      el('button', { class: 'feature-card', type: 'button', onclick: () => openDetail(latest), 'aria-label': `Latest: ${latest.title}` },
        cover(latest),
        el('div', { class: 'feature-body' },
          el('span', { class: 'feature-label' }, `Latest drop · ${relTime(latest.createdAt) || 'new'}`),
          el('h3', {}, latest.title),
          latest.description && el('p', { class: 'card-desc' }, latest.description),
          el('div', { class: 'card-foot' }, person(latest), status(latest.status)),
        ),
      ),
    );
  }

  // ------------------------------------------------------------------ drawer
  let currentProject = null;
  function figmaEmbed(url) {
    try { if (!/(^|\.)figma\.com$/.test(new URL(url).hostname)) return null; } catch { return null; }
    return el('iframe', {
      class: 'embed', src: `https://www.figma.com/embed?embed_host=iris&url=${encodeURIComponent(url)}`,
      loading: 'lazy', allowfullscreen: true, title: 'Figma preview',
    });
  }
  function openDetail(p) {
    currentProject = p;
    const meta = (k, v) => el('div', { class: 'meta' }, el('dt', {}, k), el('dd', {}, v || '—'));
    $('#drawer-crumb').textContent = `${typeInfo(p.type).label} / ${p.id}`;
    $('#drawer-body').replaceChildren(
      el('div', { class: 'drawer-cover' }, cover(p)),
      el('div', { class: 'drawer-content' },
        el('h2', { id: 'drawer-title' }, p.title),
        p.description && el('p', { class: 'drawer-desc' }, p.description),
        el('div', { class: 'drawer-actions' },
          p.prototype && el('a', { class: 'btn btn-primary', href: p.prototype, target: '_blank', rel: 'noopener' }, icon('play'), 'Open prototype'),
          p.figma && el('a', { class: 'btn btn-ghost', href: p.figma, target: '_blank', rel: 'noopener' }, icon('figma'), 'Open in Figma'),
          p.repo && el('a', { class: 'btn btn-ghost', href: p.repo, target: '_blank', rel: 'noopener' }, icon('code'), 'Source'),
          p.issue && el('a', { class: 'btn btn-ghost', href: p.issue, target: '_blank', rel: 'noopener' }, icon('message'), 'Discussion'),
        ),
        el('dl', { class: 'meta-grid' },
          meta('Designer', person(p, false)),
          meta('Team', p.team),
          meta('Status', status(p.status)),
          meta('Type', el('span', { class: 'row-type' }, icon(typeInfo(p.type).icon), typeInfo(p.type).label)),
          meta('Added', p.createdAt && `${fmtDate(p.createdAt)} · ${relTime(p.createdAt)}`),
          meta('Tags', p.tags.length ? `${p.tags.length}` : ''),
        ),
        p.tags.length > 0 && el('div', { class: 'drawer-section' }, el('h4', {}, 'Tags'),
          el('div', { class: 'tags' }, p.tags.map((t) => el('button', {
            class: 'tag', type: 'button',
            onclick: () => { closeDrawer(); setFilter('tag', t); $('#directory').scrollIntoView(); },
          }, `#${t}`)))),
        p.figma && figmaEmbed(p.figma) && el('div', { class: 'drawer-section' }, el('h4', {}, 'Figma preview'), figmaEmbed(p.figma)),
      ),
    );
    $('#drawer-body').scrollTop = 0;
    const d = $('#drawer');
    if (!d.open) d.showModal();
    history.replaceState(null, '', `${location.pathname}${location.search}#${encodeURIComponent(p.id)}`);
  }
  function closeDrawer() { const d = $('#drawer'); if (d.open) d.close(); }

  // ------------------------------------------------------------------ command palette
  const pal = { items: [], active: 0 };
  function paletteActions() {
    const dark = document.documentElement.dataset.theme === 'dark';
    return [
      { group: 'Actions', icon: 'plus', title: 'Submit your work', sub: 'Opens the GitHub submission form', run: () => window.open(SUBMIT_URL, '_blank', 'noopener') },
      { group: 'Actions', icon: dark ? 'sun' : 'moon', title: `Switch to ${dark ? 'light' : 'dark'} mode`, run: toggleTheme },
      { group: 'Actions', icon: state.view === 'grid' ? 'list' : 'grid', title: `Switch to ${state.view === 'grid' ? 'list' : 'grid'} view`, run: () => { state.view = state.view === 'grid' ? 'list' : 'grid'; render(); } },
      { group: 'Actions', icon: 'github', title: 'View source on GitHub', run: () => window.open(REPO_URL, '_blank', 'noopener') },
    ];
  }
  function buildPalette(q) {
    q = q.trim().toLowerCase();
    const items = [];
    const projects = q
      ? state.projects.filter((p) => matches(p, q)).slice(0, 8)
      : [...state.projects].sort((a, b) => time(b) - time(a)).slice(0, 6);
    for (const p of projects) {
      items.push({ group: q ? 'Projects' : 'Recent', project: p, title: p.title, sub: `${p.designer}${p.team ? ` · ${p.team}` : ''} · ${typeInfo(p.type).label}`, run: () => openDetail(p) });
    }
    if (q) {
      for (const [t] of countBy('tags').filter(([t]) => t.includes(q.replace(/^#/, ''))).slice(0, 4)) {
        items.push({ group: 'Tags', icon: 'hash', title: `#${t}`, sub: 'Filter directory by tag', run: () => { setFilter('tag', t); $('#directory').scrollIntoView(); } });
      }
      for (const [d] of countBy('designer').filter(([d]) => d.toLowerCase().includes(q)).slice(0, 3)) {
        items.push({ group: 'Designers', icon: 'users', title: d, sub: 'Show their work', run: () => { setFilter('q', d); $('#directory').scrollIntoView(); } });
      }
    }
    items.push(...paletteActions().filter((a) => !q || a.title.toLowerCase().includes(q)));
    pal.items = items;
    pal.active = 0;
    renderPalette();
  }
  function renderPalette() {
    const list = $('#palette-list');
    if (!pal.items.length) {
      list.replaceChildren(el('li', { class: 'palette-empty' }, 'No results. Try another search.'));
      return;
    }
    const nodes = [];
    let lastGroup = '';
    pal.items.forEach((it, i) => {
      if (it.group !== lastGroup) { nodes.push(el('li', { class: 'palette-group', role: 'presentation' }, it.group)); lastGroup = it.group; }
      nodes.push(el('li', {
        class: `palette-item${i === pal.active ? ' active' : ''}`, role: 'option', id: `pi-${i}`, 'aria-selected': String(i === pal.active),
        onclick: () => runPalette(i), onmousemove: () => { if (pal.active !== i) { pal.active = i; highlightPalette(); } },
      },
        it.project ? el('span', { class: 'thumb' }, cover(it.project, { badges: false })) : el('span', { class: 'pi-icon' }, icon(it.icon)),
        el('span', { class: 'pi-main' }, el('div', { class: 'pi-title' }, it.title), it.sub && el('div', { class: 'pi-sub' }, it.sub)),
        icon('enter', 'enter'),
      ));
    });
    list.replaceChildren(...nodes);
    highlightPalette();
  }
  function highlightPalette() {
    $('#palette-list').querySelectorAll('.palette-item').forEach((n) => {
      const on = n.id === `pi-${pal.active}`;
      n.classList.toggle('active', on);
      n.setAttribute('aria-selected', String(on));
      if (on) n.scrollIntoView({ block: 'nearest' });
    });
    $('#palette-input').setAttribute('aria-activedescendant', `pi-${pal.active}`);
  }
  function runPalette(i) {
    const it = pal.items[i];
    if (!it) return;
    closePalette();
    it.run();
  }
  function openPalette() {
    closeDrawer();
    const d = $('#palette');
    $('#palette-input').value = '';
    buildPalette('');
    if (!d.open) d.showModal();
    $('#palette-input').focus();
  }
  function closePalette() { const d = $('#palette'); if (d.open) d.close(); }

  // ------------------------------------------------------------------ theme
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('iris-theme', next);
    $('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#09090b' : '#fafafa');
  }

  // ------------------------------------------------------------------ boot
  function bind() {
    hydrateIcons();
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    $('#kbd-mod').textContent = isMac ? '⌘K' : 'Ctrl K';
    for (const id of ['#submit-link', '#hero-submit', '#announce']) $(id).href = SUBMIT_URL;
    for (const id of ['#nav-repo', '#footer-repo']) $(id).href = REPO_URL;

    $('#theme-toggle').addEventListener('click', toggleTheme);
    $('#open-palette').addEventListener('click', openPalette);

    let qTimer;
    $('#search').addEventListener('input', (e) => {
      clearTimeout(qTimer);
      qTimer = setTimeout(() => { state.q = e.target.value; render(); }, 120);
    });
    $('#clear-filters').addEventListener('click', () => {
      Object.assign(state, { q: '', type: '', team: '', status: '', tag: '' });
      $('#search').value = '';
      render();
    });
    document.querySelectorAll('.segmented button').forEach((b) => b.addEventListener('click', () => { state.view = b.dataset.view; render(); }));

    const sort = createSelect({ prefix: 'Sort:', iconName: 'sort', options: SORTS, value: state.sort, onChange: (v) => { state.sort = v; render(); } });
    $('#sort-slot').replaceChildren(sort.el);

    // Spotlight hover
    $('#results').addEventListener('pointermove', (e) => {
      const c = e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    // Mobile sidebar
    const toggleSidebar = (open) => { $('#sidebar').classList.toggle('open', open); $('#sidebar-scrim').classList.toggle('open', open); };
    $('#sidebar-open').addEventListener('click', () => toggleSidebar(true));
    $('#sidebar-close').addEventListener('click', () => toggleSidebar(false));
    $('#sidebar-scrim').addEventListener('click', () => toggleSidebar(false));

    // Drawer
    const drawer = $('#drawer');
    $('#drawer-close').addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
    drawer.addEventListener('close', () => {
      currentProject = null;
      history.replaceState(null, '', location.pathname + location.search);
    });
    $('#drawer-copy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard'); }
      catch { toast('Copy failed. Copy the URL from the address bar.'); }
    });

    // Palette
    const palette = $('#palette');
    palette.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });
    $('#palette-input').addEventListener('input', (e) => buildPalette(e.target.value));
    $('#palette-input').addEventListener('keydown', (e) => {
      const n = pal.items.length;
      if (!n) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); pal.active = (pal.active + 1) % n; highlightPalette(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); pal.active = (pal.active - 1 + n) % n; highlightPalette(); }
      else if (e.key === 'Enter') { e.preventDefault(); runPalette(pal.active); }
    });

    // Global shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        $('#palette').open ? closePalette() : openPalette();
        return;
      }
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if (e.key === '/' && !typing && !$('#drawer').open && !$('#palette').open) {
        e.preventDefault();
        $('#search').focus();
        $('#search').scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });

    // Nav border on scroll
    const nav = $('.nav');
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    window.addEventListener('hashchange', openFromHash);
    return sort;
  }

  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || (currentProject && currentProject.id === id)) return;
    const p = state.projects.find((x) => x.id === id);
    if (p) openDetail(p);
  }

  function skeletons() {
    $('#results').replaceChildren(...Array.from({ length: 6 }, () => el('div', { class: 'skeleton' },
      el('div', { class: 'sk-cover sk' }), el('div', { class: 'sk-line sk' }), el('div', { class: 'sk-line short sk' }))));
  }

  async function init() {
    readUrl();
    const sort = bind();
    sort.set(state.sort);
    $('#search').value = state.q;
    skeletons();

    try {
      const res = await fetch('data/projects.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.projects = (Array.isArray(data) ? data : data.projects || []).map(normalize);
    } catch (err) {
      console.error('Failed to load projects', err);
      $('#results').replaceChildren();
      const empty = $('#empty');
      empty.hidden = false;
      empty.querySelector('h3').textContent = 'Could not load projects';
      empty.querySelector('p').textContent = 'If you opened index.html directly, serve the folder over HTTP instead (see README).';
      return;
    }

    renderStats();
    renderFeatured();
    render();
    openFromHash();
  }

  init();
})();

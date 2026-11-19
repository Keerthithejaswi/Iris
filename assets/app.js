(() => {
  'use strict';

  // Change this if the repo is renamed or moved.
  const REPO = 'Keerthithejaswi/Iris';
  const SUBMIT_URL = `https://github.com/${REPO}/issues/new?template=submit-project.yml`;

  const TYPE_LABELS = { poc: 'POC', figma: 'Figma', prototype: 'Prototype', 'case-study': 'Case study', other: 'Other' };
  const GRADIENTS = [
    ['#7c5cff', '#00c2a8'], ['#ff7aa8', '#7c5cff'], ['#ff9f43', '#ff5e7e'],
    ['#00b4d8', '#7c5cff'], ['#22c55e', '#0ea5e9'], ['#f59e0b', '#ef4444'], ['#8b5cf6', '#ec4899'],
  ];

  const $ = (sel) => document.querySelector(sel);
  const state = { projects: [], q: '', type: '', team: '', status: '', tag: '', sort: 'newest' };

  // ---------- helpers ----------
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'style') node.style.cssText = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
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
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  const gradientFor = (s) => {
    const [a, b] = GRADIENTS[hash(s) % GRADIENTS.length];
    return `background: linear-gradient(135deg, ${a}, ${b});`;
  };
  const initials = (s) => (s || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const fmtDate = (d) => {
    const date = new Date(d);
    return isNaN(date) ? '' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  const typeLabel = (t) => TYPE_LABELS[t] || t || 'Other';

  function normalize(p, i) {
    return {
      id: p.id || `p-${i}`,
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
      tags: Array.isArray(p.tags) ? p.tags.map((t) => String(t).trim()).filter(Boolean) : [],
      createdAt: p.createdAt || '',
      issue: safeUrl(p.issue),
    };
  }

  // ---------- rendering ----------
  function thumb(p, big = false) {
    const box = el('div', { class: 'thumb' });
    if (p.thumbnail) {
      const img = el('img', { src: p.thumbnail, alt: '', loading: big ? 'eager' : 'lazy', referrerpolicy: 'no-referrer' });
      img.addEventListener('error', () => img.replaceWith(placeholder(p)));
      box.append(img);
    } else {
      box.append(placeholder(p));
    }
    box.append(el('span', { class: 'badge' }, typeLabel(p.type)));
    return box;
  }
  const placeholder = (p) => el('div', { class: 'placeholder', style: gradientFor(p.title) }, initials(p.title));
  const avatar = (name) => el('span', { class: 'avatar', style: gradientFor(name), 'aria-hidden': 'true' }, initials(name));
  const statusPill = (s) => (s ? el('span', { class: `status status-${slug(s)}` }, s) : null);

  function card(p) {
    return el('button', { class: 'card', type: 'button', onclick: () => openDetail(p), 'aria-label': `${p.title} by ${p.designer}` },
      thumb(p),
      el('div', { class: 'card-body' },
        el('h3', { class: 'card-title' }, p.title),
        p.description && el('p', { class: 'card-desc' }, p.description),
        el('div', { class: 'card-meta' },
          el('span', { class: 'person' }, avatar(p.designer), el('span', {}, p.designer + (p.team ? ` · ${p.team}` : ''))),
          statusPill(p.status),
        ),
      ),
    );
  }

  function figmaEmbed(url) {
    try {
      const host = new URL(url).hostname;
      if (!/(^|\.)figma\.com$/.test(host)) return null;
    } catch { return null; }
    return el('iframe', {
      class: 'figma-embed',
      src: `https://www.figma.com/embed?embed_host=iris&url=${encodeURIComponent(url)}`,
      loading: 'lazy', allowfullscreen: true, title: 'Figma preview',
    });
  }

  function openDetail(p) {
    const body = $('#detail-body');
    body.replaceChildren(
      thumb(p, true),
      el('div', { class: 'detail-content' },
        el('h2', { id: 'detail-title' }, p.title),
        el('div', { class: 'sub' },
          el('span', { class: 'person' }, avatar(p.designer), el('span', {}, p.designer)),
          p.team && el('span', {}, `· ${p.team}`),
          p.createdAt && el('span', {}, `· ${fmtDate(p.createdAt)}`),
          statusPill(p.status),
        ),
        p.description && el('p', { class: 'desc' }, p.description),
        el('div', { class: 'links' },
          p.prototype && el('a', { class: 'btn btn-primary', href: p.prototype, target: '_blank', rel: 'noopener' }, '▶ Open prototype'),
          p.figma && el('a', { class: 'btn', href: p.figma, target: '_blank', rel: 'noopener' }, 'Open in Figma'),
          p.repo && el('a', { class: 'btn', href: p.repo, target: '_blank', rel: 'noopener' }, 'Source'),
          p.issue && el('a', { class: 'btn', href: p.issue, target: '_blank', rel: 'noopener' }, 'Discussion'),
        ),
        p.tags.length > 0 && el('div', { class: 'tags' }, p.tags.map((t) => el('span', { class: 'tag' }, `#${t}`))),
        p.figma && figmaEmbed(p.figma),
      ),
    );
    const dlg = $('#detail');
    if (!dlg.open) dlg.showModal();
    history.replaceState(null, '', `#${encodeURIComponent(p.id)}`);
  }

  function closeDetail() {
    $('#detail').close();
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let list = state.projects.filter((p) => {
      if (state.type && p.type !== state.type) return false;
      if (state.team && p.team !== state.team) return false;
      if (state.status && p.status !== state.status) return false;
      if (state.tag && !p.tags.includes(state.tag)) return false;
      if (!q) return true;
      return [p.title, p.description, p.designer, p.team, p.status, typeLabel(p.type), ...p.tags]
        .join(' ').toLowerCase().includes(q);
    });
    const time = (p) => Date.parse(p.createdAt) || 0;
    if (state.sort === 'newest') list.sort((a, b) => time(b) - time(a));
    if (state.sort === 'oldest') list.sort((a, b) => time(a) - time(b));
    if (state.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }

  function countBy(key) {
    const m = new Map();
    for (const p of state.projects) {
      const vals = Array.isArray(p[key]) ? p[key] : [p[key]];
      for (const v of vals) if (v) m.set(v, (m.get(v) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(b[0]));
  }

  function renderChips() {
    const types = countBy('type');
    const mk = (value, label, count) => el('button', {
      class: 'chip', type: 'button', 'aria-pressed': String(state.type === value),
      onclick: () => { state.type = value; render(); },
    }, label, count != null && el('span', { class: 'count' }, count));
    $('#type-chips').replaceChildren(mk('', 'All', state.projects.length), ...types.map(([t, n]) => mk(t, typeLabel(t), n)));

    const tags = countBy('tags').slice(0, 20);
    $('#tag-chips').replaceChildren(...tags.map(([t]) => el('button', {
      class: 'chip', type: 'button', 'aria-pressed': String(state.tag === t),
      onclick: () => { state.tag = state.tag === t ? '' : t; render(); },
    }, `#${t}`)));
  }

  function fillSelect(sel, entries, current) {
    const first = sel.options[0];
    sel.replaceChildren(first, ...entries.map(([v]) => el('option', { value: v }, v)));
    sel.value = current;
  }

  function renderStats() {
    const designers = new Set(state.projects.map((p) => p.designer)).size;
    const shipped = state.projects.filter((p) => /shipped/i.test(p.status)).length;
    const stat = (n, label) => el('div', { class: 'stat' }, el('strong', {}, n), el('span', {}, label));
    $('#stats').replaceChildren(stat(state.projects.length, 'projects'), stat(designers, 'designers'), stat(shipped, 'shipped'));
  }

  function render() {
    renderChips();
    const list = filtered();
    $('#grid').replaceChildren(...list.map(card));
    $('#empty').hidden = list.length > 0;
  }

  // ---------- theme ----------
  function initTheme() {
    const saved = localStorage.getItem('iris-theme');
    const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    $('#theme-toggle').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('iris-theme', next);
    });
  }

  // ---------- boot ----------
  async function init() {
    initTheme();
    $('#submit-link').href = SUBMIT_URL;
    $('#repo-link').href = `https://github.com/${REPO}`;

    $('#search').addEventListener('input', (e) => { state.q = e.target.value; render(); });
    $('#filter-team').addEventListener('change', (e) => { state.team = e.target.value; render(); });
    $('#filter-status').addEventListener('change', (e) => { state.status = e.target.value; render(); });
    $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
    $('#detail-close').addEventListener('click', closeDetail);
    $('#detail').addEventListener('click', (e) => { if (e.target.id === 'detail') closeDetail(); });
    $('#detail').addEventListener('close', () => history.replaceState(null, '', location.pathname + location.search));
    $('#clear-filters').addEventListener('click', () => {
      Object.assign(state, { q: '', type: '', team: '', status: '', tag: '' });
      $('#search').value = ''; $('#filter-team').value = ''; $('#filter-status').value = '';
      render();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && !$('#detail').open) {
        e.preventDefault(); $('#search').focus();
      }
    });

    try {
      const res = await fetch('data/projects.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      state.projects = (Array.isArray(data) ? data : data.projects || []).map(normalize);
    } catch (err) {
      console.error('Failed to load projects', err);
      $('#grid').replaceChildren(el('p', { class: 'empty' }, 'Could not load projects. If you opened index.html directly, serve the folder over HTTP (see README).'));
      return;
    }

    fillSelect($('#filter-team'), countBy('team'), '');
    fillSelect($('#filter-status'), countBy('status'), '');
    renderStats();
    render();

    const deepLink = decodeURIComponent(location.hash.slice(1));
    const target = deepLink && state.projects.find((p) => p.id === deepLink);
    if (target) openDetail(target);
  }

  init();
})();

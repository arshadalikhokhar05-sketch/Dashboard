/**
 * VELORA – Executive E-Commerce Analytics Suite
 * Core Application Module
 */

'use strict';

/* ── Sidebar Toggle ────────────────────────────── */
const appShell   = document.getElementById('appShell');
const sidebarToggleBtn = document.getElementById('sidebarToggle');

if (sidebarToggleBtn) {
  sidebarToggleBtn.addEventListener('click', () => {
    appShell.classList.toggle('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', appShell.classList.contains('sidebar-collapsed'));
  });
}

// Restore sidebar state
if (localStorage.getItem('sidebarCollapsed') === 'true') {
  appShell?.classList.add('sidebar-collapsed');
}

/* ── Mobile Sidebar ────────────────────────────── */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar       = document.querySelector('.sidebar');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    sidebar?.classList.toggle('mobile-open');
  });
}

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      sidebar?.classList.remove('mobile-open');
    }
  }
});

/* ── Theme Toggle ──────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('velora-theme', theme);
  if (themeToggle) {
    themeToggle.querySelector('.theme-icon-label').textContent = theme === 'light' ? '☀️' : '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Restore theme
applyTheme(localStorage.getItem('velora-theme') || 'dark');

/* ── Active Nav Highlighting ───────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  if (item.dataset.page === currentPage) item.classList.add('active');
});

/* ── Notification Dropdown ─────────────────────── */
const notifBtn   = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');

notifBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  notifPanel?.classList.toggle('open');
  profileDropdown?.classList.remove('open');
});

/* ── Profile Dropdown ──────────────────────────── */
const profileBtn      = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown?.classList.toggle('open');
  notifPanel?.classList.remove('open');
});

document.addEventListener('click', () => {
  notifPanel?.classList.remove('open');
  profileDropdown?.classList.remove('open');
});

/* ── Modal System ──────────────────────────────── */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
});

document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.modalClose));
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

/* ── Keyboard ESC ──────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(o => closeModal(o.id));
  }
});

/* ── Date Picker (Lightweight) ─────────────────── */
const dateSelectorEl = document.getElementById('dateSelector');
dateSelectorEl?.addEventListener('click', () => {
  const span = dateSelectorEl.querySelector('.date-label');
  // Cycle through preset ranges
  const ranges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];
  const cur = ranges.indexOf(span.textContent);
  span.textContent = ranges[(cur + 1) % ranges.length];
});

/* ── Pagination Logic ──────────────────────────── */
function initPagination(tableId, pageSize = 8) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  let currentPage = 1;
  const totalPages = Math.ceil(rows.length / pageSize);
  const container = document.getElementById(tableId + 'Pagination');
  if (!container) return;

  function render() {
    rows.forEach((r, i) => {
      r.style.display = (i >= (currentPage - 1) * pageSize && i < currentPage * pageSize) ? '' : 'none';
    });
    renderPagination();
  }

  function renderPagination() {
    container.innerHTML = '';
    const info = document.createElement('span');
    info.className = 'page-info';
    info.textContent = `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, rows.length)} of ${rows.length}`;
    container.appendChild(info);

    const prev = document.createElement('div');
    prev.className = 'page-link';
    prev.innerHTML = '‹';
    prev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; render(); } });
    container.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const p = document.createElement('div');
      p.className = 'page-link' + (i === currentPage ? ' active' : '');
      p.textContent = i;
      p.addEventListener('click', () => { currentPage = i; render(); });
      container.appendChild(p);
    }

    const next = document.createElement('div');
    next.className = 'page-link';
    next.innerHTML = '›';
    next.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; render(); } });
    container.appendChild(next);
  }

  render();
}

/* ── Funnel Animation ──────────────────────────── */
function animateFunnel() {
  document.querySelectorAll('.funnel-fill').forEach(fill => {
    const target = fill.dataset.width || '0';
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = target; }, 200);
  });
}

/* ── Skeleton Loader ───────────────────────────── */
function showSkeletons(ms = 1200) {
  const skeletons = document.querySelectorAll('.skeleton-loader');
  skeletons.forEach(s => s.style.display = '');
  setTimeout(() => {
    skeletons.forEach(s => s.style.display = 'none');
    document.querySelectorAll('.chart-loaded').forEach(c => c.style.display = '');
  }, ms);
}

/* ── Global Chart Defaults ─────────────────────── */
function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    textColor:   isDark ? '#a0a8c0' : '#4a5270',
    gridColor:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    bgCard:      isDark ? '#1e2235' : '#ffffff',
    gold:        '#c49c5a',
    goldLight:   '#d4b070',
    blue:        '#60a5fa',
    green:       '#4ade80',
    pink:        '#f472b6',
    purple:      '#a78bfa',
    teal:        '#34d399',
  };
}

/* ── Expose globals ────────────────────────────── */
window.VeloraApp = {
  openModal,
  closeModal,
  initPagination,
  animateFunnel,
  getChartColors,
  showSkeletons,
};

/* ── Init on load ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  animateFunnel();
  showSkeletons(1200);
});

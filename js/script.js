// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// ナビリンククリックでメニューを閉じる
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// スクロールでヘッダーの影を強調
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  }
});

// スクロールリベール（要素がふわっと現れる）
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  // リベール対象に .reveal を付与（グリッド内は順番に遅延）
  const revealGroups = [
    '.section-header',
    '.greeting-inner',
    '.book-card',
    '.rinen-card',
    '.jigyou-card',
    '.kyoushitsu-card',
    '.enkaku-item',
    '.kaisha-table',
    '.recruit-card',
    '.recruit-lead',
    '.contact-form',
    '.privacy-inner',
  ];

  document.querySelectorAll(revealGroups.join(',')).forEach((el) => {
    el.classList.add('reveal');
  });

  // 同じ親を持つカード類は出現に段差をつける
  document
    .querySelectorAll(
      '.rinen-cards, .jigyou-cards, .kyoushitsu-list, .recruit-cards, .books-row'
    )
    .forEach((group) => {
      [...group.children].forEach((child, i) => {
        child.style.transitionDelay = `${Math.min(i, 5) * 0.09}s`;
      });
    });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

// ヒーロー実績数値のカウントアップ
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (Number.isNaN(target)) return;
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

document.querySelectorAll('.hero-stat-num[data-count]').forEach((el) => {
  // ヒーローは最初から見えているので読み込み後に発火
  animateCount(el);
});

// 口コミマーキーをシームレスにループ（同じ内容を複製）
const voiceTrack = document.querySelector('#voiceMarquee .voice-track');
if (voiceTrack && !prefersReducedMotion) {
  const cards = [...voiceTrack.children];
  cards.forEach((card) => voiceTrack.appendChild(card.cloneNode(true)));
}

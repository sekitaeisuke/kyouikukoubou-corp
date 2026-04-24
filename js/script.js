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

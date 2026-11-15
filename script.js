/* neon3d.js | پس‌زمینه‌ی سه‌بعدی نئونی برای کل سایت
   استفاده: توی هر صفحه، قبل از </body> این یک خط را اضافه کنید:
   <script src="neon3d.js" defer></script>
   (Three.js خودش از cdnjs لود می‌شود. اگر لود نشد، سایت بدون سه‌بعدی کار می‌کند.) */
(function () {
  var D = document, root = D.documentElement;
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* ---------- جلوه‌های ساده (بدون نیاز به Three.js) ---------- */
  var pg = D.createElement('div'); pg.id = 'pg'; D.body.appendChild(pg);
  function prog() { var m = root.scrollHeight - innerHeight; return m > 0 ? Math.min(scrollY / m, 1) : 0; }
  addEventListener('scroll', function () { pg.style.transform = 'scaleX(' + prog() + ')'; }, { passive: true });

  var hi = D.getElementById('hi');
  if (hi && !still) {
    var ht = hi.textContent, hn = 0; hi.textContent = '';
    (function ty() { hn++; hi.textContent = ht.slice(0, hn); if (hn < ht.length) setTimeout(ty, 75); })();
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  D.querySelectorAll('.card,.section-head,.cta,.page-hero,.about-box,.hero-text,.hero-card').forEach(function (el) {
    if (io) { el.classList.add('rv'); io.observe(el); }
  });
  D.querySelectorAll('.card').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- شهر نئونی سه‌بعدی ---------- */
  function start() {
    if (!window.THREE) return;
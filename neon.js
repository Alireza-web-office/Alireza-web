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
    try {
      var cv = D.createElement('canvas'); cv.id = 'nbg'; cv.setAttribute('aria-hidden', 'true');
      var gc = D.createElement('canvas'); gc.id = 'nbg-glow'; gc.setAttribute('aria-hidden', 'true');
      D.body.insertBefore(gc, D.body.firstChild); D.body.insertBefore(cv, D.body.firstChild);
      var gx = gc.getContext('2d'), small = innerWidth < 700;
      var R = new THREE.WebGLRenderer({ canvas: cv, antialias: !small, alpha: true });
      R.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
      var S = new THREE.Scene(); S.fog = new THREE.FogExp2(0x070b16, .03);
      var cam = new THREE.PerspectiveCamera(62, 1, .1, 260), L = 120, spr = null;
      var pal = [[.1, .9, 1], [1, .25, .7], [1, .9, .5]];
      function rnd(a, b) { return a + Math.random() * (b - a); }
      function sprite() {
        if (spr) return spr;
        var c = D.createElement('canvas'); c.width = c.height = 64;
        var x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.3, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        x.fillStyle = g; x.fillRect(0, 0, 64, 64); spr = new THREE.CanvasTexture(c); return spr;
      }
      function lines(a, c) {
        var b = new THREE.BufferGeometry(); b.setAttribute('position', new THREE.Float32BufferAttribute(a, 3));
        return new THREE.LineSegments(b, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: .95, blending: THREE.AdditiveBlending }));
      }
      function city() {
        var g = new THREE.Group(), N = small ? 90 : 150;
        var fill = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0b1530 }), N);
        var base = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)).attributes.position;
        var pc = [], pm = [], wp = [], wc = [], m = new THREE.Matrix4();
        for (var i = 0; i < N; i++) {
          var sd = Math.random() < .5 ? -1 : 1, x = sd * rnd(5, 42), z = -rnd(0, L), w = rnd(2, 5), d = rnd(2, 5);
          var h = Math.max(rnd(3, 24) * (1 - Math.abs(x) / 90), 2.5);
          m.makeScale(w, h, d); m.setPosition(x, h / 2, z); fill.setMatrixAt(i, m);
          var t = Math.random() < .6 ? pc : pm;
          for (var k = 0; k < base.count; k++) t.push(base.getX(k) * w + x, base.getY(k) * h + h / 2, base.getZ(k) * d + z);
          for (var j = 0; j < 7; j++) {
            var c = pal[(Math.random() * 3) | 0];
            wp.push(x - sd * (w / 2 + .02), rnd(1, Math.max(h - .4, 1.2)), z + rnd(-d / 2, d / 2)); wc.push(c[0], c[1], c[2]);
          }
        }
        g.add(fill); g.add(lines(pc, 0x19e3ff)); g.add(lines(pm, 0xff3fb4));
        var wg = new THREE.BufferGeometry();
        wg.setAttribute('position', new THREE.Float32BufferAttribute(wp, 3)); wg.setAttribute('color', new THREE.Float32BufferAttribute(wc, 3));
        g.add(new THREE.Points(wg, new THREE.PointsMaterial({ size: .8, map: sprite(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
        var gr = []; for (var z2 = 0; z2 > -L; z2 -= 4) gr.push(-60, 0, z2, 60, 0, z2);
        gr.push(-3, 0, 0, -3, 0, -L, 3, 0, 0, 3, 0, -L);
        g.add(lines(gr, 0x3b2a7a)); return g;
      }
      var A = city(), B = A.clone(); B.position.z = -L; S.add(A); S.add(B);

      var sc = D.createElement('canvas'); sc.width = sc.height = 256;
      var sx = sc.getContext('2d'), sg = sx.createLinearGradient(0, 0, 0, 256);
      sg.addColorStop(0, '#ff3fb4'); sg.addColorStop(1, '#ffb347');
      sx.fillStyle = sg; sx.beginPath(); sx.arc(128, 128, 124, 0, 7); sx.fill();
      sx.globalCompositeOperation = 'destination-out';
      for (var q = 0; q < 7; q++) sx.fillRect(0, 140 + q * 16, 256, 3 + q * 1.6);
      var sun = new THREE.Mesh(new THREE.PlaneGeometry(76, 76), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, fog: false, depthWrite: false }));
      sun.position.set(0, 30, -200); sun.renderOrder = -1; S.add(sun);

      var CN = 90, cp = new Float32Array(CN * 3), cc = new Float32Array(CN * 3), cs = [];
      for (var ci = 0; ci < CN; ci++) {
        var rt = ci % 2 === 1, col = rt ? pal[1] : pal[0];
        cp[ci * 3] = (rt ? 1.6 : -1.6) + rnd(-.6, .6); cp[ci * 3 + 1] = .3; cp[ci * 3 + 2] = -rnd(0, L * 1.5);
        cs.push(rt ? rnd(.5, 1) : -rnd(.25, .6)); cc[ci * 3] = col[0]; cc[ci * 3 + 1] = col[1]; cc[ci * 3 + 2] = col[2];
      }
      var cg = new THREE.BufferGeometry();
      cg.setAttribute('position', new THREE.BufferAttribute(cp, 3)); cg.setAttribute('color', new THREE.BufferAttribute(cc, 3));
      S.add(new THREE.Points(cg, new THREE.PointsMaterial({ size: 1.1, map: sprite(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));

      var mx = 0, my = 0, tx = 0, ty = 0, sv = 0, ls = scrollY, fr = 0, hidden = false;
      addEventListener('pointermove', function (e) { tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2; });
      function size() {
        var w = innerWidth, h = innerHeight; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
        gc.width = Math.ceil(w / 5); gc.height = Math.ceil(h / 5);
      }
      addEventListener('resize', size); size();
      var t0 = performance.now();
      function frame(now) {
        requestAnimationFrame(frame);
        if (D.hidden) return;
        if (fr % 30 === 0) hidden = getComputedStyle(cv).display === 'none';   /* تم روشن: سه‌بعدی خاموش */
        if (hidden && fr++ > -1) return;
        var t = (now - t0) / 1000, p = prog();
        if (!still) {
          sv += (Math.min(Math.abs(scrollY - ls) * .04, 1.4) - sv) * .1; ls = scrollY;
          var sp = .18 + sv;
          A.position.z += sp; B.position.z += sp;
          if (A.position.z > L + 10) A.position.z -= 2 * L; if (B.position.z > L + 10) B.position.z -= 2 * L;
          for (var i = 0; i < CN; i++) { var kz = i * 3 + 2; cp[kz] += cs[i] * (1 + sv); if (cp[kz] > 10) cp[kz] = -L * 1.5; if (cp[kz] < -L * 1.5) cp[kz] = 10; }
          cg.attributes.position.needsUpdate = true; sun.scale.setScalar(1 + Math.sin(t * 1.2) * .03);
          mx += (tx - mx) * .04; my += (ty - my) * .04;
          cam.position.set(mx * 5 + Math.sin(t * .3) * 1.5 + Math.sin(p * 6) * 4, 3.2 + p * 7 + my * 1.2 + Math.sin(t * .5) * .3, 8);
          cam.rotation.z = -mx * .04 + Math.sin(p * 6) * .05;
        } else cam.position.set(0, 3.2, 8);
        cam.lookAt(mx * 3, 5 - p * 5, -40);
        R.render(S, cam);
        if (fr++ % 2 === 0) gx.drawImage(cv, 0, 0, gc.width, gc.height);
      }
      requestAnimationFrame(frame);
    } catch (err) {
      var a = D.getElementById('nbg'), b = D.getElementById('nbg-glow');
      if (a) a.remove(); if (b) b.remove();
    }
  }

  if (window.THREE) start();
  else {
    var s = D.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = start; D.head.appendChild(s);
  }
})();
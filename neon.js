/* neon3d.js
   پس‌زمینه سه‌بعدی نئونی ALIREZA WEB
*/

(function () {
  "use strict";

  var D = document;
  var root = D.documentElement;

  var still = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  root.classList.add("js");

  /* ===== جلوه‌های ساده ===== */

  var pg = D.createElement("div");
  pg.id = "pg";

  function addProgress() {
    if (D.body && !D.getElementById("pg")) {
      D.body.appendChild(pg);
    }
  }

  if (D.body) {
    addProgress();
  } else {
    D.addEventListener("DOMContentLoaded", addProgress);
  }

  function prog() {
    var max = root.scrollHeight - window.innerHeight;

    return max > 0
      ? Math.min(window.scrollY / max, 1)
      : 0;
  }

  window.addEventListener("scroll", function () {
    pg.style.transform = "scaleX(" + prog() + ")";
  }, { passive: true });

  /* ===== تایپ متحرک ===== */

  var hi = D.getElementById("hi");

  if (hi && !still) {
    var ht = hi.textContent;
    var hn = 0;

    hi.textContent = "";

    (function typeText() {
      hn++;
      hi.textContent = ht.slice(0, hn);

      if (hn < ht.length) {
        setTimeout(typeText, 75);
      }
    })();
  }

  /* ===== انیمیشن ورود عناصر ===== */

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    D.querySelectorAll(
      ".card,.section-head,.cta,.page-hero,.about-box,.hero-text,.hero-card"
    ).forEach(function (el) {
      el.classList.add("rv");
      io.observe(el);
    });
  }

  /* ===== نور دنبال‌کننده ماوس ===== */

  D.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var rect = card.getBoundingClientRect();

      card.style.setProperty(
        "--mx",
        (e.clientX - rect.left) + "px"
      );

      card.style.setProperty(
        "--my",
        (e.clientY - rect.top) + "px"
      );
    });
  });

  /* ===== شهر نئونی سه‌بعدی ===== */

  function start() {
    if (!window.THREE || !D.body) return;

    try {
      var cv = D.createElement("canvas");
      cv.id = "nbg";
      cv.setAttribute("aria-hidden", "true");

      var gc = D.createElement("canvas");
      gc.id = "nbg-glow";
      gc.setAttribute("aria-hidden", "true");

      D.body.insertBefore(gc, D.body.firstChild);
      D.body.insertBefore(cv, D.body.firstChild);

      var gx = gc.getContext("2d");

      if (!gx) {
        cv.remove();
        gc.remove();
        return;
      }

      var small = window.innerWidth < 700;

      var R = new THREE.WebGLRenderer({
        canvas: cv,
        antialias: !small,
        alpha: true
      });

      R.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.5)
      );

      var S = new THREE.Scene();

      S.fog = new THREE.FogExp2(0x070b16, 0.03);

      var cam = new THREE.PerspectiveCamera(62, 1, 0.1, 260);

      var L = 120;
      var spr = null;

      var pal = [
        [0.1, 0.9, 1],
        [1, 0.25, 0.7],
        [1, 0.9, 0.5]
      ];

      function rnd(a, b) {
        return a + Math.random() * (b - a);
      }

      /* ===== ذرات نور ===== */

      function sprite() {
        if (spr) return spr;

        var c = D.createElement("canvas");
        c.width = c.height = 64;

        var x = c.getContext("2d");

        var g = x.createRadialGradient(
          32, 32, 0,
          32, 32, 32
        );

        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.3, "rgba(255,255,255,.6)");
        g.addColorStop(1, "rgba(255,255,255,0)");

        x.fillStyle = g;
        x.fillRect(0, 0, 64, 64);

        spr = new THREE.CanvasTexture(c);

        return spr;
      }

      /* ===== خطوط نئونی ===== */

      function lines(a, c) {
        var b = new THREE.BufferGeometry();

        b.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(a, 3)
        );

        return new THREE.LineSegments(
          b,
          new THREE.LineBasicMaterial({
            color: c,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending
          })
        );
      }

      /* ===== ساخت شهر ===== */

      function city() {
        var g = new THREE.Group();

        var N = small ? 90 : 150;

        var fill = new THREE.InstancedMesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshBasicMaterial({
            color: 0x0b1530
          }),
          N
        );

        var base = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(1, 1, 1)
        ).attributes.position;

        var pc = [];
        var pm = [];
        var wp = [];
        var wc = [];

        var m = new THREE.Matrix4();

        for (var i = 0; i < N; i++) {
          var sd = Math.random() < 0.5 ? -1 : 1;

          var x = sd * rnd(5, 42);
          var z = -rnd(0, L);

          var w = rnd(2, 5);
          var d = rnd(2, 5);

          var h = Math.max(
            rnd(3, 24) * (1 - Math.abs(x) / 90),
            2.5
          );

          m.makeScale(w, h, d);
          m.setPosition(x, h / 2, z);

          fill.setMatrixAt(i, m);

          var t = Math.random() < 0.6 ? pc : pm;

          for (var k = 0; k < base.count; k++) {
            t.push(
              base.getX(k) * w + x,
              base.getY(k) * h + h / 2,
              base.getZ(k) * d + z
            );
          }

          for (var j = 0; j < 7; j++) {
            var c = pal[
              (Math.random() * 3) | 0
            ];

            wp.push(
              x - sd * (w / 2 + 0.02),
              rnd(1, Math.max(h - 0.4, 1.2)),
              z + rnd(-d / 2, d / 2)
            );

            wc.push(c[0], c[1], c[2]);
          }
        }

        g.add(fill);
        g.add(lines(pc, 0x19e3ff));
        g.add(lines(pm, 0xff3fb4));

        var wg = new THREE.BufferGeometry();

        wg.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(wp, 3)
        );

        wg.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(wc, 3)
        );

        g.add(
          new THREE.Points(
            wg,
            new THREE.PointsMaterial({
              size: 0.8,
              map: sprite(),
              vertexColors: true,
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending
            })
          )
        );

        var gr = [];

        for (var z2 = 0; z2 > -L; z2 -= 4) {
          gr.push(-60, 0, z2, 60, 0, z2);
        }

        gr.push(
          -3, 0, 0, -3, 0, -L,
          3, 0, 0, 3, 0, -L
        );

        g.add(lines(gr, 0x3b2a7a));

        return g;
      }

      var A = city();
      var B = A.clone();

      B.position.z = -L;

      S.add(A);
      S.add(B);

      /* ===== خورشید نئونی ===== */

      var sc = D.createElement("canvas");

      sc.width = sc.height = 256;

      var sx = sc.getContext("2d");

      var sg = sx.createLinearGradient(0, 0, 0, 256);

      sg.addColorStop(0, "#ff3fb4");
      sg.addColorStop(1, "#ffb347");

      sx.fillStyle = sg;
      sx.beginPath();
      sx.arc(128, 128, 124, 0, 7);
      sx.fill();

      sx.globalCompositeOperation = "destination-out";

      for (var q = 0; q < 7; q++) {
        sx.fillRect(
          0,
          140 + q * 16,
          256,
          3 + q * 1.6
        );
      }

      var sun = new THREE.Mesh(
        new THREE.PlaneGeometry(76, 76),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(sc),
          transparent: true,
          fog: false,
          depthWrite: false
        })
      );

      sun.position.set(0, 30, -200);
      sun.renderOrder = -1;

      S.add(sun);

      /* ===== نورهای متحرک ===== */

      var CN = 90;

      var cp = new Float32Array(CN * 3);
      var cc = new Float32Array(CN * 3);

      var cs = [];

      for (var ci = 0; ci < CN; ci++) {
        var rt = ci % 2 === 1;

        var col = rt ? pal[1] : pal[0];

        cp[ci * 3] =
          (rt ? 1.6 : -1.6) + rnd(-0.6, 0.6);

        cp[ci * 3 + 1] = 0.3;

        cp[ci * 3 + 2] = -rnd(0, L * 1.5);

        cs.push(
          rt ? rnd(0.5, 1) : -rnd(0.25, 0.6)
        );

        cc[ci * 3] = col[0];
        cc[ci * 3 + 1] = col[1];
        cc[ci * 3 + 2] = col[2];
      }

      var cg = new THREE.BufferGeometry();

      cg.setAttribute(
        "position",
        new THREE.BufferAttribute(cp, 3)
      );

      cg.setAttribute(
        "color",
        new THREE.BufferAttribute(cc, 3)
      );

      S.add(
        new THREE.Points(
          cg,
          new THREE.PointsMaterial({
            size: 1.1,
            map: sprite(),
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          })
        )
      );

      /* ===== حرکت دوربین ===== */

      var mx = 0;
      var my = 0;

      var tx = 0;
      var ty = 0;

      var sv = 0;
      var ls = window.scrollY;

      var fr = 0;
      var hidden = false;

      window.addEventListener("pointermove", function (e) {
        tx = (e.clientX / window.innerWidth - 0.5) * 2;
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function size() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        R.setSize(w, h, false);

        cam.aspect = w / h;
        cam.updateProjectionMatrix();

        gc.width = Math.ceil(w / 5);
        gc.height = Math.ceil(h / 5);
      }

      window.addEventListener("resize", size);

      size();

      var t0 = performance.now();

      /* ===== حلقه انیمیشن ===== */

      function frame(now) {
        requestAnimationFrame(frame);

        if (D.hidden) return;

        if (fr % 30 === 0) {
          hidden = getComputedStyle(cv).display === "none";
        }

        fr++;

        if (hidden) return;

        var t = (now - t0) / 1000;
        var p = prog();

        if (!still) {
          sv += (
            Math.min(
              Math.abs(window.scrollY - ls) * 0.04,
              1.4
            ) - sv
          ) * 0.1;

          ls = window.scrollY;

          var sp = 0.18 + sv;

          A.position.z += sp;
          B.position.z += sp;

          if (A.position.z > L + 10) {
            A.position.z -= 2 * L;
          }

          if (B.position.z > L + 10) {
            B.position.z -= 2 * L;
          }

          for (var i = 0; i < CN; i++) {
            var kz = i * 3 + 2;

            cp[kz] += cs[i] * (1 + sv);

            if (cp[kz] > 10) {
              cp[kz] = -L * 1.5;
            }

            if (cp[kz] < -L * 1.5) {
              cp[kz] = 10;
            }
          }

          cg.attributes.position.needsUpdate = true;

          sun.scale.setScalar(
            1 + Math.sin(t * 1.2) * 0.03
          );

          mx += (tx - mx) * 0.04;
          my += (ty - my) * 0.04;

          cam.position.set(
            mx * 5 + Math.sin(t * 0.3) * 1.5 + Math.sin(p * 6) * 4,
            3.2 + p * 7 + my * 1.2 + Math.sin(t * 0.5) * 0.3,
            8
          );

          cam.rotation.z =
            -mx * 0.04 + Math.sin(p * 6) * 0.05;

        } else {
          cam.position.set(0, 3.2, 8);
        }

        cam.lookAt(
          mx * 3,
          5 - p * 5,
          -40
        );

        R.render(S, cam);

        if (fr % 2 === 0) {
          gx.drawImage(cv, 0, 0, gc.width, gc.height);
        }
      }

      requestAnimationFrame(frame);

    } catch (err) {
      console.warn("Neon 3D could not start:", err);

      var a = D.getElementById("nbg");
      var b = D.getElementById("nbg-glow");

      if (a) a.remove();
      if (b) b.remove();
    }
  }

  /* ===== بارگذاری Three.js ===== */

  function loadThree() {
    if (window.THREE) {
      start();
      return;
    }

    var s = D.createElement("script");

    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

    s.onload = start;

    s.onerror = function () {
      console.warn("Three.js load failed. Site remains available.");
    };

    D.head.appendChild(s);
  }

  if (D.readyState === "loading") {
    D.addEventListener("DOMContentLoaded", loadThree);
  } else {
    loadThree();
  }

})();
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');

/* ===== رنگ‌ها ===== */
:root{--bg:#070b16;--panel:rgba(12,20,42,.58);--panel2:rgba(22,34,68,.62);--text:#eaf2ff;--muted:#9aabcc;--line:rgba(120,160,255,.22);--accent:#19e3ff;--accent2:#7df0ff;--pink:#ff3fb4;--violet:#8a5bff;--shadow:0 18px 60px #0009;color-scheme:dark}
.light{--bg:#f4f7fa;--panel:rgba(255,255,255,.88);--panel2:#eef3f7;--text:#101820;--muted:#5d6a76;--line:#d8e0e7;--accent:#0089a8;--accent2:#0a6f8a;--pink:#c0157f;--violet:#5b3fd0;--shadow:0 18px 50px #0f203018;color-scheme:light;background:var(--bg)}

*{box-sizing:border-box}
html{scroll-behavior:smooth;background:var(--bg)}
html:has(.light){background:#f4f7fa}
body{margin:0;color:var(--text);font-family:"Vazirmatn",Tahoma,Arial,sans-serif;line-height:1.85;overflow-x:hidden}
a{text-decoration:none;color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* پس‌زمینه سه‌بعدی (توسط neon3d.js ساخته می‌شود) */
#nbg{position:fixed;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:-3}
#nbg-glow{position:fixed;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:-2;filter:blur(9px) brightness(1.7) saturate(1.4);mix-blend-mode:screen;opacity:.9}
body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse at 50% 40%,rgba(7,11,22,0) 0,rgba(7,11,22,.55) 85%)}
.light #nbg,.light #nbg-glow,.light body::before,body.light::before{display:none}
#pg{position:fixed;top:0;inset-inline:0;height:3px;z-index:30;transform-origin:right;transform:scaleX(0);background:linear-gradient(90deg,var(--accent),var(--pink));box-shadow:0 0 12px var(--accent)}

/* ===== هدر ===== */
.header{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:22px;padding:14px 6%;background:rgba(7,11,22,.62);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid transparent;transition:.25s}
.header.scrolled{border-color:var(--line);box-shadow:0 8px 30px rgba(25,227,255,.07)}
.light .header{background:rgba(244,247,250,.9)}
.brand{display:flex;align-items:center;gap:10px;margin-left:auto}
.brand span,.profile-mark,.aw{display:grid;place-items:center;font-weight:900}
.brand span{width:38px;height:38px;border-radius:10px;font-size:14px;color:var(--accent);border:1.5px solid var(--accent);background:rgba(25,227,255,.07);box-shadow:0 0 16px rgba(25,227,255,.5),inset 0 0 10px rgba(25,227,255,.22);text-shadow:0 0 8px var(--accent)}
.brand b{letter-spacing:.8px}
.nav{display:flex;gap:8px}
.nav a{padding:8px 13px;color:var(--muted);border-radius:9px;border:1px solid transparent;transition:.2s}
.nav a:hover,.nav a.active{color:var(--accent);border-color:var(--accent);background:rgba(25,227,255,.06);box-shadow:0 0 14px rgba(25,227,255,.28)}
.icon-btn{border:1px solid var(--line);background:var(--panel);color:var(--accent);border-radius:10px;width:40px;height:40px;cursor:pointer;font-size:19px;transition:.2s}
.icon-btn:hover{border-color:var(--accent);box-shadow:0 0 14px rgba(25,227,255,.4)}
.menu-btn{display:none}

/* ===== چیدمان ===== */
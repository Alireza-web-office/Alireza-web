"use strict";

/* ===== منوی موبایل ===== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.classList.remove("active");
    });
  });
}


/* ===== تغییر تم ===== */
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeBtn.textContent = isLight ? "☀" : "☾";
  });
}


/* ===== هدر هنگام اسکرول ===== */
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  });
}


/* ===== برگشت به بالا ===== */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 300);
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

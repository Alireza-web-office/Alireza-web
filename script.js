"use strict";

/* ===== منوی موبایل ===== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===== تغییر تم ===== */
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("theme") || "dark";
  } catch (error) {
    console.warn("ذخیره‌سازی تنظیمات تم در دسترس نیست.");
  }

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀";
  } else {
    themeBtn.textContent = "☾";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    try {
      localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch (error) {
      console.warn("ذخیره‌سازی تنظیمات تم انجام نشد.");
    }

    themeBtn.textContent = isLight ? "☀" : "☾";
  });
}

/* ===== هدر هنگام اسکرول ===== */
const header = document.getElementById("header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

/* ===== برگشت به بالا ===== */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  const updateTopButton = () => {
    topBtn.classList.toggle("show", window.scrollY > 300);
  };

  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
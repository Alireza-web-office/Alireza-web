"use strict";

/* ===== هدر هنگام اسکرول ===== */
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  });
}


/* ===== منوی موبایل ===== */
const menu = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menu && nav) {

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menu.contains(e.target)) {
      nav.classList.remove("open");
    }
  });
}


/* ===== تم روشن / تاریک ===== */
const theme = document.getElementById("themeToggle");
const root = document.documentElement;

if (theme) {

  if (root.classList.contains("light")) {
    theme.textContent = "☀️";
  } else {
    theme.textContent = "🌙";
  }

  theme.addEventListener("click", () => {

    root.classList.toggle("light");

    const isLight = root.classList.contains("light");

    theme.textContent = isLight ? "☀️" : "🌙";

    localStorage.setItem(
      "aw-theme",
      isLight ? "light" : "dark"
    );
  });
}


/* ===== دکمه بازگشت به بالا ===== */
const top = document.getElementById("topBtn");

if (top) {

  window.addEventListener("scroll", () => {
    top.style.display = window.scrollY > 350 ? "grid" : "none";
  });

  top.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  top.style.display = "none";
}


/* ===== فرم تماس ===== */
const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nameInput = document.getElementById("name");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");
    const status = document.getElementById("formStatus");

    const name = nameInput ? nameInput.value.trim() : "";
    const service = serviceInput ? serviceInput.value : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !message) {
      if (status) {
        status.textContent = "لطفاً نام و توضیحات را وارد کنید.";
      }
      return;
    }

    if (!service || service === "انتخاب کنید") {
      if (status) {
        status.textContent = "لطفاً نوع خدمت را انتخاب کنید.";
      }
      return;
    }

    const text = encodeURIComponent(
      `سلام، من ${name} هستم.
نوع خدمت: ${service}
توضیحات: ${message}`
    );

    const whatsappURL =
      `https://wa.me/989903404377?text=${text}`;

    window.open(whatsappURL, "_blank");

    if (status) {
      status.textContent = "پیام در واتساپ آماده شد.";
    }
  });
}

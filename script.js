function getSiteRoot() {
  const script = document.querySelector('script[src*="script.js"]');
  if (script?.src) return new URL("./", script.src).href;
  return new URL("./", window.location.href).href;
}

async function loadFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;

  const partial =
    host.dataset.footerSrc || new URL("partials/footer.html", getSiteRoot()).href;

  try {
    const res = await fetch(partial);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    let html = await res.text();
    html = html.replaceAll("__SITE_ROOT__", getSiteRoot());

    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    const footer = tpl.content.firstElementChild;
    if (!footer) return;

    const yearEl = footer.querySelector("[data-footer-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    host.replaceWith(footer);
  } catch (err) {
    console.warn("Could not load site footer:", err);
  }
}

loadFooter();

const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenuOpen(open) {
  navbar.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

if (navbar && navToggle && navMenu) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(!navbar.classList.contains("is-open"));
  });

  document.addEventListener("click", (e) => {
    if (!navbar.classList.contains("is-open")) return;
    if (
      navToggle.contains(e.target) ||
      e.target.closest(".nav-brand") ||
      navMenu.contains(e.target)
    ) {
      return;
    }
    setMenuOpen(false);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

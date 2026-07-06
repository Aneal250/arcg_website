function getSiteRoot() {
  const script = document.querySelector('script[src*="script.js"]');
  if (script?.src) return new URL("./", script.src).href;
  return new URL("./", window.location.href).href;
}

async function loadPartial(hostId, partialPath, label) {
  const host = document.getElementById(hostId);
  if (!host) return null;

  const partial =
    host.dataset.partialSrc || new URL(partialPath, getSiteRoot()).href;

  try {
    const res = await fetch(partial);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    let html = await res.text();
    html = html.replaceAll("__SITE_ROOT__", getSiteRoot());

    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    const el = tpl.content.firstElementChild;
    if (!el) return null;

    host.replaceWith(el);
    return el;
  } catch (err) {
    console.warn(`Could not load ${label}:`, err);
    return null;
  }
}

async function loadNavbar() {
  return loadPartial("site-nav", "partials/navbar.html", "site navbar");
}

async function loadFooter() {
  const footer = await loadPartial(
    "site-footer",
    "partials/footer.html",
    "site footer"
  );
  if (!footer) return;

  const yearEl = footer.querySelector("[data-footer-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function getLinkPage(href) {
  if (!href) return "";
  try {
    return new URL(href, window.location.href).pathname.split("/").pop() || "";
  } catch {
    return href.split("/").pop()?.split("?")[0] || "";
  }
}

function initNavbar(navbar) {
  const navToggle = navbar.querySelector(".nav-toggle");
  const navMenu = navbar.querySelector("#nav-menu");
  if (!navToggle || !navMenu) return;

  function setMenuOpen(open) {
    navbar.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  function highlightCurrentNavLink() {
    const page = window.location.pathname.split("/").pop() || "index.html";
    navMenu.querySelectorAll("a").forEach((link) => {
      const linkPage = getLinkPage(link.getAttribute("href"));
      const isHome =
        (page === "index.html" || page === "") &&
        (linkPage === "index.html" || linkPage === "");
      const isMatch = linkPage === page;
      link.classList.toggle("is-active", isHome || isMatch);
    });
  }

  highlightCurrentNavLink();

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("is-open")) {
      setMenuOpen(false);
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

async function initSite() {
  const [navbar] = await Promise.all([loadNavbar(), loadFooter()]);
  if (navbar) initNavbar(navbar);
}

initSite();

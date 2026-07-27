import { navigation } from "../data/site-structure.js";

class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  render() {
    const currentPath = window.location.pathname;

    this.innerHTML = `
      <header class="site-header">
        <div class="container">
          <div class="navbar">
            <a href="/" class="navbar__logo">
              Recife <span>Flats</span>
            </a>

            <nav class="navbar__nav" aria-label="Navegação principal">
              ${navigation
                .map(
                  (item) => `
                <a 
                  href="${item.href}" 
                  class="navbar__link"
                  ${currentPath === item.href || (item.href === "/" && currentPath === "/index.html") ? 'aria-current="page"' : ""}
                >
                  ${item.label}
                </a>
              `
                )
                .join("")}
            </nav>

            <div class="navbar__actions">
              <a href="/contato.html" class="navbar__cta">Reservar</a>
              
              <button class="navbar__toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  setupEvents() {
    const toggle = this.querySelector(".navbar__toggle");
    const overlay = document.querySelector("site-menu");

    if (toggle && overlay) {
      toggle.addEventListener("click", () => {
        overlay.open();
        toggle.setAttribute("aria-expanded", "true");
      });
    }
  }
}

customElements.define("site-navbar", SiteNavbar);

import { navigation } from "../data/site-structure.js";

class SiteMenu extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  render() {
    const currentPath = window.location.pathname;

    this.innerHTML = `
      <div class="menu-overlay" id="menu-overlay" role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <div class="menu-overlay__header">
          <a href="/" class="navbar__logo">
            Recife <span>Flats</span>
          </a>
          <button class="menu-overlay__close" aria-label="Fechar menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="menu-overlay__nav" aria-label="Menu mobile">
          ${navigation
            .map(
              (item) => `
            <a 
              href="${item.href}" 
              class="menu-overlay__link"
              ${currentPath === item.href || (item.href === "/" && currentPath === "/index.html") ? 'aria-current="page"' : ""}
            >
              ${item.label}
            </a>
          `
            )
            .join("")}
        </nav>

        <div class="menu-overlay__footer">
          <a href="/contato.html" class="menu-overlay__cta">Fazer Reserva</a>
        </div>
      </div>
    `;
  }

  setupEvents() {
    const closeBtn = this.querySelector(".menu-overlay__close");
    const overlay = this.querySelector(".menu-overlay");

    closeBtn?.addEventListener("click", () => this.close());

    // Fecha com Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        this.close();
      }
    });
  }

  open() {
    const overlay = this.querySelector(".menu-overlay");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  close() {
    const overlay = this.querySelector(".menu-overlay");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";

    const toggle = document.querySelector(".navbar__toggle");
    toggle?.setAttribute("aria-expanded", "false");
  }
}

customElements.define("site-menu", SiteMenu);

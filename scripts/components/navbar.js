/**
 * <rf-navbar> — Header fixo reutilizável.
 *
 * Uso:
 *   <rf-navbar over-hero></rf-navbar>
 *
 * Atributos:
 *   over-hero  : aplica o estilo claro inicial (texto branco) sobre hero escuro
 *
 * Eventos emitidos:
 *   rf-menu-toggle  : disparado ao clicar no botão "Menu" (detail: { open: boolean })
 */

import { pageHref } from '../data/site-structure.js';
import { getLang, setLang, initDocumentLang } from '../utils/i18n.js';
import { FLAG_BR_SVG, FLAG_US_SVG, GLOBE_SVG } from '../data/brand-icons.js';

class RFNavbar extends HTMLElement {
  connectedCallback() {
    initDocumentLang();

    const overHero  = this.hasAttribute('over-hero');
    const heroTarget = this.getAttribute('hero-target') || '#hero';
    const lang = getLang();
    const flagSvg = lang === 'en' ? FLAG_US_SVG : FLAG_BR_SVG;
    const langMenuLabel = lang === 'en' ? 'Choose language' : 'Escolher idioma';

    this.innerHTML = /* html */`
      <header class="navbar ${overHero ? 'is-over-hero' : ''}" data-navbar>
        <div class="navbar__inner container">

          <a href="${pageHref('./index.html')}" class="navbar__logo" aria-label="Recife Flats — Início">
            <span class="navbar__logo-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8"  width="7" height="10" rx="1" fill="white" fill-opacity="0.9"/>
                <rect x="11" y="5" width="7" height="13" rx="1" fill="white" fill-opacity="0.7"/>
                <rect x="5"  y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="8"  y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="13" y="8"  width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="16" y="8"  width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="13" y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="16" y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
              </svg>
            </span>
            <span class="navbar__logo-text">
              <span class="navbar__logo-name">Recife Flats</span>
              <span class="navbar__logo-sub">Temporada</span>
            </span>
          </a>

          <div class="navbar__actions">
            <div class="lang-switcher" data-lang-switcher>
              <button class="lang-toggle"
                      type="button"
                      data-lang-toggle
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      aria-label="${langMenuLabel}"
                      title="${langMenuLabel}">
                ${GLOBE_SVG}
                <span class="lang-toggle__flag-wrap" data-lang-flag>${flagSvg}</span>
                <span class="lang-toggle__code" data-lang-code>${lang.toUpperCase()}</span>
                <svg class="lang-toggle__chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="lang-menu" data-lang-menu role="listbox" hidden>
                <button type="button" class="lang-menu__option${lang === 'pt' ? ' is-active' : ''}" data-lang-option="pt" role="option" aria-selected="${lang === 'pt'}">
                  ${FLAG_BR_SVG}
                  <span>Português</span>
                </button>
                <button type="button" class="lang-menu__option${lang === 'en' ? ' is-active' : ''}" data-lang-option="en" role="option" aria-selected="${lang === 'en'}">
                  ${FLAG_US_SVG}
                  <span>English</span>
                </button>
              </div>
            </div>

            <button class="menu-toggle"
                    data-menu-toggle
                    type="button"
                    aria-label="Abrir menu de navegação"
                    aria-expanded="false"
                    aria-controls="rf-menu">
              <span class="menu-toggle__label">Menu</span>
              <span class="menu-toggle__icon" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>
        </div>
      </header>
    `;

    this._navbar    = this.querySelector('[data-navbar]');
    this._toggle    = this.querySelector('[data-menu-toggle]');
    this._langBtn   = this.querySelector('[data-lang-toggle]');
    this._langCode  = this.querySelector('[data-lang-code]');
    this._langFlag  = this.querySelector('[data-lang-flag]');
    this._langMenu  = this.querySelector('[data-lang-menu]');
    this._langRoot  = this.querySelector('[data-lang-switcher]');
    this._heroEl    = document.querySelector(heroTarget);

    // 1. Observa o hero — define is-over-hero / is-scrolled
    if (this._heroEl) {
      this._observer = new IntersectionObserver(
        ([entry]) => {
          const over = entry.isIntersecting;
          this._navbar.classList.toggle('is-over-hero', over);
          this._navbar.classList.toggle('is-scrolled',  !over);
        },
        { threshold: 0.05 }
      );
      this._observer.observe(this._heroEl);
    } else {
      this._navbar.classList.add('is-scrolled');
    }

    // 2. Idioma PT / EN — menu com bandeiras
    const closeLangMenu = () => {
      this._langMenu?.setAttribute('hidden', '');
      this._langBtn?.setAttribute('aria-expanded', 'false');
    };

    const openLangMenu = () => {
      this._langMenu?.removeAttribute('hidden');
      this._langBtn?.setAttribute('aria-expanded', 'true');
    };

    const applyLangUi = (next) => {
      if (this._langCode) this._langCode.textContent = next.toUpperCase();
      if (this._langFlag) this._langFlag.innerHTML = next === 'en' ? FLAG_US_SVG : FLAG_BR_SVG;
      this._langMenu?.querySelectorAll('[data-lang-option]').forEach((btn) => {
        const active = btn.dataset.langOption === next;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      const label = next === 'en' ? 'Choose language' : 'Escolher idioma';
      this._langBtn?.setAttribute('aria-label', label);
      this._langBtn?.setAttribute('title', label);
    };

    this._langBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = this._langBtn.getAttribute('aria-expanded') === 'true';
      if (open) closeLangMenu();
      else openLangMenu();
    });

    this._langMenu?.querySelectorAll('[data-lang-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = setLang(btn.dataset.langOption);
        applyLangUi(next);
        closeLangMenu();
      });
    });

    this._onDocClick = (e) => {
      if (!this._langRoot?.contains(e.target)) closeLangMenu();
    };
    document.addEventListener('click', this._onDocClick);

    // 3. Emite evento global ao clicar no botão Menu
    this._toggle.addEventListener('click', () => {
      const isOpen = this._toggle.classList.toggle('is-open');
      this._toggle.setAttribute('aria-expanded', String(isOpen));
      window.dispatchEvent(new CustomEvent('rf-menu-toggle', { detail: { open: isOpen } }));
    });

    // 4. Escuta para sincronizar (caso o menu seja fechado por dentro)
    this._unsync = (e) => {
      const open = e.detail.open;
      this._toggle.classList.toggle('is-open', open);
      this._toggle.setAttribute('aria-expanded', String(open));
    };
    window.addEventListener('rf-menu-state', this._unsync);

    this._onLangChange = (e) => {
      applyLangUi(e.detail.lang);
    };
    window.addEventListener('rf-lang-change', this._onLangChange);
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    document.removeEventListener('click', this._onDocClick);
    window.removeEventListener('rf-menu-state', this._unsync);
    window.removeEventListener('rf-lang-change', this._onLangChange);
  }
}

customElements.define('rf-navbar', RFNavbar);
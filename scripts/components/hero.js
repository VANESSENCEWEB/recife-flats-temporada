/**
 * <rf-hero> — Hero com vídeo dia/noite, badges, CTAs e buscador.
 *
 * Suporta vídeos diferentes para dia e noite, carregados via API
 * (JSON estático ou CMS) com fallback nos atributos HTML.
 *
 * API (duas chamadas em paralelo):
 *   GET {api-base}/hero/{hero-id}/day.json
 *   GET {api-base}/hero/{hero-id}/night.json
 */

import { splitTextIntoLetters } from '../utils/split-text.js';
import { prefersReducedMotion } from '../utils/dom.js';
import { whatsappUrl } from '../data/location.js';
import { getTimeOfDay, getTimeOptionsFromElement } from '../utils/time-of-day.js';
import {
  applyVideoAsset,
  fetchHeroAssetsByPeriod,
  getFallbackAssetsFromElement,
  pickActiveAsset,
} from '../modules/hero-assets.js';
import { applyHeroCopy, getHeroCopy, getLang } from '../utils/i18n.js';

const PERIOD_CHECK_MS = 60_000;

class RFHero extends HTMLElement {
  connectedCallback() {
    this._periodCheckInterval = null;
    this._currentPeriod = null;
    this._assets = null;
    this._onLangChange = (e) => this._applyLang(e.detail.lang);
    window.addEventListener('rf-lang-change', this._onLangChange);
    this._init();
  }

  disconnectedCallback() {
    if (this._periodCheckInterval) {
      clearInterval(this._periodCheckInterval);
      this._periodCheckInterval = null;
    }
    window.removeEventListener('rf-lang-change', this._onLangChange);
  }

  async _init() {
    const timeOptions = getTimeOptionsFromElement(this);
    const period = getTimeOfDay(timeOptions);
    this._currentPeriod = period;

    const fallback = getFallbackAssetsFromElement(this);
    const initial = pickActiveAsset(fallback, period);

    this._renderShell(initial);
    this.dataset.period = period;
    if (getLang() === 'en') this._applyLang('en');
    this._animate();
    this._bindVideoFallback(fallback);

    const heroId = this.getAttribute('hero-id') || 'home';
    const apiBase = this.getAttribute('api-base');

    if (apiBase === '' || apiBase === 'false') {
      this._assets = fallback;
      this._startPeriodWatcher(timeOptions);
      return;
    }

    try {
      const assets = await fetchHeroAssetsByPeriod(heroId, apiBase || './data');
      this._assets = assets;

      const active = pickActiveAsset(assets, period);
      applyVideoAsset(
        this.querySelector('.hero__video'),
        this.querySelector('.hero__poster'),
        active
      );
      this._bindVideoFallback(assets);
    } catch (err) {
      console.warn('[rf-hero] API unavailable, using HTML fallbacks', err);
      this._assets = fallback;
      this._bindVideoFallback(fallback);
    }

    this._startPeriodWatcher(timeOptions);
  }

  /** Se o vídeo da noite não existir (404), usa o do dia automaticamente */
  _bindVideoFallback(assets) {
    const videoEl = this.querySelector('.hero__video');
    const posterEl = this.querySelector('.hero__poster');
    if (!videoEl || !assets) return;

    const onVideoError = () => {
      const dayAsset = pickActiveAsset(assets, 'day');
      if (!dayAsset?.video) return;

      const mp4 = videoEl.querySelector('source[type="video/mp4"]');
      const current = mp4?.getAttribute('src') || '';
      if (current === dayAsset.video || current.endsWith(dayAsset.video.replace(/^\.\//, ''))) return;

      console.warn('[rf-hero] Vídeo indisponível — fallback:', dayAsset.video);
      applyVideoAsset(videoEl, posterEl, dayAsset);
    };

    videoEl.addEventListener('error', onVideoError, { once: true });
    videoEl.querySelectorAll('source').forEach((source) => {
      source.addEventListener('error', onVideoError, { once: true });
    });
  }

  _startPeriodWatcher(timeOptions) {
    this._periodCheckInterval = setInterval(() => {
      const period = getTimeOfDay(timeOptions);
      if (period === this._currentPeriod || !this._assets) return;

      this._currentPeriod = period;
      this.dataset.period = period;

      const active = pickActiveAsset(this._assets, period);
      applyVideoAsset(
        this.querySelector('.hero__video'),
        this.querySelector('.hero__poster'),
        active
      );
    }, PERIOD_CHECK_MS);
  }

  _renderShell(asset) {
    const lang = getLang();
    const copy = getHeroCopy(lang);
    const eyebrow = this.getAttribute('eyebrow') || copy.eyebrow;
    const title = this.getAttribute('title') || this.getAttribute('heading') || copy.title;
    const description = this.getAttribute('description') || copy.description;
    const noSearch = this.hasAttribute('no-search');
    const waLink = whatsappUrl(copy.whatsappMsg);

    const video = asset?.video || '';
    const videoWebm = asset?.videoWebm || '';
    const poster = asset?.poster || '';

    this.innerHTML = `
      <section class="hero" id="hero" aria-label="Apresentação">

        ${poster ? `<img class="hero__poster" src="${poster}" alt="" loading="eager" aria-hidden="true">` : ''}

        ${video ? `
          <video class="hero__video"
                 autoplay muted loop playsinline preload="metadata"
                 ${poster ? `poster="${poster}"` : ''}
                 aria-hidden="true">
            ${videoWebm ? `<source src="${videoWebm}" type="video/webm">` : ''}
            <source src="${video}" type="video/mp4">
          </video>
        ` : ''}

        <div class="hero__overlay"></div>
        <div class="hero__grain"></div>

        <div class="hero__container container">
          <div class="hero__text">
            <span class="eyebrow hero__eyebrow" data-hero-eyebrow>${eyebrow}</span>

            <h1 class="hero__title" data-hero-title>${title}</h1>

            ${description ? `
              <p class="hero__description" data-hero-desc>${description}</p>
            ` : ''}

            <div class="hero__cta" data-hero-cta>
              <a href="./apartamentos.html" class="btn btn--shiny">
                <span>${copy.ctaPrimary}</span>
              </a>
              <a href="${waLink}" class="btn btn--outline-hero" target="_blank" rel="noopener noreferrer" data-hero-wa>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A10 10 0 0 0 3.6 17l-1.6 5 5.1-1.6A10 10 0 1 0 20.5 3.5z"/></svg>
                ${copy.ctaWhatsapp}
              </a>
            </div>

            ${noSearch ? '' : `
              <div class="hero__search" data-hero-search>
                <rf-booking-search variant="hero" action="./apartamentos.html"></rf-booking-search>
              </div>
            `}
          </div>
        </div>

      </section>
    `;
  }

  _animate() {
    const reduce = prefersReducedMotion();
    const titleEl = this.querySelector('[data-hero-title]');
    const eyebrowEl = this.querySelector('[data-hero-eyebrow]');
    const descEl = this.querySelector('[data-hero-desc]');
    const ctaEl = this.querySelector('[data-hero-cta]');
    const searchEl = this.querySelector('[data-hero-search]');

    const letters = titleEl ? splitTextIntoLetters(titleEl) : [];
    const revealEls = [eyebrowEl, descEl, ctaEl, searchEl].filter(Boolean);

    if (reduce) {
      revealEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      letters.forEach((l) => { l.style.opacity = '1'; l.style.transform = 'none'; });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    if (letters.length) {
      tl.to(letters, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out',
        stagger: 0.022,
      }, 0);
    }
    if (eyebrowEl) tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
    if (descEl) tl.to(descEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.35);
    if (ctaEl) tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.45);
    if (searchEl) tl.to(searchEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55);
  }

  _applyLang(lang) {
    applyHeroCopy(this, lang);

    const copy = getHeroCopy(lang);
    const waBtn = this.querySelector('[data-hero-wa]');
    if (waBtn) waBtn.href = whatsappUrl(copy.whatsappMsg);
  }
}

customElements.define('rf-hero', RFHero);
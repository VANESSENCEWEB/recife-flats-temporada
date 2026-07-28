/**
 * i18n mínimo — PT / EN para textos principais do hero.
 */

const STORAGE_KEY = 'rf-lang';

export const LANGS = ['pt', 'en'];

const HERO_COPY = {
  pt: {
    eyebrow: 'Boa Viagem e Pina, Recife · PE',
    title: 'Um lugar de <em>verdade</em><br class="hero__title-break"> pra ficar em Recife.',
    description:
      'Apartamentos mobiliados, prontos pra usar, com fotos reais e reserva direta — sem surpresa na chegada.',
    ctaPrimary: 'Ver apartamentos',
    ctaWhatsapp: 'Falar no WhatsApp',
    whatsappMsg: 'Olá! Gostaria de saber mais sobre os apartamentos para temporada em Recife.',
  },
  en: {
    eyebrow: 'Boa Viagem & Pina, Recife · PE',
    title: 'A <em>real</em> place<br class="hero__title-break"> to stay in Recife.',
    description:
      'Furnished apartments ready to move in, with real photos and direct booking — no surprises on arrival.',
    ctaPrimary: 'View apartments',
    ctaWhatsapp: 'Chat on WhatsApp',
    whatsappMsg: 'Hi! I would like to know more about short-term apartments in Recife.',
  },
};

export function getLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (LANGS.includes(stored)) return stored;

  const nav = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
  return nav.startsWith('en') ? 'en' : 'pt';
}

export function setLang(lang) {
  const next = LANGS.includes(lang) ? lang : 'pt';
  localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next === 'en' ? 'en' : 'pt-BR';
  window.dispatchEvent(new CustomEvent('rf-lang-change', { detail: { lang: next } }));
  return next;
}

export function toggleLang() {
  return setLang(getLang() === 'pt' ? 'en' : 'pt');
}

export function getHeroCopy(lang = getLang()) {
  return HERO_COPY[lang] || HERO_COPY.pt;
}

export function applyHeroCopy(heroEl, lang = getLang()) {
  if (!heroEl) return;

  const copy = getHeroCopy(lang);
  const eyebrowEl = heroEl.querySelector('[data-hero-eyebrow]');
  const titleEl = heroEl.querySelector('[data-hero-title]');
  const descEl = heroEl.querySelector('[data-hero-desc]');
  const ctaEl = heroEl.querySelector('[data-hero-cta]');

  if (eyebrowEl) eyebrowEl.textContent = copy.eyebrow;
  if (titleEl) titleEl.innerHTML = copy.title;
  if (descEl) descEl.textContent = copy.description;

  if (ctaEl) {
    const primary = ctaEl.querySelector('.btn--shiny span') || ctaEl.querySelector('.btn--primary');
    const outline = ctaEl.querySelector('.btn--outline-hero') || ctaEl.querySelector('.btn--outline');
    if (primary) primary.textContent = copy.ctaPrimary;
    if (outline) {
      const icon = outline.querySelector('svg');
      const textNodes = [...outline.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE);
      textNodes.forEach((n) => n.remove());
      if (!icon) {
        outline.textContent = copy.ctaWhatsapp;
      } else {
        outline.childNodes.forEach((n) => {
          if (n !== icon) n.remove();
        });
        outline.append(` ${copy.ctaWhatsapp}`);
      }
    }
  }

  heroEl.setAttribute('data-lang', lang);
}

export function initDocumentLang() {
  document.documentElement.lang = getLang() === 'en' ? 'en' : 'pt-BR';
}

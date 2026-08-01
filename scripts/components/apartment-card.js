/**
 * <rf-apartment-card> — Card de imóvel para listagens.
 *
 * Atributos:
 *   slug — obrigatório
 */

import {
  getApartmentBySlug,
  resolveImages,
} from '../data/apartamentos.js';
import { apartmentUrl } from '../data/site-structure.js';
import { whatsappUrl } from '../data/location.js';

function pictureHtml(src, alt, eager = false) {
  const loading = eager ? 'eager' : 'lazy';
  const isWebp = /\.webp$/i.test(src);
  if (!isWebp) {
    return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="640" height="480">`;
  }
  const avif = src.replace(/\.webp$/i, '.avif');
  return `
    <picture>
      <source srcset="${avif}" type="image/avif">
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="640" height="480">
    </picture>
  `;
}

class RFApartmentCard extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug');
    const apt = slug ? getApartmentBySlug(slug) : null;
    if (!apt) {
      this.hidden = true;
      return;
    }

    const images = resolveImages(apt).slice(0, 6);
    const href = apartmentUrl(apt.slug);
    const wa = whatsappUrl(`Olá! Tenho interesse no ${apt.name}.`);

    const meta = [
      `${apt.bedrooms} quarto${apt.bedrooms > 1 ? 's' : ''}`,
      `${apt.guests} hóspedes`,
      apt.pool ? 'Piscina' : null,
      apt.parking ? 'Garagem' : null,
    ].filter(Boolean);

    const price = apt.priceFrom
      ? `<span class="apartment-card__price"><strong>${apt.priceFrom}</strong> ${apt.priceNote || ''}</span>`
      : `<span class="apartment-card__price"><strong>${apt.priceNote || 'Sob consulta'}</strong></span>`;

    this.dataset.neighborhood = apt.neighborhoodSlug || '';
    this.innerHTML = `
      <article class="apartment-card" data-neighborhood="${apt.neighborhoodSlug || ''}">
        <a class="apartment-card__media" href="${href}" data-card-slideshow aria-label="${apt.name}">
          ${images.map((img, i) => `
            <span class="apartment-card__slide${i === 0 ? ' is-active' : ''}" data-card-slide="${i}" ${i === 0 ? '' : 'aria-hidden="true"'}>
              ${pictureHtml(img.src, i === 0 ? img.alt : '', i === 0)}
            </span>
          `).join('')}
          ${apt.badge ? `<span class="apartment-card__badge">${apt.badge}</span>` : ''}
          ${images.length > 1 ? `<span class="apartment-card__dots" aria-hidden="true">${images.map((_, i) => `<i class="${i === 0 ? 'is-active' : ''}"></i>`).join('')}</span>` : ''}
        </a>
        <div class="apartment-card__body">
          <p class="apartment-card__eyebrow">${apt.neighborhood}</p>
          <h3 class="apartment-card__title"><a href="${href}">${apt.name}</a></h3>
          <p class="apartment-card__tagline">${apt.tagline}</p>
          <ul class="apartment-card__meta">
            ${meta.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="apartment-card__footer">
            ${price}
            <div class="apartment-card__actions">
              <a class="btn btn--secondary btn--sm" href="${href}">Ver detalhes</a>
              <a class="btn btn--primary btn--sm" href="${wa}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </article>
    `;

    // cover kept for potential future use / lint silence
    void cover;
    this.#bindCardSlideshow();
  }

  #bindCardSlideshow() {
    const media = this.querySelector('[data-card-slideshow]');
    if (!media) return;
    const slides = [...media.querySelectorAll('[data-card-slide]')];
    const dots = [...media.querySelectorAll('.apartment-card__dots i')];
    if (slides.length < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let index = 0;
    let timer = null;
    const INTERVAL = 2600;

    const render = () => {
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        index = (index + 1) % slides.length;
        render();
      }, INTERVAL);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) start();
        else stop();
      }
    }, { threshold: 0.35 });

    io.observe(media);
    media.addEventListener('mouseenter', stop);
    media.addEventListener('mouseleave', start);
  }
}

customElements.define('rf-apartment-card', RFApartmentCard);

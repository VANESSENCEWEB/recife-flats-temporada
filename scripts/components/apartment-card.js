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

function pictureHtml(src, alt) {
  const isWebp = /\.webp$/i.test(src);
  if (!isWebp) {
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="640" height="480">`;
  }
  const avif = src.replace(/\.webp$/i, '.avif');
  return `
    <picture>
      <source srcset="${avif}" type="image/avif">
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="640" height="480">
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

    const cover = resolveImages(apt)[0];
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

    this.innerHTML = `
      <article class="apartment-card">
        <a class="apartment-card__media" href="${href}">
          ${pictureHtml(cover.src, cover.alt)}
          ${apt.badge ? `<span class="apartment-card__badge">${apt.badge}</span>` : ''}
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
  }
}

customElements.define('rf-apartment-card', RFApartmentCard);

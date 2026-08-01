/**
 * <rf-apartment-detail> — Página individual do imóvel.
 *
 * Uso:
 *   <rf-apartment-detail slug="studio-203-boa-viagem"></rf-apartment-detail>
 */

import {
  getApartmentBySlug,
  resolveImages,
} from '../data/apartamentos.js';
import { getNeighborhood, pageHref } from '../data/site-structure.js';
import { whatsappUrl } from '../data/location.js';

function pictureHtml(src, alt, eager = false) {
  const loading = eager ? 'eager' : 'lazy';
  if (!/\.webp$/i.test(src)) {
    return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async">`;
  }
  const avif = src.replace(/\.webp$/i, '.avif');
  return `
    <picture>
      <source srcset="${avif}" type="image/avif">
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}" loading="${loading}" decoding="async">
    </picture>
  `;
}

class RFApartmentDetail extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug') || '';
    const apt = getApartmentBySlug(slug);
    if (!apt) {
      this.innerHTML = `<p class="container">Apartamento não encontrado.</p>`;
      return;
    }

    const images = resolveImages(apt).slice(0, 12);
    const n = getNeighborhood(apt.neighborhoodSlug);
    const wa = whatsappUrl(`Olá! Quero reservar o ${apt.name}.`);
    const price = apt.priceFrom
      ? `${apt.priceFrom} <span>${apt.priceNote || ''}</span>`
      : `${apt.priceNote || 'Sob consulta'}`;

    this.innerHTML = `
      <article class="apartment-detail">
        <header class="apartment-detail__header container">
          <p class="apartment-detail__eyebrow">${apt.neighborhood}${apt.badge ? ` · ${apt.badge}` : ''}</p>
          <h1>${apt.name}</h1>
          <p class="apartment-detail__tagline">${apt.tagline}</p>
          <p class="apartment-detail__price">${price}</p>
          <div class="apartment-detail__actions">
            <a class="btn btn--primary" href="${wa}" target="_blank" rel="noopener noreferrer">Reservar no WhatsApp</a>
            ${n ? `<a class="btn btn--secondary" href="${pageHref(n.pageUrl)}">Ver ${n.name}</a>` : ''}
          </div>
        </header>

        <div class="apartment-detail__gallery container" aria-label="Galeria">
          ${images.map((img, i) => `
            <figure class="apartment-detail__shot">${pictureHtml(img.src, img.alt, i === 0)}</figure>
          `).join('')}
        </div>

        <div class="apartment-detail__content container">
          <section>
            <h2>Sobre o espaço</h2>
            <p>${apt.description}</p>
            <p class="apartment-detail__address">${apt.building}<br>${apt.address}</p>
          </section>
          <section>
            <h2>Comodidades</h2>
            <ul class="apartment-detail__amenities">
              ${apt.amenities.map((a) => `<li>${a}</li>`).join('')}
            </ul>
          </section>
        </div>
      </article>
    `;
  }
}

customElements.define('rf-apartment-detail', RFApartmentDetail);

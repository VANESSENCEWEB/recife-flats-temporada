/**
 * <rf-apartment-detail> — Página do imóvel (estrutura do template, visual do site).
 *
 * Uso:
 *   <rf-apartment-detail slug="studio-203-boa-viagem"></rf-apartment-detail>
 */

import {
  getApartmentBySlug,
  resolveImages,
} from '../data/apartamentos.js';
import { getNeighborhood, pageHref } from '../data/site-structure.js';
import { BUSINESS, MAPS_EMBED_URL, MAPS_LINKS, whatsappUrl } from '../data/location.js';
import { WHATSAPP_ICON_SVG } from '../data/brand-icons.js';
import { beachDecorLayer } from '../data/beach-decor.js';

function pictureHtml(src, alt, eager = false) {
  const loading = eager ? 'eager' : 'lazy';
  if (!/\.webp$/i.test(src)) {
    return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="1200" height="800">`;
  }
  const avif = src.replace(/\.webp$/i, '.avif');
  return `
    <picture>
      <source srcset="${avif}" type="image/avif">
      <source srcset="${src}" type="image/webp">
      <img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="1200" height="800">
    </picture>
  `;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDaysISO(iso, days) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function nearbyFor(apt) {
  if (apt.neighborhoodSlug === 'pina') {
    return [
      { title: 'Shopping RioMar', meta: 'Ao lado · a pé' },
      { title: 'Praia / orla', meta: 'Poucos minutos' },
      { title: 'Centro do Recife', meta: 'Bairro mais próximo da coleção' },
      { title: 'Aeroporto', meta: '~8–15 min de carro' },
    ];
  }
  return [
    { title: 'Praia de Boa Viagem', meta: '100 m a 200 m (unidades selecionadas)' },
    { title: 'Comércio do bairro', meta: 'Padaria, mercado e farmácia' },
    { title: 'Shopping Recife', meta: 'Próximo · carro ou app' },
    { title: 'Aeroporto', meta: '~8–15 min de carro' },
  ];
}

const SAMPLE_REVIEWS = [
  {
    name: 'Maria',
    date: 'Temporada recente',
    text: 'Apartamento limpo, bem localizado e atendimento rápido no WhatsApp. Voltaria sem pensar.',
  },
  {
    name: 'Carlos',
    date: 'Temporada recente',
    text: 'Fotos batem com a realidade. Ficamos perto de tudo e resolvemos a reserva direto.',
  },
  {
    name: 'Ana',
    date: 'Temporada recente',
    text: 'Espaço bom, comunicação clara e check-in tranquilo. Melhor que hotel para a nossa viagem.',
  },
];

class RFApartmentDetail extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug') || '';
    const apt = getApartmentBySlug(slug);
    if (!apt) {
      this.innerHTML = `<p class="container">Apartamento não encontrado.</p>`;
      return;
    }

    const images = resolveImages(apt);
    const cover = images.slice(0, 5);
    const n = getNeighborhood(apt.neighborhoodSlug);
    const waBase = `Olá! Quero reservar o ${apt.name}.`;
    const priceLabel = apt.priceFrom || 'Sob consulta';
    const priceNote = apt.priceFrom ? (apt.priceNote || '/dia') : '';
    const minIn = todayISO();
    const defaultOut = addDaysISO(minIn, 3);
    const nearby = nearbyFor(apt);
    const hasReviews = apt.reviewCount > 0;

    const decorMotifs = apt.neighborhoodSlug === 'pina'
      ? ['shell', 'surfboards', 'sun']
      : ['starfish', 'shell', 'surfboards'];

    this.innerHTML = `
      <article class="apartment-detail">
        ${beachDecorLayer(decorMotifs, 'soft')}
        <nav class="apartment-detail__tabs" aria-label="Seções do imóvel">
          <div class="container apartment-detail__tabs-inner">
            <a href="#visao-geral">Visão geral</a>
            <a href="#comodidades">Comodidades</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#localizacao">Localização</a>
            <a href="#regras">Regras</a>
          </div>
        </nav>

        <div class="container">
          <header class="apartment-detail__title">
            <p class="apartment-detail__eyebrow">${apt.neighborhood}${apt.badge ? ` · ${apt.badge}` : ''}</p>
            <h1>${apt.name}</h1>
            <div class="apartment-detail__meta-row">
              <p class="apartment-detail__rating">
                <strong>${apt.rating.toFixed(1)}</strong>
                <span>${hasReviews ? `${apt.reviewCount} avaliações` : 'Reserva direta'}</span>
              </p>
              <a class="apartment-detail__place" href="#localizacao">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                ${apt.neighborhood}, Recife — PE
              </a>
            </div>
            <p class="apartment-detail__tagline">${apt.tagline}</p>
          </header>

          <div class="apartment-detail__gallery" aria-label="Galeria de fotos">
            ${cover.map((img, i) => `
              <figure class="apartment-detail__shot${i === 0 ? ' apartment-detail__shot--main' : ''}">
                ${pictureHtml(img.src, img.alt, i === 0)}
              </figure>
            `).join('')}
            ${images.length > 5 ? `
              <button type="button" class="apartment-detail__show-all" data-gallery-open>
                Mostrar todas as fotos (${images.length})
              </button>
            ` : ''}
          </div>

          <div class="apartment-detail__layout">
            <div class="apartment-detail__main">
              <section class="apartment-detail__block" id="visao-geral">
                <h2>${apt.shortName}</h2>
                <p class="apartment-detail__facts">
                  ${apt.guests} hóspedes · ${apt.bedrooms} quarto${apt.bedrooms > 1 ? 's' : ''} · ${apt.beds} cama${apt.beds > 1 ? 's' : ''} · ${apt.bathrooms} banheiro${apt.bathrooms > 1 ? 's' : ''}${apt.size ? ` · ${apt.size}` : ''}
                </p>
                <ul class="apartment-detail__highlights">
                  <li>
                    <strong>Fotos reais</strong>
                    <span>O que você vê aqui é o que encontra na chegada.</span>
                  </li>
                  <li>
                    <strong>Localização</strong>
                    <span>${apt.tagline}</span>
                  </li>
                  <li>
                    <strong>Reserva direta</strong>
                    <span>Fale conosco no WhatsApp — sem intermediário.</span>
                  </li>
                </ul>
              </section>

              <section class="apartment-detail__block">
                <h2>Sobre este espaço</h2>
                <div class="apartment-detail__description">
                  <p>${apt.description}</p>
                  <p class="apartment-detail__address">${apt.building}<br>${apt.address}</p>
                </div>
              </section>

              <section class="apartment-detail__block" id="comodidades">
                <h2>O que este lugar oferece</h2>
                <ul class="apartment-detail__amenities">
                  ${apt.amenities.map((a) => `<li>${a}</li>`).join('')}
                </ul>
              </section>

              <section class="apartment-detail__block" id="avaliacoes">
                <h2>${apt.rating.toFixed(1)} · ${hasReviews ? `${apt.reviewCount} avaliações` : 'Avaliações'}</h2>
                ${hasReviews ? `
                  <ul class="apartment-detail__reviews">
                    ${SAMPLE_REVIEWS.map((r) => `
                      <li class="apartment-detail__review">
                        <div class="apartment-detail__review-head">
                          <span class="apartment-detail__avatar" aria-hidden="true">${r.name.charAt(0)}</span>
                          <div>
                            <strong>${r.name}</strong>
                            <span>${r.date}</span>
                          </div>
                        </div>
                        <p>${r.text}</p>
                      </li>
                    `).join('')}
                  </ul>
                  <a class="btn btn--ghost" href="${MAPS_LINKS.reviews}" target="_blank" rel="noopener noreferrer">Ver no Google</a>
                ` : `
                  <p class="apartment-detail__muted">Ainda estamos reunindo avaliações públicas deste imóvel. Fale no WhatsApp para tirar dúvidas e ver disponibilidade.</p>
                `}
              </section>

              <section class="apartment-detail__block" id="localizacao">
                <h2>Onde você vai ficar</h2>
                <p class="apartment-detail__muted">${apt.neighborhood}, Recife — Pernambuco</p>
                <div class="apartment-detail__map">
                  <iframe
                    title="Mapa — ${apt.name}"
                    src="${MAPS_EMBED_URL}"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                </div>
                <ul class="apartment-detail__nearby">
                  ${nearby.map((p) => `
                    <li>
                      <strong>${p.title}</strong>
                      <span>${p.meta}</span>
                    </li>
                  `).join('')}
                </ul>
                ${n ? `<a class="btn btn--secondary btn--sm" href="${pageHref(n.pageUrl)}">Ver mais em ${n.name}</a>` : ''}
              </section>

              <section class="apartment-detail__block" id="regras">
                <h2>O que você precisa saber</h2>
                <div class="apartment-detail__rules">
                  <div>
                    <h3>Regras da casa</h3>
                    <ul>
                      <li>Check-in e check-out combinados na reserva</li>
                      <li>Máximo de ${apt.guests} hóspedes</li>
                      <li>Sem festas ou eventos</li>
                      <li>${apt.petFriendly ? 'Pets sob pedido / combinado prévio' : 'Pets sob consulta'}</li>
                    </ul>
                  </div>
                  <div>
                    <h3>Cancelamento</h3>
                    <p>Condições combinadas direto no WhatsApp — sem surpresa de plataforma.</p>
                  </div>
                </div>
              </section>
            </div>

            <aside class="apartment-detail__aside" id="reserva">
              <div class="apartment-detail__booking">
                <p class="apartment-detail__booking-price">
                  <strong>${priceLabel}</strong>
                  ${priceNote ? `<span>${priceNote}</span>` : ''}
                </p>
                <form class="apartment-detail__form" data-booking-form>
                  <label>
                    <span>Check-in</span>
                    <input type="date" name="checkin" min="${minIn}" value="${minIn}" required data-checkin>
                  </label>
                  <label>
                    <span>Check-out</span>
                    <input type="date" name="checkout" min="${defaultOut}" value="${defaultOut}" required data-checkout>
                  </label>
                  <label>
                    <span>Hóspedes</span>
                    <select name="guests" data-guests>
                      ${Array.from({ length: Math.max(apt.guests, 1) }, (_, i) => {
                        const nGuests = i + 1;
                        return `<option value="${nGuests}"${nGuests === Math.min(2, apt.guests) ? ' selected' : ''}>${nGuests}</option>`;
                      }).join('')}
                    </select>
                  </label>
                  <button type="submit" class="btn btn--primary apartment-detail__wa">
                    ${WHATSAPP_ICON_SVG}
                    Reservar via WhatsApp
                  </button>
                </form>
                <p class="apartment-detail__notice">Você não será cobrado ainda — confirmamos pelo WhatsApp.</p>
                <p class="apartment-detail__phone">
                  <a href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a>
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div class="apartment-detail__modal" data-gallery-modal hidden>
          <div class="apartment-detail__modal-bar">
            <p>Todas as fotos · ${apt.name}</p>
            <button type="button" data-gallery-close aria-label="Fechar galeria">Fechar</button>
          </div>
          <div class="apartment-detail__modal-grid">
            ${images.map((img) => `
              <figure>${pictureHtml(img.src, img.alt)}</figure>
            `).join('')}
          </div>
        </div>
      </article>
    `;

    this._bind(apt, waBase);
  }

  _bind(apt, waBase) {
    const form = this.querySelector('[data-booking-form]');
    const checkin = this.querySelector('[data-checkin]');
    const checkout = this.querySelector('[data-checkout]');
    const guests = this.querySelector('[data-guests]');
    const modal = this.querySelector('[data-gallery-modal]');

    checkin?.addEventListener('change', () => {
      if (!checkin.value || !checkout) return;
      const minOut = addDaysISO(checkin.value, 1);
      checkout.min = minOut;
      if (!checkout.value || checkout.value <= checkin.value) checkout.value = minOut;
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = `${waBase} Check-in: ${checkin?.value || 'a combinar'}. Check-out: ${checkout?.value || 'a combinar'}. Hóspedes: ${guests?.value || '2'}.`;
      window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
    });

    this.querySelector('[data-gallery-open]')?.addEventListener('click', () => {
      if (!modal) return;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    });

    this.querySelector('[data-gallery-close]')?.addEventListener('click', () => {
      if (!modal) return;
      modal.hidden = true;
      document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
      }
    });
  }
}

customElements.define('rf-apartment-detail', RFApartmentDetail);

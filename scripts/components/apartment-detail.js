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

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(`${checkIn}T12:00:00`);
  const b = new Date(`${checkOut}T12:00:00`);
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
}

function parseBRL(value) {
  if (!value) return null;
  const n = Number(String(value).replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function formatBRL(n) {
  return `R$ ${Number(n).toLocaleString('pt-BR')}`;
}

function aptTypeLabel(apt) {
  if (apt.bedrooms <= 1 && /studio/i.test(`${apt.name} ${apt.badge || ''}`)) return 'Studio';
  if (apt.bedrooms <= 1) return '1 quarto';
  return `${apt.bedrooms} quartos`;
}

function nearbyFor(apt) {
  if (apt.nearby?.length) return apt.nearby;
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

function houseRulesFor(apt) {
  if (apt.houseRules?.length) return apt.houseRules;
  return [
    apt.checkIn ? `Check-in: ${apt.checkIn}` : 'Check-in e check-out combinados na reserva',
    apt.checkOut ? `Check-out: ${apt.checkOut}` : null,
    `Máximo de ${apt.guests} hóspedes`,
    'Sem festas ou eventos',
    apt.petFriendly ? 'Pets sob pedido / combinado prévio' : 'Pets sob consulta',
    'Silêncio entre 22h e 7h',
  ].filter(Boolean);
}

function highlightsFor(apt) {
  if (apt.highlights?.length) return apt.highlights;
  return [
    { title: 'Fotos reais', text: 'O que você vê aqui é o que encontra na chegada.' },
    { title: 'Localização', text: apt.tagline },
    { title: 'Reserva direta', text: 'Fale conosco no WhatsApp — sem intermediário.' },
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
    const n = getNeighborhood(apt.neighborhoodSlug);
    const priceNight = parseBRL(apt.priceFrom);
    const cleaningFee = Number(apt.cleaningFee) || 0;
    const priceLabel = apt.priceFrom || 'Sob consulta';
    const priceNote = apt.priceFrom ? (apt.priceNote || '/noite') : '';
    const minIn = todayISO();
    const defaultOut = addDaysISO(minIn, 3);
    const nearby = nearbyFor(apt);
    const highlights = highlightsFor(apt);
    const hasReviews = apt.reviewCount > 0;
    const maxGuests = apt.guests || 2;
    const typeLabel = aptTypeLabel(apt);
    const rules = houseRulesFor(apt);
    const paragraphs = apt.descriptionParagraphs?.length
      ? apt.descriptionParagraphs
      : [];
    const defaultNights = 3;
    const defaultSub = priceNight != null ? priceNight * defaultNights : 0;
    const defaultTotal = defaultSub + cleaningFee;

    const decorMotifs = apt.neighborhoodSlug === 'pina'
      ? ['shell', 'surfboards', 'sun']
      : ['starfish', 'shell', 'surfboards'];

    this.innerHTML = `
      <article class="apartment-detail">
        ${beachDecorLayer(decorMotifs, 'soft')}

        <div class="container">
          <header class="apartment-detail__title">
            <p class="apartment-detail__eyebrow">${apt.neighborhood} · ${typeLabel}</p>
            <h1>${apt.name}</h1>
            <div class="apartment-detail__meta-row">
              <p class="apartment-detail__rating">
                <strong>${apt.rating.toFixed(1)}</strong>
                <span>${hasReviews
                  ? `${apt.ratingLabel ? `${apt.ratingLabel} · ` : ''}${apt.reviewCount} avaliações`
                  : 'Reserva direta'}</span>
              </p>
              <a class="apartment-detail__place" href="#localizacao">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                ${apt.neighborhood}, Recife — PE
              </a>
            </div>
            <p class="apartment-detail__tagline">${apt.tagline}</p>
          </header>

          <section class="apt-slideshow" data-slideshow aria-roledescription="carrossel" aria-label="Galeria de fotos do imóvel">
            <div class="apt-slideshow__stage">
              <div class="apt-slideshow__track" data-slideshow-track>
                ${images.map((img, i) => `
                  <figure class="apt-slideshow__slide${i === 0 ? ' is-active' : ''}" data-slide="${i}" ${i === 0 ? '' : 'aria-hidden="true"'}>
                    ${pictureHtml(img.src, img.alt, i < 2)}
                  </figure>
                `).join('')}
              </div>

              <button type="button" class="apt-slideshow__nav apt-slideshow__nav--prev" data-slideshow-prev aria-label="Foto anterior">‹</button>
              <button type="button" class="apt-slideshow__nav apt-slideshow__nav--next" data-slideshow-next aria-label="Próxima foto">›</button>

              <div class="apt-slideshow__ui">
                <span class="apt-slideshow__count" data-slideshow-count>1 / ${images.length}</span>
                <button type="button" class="apt-slideshow__toggle" data-slideshow-toggle aria-label="Pausar slideshow" aria-pressed="false">❚❚</button>
                <button type="button" class="apt-slideshow__all" data-gallery-open data-gallery-index="0">
                  Ver todas (${images.length})
                </button>
              </div>
            </div>

            <div class="apt-slideshow__thumbs" role="tablist" aria-label="Miniaturas">
              ${images.slice(0, Math.min(8, images.length)).map((img, i) => `
                <button type="button" class="apt-slideshow__thumb${i === 0 ? ' is-active' : ''}" data-slideshow-goto="${i}" aria-label="Ir para foto ${i + 1}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}">
                  ${pictureHtml(img.src, '', false)}
                </button>
              `).join('')}
              ${images.length > 8 ? `
                <button type="button" class="apt-slideshow__thumb apt-slideshow__thumb--more" data-gallery-open data-gallery-index="8" aria-label="Ver mais fotos">
                  +${images.length - 8}
                </button>
              ` : ''}
            </div>
          </section>
        </div>

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
          <div class="apartment-detail__layout">
            <div class="apartment-detail__main">
              <section class="apartment-detail__block" id="visao-geral">
                <h2>Sobre este espaço</h2>
                <p class="apartment-detail__facts">
                  ${apt.guests} hóspedes · ${apt.bedrooms} quarto${apt.bedrooms > 1 ? 's' : ''} · ${apt.bedDetail || `${apt.beds} cama${apt.beds > 1 ? 's' : ''}`} · ${apt.bathrooms} banheiro${apt.bathrooms > 1 ? 's' : ''}${apt.size ? ` · ${apt.size}` : ''}
                </p>
                <ul class="apartment-detail__highlights">
                  ${highlights.map((h) => `
                    <li>
                      <strong>${h.title}</strong>
                      <span>${h.text}</span>
                    </li>
                  `).join('')}
                </ul>
                <div class="apartment-detail__description">
                  <p>${apt.description}</p>
                  ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
                  ${apt.building ? `<p class="apartment-detail__address">${apt.building}</p>` : ''}
                </div>
              </section>

              <section class="apartment-detail__block" id="comodidades">
                <h2>O que este lugar oferece</h2>
                <ul class="apartment-detail__amenities">
                  ${apt.amenities.map((a) => `<li>${a}</li>`).join('')}
                </ul>
              </section>

              <section class="apartment-detail__block" id="avaliacoes">
                <h2>${hasReviews ? `${apt.rating.toFixed(1)} · ${apt.reviewCount} avaliações` : 'Avaliações'}</h2>
                ${hasReviews ? `
                  ${apt.reviewScores?.length ? `
                    <ul class="apartment-detail__scoreboard">
                      ${apt.reviewScores.map((s) => `
                        <li>
                          <span>${s.label}</span>
                          <div class="apartment-detail__score-bar" aria-hidden="true">
                            <i style="--score:${Math.min(100, (Number(s.score) / 10) * 100)}%"></i>
                          </div>
                          <strong>${Number(s.score).toFixed(1)}</strong>
                        </li>
                      `).join('')}
                    </ul>
                  ` : ''}
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
                ` : `
                  <p class="apartment-detail__muted">Ainda estamos reunindo avaliações públicas deste imóvel. Fale no WhatsApp para tirar dúvidas e ver disponibilidade.</p>
                `}
              </section>

              <section class="apartment-detail__block" id="localizacao">
                <h2>Onde você vai ficar</h2>
                <p class="apartment-detail__muted">${apt.neighborhood}, Recife — Pernambuco. Endereço aproximado para referência; o completo é enviado após a confirmação da reserva.</p>
                <div class="apartment-detail__map">
                  <iframe
                    title="Mapa — ${apt.name}"
                    src="${MAPS_EMBED_URL}"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                </div>
                <h3 class="apartment-detail__subhead">O que há por perto</h3>
                <ul class="apartment-detail__nearby">
                  ${nearby.map((p) => `
                    <li>
                      <strong>${p.title}</strong>
                      <span>${p.meta}</span>
                    </li>
                  `).join('')}
                </ul>
                <p class="apartment-detail__map-links">
                  <a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">Google Maps</a>
                  <a href="${MAPS_LINKS.directions}" target="_blank" rel="noopener noreferrer">Como chegar</a>
                  <a href="${MAPS_LINKS.waze}" target="_blank" rel="noopener noreferrer">Waze</a>
                </p>
                ${n ? `<a class="btn btn--secondary btn--sm" href="${pageHref(n.pageUrl)}">Ver mais em ${n.name}</a>` : ''}
              </section>

              <section class="apartment-detail__block" id="regras">
                <h2>O que você precisa saber</h2>
                <div class="apartment-detail__rules">
                  <div>
                    <h3>Regras da casa</h3>
                    <ul>
                      ${rules.map((r) => `<li>${r}</li>`).join('')}
                    </ul>
                  </div>
                  <div>
                    <h3>Horários</h3>
                    <p>Check-in: ${apt.checkIn || 'combinado na reserva'} · Check-out: ${apt.checkOut || 'combinado na reserva'}</p>
                    ${apt.damageDeposit ? `<p>Caução: ${apt.damageDeposit}</p>` : ''}
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
                  ${priceNight != null
                    ? `<strong>${priceLabel}</strong><span>${priceNote}</span>`
                    : `<strong class="apartment-detail__booking-price--consult">Sob consulta</strong>`}
                </p>
                ${hasReviews
                  ? `<p class="apartment-detail__booking-rating">${apt.rating.toFixed(1)} · ${apt.reviewCount} avaliações</p>`
                  : `<p class="apartment-detail__booking-rating">Reserva direta com a anfitriã</p>`}

                <form class="apartment-detail__form" data-booking-form>
                  <div class="apartment-detail__dates">
                    <label>
                      <span>Check-in</span>
                      <input type="date" name="checkin" min="${minIn}" value="${minIn}" required data-checkin>
                    </label>
                    <label>
                      <span>Check-out</span>
                      <input type="date" name="checkout" min="${defaultOut}" value="${defaultOut}" required data-checkout>
                    </label>
                  </div>

                  <div class="apartment-detail__guests">
                    <label>
                      <span>Adultos</span>
                      <select name="adults" data-adults aria-label="Adultos">
                        ${Array.from({ length: maxGuests }, (_, i) => {
                          const v = i + 1;
                          const selected = v === Math.min(2, maxGuests);
                          return `<option value="${v}"${selected ? ' selected' : ''}>${v}</option>`;
                        }).join('')}
                      </select>
                    </label>
                    <label>
                      <span>Crianças</span>
                      <select name="children" data-children aria-label="Crianças">
                        ${Array.from({ length: maxGuests }, (_, i) => `
                          <option value="${i}"${i === 0 ? ' selected' : ''}>${i}</option>
                        `).join('')}
                      </select>
                    </label>
                  </div>
                  <p class="apartment-detail__guest-hint">Máx. ${maxGuests} hóspedes · crianças contam na capacidade</p>

                  ${priceNight != null ? `
                    <div class="apartment-detail__breakdown" data-breakdown>
                      <div class="apartment-detail__price-row">
                        <span data-line-nights>${priceLabel} × ${defaultNights} noites</span>
                        <strong data-line-subtotal>${formatBRL(defaultSub)}</strong>
                      </div>
                      ${cleaningFee > 0 ? `
                        <div class="apartment-detail__price-row">
                          <span>Taxa de limpeza</span>
                          <strong>${formatBRL(cleaningFee)}</strong>
                        </div>
                      ` : ''}
                      <div class="apartment-detail__price-row apartment-detail__price-row--total">
                        <span>Total estimado</span>
                        <strong data-line-total>${formatBRL(defaultTotal)}</strong>
                      </div>
                    </div>
                  ` : `
                    <p class="apartment-detail__consult">
                      Valores sob consulta conforme datas e temporada. Envie sua solicitação no WhatsApp.
                    </p>
                  `}

                  <button type="submit" class="btn btn--primary apartment-detail__wa">
                    ${WHATSAPP_ICON_SVG}
                    Solicitar reserva
                  </button>
                </form>

                <p class="apartment-detail__notice">Você não será cobrado ainda — confirmamos disponibilidade e valores no WhatsApp.</p>
                <p class="apartment-detail__phone">
                  <a href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a>
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div class="apartment-detail__modal" data-gallery-modal hidden>
          <div class="apartment-detail__modal-bar">
            <p data-lightbox-label>Foto 1 / ${images.length} · ${apt.name}</p>
            <button type="button" data-gallery-close aria-label="Fechar galeria">Fechar</button>
          </div>
          <div class="apartment-detail__lightbox" data-lightbox>
            <button type="button" class="apartment-detail__lightbox-nav apartment-detail__lightbox-nav--prev" data-lightbox-prev aria-label="Anterior">‹</button>
            <div class="apartment-detail__lightbox-stage" data-lightbox-stage>
              ${pictureHtml(images[0]?.src || '', images[0]?.alt || '', true)}
            </div>
            <button type="button" class="apartment-detail__lightbox-nav apartment-detail__lightbox-nav--next" data-lightbox-next aria-label="Próxima">›</button>
          </div>
        </div>
      </article>
    `;

    this.#bindTabs();
    this.#bindBooking(apt, priceNight, cleaningFee);
    this.#bindSlideshow(images);
    this.#bindGallery(images);
  }

  #bindTabs() {
    const nav = this.querySelector('.apartment-detail__tabs');
    if (!nav) return;
    const links = [...nav.querySelectorAll('a')];
    const sections = links
      .map((a) => this.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const setActive = () => {
      const y = window.scrollY + 140;
      let current = sections[0];
      for (const s of sections) {
        if (s.offsetTop <= y) current = s;
      }
      links.forEach((a) => {
        a.classList.toggle('is-active', Boolean(current && a.getAttribute('href') === `#${current.id}`));
      });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  #bindBooking(apt, priceNight, cleaningFee) {
    const form = this.querySelector('[data-booking-form]');
    const checkin = this.querySelector('[data-checkin]');
    const checkout = this.querySelector('[data-checkout]');
    const adults = this.querySelector('[data-adults]');
    const children = this.querySelector('[data-children]');
    const lineNights = this.querySelector('[data-line-nights]');
    const lineSubtotal = this.querySelector('[data-line-subtotal]');
    const lineTotal = this.querySelector('[data-line-total]');
    const maxGuests = apt.guests || 2;

    const update = () => {
      if (!checkin || !checkout) return;
      if (checkout.value <= checkin.value) {
        checkout.value = addDaysISO(checkin.value, 1);
      }
      checkout.min = addDaysISO(checkin.value, 1);

      let a = Number(adults?.value) || 1;
      let c = Number(children?.value) || 0;
      if (a + c > maxGuests) {
        c = Math.max(0, maxGuests - a);
        if (children) children.value = String(c);
      }

      const nights = nightsBetween(checkin.value, checkout.value);
      if (priceNight != null && lineNights && lineSubtotal && lineTotal) {
        const sub = priceNight * nights;
        lineNights.textContent = `${apt.priceFrom} × ${nights} noite${nights === 1 ? '' : 's'}`;
        lineSubtotal.textContent = formatBRL(sub);
        lineTotal.textContent = formatBRL(sub + cleaningFee);
      }
    };

    form?.addEventListener('change', update);
    form?.addEventListener('input', update);
    update();

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nights = nightsBetween(checkin.value, checkout.value);
      const a = Number(adults?.value) || 1;
      const c = Number(children?.value) || 0;
      const guests = a + c;
      let msg = `Olá! Quero reservar o ${apt.name}.\nCheck-in: ${checkin.value}\nCheck-out: ${checkout.value}\nNoites: ${nights}\nHóspedes: ${guests} (${a} adulto${a > 1 ? 's' : ''}${c ? `, ${c} criança${c > 1 ? 's' : ''}` : ''})`;
      if (priceNight != null) {
        msg += `\nTotal estimado: ${formatBRL(priceNight * nights + cleaningFee)}`;
      } else {
        msg += `\nValor: sob consulta`;
      }
      window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
    });
  }

  #bindSlideshow(images) {
    const root = this.querySelector('[data-slideshow]');
    if (!root || images.length < 2) return;

    const slides = [...root.querySelectorAll('[data-slide]')];
    const thumbs = [...root.querySelectorAll('[data-slideshow-goto]')];
    const countEl = root.querySelector('[data-slideshow-count]');
    const toggleBtn = root.querySelector('[data-slideshow-toggle]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const INTERVAL = 2800;
    let index = 0;
    let timer = null;
    let playing = !reduced;

    const render = () => {
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      thumbs.forEach((thumb) => {
        const i = Number(thumb.dataset.slideshowGoto);
        const on = i === index;
        thumb.classList.toggle('is-active', on);
        thumb.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (countEl) countEl.textContent = `${index + 1} / ${images.length}`;
    };

    const goTo = (next) => {
      index = (next + images.length) % images.length;
      render();
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      stop();
      if (!playing || reduced) return;
      timer = window.setInterval(() => goTo(index + 1), INTERVAL);
    };

    const setPlaying = (on) => {
      playing = on && !reduced;
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', playing ? 'false' : 'true');
        toggleBtn.setAttribute('aria-label', playing ? 'Pausar slideshow' : 'Reproduzir slideshow');
        toggleBtn.textContent = playing ? '❚❚' : '▶';
      }
      if (playing) start();
      else stop();
    };

    root.querySelector('[data-slideshow-prev]')?.addEventListener('click', () => {
      goTo(index - 1);
      if (playing) start();
    });
    root.querySelector('[data-slideshow-next]')?.addEventListener('click', () => {
      goTo(index + 1);
      if (playing) start();
    });
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        goTo(Number(thumb.dataset.slideshowGoto) || 0);
        if (playing) start();
      });
    });
    toggleBtn?.addEventListener('click', () => setPlaying(!playing));

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', () => {
      if (playing) start();
    });
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget) && playing) start();
    });

    // Pause when lightbox opens / page hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (playing) start();
    });

    render();
    setPlaying(playing);
    this._slideshowStop = stop;
  }

  #bindGallery(images) {
    const modal = this.querySelector('[data-gallery-modal]');
    const stage = this.querySelector('[data-lightbox-stage]');
    const label = this.querySelector('[data-lightbox-label]');
    if (!modal || !stage) return;

    let index = 0;

    const paint = () => {
      const img = images[index];
      if (!img) return;
      stage.innerHTML = pictureHtml(img.src, img.alt, true);
      if (label) label.textContent = `Foto ${index + 1} / ${images.length}`;
    };

    const openGallery = (startAt = 0) => {
      index = Math.max(0, Math.min(images.length - 1, startAt));
      paint();
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      this._slideshowStop?.();
    };

    const closeGallery = () => {
      modal.hidden = true;
      document.body.style.overflow = '';
    };

    this.querySelectorAll('[data-gallery-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openGallery(Number(btn.dataset.galleryIndex) || 0);
      });
    });

    // Click active slide opens lightbox
    this.querySelector('[data-slideshow-track]')?.addEventListener('click', () => {
      const active = this.querySelector('.apt-slideshow__slide.is-active');
      openGallery(Number(active?.dataset.slide) || 0);
    });

    this.querySelector('[data-gallery-close]')?.addEventListener('click', closeGallery);
    this.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      paint();
    });
    this.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {
      index = (index + 1) % images.length;
      paint();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGallery();
    });

    window.addEventListener('keydown', (e) => {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') {
        index = (index - 1 + images.length) % images.length;
        paint();
      }
      if (e.key === 'ArrowRight') {
        index = (index + 1) % images.length;
        paint();
      }
    });
  }
}

customElements.define('rf-apartment-detail', RFApartmentDetail);

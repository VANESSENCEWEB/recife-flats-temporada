/**
 * <rf-testimonials-section> — Depoimentos / prova social.
 */

import { FALLBACK_REVIEWS, MAPS_LINKS } from '../data/location.js';

class RFTestimonialsSection extends HTMLElement {
  connectedCallback() {
    const quotes = [
      {
        text: 'Apartamento limpo, bem localizado e atendimento rápido no WhatsApp. Voltaria sem pensar.',
        author: 'Hóspede · Google',
      },
      {
        text: 'Fotos batem com a realidade. Ficamos perto da praia e resolvemos tudo a pé.',
        author: 'Casal · Boa Viagem',
      },
      {
        text: 'Perfeito para família — espaço bom, ar-condicionado e comunicação clara na reserva.',
        author: 'Família · Temporada',
      },
    ];

    this.innerHTML = `
      <section class="home-section testimonials" aria-labelledby="testimonials-title">
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Quem já ficou</span>
            <h2 id="testimonials-title">Nota <em>${FALLBACK_REVIEWS.rating}</em> no Google</h2>
            <p>Reserva direta com quem cuida dos imóveis — feedback real de estadias em Recife.</p>
          </header>

          <ul class="testimonials__list">
            ${quotes.map((q) => `
              <li class="testimonials__item">
                <blockquote>
                  <p>“${q.text}”</p>
                  <footer>${q.author}</footer>
                </blockquote>
              </li>
            `).join('')}
          </ul>

          <div class="home-section__cta">
            <a class="btn btn--ghost" href="${MAPS_LINKS.reviews}" target="_blank" rel="noopener noreferrer">
              Ver avaliações no Google
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-testimonials-section', RFTestimonialsSection);

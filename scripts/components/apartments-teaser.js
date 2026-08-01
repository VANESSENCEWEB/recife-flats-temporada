/**
 * <rf-apartments-teaser> — Grade resumida dos imóveis na home.
 */

import { APARTAMENTOS } from '../data/apartamentos.js';
import { pageHref } from '../utils/paths.js';
import './apartment-card.js';

class RFApartmentsTeaser extends HTMLElement {
  connectedCallback() {
    const list = APARTAMENTOS.slice(0, 4);

    this.innerHTML = `
      <section class="home-section apartments-teaser" id="apartamentos" aria-labelledby="apartments-teaser-title">
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Nossa coleção</span>
            <h2 id="apartments-teaser-title">Apartamentos pra <em>temporada</em> em Recife</h2>
            <p>Quatro imóveis mobiliados em Boa Viagem e Pina — fotos reais, reserva direta.</p>
          </header>

          <div class="apartments-teaser__grid">
            ${list.map((apt) => `<rf-apartment-card slug="${apt.slug}"></rf-apartment-card>`).join('')}
          </div>

          <div class="home-section__cta">
            <a class="btn btn--secondary" href="${pageHref('./apartamentos.html')}">Ver todos os apartamentos</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-apartments-teaser', RFApartmentsTeaser);

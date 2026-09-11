/**
 * <rf-neighborhood-hub> — Página de bairro com intro + lista de imóveis.
 *
 * Uso:
 *   <rf-neighborhood-hub slug="boa-viagem"></rf-neighborhood-hub>
 */

import { getNeighborhood } from '../data/site-structure.js';
import { beachDecorLayer } from '../data/beach-decor.js';
import './apartments-hub.js';

class RFNeighborhoodHub extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug') || '';
    const n = getNeighborhood(slug);

    if (!n) {
      this.innerHTML = `<p class="neighborhood-hub__missing">Bairro não encontrado.</p>`;
      return;
    }

    const motifs = slug === 'pina'
      ? ['shell', 'surfboards', 'sun']
      : ['starfish', 'surfboards', 'sun'];

    this.innerHTML = `
      <section class="neighborhood-hub">
        ${beachDecorLayer(motifs, 'soft')}
        <header class="page-header">
          <div class="container">
            <span class="eyebrow">Bairro</span>
            <h1>Apartamentos em <em class="display-italic">${n.name}</em></h1>
            <p class="page-header__lead">${n.intro}</p>
            <ul class="neighborhood-hub__highlights">
              ${n.highlights.map((h) => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </header>
        <div class="container">
          <rf-apartments-hub neighborhood="${slug}"></rf-apartments-hub>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-neighborhood-hub', RFNeighborhoodHub);

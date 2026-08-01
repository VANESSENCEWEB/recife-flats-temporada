/**
 * <rf-amenities-section> — Comodidades recorrentes nos flats.
 */

import { beachDecorLayer } from '../data/beach-decor.js';

class RFAmenitiesSection extends HTMLElement {
  connectedCallback() {
    const items = [
      'Wi-Fi estável',
      'Cozinha equipada',
      'Ar-condicionado',
      'Roupa de cama e banho',
      'Estacionamento (conforme unidade)',
      'Piscina em unidades selecionadas',
    ];

    this.innerHTML = `
      <section class="home-section amenities-section" aria-labelledby="amenities-title">
        ${beachDecorLayer(['shell', 'wave', 'sun'], 'soft')}
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Estrutura</span>
            <h2 id="amenities-title">O que você encontra nos <em>flats</em></h2>
            <p>Mobiliados e prontos pra usar — do check-in ao café da manhã.</p>
          </header>
          <ul class="amenities-section__list">
            ${items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-amenities-section', RFAmenitiesSection);

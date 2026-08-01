/**
 * <rf-location-section> — Bairros + mapa / benefícios.
 */

import { LOCATION_BENEFITS, MAPS_EMBED_URL, MAPS_LINKS } from '../data/location.js';
import { pageHref } from '../utils/paths.js';

class RFLocationSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="home-section location-section" id="localizacao" aria-labelledby="location-title">
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Onde ficamos</span>
            <h2 id="location-title">Boa Viagem e <em>Pina</em></h2>
            <p>Duas bases práticas em Recife — praia, compras e deslocamento fácil.</p>
          </header>

          <div class="location-section__grid">
            <div class="location-section__benefits">
              ${LOCATION_BENEFITS.map((b) => `
                <article class="location-section__benefit" data-neighborhood="${b.id === 'pratico' ? '' : b.id}">
                  <h3>${b.title}</h3>
                  <p>${b.description}</p>
                  <ul>
                    ${b.items.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
                  ${b.id === 'boa-viagem' ? `<a href="${pageHref('./boa-viagem.html')}">Ver Boa Viagem</a>` : ''}
                  ${b.id === 'pina' ? `<a href="${pageHref('./pina.html')}">Ver Pina</a>` : ''}
                </article>
              `).join('')}
            </div>

            <div class="location-section__map">
              <iframe
                title="Mapa — Recife Flats Temporada"
                src="${MAPS_EMBED_URL}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              ></iframe>
              <a class="location-section__map-link" href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-location-section', RFLocationSection);

/**
 * <rf-footer> — Rodapé do site.
 */

import { BUSINESS, whatsappUrl, MAPS_LINKS } from '../data/location.js';
import { pageHref } from '../data/site-structure.js';

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="footer">
        <div class="footer__inner container">
          <div class="footer__brand">
            <a href="${pageHref('./index.html')}" class="footer__logo">Recife Flats <span>Temporada</span></a>
            <p class="footer__tagline">Apartamentos mobiliados em Boa Viagem e Pina — reserva direta, sem surpresa.</p>
          </div>

          <nav class="footer__nav" aria-label="Rodapé">
            <div class="footer__col">
              <h2 class="footer__heading">Explorar</h2>
              <ul>
                <li><a href="${pageHref('./apartamentos.html')}">Apartamentos</a></li>
                <li><a href="${pageHref('./boa-viagem.html')}">Boa Viagem</a></li>
                <li><a href="${pageHref('./pina.html')}">Pina</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h2 class="footer__heading">Contato</h2>
              <ul>
                <li><a href="${whatsappUrl('Olá! Quero reservar um apartamento.')}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
                <li><a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">Ver no Maps</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="footer__bottom">
          <div class="container">
            <p>© ${year} ${BUSINESS.name}. Recife — PE.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('rf-footer', RFFooter);

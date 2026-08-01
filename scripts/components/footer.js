/**
 * <rf-footer> — Rodapé praia (azul orla + sol).
 */

import { APARTAMENTOS } from '../data/apartamentos.js';
import { BUSINESS, whatsappUrl, MAPS_LINKS, FALLBACK_REVIEWS } from '../data/location.js';
import { apartmentUrl, pageHref } from '../data/site-structure.js';

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const apts = APARTAMENTOS.slice(0, 4);
    const wa = whatsappUrl('Olá! Quero reservar um apartamento.');

    this.innerHTML = `
      <footer class="footer">
        <div class="footer__inner container">
          <div class="footer__brand">
            <a href="${pageHref('./index.html')}" class="footer__logo" aria-label="Recife Flats Temporada">
              <span class="footer__logo-recife">Recife</span>
              <span class="footer__logo-flats">Flats</span>
              <span class="footer__logo-temp">Temporada</span>
            </a>
            <p class="footer__tagline">
              Apartamentos mobiliados em Boa Viagem e Pina — perto da praia, reserva direta, sem surpresa.
            </p>
            <ul class="footer__trust">
              <li><strong>${FALLBACK_REVIEWS.rating}</strong> no Google</li>
              <li>Pagamento seguro</li>
              <li>Suporte no WhatsApp</li>
            </ul>
          </div>

          <nav class="footer__nav" aria-label="Rodapé">
            <div class="footer__col">
              <h2 class="footer__heading">Apartamentos</h2>
              <ul>
                ${apts.map((apt) => `
                  <li><a href="${apartmentUrl(apt.slug)}">${apt.shortName}</a></li>
                `).join('')}
                <li><a class="footer__link-accent" href="${pageHref('./apartamentos.html')}">Ver todos os apartamentos</a></li>
              </ul>
            </div>

            <div class="footer__col">
              <h2 class="footer__heading">Informações</h2>
              <ul>
                <li><a href="${wa}" target="_blank" rel="noopener noreferrer">Como reservar</a></li>
                <li><a href="${pageHref('./index.html')}#faq">Check-in / Check-out</a></li>
                <li><a href="${pageHref('./index.html')}#faq">Perguntas frequentes</a></li>
                <li><a href="${pageHref('./index.html')}#localizacao">Localização</a></li>
              </ul>
            </div>

            <div class="footer__col">
              <h2 class="footer__heading">Conheça Recife</h2>
              <ul>
                <li><a href="${pageHref('./boa-viagem.html')}">Boa Viagem</a></li>
                <li><a href="${pageHref('./pina.html')}">Pina</a></li>
                <li><a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">Ver no Maps</a></li>
              </ul>
            </div>

            <div class="footer__col footer__col--support">
              <h2 class="footer__heading">Suporte</h2>
              <ul class="footer__support">
                <li>
                  <a href="${wa}" target="_blank" rel="noopener noreferrer">
                    <span>WhatsApp</span>
                    <strong>${BUSINESS.phoneDisplay}</strong>
                  </a>
                </li>
                <li>
                  <a href="mailto:${BUSINESS.email}">
                    <span>E-mail</span>
                    <strong>${BUSINESS.email}</strong>
                  </a>
                </li>
                <li>
                  <a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">
                    <span>Localização</span>
                    <strong>Boa Viagem, Recife — PE</strong>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="footer__meta container">
          <p class="footer__payments-label">Aceitamos</p>
          <ul class="footer__payments" aria-label="Formas de pagamento">
            <li>PIX</li>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Transferência</li>
          </ul>
          <div class="footer__socials">
            <a href="${wa}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://instagram.com/recifeflats" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:${BUSINESS.email}">E-mail</a>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="container footer__bottom-inner">
            <p>
              © ${year} ${BUSINESS.name}. Todos os direitos reservados.
              <span class="footer__credit">Desenvolvido por <a href="https://vanessenceweb.com" target="_blank" rel="noopener noreferrer">VanessenceWeb</a></span>
            </p>
            <p class="footer__address">${BUSINESS.streetAddress} — ${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('rf-footer', RFFooter);

/**
 * <rf-booking-promo> — CTA final de reserva (faixa oceano).
 */

import { whatsappUrl } from '../data/location.js';
import { pageHref } from '../utils/paths.js';

class RFBookingPromo extends HTMLElement {
  connectedCallback() {
    const wa = whatsappUrl('Olá! Quero reservar um apartamento em Recife.');

    this.innerHTML = `
      <section class="home-section booking-promo" aria-labelledby="booking-promo-title">
        <div class="container booking-promo__inner">
          <span class="eyebrow">Pronto pra Recife?</span>
          <h2 id="booking-promo-title">Reserve seu flat com a <em>Recife Flats Temporada</em></h2>
          <p>Conte as datas e quantas pessoas — a gente responde com as melhores opções em Boa Viagem e Pina.</p>
          <div class="booking-promo__actions">
            <a class="btn btn--sun" href="${wa}" target="_blank" rel="noopener noreferrer">Reservar no WhatsApp</a>
            <a class="btn btn--outline" href="${pageHref('./apartamentos.html')}">Ver apartamentos</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-booking-promo', RFBookingPromo);

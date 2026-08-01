/**
 * <rf-reservation-steps> — Como reservar em 3 passos.
 */

import { beachDecorLayer } from '../data/beach-decor.js';

class RFReservationSteps extends HTMLElement {
  connectedCallback() {
    const steps = [
      {
        n: '01',
        title: 'Escolha o imóvel',
        text: 'Veja fotos reais, bairro e capacidade — Boa Viagem ou Pina.',
      },
      {
        n: '02',
        title: 'Fale no WhatsApp',
        text: 'Envie datas e número de hóspedes. Respondemos rápido com disponibilidade.',
      },
      {
        n: '03',
        title: 'Confirme a reserva',
        text: 'Combinamos check-in, pagamento e detalhes da estadia — sem surpresa.',
      },
    ];

    this.innerHTML = `
      <section class="home-section reservation-steps" aria-labelledby="reservation-steps-title">
        ${beachDecorLayer(['starfish', 'shell', 'sun'], 'soft')}
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Simples e direto</span>
            <h2 id="reservation-steps-title">Como <em>reservar</em></h2>
            <p>Três passos. Sem plataforma no meio.</p>
          </header>
          <ol class="reservation-steps__list">
            ${steps.map((s) => `
              <li class="reservation-steps__item">
                <span class="reservation-steps__n" aria-hidden="true">${s.n}</span>
                <h3>${s.title}</h3>
                <p>${s.text}</p>
              </li>
            `).join('')}
          </ol>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-reservation-steps', RFReservationSteps);

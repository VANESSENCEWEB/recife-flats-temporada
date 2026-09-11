/**
 * <rf-why-choose-section> — Diferenciais da hospedagem.
 */

import { beachDecorLayer } from '../data/beach-decor.js';

class RFWhyChooseSection extends HTMLElement {
  connectedCallback() {
    const items = [
      {
        title: 'Fotos reais',
        text: 'O que você vê no site é o que encontra na chegada.',
      },
      {
        title: 'Reserva direta',
        text: 'Fale com quem cuida dos imóveis — atendimento humano no WhatsApp.',
      },
      {
        title: 'Localização boa',
        text: 'Boa Viagem perto da praia e Pina ao lado do RioMar.',
      },
    ];

    this.innerHTML = `
      <section class="home-section why-choose" aria-labelledby="why-choose-title">
        ${beachDecorLayer(['surfboards', 'shell', 'starfish'], 'ink')}
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Por que nós</span>
            <h2 id="why-choose-title">Hospedagem com <em>cara de casa</em></h2>
            <p>Menos fricção, mais clareza — do primeiro contato à chave na mão.</p>
          </header>
          <ul class="why-choose__list">
            ${items.map((item) => `
              <li>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-why-choose-section', RFWhyChooseSection);

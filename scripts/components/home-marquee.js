/**
 * <rf-home-marquee> — Faixa contínua de destaque abaixo do hero.
 */

class RFHomeMarquee extends HTMLElement {
  connectedCallback() {
    const items = [
      'Fotos reais dos imóveis',
      'Reserva direta no WhatsApp',
      'Boa Viagem e Pina',
      'Wi-Fi incluso',
      'Check-in flexível',
      'Suporte durante a estadia',
    ];
    const track = [...items, ...items].map((t) => `<span class="home-marquee__item">${t}</span>`).join('');

    this.innerHTML = `
      <div class="home-marquee" aria-hidden="true">
        <div class="home-marquee__track">${track}</div>
      </div>
    `;
  }
}

customElements.define('rf-home-marquee', RFHomeMarquee);

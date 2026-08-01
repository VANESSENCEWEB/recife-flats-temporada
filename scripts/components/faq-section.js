/**
 * <rf-faq-section> — Perguntas frequentes.
 */

class RFFaqSection extends HTMLElement {
  connectedCallback() {
    const faqs = [
      {
        q: 'Como faço a reserva?',
        a: 'Escolha o apartamento, envie as datas pelo WhatsApp e confirmamos disponibilidade, valores e check-in.',
      },
      {
        q: 'As fotos são reais?',
        a: 'Sim. As fotos do site são dos próprios imóveis — o que você vê é o que encontra na chegada.',
      },
      {
        q: 'Tem estacionamento?',
        a: 'Depende da unidade: algumas têm vaga rotativa, outras vaga fixa. Veja os detalhes de cada apartamento.',
      },
      {
        q: 'Aceita pets?',
        a: 'Em unidades selecionadas, com combinado prévio. Informe no WhatsApp antes de confirmar.',
      },
      {
        q: 'Qual o horário de check-in e check-out?',
        a: 'Em geral check-in à tarde e check-out pela manhã. Combinamos o horário exato na confirmação da reserva.',
      },
    ];

    this.innerHTML = `
      <section class="home-section faq-section" id="faq" aria-labelledby="faq-title">
        <div class="container">
          <header class="home-section__header">
            <span class="eyebrow">Dúvidas</span>
            <h2 id="faq-title">Perguntas <em>frequentes</em></h2>
            <p>Respostas rápidas antes de falar com a gente.</p>
          </header>

          <div class="faq-section__list">
            ${faqs.map((item, i) => `
              <details class="faq-section__item"${i === 0 ? ' open' : ''}>
                <summary>${item.q}</summary>
                <p>${item.a}</p>
              </details>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-faq-section', RFFaqSection);

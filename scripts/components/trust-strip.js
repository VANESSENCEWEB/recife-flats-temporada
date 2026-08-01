/**
 * <rf-trust-strip> — Provas rápidas de confiança.
 */

class RFTrustStrip extends HTMLElement {
  connectedCallback() {
    const items = [
      { value: '4.9', label: 'Nota no Google' },
      { value: '4', label: 'Apartamentos mobiliados' },
      { value: '100 m', label: 'Da praia (unidades selecionadas)' },
      { value: 'Direto', label: 'Sem intermediário' },
    ];

    this.innerHTML = `
      <section class="trust-strip" aria-label="Por que confiar">
        <div class="container trust-strip__inner">
          ${items.map((item) => `
            <div class="trust-strip__item">
              <strong>${item.value}</strong>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('rf-trust-strip', RFTrustStrip);

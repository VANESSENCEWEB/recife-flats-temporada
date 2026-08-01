/**
 * <rf-announcement> — Faixa superior de aviso / CTA rápido.
 *
 * Uso:
 *   <rf-announcement>Reserve direto pelo WhatsApp</rf-announcement>
 */

class RFAnnouncement extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;

    const content = this.innerHTML.trim() || this.textContent?.trim() || '';
    this.innerHTML = `
      <div class="announcement" role="region" aria-label="Aviso">
        <div class="announcement__inner container">
          <p class="announcement__text">${content}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('rf-announcement', RFAnnouncement);

/**
 * <rf-floating-whatsapp> — Botão flutuante de WhatsApp.
 */

import { whatsappUrl } from '../data/location.js';

class RFFloatingWhatsApp extends HTMLElement {
  connectedCallback() {
    const message =
      this.getAttribute('message') ||
      'Olá! Vim pelo site e quero saber sobre os apartamentos.';
    const href = whatsappUrl(message);

    this.innerHTML = `
      <a class="floating-whatsapp"
         href="${href}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Falar no WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.12 1.6 5.92L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.47-8.44ZM12.05 21.5h-.01a9.66 9.66 0 0 1-4.93-1.35l-.35-.21-3.8 1 1.01-3.7-.23-.38a9.66 9.66 0 0 1-1.48-5.15c0-5.34 4.35-9.68 9.7-9.68a9.63 9.63 0 0 1 6.85 2.84 9.6 9.6 0 0 1 2.84 6.84c0 5.34-4.35 9.69-9.7 9.69Zm5.32-7.25c-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.66.14-.19.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.14-.66-1.58-.9-2.17-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.17 3.01c.14.2 2.01 3.07 4.87 4.3.68.29 1.21.47 1.62.6.68.21 1.3.18 1.79.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.11-.26-.18-.55-.33Z"/>
        </svg>
        <span class="floating-whatsapp__label">WhatsApp</span>
      </a>
    `;
  }
}

customElements.define('rf-floating-whatsapp', RFFloatingWhatsApp);

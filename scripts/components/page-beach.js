/**
 * <rf-page-beach> — Camada de SVGs de praia no fundo da página/seção.
 *
 * Uso:
 *   <rf-page-beach motifs="starfish,shell,surfboards" variant="soft"></rf-page-beach>
 */

import { beachDecorLayer } from '../data/beach-decor.js';

class RFPageBeach extends HTMLElement {
  connectedCallback() {
    const raw = this.getAttribute('motifs') || 'starfish,shell,sun';
    const motifs = raw.split(',').map((m) => m.trim()).filter(Boolean);
    const variant = this.getAttribute('variant') || 'soft';
    this.innerHTML = beachDecorLayer(motifs, variant);
  }
}

customElements.define('rf-page-beach', RFPageBeach);

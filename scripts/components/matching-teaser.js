/**
 * <rf-matching-teaser> — Convite para achar o imóvel certo.
 */

import { pageHref } from '../utils/paths.js';
import { whatsappUrl } from '../data/location.js';
import { beachDecorLayer } from '../data/beach-decor.js';

class RFMatchingTeaser extends HTMLElement {
  connectedCallback() {
    const wa = whatsappUrl('Olá! Quero ajuda para escolher o apartamento ideal.');

    this.innerHTML = `
      <section class="home-section matching-teaser" aria-labelledby="matching-teaser-title">
        ${beachDecorLayer(['sun', 'shell', 'starfish'], 'soft')}
        <div class="container matching-teaser__inner">
          <div class="matching-teaser__copy">
            <span class="eyebrow">Não sabe qual escolher?</span>
            <h2 id="matching-teaser-title">A gente te ajuda a achar o flat certo</h2>
            <p>Conte quantas pessoas vão, as datas e o que importa pra você — praia, piscina, família ou trabalho remoto.</p>
            <div class="matching-teaser__actions">
              <a class="btn btn--primary" href="${wa}" target="_blank" rel="noopener noreferrer">Pedir indicação no WhatsApp</a>
              <a class="btn btn--ghost" href="${pageHref('./apartamentos.html')}">Comparar imóveis</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-matching-teaser', RFMatchingTeaser);

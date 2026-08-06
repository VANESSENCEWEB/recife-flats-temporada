/**
 * <rf-matching-teaser> — Convite para achar o imóvel certo.
 */

import { pageHref } from '../utils/paths.js';
import { whatsappUrl } from '../data/location.js';

class RFMatchingTeaser extends HTMLElement {
  connectedCallback() {
    const wa = whatsappUrl('Olá! Quero ajuda para escolher o apartamento ideal.');

    this.innerHTML = `
      <section class="home-section matching-teaser" aria-labelledby="matching-teaser-title">
        <div class="matching-teaser__split">
          <div class="matching-teaser__copy">
            <div class="matching-teaser__copy-inner">
              <span class="eyebrow">Encontre seu flat ideal</span>
              <h2 id="matching-teaser-title">Qual flat <em>combina com você?</em></h2>
              <p>Responda algumas perguntas sobre o que você precisa — quartos, piscina, estacionamento, vista — e a gente mostra as melhores opções pra sua viagem.</p>

              <ol class="matching-teaser__steps">
                <li>
                  <span class="matching-teaser__n">1</span>
                  <div>
                    <strong>Conte o que precisa</strong>
                    <span>Quartos, piscina, estacionamento e vista.</span>
                  </div>
                </li>
                <li>
                  <span class="matching-teaser__n">2</span>
                  <div>
                    <strong>Veja as opções</strong>
                    <span>Nós filtramos os melhores flats para você.</span>
                  </div>
                </li>
                <li>
                  <span class="matching-teaser__n">3</span>
                  <div>
                    <strong>Reserve direto</strong>
                    <span>Sem intermediários — você fecha com a gente.</span>
                  </div>
                </li>
              </ol>

              <div class="matching-teaser__actions">
                <a class="btn btn--primary" href="${wa}" target="_blank" rel="noopener noreferrer">Descobrir meu flat ideal</a>
                <a class="matching-teaser__link" href="${pageHref('./apartamentos.html')}">Ou compare todos os imóveis →</a>
              </div>
            </div>
          </div>

          <div class="matching-teaser__visual" aria-hidden="true">
            <img
              src="./assets/images/brand/mascote-whatsapp.webp"
              alt=""
              width="960"
              height="720"
              loading="lazy"
              decoding="async"
            >
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('rf-matching-teaser', RFMatchingTeaser);

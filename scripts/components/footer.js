/**
 * <rf-footer> — Rodapé completo (azul orla + acento sol/amarelo).
 * Ícones SVG decorativos (aria-hidden) ao lado do texto dos links.
 */

import { APARTAMENTOS } from '../data/apartamentos.js';
import { BUSINESS, whatsappUrl, MAPS_LINKS } from '../data/location.js';
import { apartmentUrl, pageHref } from '../data/site-structure.js';
import { WHATSAPP_ICON_SVG } from '../data/brand-icons.js';

/** Ícones lineares — currentColor (amarelo via CSS). */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4.5 6v6c0 5 3.2 7.8 7.5 9 4.3-1.2 7.5-4 7.5-9V6L12 3z"/><path stroke-linecap="round" d="m9 12 2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 2"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" d="M8 7h12M8 12h12M8 17h12"/><circle cx="4" cy="7" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="17" r="1" fill="currentColor"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="14" cy="4.5" r="2"/><path stroke-linecap="round" stroke-linejoin="round" d="m8 21 2.5-7 3 2 2 6M10.5 14l2-5 3 1 2 3"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" d="M4 13v-1a8 8 0 0 1 16 0v1"/><path stroke-linecap="round" stroke-linejoin="round" d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zm16 0v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 11v5M12 8h.01"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path stroke-linecap="round" d="m4 7 8 6 8-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3A2 2 0 0 1 18.5 19 15.5 15.5 0 0 1 3.5 4a2 2 0 0 1 3-0.5z"/></svg>',
};

function linkItem(icon, href, label, { external = false, accent = false } = {}) {
  const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  const cls = accent ? ' class="footer__link footer__link--accent"' : ' class="footer__link"';
  return `
    <li>
      <a href="${href}"${cls}${rel}>
        <span class="footer__icon">${ICONS[icon] || ICONS.info}</span>
        <span>${label}</span>
      </a>
    </li>
  `;
}

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const apts = APARTAMENTOS.slice(0, 4);
    const wa = whatsappUrl('Olá! Quero reservar um apartamento.');
    const waSupport = whatsappUrl('Olá! Preciso de suporte para hóspedes.');
    const waConfirm = whatsappUrl('Olá! Quero confirmar minha reserva.');
    const waDeposit = whatsappUrl('Olá! Quero saber sobre a caução reembolsável.');
    const waRules = whatsappUrl('Olá! Quero saber as regras da casa.');

    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <nav class="footer__nav" aria-label="Rodapé">
            <div class="footer__col">
              <h2 class="footer__heading">Apartamentos</h2>
              <ul>
                ${apts.map((apt) => linkItem('home', apartmentUrl(apt.slug), apt.shortName)).join('')}
                ${linkItem('arrow', pageHref('./apartamentos.html'), 'Ver Todos os Apartamentos', { accent: true })}
              </ul>
            </div>

            <div class="footer__col">
              <h2 class="footer__heading">Informações</h2>
              <ul>
                ${linkItem('shield', waDeposit, 'Caução Reembolsável', { external: true })}
                ${linkItem('clock', `${pageHref('./index.html')}#faq`, 'Check-in / Check-out')}
                ${linkItem('list', waRules, 'Regras da Casa', { external: true })}
                ${linkItem('info', `${pageHref('./index.html')}#faq`, 'Perguntas frequentes')}
              </ul>
            </div>

            <div class="footer__col">
              <h2 class="footer__heading">Conheça Recife</h2>
              <ul>
                ${linkItem('pin', pageHref('./boa-viagem.html'), 'Boa Viagem')}
                ${linkItem('walk', pageHref('./pina.html'), 'Pina')}
                ${linkItem('spark', pageHref('./apartamentos.html'), 'ApartMatch')}
                ${linkItem('pin', MAPS_LINKS.place, 'Ver no mapa', { external: true })}
              </ul>
            </div>

            <div class="footer__col">
              <h2 class="footer__heading">Suporte</h2>
              <ul>
                ${linkItem('headset', wa, 'WhatsApp', { external: true })}
                ${linkItem('check', waSupport, 'Suporte para Hóspedes', { external: true })}
                ${linkItem('check', waConfirm, 'Confirmar Reserva', { external: true })}
                ${linkItem('info', wa, 'Fale conosco', { external: true })}
              </ul>
            </div>
          </nav>

          <div class="footer__meta">
            <div class="footer__meta-block">
              <p class="footer__meta-label">Aceitamos</p>
              <ul class="footer__payments" aria-label="Formas de pagamento">
                <li class="footer__pay" title="Cartão">
                  <span class="footer__pay-mark footer__pay-mark--card" aria-hidden="true"></span>
                  <span class="sr-only">Cartão</span>
                </li>
                <li class="footer__pay" title="Mastercard">
                  <span class="footer__pay-mark footer__pay-mark--mc" aria-hidden="true"></span>
                  <span class="sr-only">Mastercard</span>
                </li>
                <li class="footer__pay" title="American Express">
                  <span class="footer__pay-mark footer__pay-mark--amex" aria-hidden="true">AMEX</span>
                </li>
                <li class="footer__pay" title="Pix">
                  <span class="footer__pay-mark footer__pay-mark--pix" aria-hidden="true">PIX</span>
                </li>
                <li class="footer__pay" title="Elo">
                  <span class="footer__pay-mark footer__pay-mark--elo" aria-hidden="true">ELO</span>
                </li>
              </ul>
            </div>

            <div class="footer__meta-block footer__meta-block--social">
              <p class="footer__meta-label">Siga-nos</p>
              <ul class="footer__socials">
                <li>
                  <a class="footer__social footer__social--wa" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    ${WHATSAPP_ICON_SVG}
                  </a>
                </li>
                <li>
                  <a class="footer__social footer__social--ig" href="https://instagram.com/recifeflats" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.5A3 3 0 0 0 4.5 7.5v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-9zm9.75 1.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>
                  </a>
                </li>
                <li>
                  <a class="footer__social footer__social--fb" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z"/></svg>
                  </a>
                </li>
                <li>
                  <a class="footer__social footer__social--mail" href="mailto:${BUSINESS.email}" aria-label="E-mail">
                    ${ICONS.mail}
                  </a>
                </li>
                <li>
                  <a class="footer__social footer__social--yt" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C19.3 5.3 12 5.3 12 5.3s-7.3 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.5.4 8.8.4 8.8.4s7.3 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.3 3.3-6.3 3.3z"/></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="footer__contact">
            <p class="footer__brand-name">${BUSINESS.name}</p>
            <ul class="footer__contact-list">
              <li>
                <span class="footer__icon">${ICONS.pin}</span>
                <span>${BUSINESS.streetAddress} — ${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}</span>
              </li>
              <li>
                <span class="footer__icon">${ICONS.phone}</span>
                <a href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a>
              </li>
              <li>
                <span class="footer__icon">${ICONS.mail}</span>
                <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a>
              </li>
              <li>
                <span class="footer__icon">${ICONS.pin}</span>
                <a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="container footer__bottom-inner">
            <p>
              © ${year} Recife Flats.
              <span class="footer__credit">Desenvolvido por <a href="https://vanessenceweb.com" target="_blank" rel="noopener noreferrer">VanessenceWeb</a></span>
            </p>
            <nav class="footer__legal" aria-label="Legal">
              <a href="mailto:${BUSINESS.email}?subject=Pol%C3%ADtica%20de%20Privacidade">Política de Privacidade</a>
              <a href="mailto:${BUSINESS.email}?subject=Termos%20de%20Uso">Termos de Uso</a>
              <a href="mailto:${BUSINESS.email}?subject=Cookies">Cookies</a>
              <a href="mailto:${BUSINESS.email}?subject=LGPD">LGPD</a>
            </nav>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('rf-footer', RFFooter);

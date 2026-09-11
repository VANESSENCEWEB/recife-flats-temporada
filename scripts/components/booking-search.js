/**
 * <rf-booking-search> — Busca de disponibilidade (check-in/out, hóspedes, bairro).
 *
 * Atributos:
 *   variant — "hero" | "inline" (padrão: hero)
 *   action  — URL de destino (padrão: ./apartamentos.html)
 */

import { pageHref } from '../utils/paths.js';

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysISO(iso, days) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

class RFBookingSearch extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'hero';
    const action = pageHref(this.getAttribute('action') || './apartamentos.html');
    const minIn = todayISO();
    const defaultIn = minIn;
    const defaultOut = addDaysISO(defaultIn, 3);

    this.innerHTML = `
      <form class="booking-search booking-search--${variant}" action="${action}" method="get" novalidate>
        <div class="booking-search__fields">
          <label class="booking-search__field">
            <span>Check-in</span>
            <input type="date" name="checkin" required min="${minIn}" value="${defaultIn}" data-checkin>
          </label>
          <label class="booking-search__field">
            <span>Check-out</span>
            <input type="date" name="checkout" required min="${defaultOut}" value="${defaultOut}" data-checkout>
          </label>
          <label class="booking-search__field booking-search__field--guests">
            <span>Hóspedes</span>
            <select name="guests" data-guests>
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6+</option>
            </select>
          </label>
          <label class="booking-search__field booking-search__field--hood">
            <span>Bairro</span>
            <select name="neighborhood" data-neighborhood>
              <option value="">Qualquer</option>
              <option value="boa-viagem">Boa Viagem</option>
              <option value="pina">Pina</option>
            </select>
          </label>
        </div>
        <button type="submit" class="btn btn--primary booking-search__submit">
          Buscar
        </button>
      </form>
    `;

    const form = this.querySelector('form');
    const checkin = this.querySelector('[data-checkin]');
    const checkout = this.querySelector('[data-checkout]');

    checkin?.addEventListener('change', () => {
      if (!checkin.value || !checkout) return;
      const minOut = addDaysISO(checkin.value, 1);
      checkout.min = minOut;
      if (!checkout.value || checkout.value <= checkin.value) {
        checkout.value = minOut;
      }
    });

    form?.addEventListener('submit', (e) => {
      if (!checkin?.value || !checkout?.value) return;
      if (checkout.value <= checkin.value) {
        e.preventDefault();
        checkout.focus();
        checkout.setCustomValidity('A saída precisa ser depois da entrada.');
        checkout.reportValidity();
        return;
      }
      checkout.setCustomValidity('');
    });
  }
}

customElements.define('rf-booking-search', RFBookingSearch);

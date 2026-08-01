/**
 * <rf-apartments-hub> — Grade + filtros da coleção de apartamentos.
 */

import {
  APARTAMENTOS,
  getApartmentsByNeighborhood,
} from '../data/apartamentos.js';
import './apartment-card.js';

class RFApartmentsHub extends HTMLElement {
  connectedCallback() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('neighborhood') || '';
    this._neighborhood = this.getAttribute('neighborhood') || fromUrl || '';
    this._filters = {
      bedrooms: params.get('bedrooms') || '',
      pool: params.get('pool') === '1' || params.get('pool') === 'true',
      parking: params.get('parking') === '1' || params.get('parking') === 'true',
      guests: params.get('guests') || '',
    };
    this._render();
  }

  _list() {
    let list = this._neighborhood
      ? getApartmentsByNeighborhood(this._neighborhood)
      : [...APARTAMENTOS];

    if (this._filters.bedrooms) {
      const n = Number(this._filters.bedrooms);
      list = list.filter((a) => a.bedrooms === n);
    }
    if (this._filters.guests) {
      const g = Number(this._filters.guests);
      if (!Number.isNaN(g)) list = list.filter((a) => a.guests >= g);
    }
    if (this._filters.pool) list = list.filter((a) => a.pool);
    if (this._filters.parking) list = list.filter((a) => a.parking);
    return list;
  }

  _render() {
    const list = this._list();
    this.innerHTML = `
      <section class="apartments-hub" aria-label="Apartamentos">
        <div class="apartments-hub__filters" role="group" aria-label="Filtros">
          <label class="apartments-hub__field">
            <span>Quartos</span>
            <select data-filter="bedrooms">
              <option value="">Todos</option>
              <option value="1">1 quarto</option>
              <option value="2">2 quartos</option>
            </select>
          </label>
          <label class="apartments-hub__check">
            <input type="checkbox" data-filter="pool" />
            <span>Piscina</span>
          </label>
          <label class="apartments-hub__check">
            <input type="checkbox" data-filter="parking" />
            <span>Garagem</span>
          </label>
        </div>

        <p class="apartments-hub__count" data-count>${list.length} imóvel${list.length === 1 ? '' : 'eis'}</p>

        <div class="apartments-hub__grid" data-grid>
          ${list.map((apt) => `<rf-apartment-card slug="${apt.slug}"></rf-apartment-card>`).join('')}
        </div>

        ${list.length ? '' : '<p class="apartments-hub__empty">Nenhum apartamento com esses filtros. Tente outra combinação.</p>'}
      </section>
    `;

    this.querySelector('[data-filter="bedrooms"]')?.addEventListener('change', (e) => {
      this._filters.bedrooms = e.target.value;
      this._render();
    });
    this.querySelector('[data-filter="pool"]')?.addEventListener('change', (e) => {
      this._filters.pool = e.target.checked;
      this._render();
    });
    this.querySelector('[data-filter="parking"]')?.addEventListener('change', (e) => {
      this._filters.parking = e.target.checked;
      this._render();
    });

    // restore UI state
    const bed = this.querySelector('[data-filter="bedrooms"]');
    if (bed) bed.value = this._filters.bedrooms;
    const pool = this.querySelector('[data-filter="pool"]');
    if (pool) pool.checked = this._filters.pool;
    const parking = this.querySelector('[data-filter="parking"]');
    if (parking) parking.checked = this._filters.parking;
  }
}

customElements.define('rf-apartments-hub', RFApartmentsHub);

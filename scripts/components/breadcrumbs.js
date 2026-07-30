/**
 * <rf-breadcrumbs> — Navegação hierárquica para SEO e usabilidade.
 *
 * Uso:
 *   <rf-breadcrumbs context="apartments"></rf-breadcrumbs>
 *   <rf-breadcrumbs context="neighborhood" slug="boa-viagem"></rf-breadcrumbs>
 *   <rf-breadcrumbs context="apartment" slug="flat-golden-view-1006"></rf-breadcrumbs>
 */

import { getBreadcrumbs, pageHref } from '../data/site-structure.js';

class RFBreadcrumbs extends HTMLElement {
  connectedCallback() {
    const context = this.getAttribute('context') || 'apartments';
    const slug    = this.getAttribute('slug') || '';
    const crumbs  = getBreadcrumbs(context, { slug });

    const items = crumbs.map((crumb, i) => {
      const isLast = crumb.current || i === crumbs.length - 1;
      if (isLast || !crumb.href) {
        return `<li class="breadcrumbs__item" aria-current="page"><span>${crumb.label}</span></li>`;
      }
      return `<li class="breadcrumbs__item"><a href="${pageHref(crumb.href)}">${crumb.label}</a></li>`;
    }).join('');

    this.innerHTML = `
      <nav class="breadcrumbs" aria-label="Navegação estrutural">
        <ol class="breadcrumbs__list">${items}</ol>
      </nav>
    `;
  }
}

customElements.define('rf-breadcrumbs', RFBreadcrumbs);
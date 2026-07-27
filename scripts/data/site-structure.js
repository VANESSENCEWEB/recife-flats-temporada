/**
 * Estrutura do site — URLs, bairros, breadcrumbs e SEO.
 * Hierarquia: Início → Apartamentos → Bairro → Imóvel (máx. 3 níveis).
 */

import { getApartmentBySlug } from './apartamentos.js';
import { isNestedApartmentPage, pageHref } from '../utils/paths.js';

/** @typedef {{ slug: string, name: string, pageUrl: string, description: string, intro: string, highlights: string[] }} Neighborhood */

/** @type {Record<string, Neighborhood>} */
export const NEIGHBORHOODS = {
  'boa-viagem': {
    slug: 'boa-viagem',
    name: 'Boa Viagem',
    pageUrl: './boa-viagem.html',
    description:
      'Aluguel por temporada em Boa Viagem, Recife — praia, comércio e mobilidade a pé.',
    intro:
      'Boa Viagem é o bairro mais procurado para temporada em Recife: orla acessível, padarias, restaurantes, farmácias e shoppings por perto. Ideal para famílias, casais e quem trabalha remotamente com rotina prática.',
    highlights: [
      '100 m a 200 m da orla em unidades selecionadas',
      'Mercados, farmácias e cafés a poucos passos',
      'Ótima base para lazer, compras e trabalho remoto',
    ],
  },
  pina: {
    slug: 'pina',
    name: 'Pina',
    pageUrl: './pina.html',
    description:
      'Apartamento para temporada no Pina, Recife — ao lado do RioMar e bem conectado à cidade.',
    intro:
      'O Pina combina localização estratégica com acesso rápido ao RioMar Shopping, ao Centro do Recife e à orla de Boa Viagem. Excelente para estadias médias e longas, com tudo que você precisa no entorno.',
    highlights: [
      'Ao lado do RioMar Shopping',
      'O bairro mais próximo do Centro do Recife entre nossas opções',
      'Boa conexão com vias principais e aeroporto',
    ],
  },
};

/** @param {string} neighborhoodName */
export function neighborhoodKeyFromName(neighborhoodName) {
  const map = { 'Boa Viagem': 'boa-viagem', Pina: 'pina' };
  return map[neighborhoodName] || neighborhoodName.toLowerCase().replace(/\s+/g, '-');
}

/** Páginas em /apartamentos/*.html (paths relativos precisam de ../). */
export { isNestedApartmentPage, assetUrl, pageHref } from '../utils/paths.js';

/** @param {string} slug */
export function getNeighborhood(slug) {
  return NEIGHBORHOODS[slug] || null;
}

/** @param {string} apartmentSlug */
export function apartmentUrl(apartmentSlug) {
  return isNestedApartmentPage()
    ? `./${apartmentSlug}.html`
    : `./apartamentos/${apartmentSlug}.html`;
}

/** @param {string} neighborhoodSlug */
export function neighborhoodUrl(neighborhoodSlug) {
  const url = NEIGHBORHOODS[neighborhoodSlug]?.pageUrl || './apartamentos.html';
  return pageHref(url);
}

/**
 * @typedef {{ label: string, href?: string, current?: boolean }} Crumb
 * @param {'home'|'apartments'|'neighborhood'|'apartment'} type
 * @param {{ slug?: string }} [params]
 * @returns {Crumb[]}
 */
export function getBreadcrumbs(type, params = {}) {
  const home = { label: 'Início', href: './index.html' };
  const hub  = { label: 'Apartamentos', href: './apartamentos.html' };

  switch (type) {
    case 'home':
      return [{ label: 'Início', current: true }];
    case 'apartments':
      return [home, { label: 'Apartamentos', current: true }];
    case 'neighborhood': {
      const n = getNeighborhood(params.slug);
      if (!n) return [home, { label: 'Apartamentos', current: true }];
      return [home, hub, { label: n.name, href: n.pageUrl, current: true }];
    }
    case 'apartment': {
      const apt = getApartmentBySlug(params.slug);
      if (!apt) return [home, { label: 'Apartamentos', current: true }];
      const nKey = apt.neighborhoodSlug || neighborhoodKeyFromName(apt.neighborhood);
      const n = getNeighborhood(nKey);
      return [
        home,
        hub,
        { label: apt.neighborhood, href: n?.pageUrl || './apartamentos.html' },
        { label: apt.name, current: true },
      ];
    }
    default:
      return [home];
  }
}
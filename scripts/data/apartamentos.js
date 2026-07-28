/**
 * Dados dos 4 apartamentos — 3 em Boa Viagem, 1 em Pina.
 * Alinhado ao site recifeflatstemporada.com
 */

import { getManifestImages } from './apartment-image-manifest.js';
import { assetUrl } from '../utils/paths.js';

export const FALLBACK_IMAGE = './assets/images/boa_viagem-01.avif.png';

/** @typedef {{ src: string, alt: string }} ApartmentImage */

const COVER_BY_SLUG = {
  'studio-203-boa-viagem': [
    { src: FALLBACK_IMAGE, alt: 'Studio 203 Boa Viagem — temporada em Recife' },
  ],
  'apartamento-804-pina': [
    { src: FALLBACK_IMAGE, alt: 'Apartamento 804 Pina — temporada em Recife' },
  ],
};

/** @param {string} slug */
function getApartmentImages(slug) {
  const manifest = getManifestImages(slug);
  if (manifest?.length) return manifest;
  return COVER_BY_SLUG[slug] || [{ src: FALLBACK_IMAGE, alt: 'Recife Flats Temporada' }];
}

/** @typedef {{
 *   id: string,
 *   slug: string,
 *   name: string,
 *   shortName: string,
 *   neighborhood: string,
 *   neighborhoodSlug: string,
 *   building: string,
 *   address: string,
 *   badge: string | null,
 *   tagline: string,
 *   description: string,
 *   beds: number,
 *   bedrooms: number,
 *   guests: number,
 *   bathrooms: number,
 *   parking: boolean,
 *   pool: boolean,
 *   petFriendly: boolean,
 *   size: string,
 *   priceFrom: string | null,
 *   priceNote: string,
 *   rating: number,
 *   reviewCount: number,
 *   amenities: string[],
 *   images: ApartmentImage[],
 * }} Apartment */

/** @type {Apartment[]} */
export const APARTAMENTOS = [
  {
    id: '01',
    slug: 'apartamento-2-quartos-boa-viagem',
    name: 'Apartamento 2 Quartos Boa Viagem',
    shortName: 'Flat 2 Quartos · Boa Viagem',
    neighborhood: 'Boa Viagem',
    neighborhoodSlug: 'boa-viagem',
    building: 'Edifício Ipê · Apt 105',
    address: 'Av. Eng. Domingos Ferreira, 2041 — Boa Viagem, Recife/PE',
    badge: 'Para família',
    tagline: '100 m da praia — espaço ideal para famílias',
    description:
      'Apartamento com 2 quartos (2 camas de casal), ar-condicionado nos dois quartos, cozinha completa e Wi-Fi. No Edifício Ipê, prédio pequeno e bem localizado em Boa Viagem, a 100 metros da praia e em cima do comércio do bairro (padaria, mercado). Estacionamento rotativo na área externa do prédio.',
    beds: 2,
    bedrooms: 2,
    guests: 4,
    bathrooms: 1,
    parking: true,
    pool: false,
    petFriendly: true,
    size: '72 m²',
    priceFrom: 'R$ 350',
    priceNote: '/dia',
    rating: 4.9,
    reviewCount: 42,
    amenities: ['Wi-Fi', '2 quartos com ar-condicionado', '100 m da praia', 'Pet friendly', 'Estacionamento rotativo', 'Cozinha equipada'],
    images: getApartmentImages('apartamento-2-quartos-boa-viagem'),
  },
  {
    id: '02',
    slug: 'flat-golden-view-1006',
    name: 'Flat Golden View 1006',
    shortName: 'Flat Golden View · Boa Viagem',
    neighborhood: 'Boa Viagem',
    neighborhoodSlug: 'boa-viagem',
    building: 'Golden View · Apt 1006',
    address: 'R. Ministro Nelson Gria, 300 — Boa Viagem, Recife/PE',
    badge: 'Mais procurado',
    tagline: 'Piscina na cobertura — ideal para casal',
    description:
      'Flat compacto para até 2 pessoas, com 1 cama, ar-condicionado, TV e mobília completa. No Edifício Golden View, com piscina na cobertura e estacionamento interno rotativo (pode estacionar em qualquer vaga livre dentro do prédio, respeitando as regras). Localização prática perto da praia e do Shopping Recife.',
    beds: 1,
    bedrooms: 1,
    guests: 2,
    bathrooms: 1,
    parking: true,
    pool: true,
    petFriendly: false,
    size: '42 m²',
    priceFrom: 'R$ 200',
    priceNote: '/dia',
    rating: 4.9,
    reviewCount: 38,
    amenities: ['Wi-Fi', 'Piscina rooftop', 'Estacionamento interno rotativo', '1 quarto', 'Ar-condicionado', 'Perto da praia'],
    images: getApartmentImages('flat-golden-view-1006'),
  },
  {
    id: '03',
    slug: 'studio-203-boa-viagem',
    name: 'Studio 203 Boa Viagem',
    shortName: 'Studio · Boa Viagem',
    neighborhood: 'Boa Viagem',
    neighborhoodSlug: 'boa-viagem',
    building: 'Edifício Ipê · Apt 203',
    address: 'Av. Eng. Domingos Ferreira, 2041 — Boa Viagem, Recife/PE',
    badge: 'Studio',
    tagline: '100 m da praia — ideal para casal',
    description:
      'Studio de 1 quarto no Edifício Ipê (mesmo prédio do Apartamento 105), a 100 metros da praia em Boa Viagem. Acomoda 2 pessoas. Estacionamento rotativo na área externa do prédio. Check-in 15h–22h, check-out 9h–11h e pets sob pedido. Silêncio entre 22h e 7h.',
    beds: 1,
    bedrooms: 1,
    guests: 2,
    bathrooms: 1,
    parking: true,
    pool: false,
    petFriendly: true,
    size: '35 m²',
    priceFrom: null,
    priceNote: 'Sob consulta',
    rating: 4.8,
    reviewCount: 0,
    amenities: ['Wi-Fi', '1 quarto', 'Ideal casal', 'Pet sob pedido', '100 m da praia', 'Estacionamento rotativo'],
    images: getApartmentImages('studio-203-boa-viagem'),
  },
  {
    id: '04',
    slug: 'apartamento-804-pina',
    name: 'Apartamento 804 Pina',
    shortName: 'Flat 2 Quartos · Pina',
    neighborhood: 'Pina',
    neighborhoodSlug: 'pina',
    building: 'Edifício Forte São Pedro · Apt 804',
    address: 'R. Marquês de Alegrete, 99 — Pina, Recife/PE',
    badge: '2 quartos',
    tagline: 'Ao lado do Shopping RioMar, o mais perto do Centro',
    description:
      'Apartamento de 2 quartos (com sofá-cama na sala) no Edifício Forte São Pedro, Pina. Comporta 4 pessoas confortavelmente, podendo acomodar até 6 com o sofá-cama. Mobília completa, ar-condicionado nos 2 quartos, 2 banheiros, TV de 70" e piscina no térreo. Vaga de garagem fixa (não rotativa) — atenção: manobra estreita, não recomendado para carros muito grandes. É o apartamento mais próximo do Centro do Recife, ao lado do Shopping RioMar.',
    beds: 3,
    bedrooms: 2,
    guests: 6,
    bathrooms: 2,
    parking: true,
    pool: true,
    petFriendly: true,
    size: '68 m²',
    priceFrom: null,
    priceNote: 'Sob consulta',
    rating: 4.8,
    reviewCount: 0,
    amenities: ['Wi-Fi', '2 quartos c/ ar-condicionado', '2 banheiros', 'Piscina no térreo', 'Garagem fixa', 'TV 70"', 'Sofá-cama', 'Pets'],
    images: getApartmentImages('apartamento-804-pina'),
  },
];

/** @param {Apartment} apt */
export function resolveImages(apt) {
  const images = apt.images.length
    ? apt.images
    : [{ src: FALLBACK_IMAGE, alt: apt.name }];

  const fallback = assetUrl(FALLBACK_IMAGE);

  return images.map((img) => ({
    src: assetUrl(img.src),
    alt: img.alt,
    placeholder: fallback,
  }));
}

/** @param {string} slug */
export function getApartmentBySlug(slug) {
  return APARTAMENTOS.find((a) => a.slug === slug) || null;
}

/** @param {string} neighborhoodSlug */
export function getApartmentsByNeighborhood(neighborhoodSlug) {
  return APARTAMENTOS.filter((a) => a.neighborhoodSlug === neighborhoodSlug);
}

/** Google Maps — rota até o endereço do apartamento */
/** @param {Apartment} apt */
export function apartmentMapsUrl(apt) {
  const destination = encodeURIComponent(`${apt.name}, ${apt.address}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}

/** @param {string} text @param {number} [max] */
export function excerptText(text, max = 140) {
  if (!text || text.length <= max) return text || '';
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
}
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
    { src: FALLBACK_IMAGE, alt: 'Studio Boa Viagem — temporada em Recife' },
  ],
  'apartamento-804-pina': [
    { src: FALLBACK_IMAGE, alt: 'Apartamento 2 Quartos Pina — temporada em Recife' },
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
 *   cleaningFee: number | null,
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
    building: 'Edifício Ipê',
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
    priceNote: '/noite',
    cleaningFee: 100,
    rating: 4.9,
    reviewCount: 42,
    amenities: ['Wi-Fi', '2 quartos com ar-condicionado', '100 m da praia', 'Pet friendly', 'Estacionamento rotativo', 'Cozinha equipada'],
    images: getApartmentImages('apartamento-2-quartos-boa-viagem'),
  },
  {
    id: '02',
    slug: 'flat-golden-view-1006',
    name: 'Studio com piscina rooftop — Boa Viagem',
    shortName: 'Studio piscina rooftop · Boa Viagem',
    neighborhood: 'Boa Viagem',
    neighborhoodSlug: 'boa-viagem',
    building: 'Golden View',
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
    priceNote: '/noite',
    cleaningFee: 80,
    rating: 4.9,
    reviewCount: 38,
    amenities: ['Wi-Fi', 'Piscina rooftop', 'Estacionamento interno rotativo', '1 quarto', 'Ar-condicionado', 'Perto da praia'],
    images: getApartmentImages('flat-golden-view-1006'),
  },
  {
    id: '03',
    slug: 'studio-203-boa-viagem',
    name: 'Studio Boa Viagem',
    shortName: 'Studio · Boa Viagem',
    neighborhood: 'Boa Viagem',
    neighborhoodSlug: 'boa-viagem',
    building: 'Edifício Ipê',
    address: 'Av. Eng. Domingos Ferreira, 2041 — Boa Viagem, Recife/PE',
    badge: 'Studio',
    tagline: 'A ~2 min da praia · ~10 min do aeroporto — ideal para casal',
    description:
      'Apartamento de 1 quarto (35 m²) no Edifício Ipê, em Boa Viagem, com localização privilegiada: cerca de 8 minutos a pé da Praia de Boa Viagem e cerca de 10 minutos de carro do Aeroporto Internacional do Recife (Guararapes). Ideal para casal.',
    descriptionParagraphs: [
      'O imóvel oferece Wi-Fi gratuito, ar-condicionado, TV de tela plana, área de estar com sofá, área de jantar e cozinha totalmente equipada (geladeira, fogão, forno, micro-ondas, cafeteira e utensílios).',
      'Há elevador no prédio, estacionamento rotativo gratuito na área externa (sujeito à disponibilidade) e pets sob pedido, sem custo extra. Quarto e banheiro privativos, com toalhas, roupa de cama e secador de cabelo.',
      'Reserva direta pelo WhatsApp — sem intermediário e sem taxas de plataforma.',
    ],
    beds: 1,
    bedrooms: 1,
    guests: 2,
    bathrooms: 1,
    parking: true,
    pool: false,
    petFriendly: true,
    size: '35 m²',
    bedDetail: '1 cama de casal',
    checkIn: '15h–22h',
    checkOut: '9h–11h',
    priceFrom: null,
    priceNote: 'Sob consulta',
    cleaningFee: null,
    damageDeposit: 'R$ 200 (reembolsável)',
    rating: 4.2,
    reviewCount: 43,
    ratingLabel: 'Muito bom',
    reviewScores: [
      { label: 'Localização', score: 9.2 },
      { label: 'Limpeza', score: 8.9 },
      { label: 'Instalações', score: 8.8 },
      { label: 'Conforto', score: 8.6 },
      { label: 'Anfitrião', score: 8.6 },
      { label: 'Custo-benefício', score: 8.4 },
      { label: 'Wi-Fi', score: 10 },
    ],
    highlights: [
      {
        title: 'Excelente localização',
        text: 'Hóspedes avaliaram a localização com 9.2 — a poucos minutos a pé da Praia de Boa Viagem.',
      },
      {
        title: 'Ideal para casal',
        text: 'Casais avaliaram com 9.3 para viagem a dois. Apartamento inteiro só para você.',
      },
      {
        title: 'Check-in com horário combinado',
        text: 'Check-in das 15h às 22h (avise o horário de chegada) e check-out das 9h às 11h.',
      },
    ],
    amenities: [
      'Wi-Fi gratuito',
      'Ar-condicionado',
      'Cozinha completa',
      'Geladeira',
      'Fogão e forno',
      'Micro-ondas',
      'Cafeteira',
      'Utensílios de cozinha',
      'TV de tela plana',
      'Área de estar com sofá',
      'Mesa de jantar',
      'Banheiro privativo',
      'Chuveiro e secador de cabelo',
      'Toalhas e roupa de cama',
      'Guarda-roupa',
      'Elevador',
      'Estacionamento rotativo gratuito',
      'Pets sob pedido (grátis)',
      'Ambiente para não fumantes',
    ],
    nearby: [
      { title: 'Praia de Boa Viagem', meta: '~700 m · ~8 min a pé' },
      { title: 'Comércio e restaurantes', meta: 'Domino’s, Diplomata e outros a ~150–170 m' },
      { title: 'Praia do Pina', meta: '~1,3 km' },
      { title: 'Aeroporto Guararapes', meta: '~4,8 km · ~10 min de carro' },
      { title: 'Metrô Antônio Falcão', meta: '~2,9 km' },
      { title: 'Marco Zero', meta: '~6,4 km' },
    ],
    houseRules: [
      'Check-in: 15h–22h (informe o horário de chegada com antecedência)',
      'Check-out: 9h–11h',
      'Máximo de 2 hóspedes',
      'Proibido fumar',
      'Festas ou eventos não são permitidos',
      'Silêncio entre 22h e 7h',
      'Pets sob pedido, sem custo extra',
      'Depósito caução reembolsável de R$ 200 na chegada',
    ],
    images: getApartmentImages('studio-203-boa-viagem'),
  },
  {
    id: '04',
    slug: 'apartamento-804-pina',
    name: 'Apartamento 2 Quartos Pina',
    shortName: 'Flat 2 Quartos · Pina',
    neighborhood: 'Pina',
    neighborhoodSlug: 'pina',
    building: 'Edifício Forte São Pedro',
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
    priceFrom: 'R$ 350',
    priceNote: '/noite',
    cleaningFee: 100,
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
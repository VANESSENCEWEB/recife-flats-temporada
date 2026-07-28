/**
 * Dados de localização — Recife Flats Temporada
 * Google Business Profile + rotas + Waze
 */

export const BUSINESS = {
  name: 'Recife Flats Temporada',
  category: 'Hospedagem temporária',
  streetAddress: 'Av. Eng. Domingos Ferreira, 2041',
  neighborhood: 'Boa Viagem',
  city: 'Recife',
  state: 'PE',
  postalCode: '51111-020',
  country: 'BR',
  phone: '+5581996601178',
  phoneDisplay: '+55 (81) 99660-1178',
  whatsapp: '5581996601178',
  email: 'contato@recifeflats.com.br',
  website: 'https://recifeflatstemporada.com',
  lat: -8.1075708,
  lng: -34.890327,
  wazeLat: -8.107502,
  wazeLng: -34.890497,
};

/** @param {string} [text] */
export function whatsappUrl(text = '') {
  const digits = BUSINESS.whatsapp.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

const DESTINATION = encodeURIComponent(
  'Recife Flats Temporada, Av. Eng. Domingos Ferreira, 2041, Boa Viagem, Recife, PE, 51111-020',
);

/** Embed oficial — Google Business Profile */
export const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.9402101347146!2d-34.89290192493287!3d-8.107570791921477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1f002a2cf031%3A0xbd7a3f8421cc6d7f!2sRecife%20Flats%20Temporada!5e0!3m2!1spt-BR!2sbr!4v1783733910232!5m2!1spt-BR!2sbr';

export const WAZE_EMBED_URL =
  `https://embed.waze.com/iframe?zoom=16&lat=${BUSINESS.wazeLat}&lon=${BUSINESS.wazeLng}&ct=livemap`;

export const MAPS_LINKS = {
  /** Perfil no Google Maps / Google Business */
  place: 'https://maps.app.goo.gl/WNg5yh6aARAYBLfu6',
  profile: 'https://maps.app.goo.gl/WNg5yh6aARAYBLfu6',
  directions: `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION}&travelmode=driving`,
  reviews:
    'https://www.google.com/maps/place/Recife+Flats+Temporada/@-8.1075708,-34.890327,17z/data=!4m8!3m7!1s0x7ab1f002a2cf031:0xbd7a3f8421cc6d7f!8m2!3d-8.1075708!4d-34.890327!9m1!1b1',
  waze: `https://www.waze.com/pt-BR/live-map/directions?latlng=${BUSINESS.wazeLat}%2C${BUSINESS.wazeLng}`,
};

/** Rotas a partir de pontos de referência em Recife */
export const ROUTE_REFERENCES = [
  {
    id: 'rodoviaria',
    icon: 'bus',
    label: 'Rodoviária do Recife (TIP)',
    meta: 'Várzea · ~25 min de carro',
    mapsUrl:
      'https://www.google.com/maps/dir/Rodovi%C3%A1ria+do+Recife+(TIP)+-+V%C3%A1rzea,+Recife+-+PE,+50950-030/Recife+Flats+Temporada,+Av.+Eng.+Domingos+Ferreira,+2041+-+2041+-+Boa+Viagem,+Recife+-+PE,+51111-020/@-8.0926616,-35.0208509,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x7ab1bce3fb53581:0x7aa09fda0d14db1c!2m2!1d-34.9822615!2d-8.0643448!1m5!1m1!1s0x7ab1f002a2cf031:0xbd7a3f8421cc6d7f!2m2!1d-34.890327!2d-8.1075708!3e0?entry=ttu',
  },
  {
    id: 'marco-zero',
    icon: 'landmark',
    label: 'Marco Zero',
    meta: 'Recife Antigo · centro histórico',
    mapsUrl: 'https://maps.app.goo.gl/27c7TmBCvjNCG3yY8',
  },
  {
    id: 'aeroporto',
    icon: 'plane',
    label: 'Aeroporto Internacional do Recife',
    meta: 'Guararapes · ~8 min de carro',
    mapsUrl:
      'https://www.google.com/maps?geocode=FR73g_8d5BLr_SlZuTACMR6rBzFxCCK73KHLaw%3D%3D;Fc5JhP8dqp3r_Skx8CwqAB-rBzF_bcwhhD96vQ%3D%3D&daddr=Recife+Flats+Temporada+-+Av.+Eng.+Domingos+Ferreira,+2041+-+2041+-+Boa+Viagem,+Recife+-+PE,+51111-020&saddr=Aeroporto+Internacional+do+Recife/Guararapes+-+Gilberto+Freyre+-+Pra%C3%A7a+Ministro+Salgado+Filho+-+Imbiribeira,+Recife+-+PE&dirflg=d',
  },
];

/** QR Code Waze — aponta para direções até o endereço */
export const WAZE_QR_URL =
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(MAPS_LINKS.waze)}`;

export const LOCATION_BENEFITS = [
  {
    id: 'boa-viagem',
    title: 'Boa Viagem',
    description: 'Ideal para quem quer praia, padarias, restaurantes e rotina resolvida a pé.',
    items: [
      '100 m a 200 m da orla em unidades selecionadas',
      'Mercados, farmácias e cafés por perto',
      'Ótima base para casal, família ou trabalho remoto',
    ],
  },
  {
    id: 'pina',
    title: 'Pina',
    description: 'Região estratégica perto do RioMar, do polo empresarial e do acesso ao centro.',
    items: [
      'Ao lado do RioMar Shopping',
      'Boa conexão com vias principais',
      'Excelente para estadias médias e longas',
    ],
  },
  {
    id: 'pratico',
    title: 'Vantagem prática',
    description: 'Você economiza tempo de deslocamento e fica perto do que realmente usa na viagem.',
    items: [
      '~8 min do aeroporto em rotas favoráveis',
      '~2 min da praia em unidades selecionadas',
      'Suporte por WhatsApp durante a estadia',
    ],
  },
];

/** Fallback quando a Places API não está configurada */
export const FALLBACK_REVIEWS = {
  rating: 4.9,
  userRatingCount: 42,
  source: 'Google',
  reviews: [],
};

/** Serviço de transfer aeroporto → apartamentos */
export const TRANSFER_SERVICE = {
  title: 'Precisará de transfer até nossas acomodações?',
  description:
    'Temos esse serviço. Agende com antecedência e garanta um transfer tranquilo até nossos apartamentos.',
  cta: 'Verificar disponibilidade',
  whatsappMessage:
    'Olá! Vou precisar de transfer até o apartamento. Gostaria de verificar disponibilidade, valores e horários. Pode me ajudar?',
};

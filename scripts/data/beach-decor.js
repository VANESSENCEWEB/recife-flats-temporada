/**
 * Motivos de praia em contorno hand-drawn (estilo da referência).
 * Estrela-do-mar, concha espiral, sol com raios decorativos.
 *
 * Uso: beachDecorLayer(['starfish', 'shell', 'sun'])
 */

const STROKE = 'stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"';

const MOTIFS = {
  /* Estrela-do-mar orgânica — braços com nervuras até o centro */
  starfish: `
    <svg class="beach-decor__svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <path stroke-width="1.6" d="
        M80 18
        C86 34 90 48 92 58
        C104 52 122 42 138 34
        C128 48 116 60 104 68
        C114 78 128 92 138 108
        C120 102 102 96 90 92
        C88 106 86 124 84 142
        C78 124 74 106 72 92
        C60 96 42 102 24 108
        C34 92 48 78 58 68
        C46 60 34 48 24 34
        C40 42 58 52 70 58
        C72 48 76 34 80 18 Z"/>
      <circle cx="80" cy="76" r="7" stroke-width="1.35"/>
      <path stroke-width="1.15" d="M80 69 C82 54 84 40 82 26"/>
      <path stroke-width="1.15" d="M86 78 C100 72 118 62 132 50"/>
      <path stroke-width="1.15" d="M84 82 C98 90 116 102 130 114"/>
      <path stroke-width="1.15" d="M80 83 C78 100 76 118 78 134"/>
      <path stroke-width="1.15" d="M74 82 C60 90 42 102 30 114"/>
      <path stroke-width="1.15" d="M74 78 C60 72 42 62 28 50"/>
    </svg>
  `,

  /* Concha espiral / búzio — contorno + segmentos */
  shell: `
    <svg class="beach-decor__svg" viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <path stroke-width="1.6" d="
        M118 28
        C108 18 92 14 78 18
        C58 24 42 42 38 62
        C34 82 42 98 58 106
        C72 112 92 108 104 96
        C116 84 122 66 118 48
        C116 40 118 34 118 28 Z"/>
      <path stroke-width="1.25" d="M112 32 C102 24 90 22 80 26 C68 30 58 42 56 56"/>
      <path stroke-width="1.2" d="M108 42 C98 34 88 34 80 40 C72 46 68 56 68 66"/>
      <path stroke-width="1.15" d="M104 54 C96 48 88 50 84 56 C80 62 80 72 84 78"/>
      <path stroke-width="1.2" d="M42 70 C52 78 68 86 86 88 C98 90 108 86 114 78"/>
      <path stroke-width="1.15" d="M48 82 C62 90 78 96 96 94"/>
      <path stroke-width="1.3" d="M36 64 C28 72 26 86 34 96 C42 104 56 108 56 108"/>
      <path stroke-width="1.1" d="M92 36 C96 42 98 50 96 58"/>
    </svg>
  `,

  /* Sol metade — raios com pontinhos, laços e variações */
  sun: `
    <svg class="beach-decor__svg" viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <path stroke-width="1.7" d="M8 8 V152"/>
      <path stroke-width="1.6" d="M8 28 C48 28 78 52 78 80 C78 108 48 132 8 132"/>
      <path stroke-width="1.1" d="M14 48 C28 52 40 62 46 76"/>
      <path stroke-width="1.1" d="M14 112 C28 108 40 98 46 84"/>
      <path stroke-width="1.05" d="M18 64 C30 68 38 74 42 82"/>
      <path stroke-width="1.05" d="M18 96 C30 92 38 86 42 78"/>
      <circle cx="22" cy="72" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="88" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="24" cy="80" r="1" fill="currentColor" stroke="none"/>

      <!-- raios -->
      <path stroke-width="1.25" d="M78 80 H128"/>
      <circle cx="132" cy="80" r="2.2"/>

      <path stroke-width="1.2" d="M76 62 L118 42"/>
      <circle cx="122" cy="40" r="2"/>

      <path stroke-width="1.2" d="M76 98 L118 118"/>
      <circle cx="122" cy="120" r="2"/>

      <path stroke-width="1.15" d="M72 48 L102 22"/>
      <circle cx="106" cy="18" r="1.8"/>

      <path stroke-width="1.15" d="M72 112 L102 138"/>
      <circle cx="106" cy="142" r="1.8"/>

      <path stroke-width="1.1" d="M68 38 L88 12"/>
      <path stroke-width="1.1" d="M84 16 C86 12 90 12 92 16" />

      <path stroke-width="1.1" d="M68 122 L88 148"/>
      <path stroke-width="1.1" d="M84 144 C86 148 90 148 92 144"/>

      <path stroke-width="1.05" d="M74 70 L108 58"/>
      <circle cx="112" cy="56" r="1.5"/>

      <path stroke-width="1.05" d="M74 90 L108 102"/>
      <circle cx="112" cy="104" r="1.5"/>

      <path stroke-width="1.05" d="M70 54 C92 48 104 36 110 28"/>
      <path stroke-width="1.05" d="M70 106 C92 112 104 124 110 132"/>
    </svg>
  `,

  /* Onda fina (apoio) */
  wave: `
    <svg class="beach-decor__svg" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <path stroke-width="1.5" d="M6 40 C32 18 48 58 74 36 C100 14 116 56 142 34 C162 18 180 34 194 28"/>
      <path stroke-width="1.2" opacity="0.75" d="M6 52 C36 32 54 62 80 44 C106 26 124 60 150 44 C168 32 184 46 194 42"/>
    </svg>
  `,

  /* Palmeira simples em outline (apoio) */
  palm: `
    <svg class="beach-decor__svg" viewBox="0 0 90 140" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <path stroke-width="1.6" d="M48 132 C46 100 44 78 42 52"/>
      <path stroke-width="1.35" d="M42 56 C28 48 16 36 12 22 C22 28 34 40 42 56 Z"/>
      <path stroke-width="1.35" d="M42 54 C52 40 68 28 82 20 C74 34 58 46 42 54 Z"/>
      <path stroke-width="1.25" d="M44 60 C30 58 18 52 10 42 C22 48 34 56 44 60 Z"/>
      <path stroke-width="1.25" d="M44 62 C58 56 72 52 84 50 C72 60 56 64 44 62 Z"/>
    </svg>
  `,

  /* Duas pranchas na areia — uma com flores, outra com ondas */
  surfboards: `
    <svg class="beach-decor__svg" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" ${STROKE}>
      <!-- prancha esquerda (mais baixa, flores) -->
      <path stroke-width="1.55" d="
        M28 128
        C22 110 18 88 18 66
        C18 42 26 22 38 14
        C50 22 58 42 58 66
        C58 88 54 110 48 128
        Z"/>
      <path stroke-width="1.15" d="M38 20 V122"/>
      <!-- flor cima -->
      <circle cx="38" cy="48" r="4.5" stroke-width="1.1"/>
      <path stroke-width="1.05" d="
        M38 40 C40 44 42 46 38 48 C34 46 36 44 38 40
        M46 48 C42 50 40 52 38 48 C40 44 42 46 46 48
        M38 56 C36 52 34 50 38 48 C42 50 40 52 38 56
        M30 48 C34 46 36 44 38 48 C36 52 34 50 30 48"/>
      <!-- flor baixo -->
      <circle cx="38" cy="96" r="4.2" stroke-width="1.1"/>
      <path stroke-width="1.05" d="
        M38 88 C40 92 42 94 38 96 C34 94 36 92 38 88
        M46 96 C42 98 40 100 38 96 C40 92 42 94 46 96
        M38 104 C36 100 34 98 38 96 C42 98 40 100 38 104
        M30 96 C34 94 36 92 38 96 C36 100 34 98 30 96"/>

      <!-- prancha direita (mais alta, ondas) -->
      <path stroke-width="1.55" d="
        M68 132
        C62 112 58 86 58 58
        C58 32 68 12 80 8
        C92 12 102 32 102 58
        C102 86 98 112 92 132
        Z"/>
      <path stroke-width="1.15" d="M80 14 V126"/>
      <path stroke-width="1.15" d="M66 108 C72 104 80 104 88 108 C94 111 98 110 100 108"/>
      <path stroke-width="1.1" d="M66 116 C74 112 82 112 90 116 C96 119 100 118 100 116"/>
      <path stroke-width="1.05" d="M68 124 C76 120 84 120 92 124"/>

      <!-- areia -->
      <path stroke-width="1.2" d="M16 134 C36 130 56 138 78 132 C96 128 108 136 118 134"/>
      <path stroke-width="1.05" opacity="0.8" d="M20 140 C40 136 62 142 84 138 C100 136 112 140 118 140"/>
    </svg>
  `,
};

const PLACEMENTS = [
  { cls: 'beach-decor__motif--a' },
  { cls: 'beach-decor__motif--b' },
  { cls: 'beach-decor__motif--c' },
];

/**
 * @param {Array<'starfish'|'shell'|'sun'|'wave'|'palm'|'surfboards'>} motifs
 * @param {string} [variant]
 */
export function beachDecorLayer(motifs = ['starfish', 'shell', 'sun'], variant = '') {
  const picks = motifs.filter((m) => MOTIFS[m]).slice(0, 3);
  if (!picks.length) return '';

  const items = picks.map((name, i) => {
    const place = PLACEMENTS[i] || PLACEMENTS[0];
    return `
      <span class="beach-decor__motif ${place.cls} beach-decor__motif--${name}" aria-hidden="true">
        ${MOTIFS[name]}
      </span>
    `;
  }).join('');

  return `
    <div class="beach-decor${variant ? ` beach-decor--${variant}` : ''}" aria-hidden="true">
      ${items}
    </div>
  `;
}

/**
 * Motivos de praia em contorno (SVG stroke) para fundos de seção.
 * Uso: beachDecorLayer(['starfish', 'palm', 'wave'])
 */

const MOTIFS = {
  starfish: `
    <svg class="beach-decor__svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 10 L70 46 L108 46 L78 68 L90 104 L60 82 L30 104 L42 68 L12 46 L50 46 Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="60" cy="58" r="6" stroke="currentColor" stroke-width="1.25"/>
    </svg>
  `,
  palm: `
    <svg class="beach-decor__svg" viewBox="0 0 90 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 132 C46 100 44 78 42 52" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M42 56 C28 48 16 36 12 22 C22 28 34 40 42 56 Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M42 54 C52 40 68 28 82 20 C74 34 58 46 42 54 Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M44 60 C30 58 18 52 10 42 C22 48 34 56 44 60 Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M44 62 C58 56 72 52 84 50 C72 60 56 64 44 62 Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
    </svg>
  `,
  wave: `
    <svg class="beach-decor__svg" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 36 C28 18 44 48 68 32 C92 16 108 48 132 30 C148 18 164 28 176 24"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M4 46 C30 30 48 54 72 40 C96 26 114 54 138 40 C154 30 168 40 176 36"
            stroke="currentColor" stroke-width="1.25" stroke-linecap="round" opacity="0.75"/>
    </svg>
  `,
  shell: `
    <svg class="beach-decor__svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 88 C28 88 14 70 14 50 C14 28 32 12 50 12 C68 12 86 28 86 50 C86 70 72 88 50 88 Z"
            stroke="currentColor" stroke-width="1.5"/>
      <path d="M50 88 V20" stroke="currentColor" stroke-width="1.2"/>
      <path d="M50 88 C40 70 34 52 34 34" stroke="currentColor" stroke-width="1.15"/>
      <path d="M50 88 C60 70 66 52 66 34" stroke="currentColor" stroke-width="1.15"/>
      <path d="M22 58 C34 54 42 48 50 40" stroke="currentColor" stroke-width="1.1"/>
      <path d="M78 58 C66 54 58 48 50 40" stroke="currentColor" stroke-width="1.1"/>
    </svg>
  `,
  sun: `
    <svg class="beach-decor__svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="16" stroke="currentColor" stroke-width="1.5"/>
      <path d="M50 12 V22 M50 78 V88 M12 50 H22 M78 50 H88 M22 22 L29 29 M71 71 L78 78 M78 22 L71 29 M29 71 L22 78"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `,
};

const PLACEMENTS = [
  { cls: 'beach-decor__motif--a', motif: 0 },
  { cls: 'beach-decor__motif--b', motif: 1 },
  { cls: 'beach-decor__motif--c', motif: 2 },
];

/**
 * @param {Array<'starfish'|'palm'|'wave'|'shell'|'sun'>} motifs
 * @param {string} [variant]
 */
export function beachDecorLayer(motifs = ['starfish', 'palm'], variant = '') {
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

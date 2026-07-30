/**
 * split-text.js — quebra texto em letras OU palavras.
 * Preserva tags internas como <em>, <strong>.
 */

export function splitTextIntoLetters(el) {
  if (!el) return [];
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      [...node.textContent].forEach((ch) => {
        const s = document.createElement('span');
        s.className = 'letter';
        s.style.display = 'inline-block';
        s.innerHTML = ch === ' ' ? '&nbsp;' : ch;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'SVG' || node.tagName === 'IMG' || node.tagName === 'BR') return;
      [...node.childNodes].forEach(walk);
    }
  };
  [...el.childNodes].forEach(walk);
  return el.querySelectorAll('.letter');
}

/**
 * Quebra texto em PALAVRAS (espaço delimita).
 * Tags inline (<em>, <strong>) viram UMA palavra única.
 * SVG/IMG são ignorados (passam intactos pro DOM).
 */
export function splitTextIntoWords(el) {
  if (!el) return [];

  const wrapTextNode = (textNode) => {
    const text = textNode.textContent;
    if (!text.trim()) return;
    const parts = text.split(/(\s+)/);  // mantém espaços
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else if (part.length) {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        frag.appendChild(span);
      }
    });
    textNode.parentNode.replaceChild(frag, textNode);
  };

  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextNode(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // ignora SVG, IMG
      if (node.tagName === 'SVG' || node.tagName === 'IMG') return;
      // <em>, <strong> viram uma palavra única, animam como bloco
      if (node.tagName === 'EM' || node.tagName === 'STRONG') {
        node.classList.add('word');
        return;
      }
      // qualquer outro elemento, desce
      [...node.childNodes].forEach(walk);
    }
  };

  [...el.childNodes].forEach(walk);
  return el.querySelectorAll('.word');
}
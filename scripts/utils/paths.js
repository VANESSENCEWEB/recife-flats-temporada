/** Páginas em /apartamentos/*.html (paths relativos precisam de ../). */
export function isNestedApartmentPage() {
  return typeof window !== 'undefined' && window.location.pathname.includes('/apartamentos/');
}

/** @param {string} path */
export function assetUrl(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\.\//, '');
  return isNestedApartmentPage() ? `../${clean}` : `./${clean}`;
}

/** @param {string} path */
export function pageHref(path) {
  if (!path || /^https?:\/\//.test(path) || path.startsWith('#')) return path;
  const clean = path.replace(/^\.\//, '');
  return isNestedApartmentPage() ? `../${clean}` : `./${clean}`;
}

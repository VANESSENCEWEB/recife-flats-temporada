/**
 * Fetches day/night hero assets from a static JSON API (or CMS endpoint).
 *
 * Default layout:
 *   GET {apiBase}/hero/{heroId}/day.json
 *   GET {apiBase}/hero/{heroId}/night.json
 *
 * @typedef {object} HeroAsset
 * @property {string} video      MP4 URL
 * @property {string} [videoWebm] WebM URL
 * @property {string} [poster]   Poster image URL
 */

/**
 * @param {string} heroId
 * @param {'day' | 'night'} period
 * @param {string} apiBase
 * @returns {Promise<HeroAsset>}
 */
export async function fetchHeroAsset(heroId, period, apiBase) {
  const base = apiBase.replace(/\/$/, '');
  const url = `${base}/hero/${heroId}/${period}.json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Hero asset not found (${period}): ${res.status}`);
  }

  return res.json();
}

/**
 * Fetches day and night configs in parallel.
 * @param {string} heroId
 * @param {string} apiBase
 * @returns {Promise<{ day: HeroAsset, night: HeroAsset }>}
 */
export async function fetchHeroAssetsByPeriod(heroId, apiBase) {
  const [day, night] = await Promise.all([
    fetchHeroAsset(heroId, 'day', apiBase),
    fetchHeroAsset(heroId, 'night', apiBase),
  ]);

  return { day, night };
}

/**
 * @param {{ day: HeroAsset, night: HeroAsset }} assets
 * @param {'day' | 'night'} period
 * @returns {HeroAsset}
 */
export function pickActiveAsset(assets, period) {
  return period === 'day' ? assets.day : assets.night;
}

/**
 * Builds fallback assets from HTML attributes when the API is unavailable.
 * Legacy `video` / `poster` attributes map to the day period.
 * @param {HTMLElement} el
 * @returns {{ day: HeroAsset, night: HeroAsset }}
 */
export function getFallbackAssetsFromElement(el) {
  const day = {
    video: el.getAttribute('video-day') || el.getAttribute('video') || '',
    videoWebm: el.getAttribute('video-webm-day') || el.getAttribute('video-webm') || '',
    poster: el.getAttribute('poster-day') || el.getAttribute('poster') || '',
  };

  const night = {
    video: el.getAttribute('video-night')
      || el.getAttribute('video-day')
      || el.getAttribute('video')
      || '',
    videoWebm: el.getAttribute('video-webm-night')
      || el.getAttribute('video-webm-day')
      || el.getAttribute('video-webm')
      || '',
    poster: el.getAttribute('poster-night')
      || el.getAttribute('poster-day')
      || el.getAttribute('poster')
      || '',
  };

  return { day, night };
}

/**
 * @param {HTMLVideoElement} videoEl
 * @param {HTMLImageElement | null} posterEl
 * @param {HeroAsset} asset
 */
export function applyVideoAsset(videoEl, posterEl, asset) {
  if (!videoEl || !asset?.video) return;

  if (posterEl && asset.poster) {
    posterEl.src = asset.poster;
  }
  if (asset.poster) {
    videoEl.poster = asset.poster;
  }

  let webmSource = videoEl.querySelector('source[type="video/webm"]');
  const mp4Source = videoEl.querySelector('source[type="video/mp4"]');

  if (asset.videoWebm) {
    if (!webmSource) {
      webmSource = document.createElement('source');
      webmSource.type = 'video/webm';
      videoEl.insertBefore(webmSource, mp4Source || null);
    }
    webmSource.src = asset.videoWebm;
  } else if (webmSource) {
    webmSource.remove();
  }

  if (mp4Source) {
    mp4Source.src = asset.video;
  } else {
    const source = document.createElement('source');
    source.type = 'video/mp4';
    source.src = asset.video;
    videoEl.appendChild(source);
  }

  videoEl.load();
  videoEl.play().catch(() => {});
}
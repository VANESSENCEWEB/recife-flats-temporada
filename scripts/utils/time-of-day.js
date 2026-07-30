/**
 * Time-of-day helpers for hero asset switching.
 * Uses IANA timezone (default: America/Recife).
 */

const DEFAULTS = {
  timezone: 'America/Recife',
  dayStartHour: 6,
  nightStartHour: 18,
};

function getHourInTimezone(date, timezone) {
  return Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: timezone,
    }).format(date)
  );
}

/**
 * @param {object} [options]
 * @param {string} [options.timezone]
 * @param {number} [options.dayStartHour]  Hour when "day" begins (inclusive)
 * @param {number} [options.nightStartHour] Hour when "night" begins (inclusive)
 * @returns {'day' | 'night'}
 */
export function getTimeOfDay(options = {}) {
  const { timezone, dayStartHour, nightStartHour } = { ...DEFAULTS, ...options };
  const hour = getHourInTimezone(new Date(), timezone);

  return hour >= dayStartHour && hour < nightStartHour ? 'day' : 'night';
}

/**
 * Reads time-of-day options from a <rf-hero> element's attributes.
 * @param {HTMLElement} el
 */
export function getTimeOptionsFromElement(el) {
  return {
    timezone: el.getAttribute('timezone') || DEFAULTS.timezone,
    dayStartHour: Number(el.getAttribute('day-start') ?? DEFAULTS.dayStartHour),
    nightStartHour: Number(el.getAttribute('night-start') ?? DEFAULTS.nightStartHour),
  };
}
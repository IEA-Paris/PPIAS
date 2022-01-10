import {
  url as urlRegex,
  email,
  alpha as alphaRegex,
  ytUrl as youtubeRegex,
} from './regex'
export default {
  required: (ctx) => [
    (v) =>
      (v !== undefined &&
        v !== null &&
        v !== false &&
        (Array.isArray(v) || typeof v === 'string' ? v.length > 0 : true)) ||
      ctx.$t('required'),
  ],

  alpha: (ctx) => [
    (v) =>
      !v ||
      alphaRegex.test(v) ||
      ctx.$t('rules.numbers-and-special-characters-not-allowed'),
  ],

  min: (ctx) => (min) =>
    [
      (v) =>
        !v || v.length >= min || ctx.$t('rules.at-least-0-characters', [min]),
    ],

  max: (ctx) => (max) =>
    [(v) => !v || v.length <= max || ctx.$t('rules.max-0-characters', [max])],

  url: (ctx) => [
    (v) =>
      !v || (v.length > 0 && urlRegex.test(v)) || ctx.$t('rules.invalid-url'),
  ],

  email: (ctx) => [
    (v) =>
      !v || (v.length > 0 && email.test(v)) || ctx.$t('rules.invalid-e-mail'),
  ],

  yt: (ctx) => [
    (v) =>
      !v ||
      (v.length > 0 && youtubeRegex.test(v)) ||
      ctx.$t('rules.invalid-youtube-url'),
  ],
}

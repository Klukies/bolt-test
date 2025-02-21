import { type InitOptions } from 'i18next';

import translation from './locales/en/translation.json';

export default {
  supportedLngs: ['en'],
  fallbackLng: 'en',
  react: { useSuspense: false },
  resources: { en: { translation } },
} satisfies InitOptions;

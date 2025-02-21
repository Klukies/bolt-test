import { createCookie } from 'react-router';
import { RemixI18Next } from 'remix-i18next/server';

import i18nConfig from './i18n.config';

export const localeCookie = createCookie('locale', {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
});

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: { ...i18nConfig },
});

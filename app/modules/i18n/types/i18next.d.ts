import 'i18next';

import type Resources from './i18next.resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: Resources;
  }
}

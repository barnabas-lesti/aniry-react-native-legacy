import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

/**
 * Application localization setup object.
 */
export const i18n = i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

export { useAppTranslation } from './hooks';

/**
 * Application localization setup object.
 */
export const i18n = i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

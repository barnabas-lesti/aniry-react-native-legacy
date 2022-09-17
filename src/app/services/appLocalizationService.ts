import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { messages } from '../messages';

class AppLocalizationService {
  createInstance() {
    return i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources: messages,
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }
}

export const appLocalizationService = new AppLocalizationService();

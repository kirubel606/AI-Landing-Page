import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files (optional, can use backend for loading)
import translationEN from '../public/locales/en/translation.json';
import translationAM from '../public/locales/am/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  am: {
    translation: translationAM
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
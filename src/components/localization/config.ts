import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import tr from './tr.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { common: en },
      tr: { common: tr },
    },
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    fallbackNS: ['common'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'navigator'],
    },
    // debug: process.env.NODE_ENV !== 'production',
  });
export default i18n;
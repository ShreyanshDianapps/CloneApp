import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Pass in the react-i18next plugin
  .init({
    resources: {
      en:  en ,
      hi:  hi ,
      // Add more languages if needed
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react
    },
  });

export default i18n;

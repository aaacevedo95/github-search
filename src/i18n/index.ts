import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/en.json';
import translationJA from './ja/ja.json';

const DEFAULT_LANG = window.localStorage.getItem('lang') || i18n.language;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ja: { translation: translationJA },
  },
  lng: 'ja',
  fallbackLng: 'ja',
});

export { DEFAULT_LANG };
export default i18n;

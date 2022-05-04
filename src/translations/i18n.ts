import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import fa from './fa.json';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  fallbackLng: 'fa',
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
}).then(() => {});
export default i18n;

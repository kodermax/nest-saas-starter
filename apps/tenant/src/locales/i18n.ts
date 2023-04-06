import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import { defaultLang } from './config';
//
import enLocales from './langs/en';
import frLocales from './langs/fr';
import vnLocales from './langs/vn';
import cnLocales from './langs/cn';
import arLocales from './langs/ar';

// ----------------------------------------------------------------------

let lng = defaultLang.value;

if (typeof window !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      fr: { translations: frLocales },
      vn: { translations: vnLocales },
      cn: { translations: cnLocales },
      ar: { translations: arLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

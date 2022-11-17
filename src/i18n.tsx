import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import transilationEn from'./locales/en/en.json'
import transilationAr from './locales/ar/ar.json'
import LanguageDetector  from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: transilationEn,
    },
    ar: {
        translation: transilationAr,
    },
}

i18next
.use(LanguageDetector )
.use(initReactI18next)
.init({
  resources,
  lng:localStorage.getItem('lang') || 'en', //default language
  fallbackLng: "en",
});

export default i18next;
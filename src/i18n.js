import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationAr from "./locales/ar/translation.json";
import translationEn from "./locales/en/translation.json";

const resources = {
  ar: { translation: translationAr },
  en: { translation: translationEn },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // اللغة الافتراضية
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

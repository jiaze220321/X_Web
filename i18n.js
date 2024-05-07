// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "/public/locales/en/common.json";
import common_zh from "/public/locales/zh/common.json";

i18n
  .use(initReactI18next) // 绑定 React-i18next
  .init({
    resources: {
      en: {
        common: common_en,
      },
      zh: {
        common: common_zh,
      },
    },
    lng: "zh", // 默认语言
    fallbackLng: "zh", // 备用语言
    interpolation: {
      escapeValue: false, // React 已经可以防止 XSS
    },
  });

export default i18n;

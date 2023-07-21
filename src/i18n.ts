import i18n, { changeLanguage as i18ChangeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en";
import hy from "./resources/hy";

export const locales = {
  en: "English",
  hy: "Հայերեն",
};

export type LocaleKeys = keyof typeof locales;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: { en, hy },
    lng: "hy", // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const changeLanguage = (locale: string) =>
  i18ChangeLanguage(locale).then(() => {
    i18n.init({
      lng: locale,
    });
  });

const locale = JSON.parse(localStorage.getItem("locale") || '"en"');
changeLanguage(locale);

export default i18n;

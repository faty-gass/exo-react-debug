import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          title: "Neoxia Task Starter",
          description: "This application is a task manager designed with React and TypeScript. The application is currently facing several bugs and issues that require immediate attention.",
        },
      },
      fr: {
        translations: {
          title: "Neoxia Task Starter",
          Description: "Cette application est un gestionnaire de tâches conçu avec React et TypeScript. L'application est actuellement confrontée à plusieurs bugs et problèmes qui nécessitent une attention immédiate.",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
    },
  });

export default i18n;
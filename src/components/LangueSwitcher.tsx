import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useCallback } from "react";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const switchLanguague = useCallback(() => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  }, [i18n]);

  return (
    <Button onClick={switchLanguague}>
      {i18n.language === "en" ? "French" : "Anglais"}
    </Button>
  );
}

export default LanguageSwitcher;

import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <>
      {i18n.language === "en" ? (
        <Button>Français</Button>
      ) : (
        <Button>English</Button>
      )}
    </>
  );
}

export default LanguageSwitcher;

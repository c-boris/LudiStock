import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import * as i18n from "./i18n";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

export const LanguageContext = createContext(null);

const TranslationProvider = ({ children }) => {
  const [lng, setLng] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  const toggleLng = () => {
    setLng((lng) => (lng === "en" ? "fr" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lng, toggleLng, t, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TranslationProvider;

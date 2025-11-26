import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./languageSwitcher.scss";

const LanguageSwitcher = () => {
  const { Option } = Select;
  const [language, setLanguage] = useState<string | null>("tr");

  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      let userLang = navigator.language;
      localStorage.setItem("language", userLang);
    } else {
      const languageLocalStorage = localStorage.getItem("language");
      setLanguage(languageLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (language === "en" || language === "en-US") {
      i18n.changeLanguage("en");
      localStorage.setItem("language", "en");
    }
    if (language === "tr" || language === "en-TR") {
      i18n.changeLanguage("tr");
      localStorage.setItem("language", "tr");
    }
  }, [language]);

  return (
    <div className="language-switcher">
      <Select
        value={language}
        style={{ width: 120 }}
        onChange={(e) => setLanguage(e)}
      >
        <Option value="tr">Türkçe</Option>
        <Option value="en">English</Option>
      </Select>
      <p>{t("Header.LanguageSwithcher")}</p>
    </div>
  );
};

export default LanguageSwitcher;

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const SUPPORTED_LANGUAGES: Language[] = ["en", "pt", "es", "de", "ru"];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("l2j_lang") as Language;
    
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      // Automatic detection
      const browserLang = navigator.language.split("-")[0] as Language;
      if (SUPPORTED_LANGUAGES.includes(browserLang)) {
        setLanguageState(browserLang);
        document.documentElement.lang = browserLang;
      } else {
        // Fallback to English
        setLanguageState("en");
        document.documentElement.lang = "en";
      }
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setLanguageState(lang);
    localStorage.setItem("l2j_lang", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: keyof (typeof translations)["en"]) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  // Prevent hydration flicker by only rendering children after initialization
  if (!isInitialized) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

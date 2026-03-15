/**
 * Shared local language context — used by LangSection to provide
 * a delayed version of t() to its children, enabling staggered
 * per-section language transitions.
 *
 * Kept in /lib to break circular imports between
 * LanguageContext.tsx (which reads it) and LangSection.tsx (which provides it).
 */
import { createContext } from "react";
import { Language, translations } from "@/lib/translations";

export type LocalLangContextType = {
  t: (key: keyof (typeof translations)["en"]) => string;
  language: Language;
};

export const LocalLangContext = createContext<LocalLangContextType | null>(null);

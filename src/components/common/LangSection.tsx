"use client";

/**
 * LangSection - Per-section language transition.
 *
 * This component provides a DELAYED local copy of t() to all children via
 * LocalLangContext. When the global language changes:
 *  1. The section immediately fades out (80ms)
 *  2. After `delay` ms, the local language updates + section fades back in
 *
 * Because children call useLanguage() which prefers LocalLangContext over
 * the global one, they will show the OLD language text during the fade-out
 * and only switch to the NEW language when fading back in.
 * Multiple sections with increasing delays create a genuine staggered wave.
 */

import {
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/components/LanguageContext";
import { LocalLangContext } from "@/lib/LocalLangContext";
import { Language, translations } from "@/lib/translations";

interface LangSectionProps {
  children: ReactNode;
  /** Stagger delay in seconds (e.g. 0.1 = 100ms after the section before it) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  zIndex?: number;
}

export function LangSection({
  children,
  delay = 0,
  className,
  style,
  zIndex,
}: LangSectionProps) {
  const global = useLanguage();
  const [localLang, setLocalLang] = useState<Language>(global.language);
  const [opacity, setOpacity] = useState(1);
  const isFirst = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip initial mount — only react to actual language changes
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Fade out immediately
    setOpacity(0);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Now update local language (text swaps here, invisible during fade-out)
      setLocalLang(global.language);
      // Fade back in
      setOpacity(1);
    }, 200 + delay * 1000); // 200ms = fade-out duration, then stagger

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [global.language]); // eslint-disable-line react-hooks/exhaustive-deps

  const localT = (key: keyof (typeof translations)["en"]) =>
    translations[localLang][key] || translations["en"][key] || key;

  return (
    <LocalLangContext.Provider value={{ t: localT, language: localLang }}>
      <div
        className={className}
        style={{
          ...style,
          opacity,
          zIndex,
          position: zIndex ? "relative" : style?.position,
          transition:
            opacity === 0
              ? "opacity 200ms ease" // fade-out: 200ms
              : "opacity 400ms ease", // fade-in: 400ms (slower, more visible)
          willChange: "opacity",
        }}
      >
        {children}
      </div>
    </LocalLangContext.Provider>
  );
}

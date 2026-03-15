"use client";

import { useTheme } from "@/components/ThemeContext";
import { useLanguage } from "@/components/LanguageContext";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/**
 * Modular Theme Toggle
 * Replicates the landing page header-icon-btn style and dropdown behavior.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header-dropdown-container" ref={containerRef}>
      <button 
        className={`header-icon-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === "dark" && <Moon size={18} />}
        {theme === "light" && <Sun size={18} />}
        {theme === "system" && <Monitor size={18} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="header-dropdown"
          >
            <div className="header-dropdown-inner">
              <button 
                onClick={() => { setTheme("light"); setIsOpen(false); }} 
                className={theme === "light" ? "active" : ""}
              >
                <Sun size={16} /> {t("light")}
                {theme === "light" && <Check size={14} className="ml-auto" />}
              </button>
              <button 
                onClick={() => { setTheme("dark"); setIsOpen(false); }} 
                className={theme === "dark" ? "active" : ""}
              >
                <Moon size={16} /> {t("dark")}
                {theme === "dark" && <Check size={14} className="ml-auto" />}
              </button>
              <button 
                onClick={() => { setTheme("system"); setIsOpen(false); }} 
                className={theme === "system" ? "active" : ""}
              >
                <Monitor size={16} /> {t("system")}
                {theme === "system" && <Check size={14} className="ml-auto" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

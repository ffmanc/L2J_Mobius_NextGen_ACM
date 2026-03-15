"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { Languages, Sun, Moon, Monitor, Check, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { ServerStatusBadge } from "@/components/layout/ServerStatusBadge";

export function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <header className="landing-header">
      <div className="header-container">
        {/* Row 1: Logo (left) + Status badge (right) */}
        <div className="header-top-row">
          <Logo size="sm" />
          <div className="header-status-slot">
            <ServerStatusBadge />
          </div>
        </div>

        {/* Row 2: Lang/Theme (left) + Auth buttons (right) */}
        <div className="header-bottom-row">
          <div className="header-controls-left">
            {/* Language Switcher */}
            <div className="header-dropdown-container">
              <button className="header-icon-btn">
                <Languages size={18} />
                <span className="lang-code">{language.toUpperCase()}</span>
              </button>
              <div className="header-dropdown">
                <div className="header-dropdown-inner">
                  {["en", "pt", "es", "de", "ru"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang as any)}
                      className={language === lang ? "active" : ""}
                    >
                      {lang === "en" && "English"}
                      {lang === "pt" && "Português"}
                      {lang === "es" && "Español"}
                      {lang === "de" && "Deutsch"}
                      {lang === "ru" && "Русский"}
                      {language === lang && <Check size={14} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="header-dropdown-container">
              <button className="header-icon-btn">
                {theme === "dark" && <Moon size={18} />}
                {theme === "light" && <Sun size={18} />}
                {theme === "system" && <Monitor size={18} />}
              </button>
              <div className="header-dropdown">
                <div className="header-dropdown-inner">
                  <button onClick={() => setTheme("light")} className={theme === "light" ? "active" : ""}>
                    <Sun size={16} /> {t("light")} {theme === "light" && <Check size={14} className="ml-auto" />}
                  </button>
                  <button onClick={() => setTheme("dark")} className={theme === "dark" ? "active" : ""}>
                    <Moon size={16} /> {t("dark")} {theme === "dark" && <Check size={14} className="ml-auto" />}
                  </button>
                  <button onClick={() => setTheme("system")} className={theme === "system" ? "active" : ""}>
                    <Monitor size={16} /> {t("system")} {theme === "system" && <Check size={14} className="ml-auto" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="header-auth-group">
            {isLoggedIn ? (
              <Link href="/dashboard" className="btn btn-primary btn-sm">
                {t("goToDashboard")}
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary btn-sm ghost">
                  <LogIn size={14} />
                  {t("login")}
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm highlight">
                  <UserPlus size={14} />
                  {t("createAccount")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

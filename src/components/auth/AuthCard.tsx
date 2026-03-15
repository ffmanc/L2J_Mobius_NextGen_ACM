"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { LangSection } from "@/components/common/LangSection";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  icon?: ReactNode;
  footer?: ReactNode;
  isCompact?: boolean;
}

/**
 * AuthCard Component
 * 
 * A standardized container for authentication pages (Login, Register, Recovery).
 * strictly preserves the premium design system and layout.
 * 
 * @param title - The main title of the card
 * @param subtitle - The subtitle or description text
 * @param icon - Optional icon to display next to the title (used in Login)
 * @param children - The form or main content
 * @param footer - Footer content (links to other auth pages)
 * @param isCompact - Whether to use the compact registration layout
 */
export function AuthCard({
  children,
  title,
  subtitle,
  icon,
  footer,
  isCompact = false,
}: AuthCardProps) {
  const { t } = useLanguage();

  return (
    <div className="page-wrapper">
      <LandingHeader isLoggedIn={false} />
      
      <main className="auth-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`auth-card ${isCompact ? "compact" : ""}`}
        >
          {/* Header section with back link and title */}
          <LangSection delay={0}>
            <div className={isCompact ? "register-header" : "auth-header"}>
              <Link href="/" className="back-link">
                <ArrowLeft size={16} /> {t("home")}
              </Link>
              
              {icon ? (
                <div className="auth-icon-title">
                  <div className="card-icon-wrapper">
                    {icon}
                  </div>
                  <div>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className={isCompact ? "register-title" : ""}>{title}</h1>
                  <p className={isCompact ? "register-subtitle" : ""}>{subtitle}</p>
                </>
              )}
            </div>
          </LangSection>

          {children}

          {footer && (
            <LangSection delay={0.14}>
              <footer className="auth-footer">
                {footer}
              </footer>
            </LangSection>
          )}
        </motion.div>
      </main>
    </div>
  );
}

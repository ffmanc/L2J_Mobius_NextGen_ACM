"use client";

import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { useLanguage } from "@/components/LanguageContext";
import { LangSection } from "@/components/common/LangSection";
import { PasswordRequirements } from "@/components/auth/PasswordRequirements";
import { EmailAutocomplete } from "@/components/auth/EmailAutocomplete";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering...", formData);
  };

  return (
    <div className="page-wrapper">
      <LandingHeader isLoggedIn={false} />
      
      <main className="auth-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card compact"
        >
          {/* Header section fades independently */}
          <LangSection delay={0}>
            <div className="register-header">
              <Link href="/" className="back-link">
                <ArrowLeft size={16} /> {t("home")}
              </Link>
              <h1 className="register-title">{t("createAccount")}</h1>
              <p className="register-subtitle">{t("registerSubtitle")}</p>
            </div>
          </LangSection>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Form labels fade with a slight offset */}
            <LangSection delay={0.04} zIndex={50}>
              <div className="input-field">
                <label><User size={14} /> {t("username")}</label>
                <input 
                  type="text" 
                  placeholder={t("placeholderAccountId")}
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </LangSection>

            <LangSection delay={0.06} zIndex={40}>
              <div className="input-field relative">
                <label><Mail size={14} /> {t("email")}</label>
                <input 
                  type="email" 
                  placeholder={t("placeholderEmail")}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  autoComplete="off"
                />
                <EmailAutocomplete 
                  email={formData.email} 
                  onSelect={(val) => setFormData({...formData, email: val})} 
                />
              </div>
            </LangSection>

            <LangSection delay={0.08} zIndex={30}>
              <div className="input-field">
                <label><Lock size={14} /> {t("password")}</label>
                <input 
                  type="password" 
                  placeholder={t("placeholderPassword")}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <PasswordRequirements password={formData.password} />
              </div>
            </LangSection>

            <LangSection delay={0.10} zIndex={20}>
              <div className="input-field">
                <label><Lock size={14} /> {t("confirmPassword")}</label>
                <input 
                  type="password" 
                  placeholder={t("placeholderPassword")}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </LangSection>

            <LangSection delay={0.12}>
              <button type="submit" className="btn btn-primary btn-block">
                <UserPlus size={18} />
                {t("createAccount")}
              </button>
            </LangSection>
          </form>

          <LangSection delay={0.14}>
            <footer className="auth-footer">
              {t("alreadyHaveAccount")} <Link href="/login">{t("login")}</Link>
            </footer>
          </LangSection>
        </motion.div>
      </main>
    </div>
  );
}

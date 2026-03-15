"use client";

import { motion } from "framer-motion";
import { LogIn, Key, Shield, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { authenticate } from "@/app/actions/authActions";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";

export default function LoginPage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(authenticate, {
    error: null,
    success: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <div className="page-wrapper">
      <LandingHeader isLoggedIn={false} />
      
      <main className="auth-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-card"
        >
          <div className="auth-header">
            <Link href="/" className="back-link">
              <ArrowLeft size={16} /> {t("home")}
            </Link>
            <div className="auth-icon-title">
              <div className="card-icon-wrapper">
                <LogIn size={24} className="card-icon" />
              </div>
              <div>
                <h1>{t("welcomeBack")}</h1>
                <p>{t("signInSubtitle")}</p>
              </div>
            </div>
          </div>

          <form action={formAction} className="auth-form">
            <div className="input-field">
              <label><Shield size={14} /> {t("accountName")}</label>
              <input
                name="login"
                type="text"
                placeholder={t("placeholderAccountId")}
                required
                autoFocus
              />
            </div>

            <div className="input-field">
              <label><Key size={14} /> {t("password")}</label>
              <input
                name="password"
                type="password"
                placeholder={t("placeholderPassword")}
                required
              />
            </div>

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-alert error"
              >
                {state.error}
              </motion.div>
            )}

            {state?.success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-alert success"
              >
                {t("authSuccess")}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`btn btn-primary btn-block ${isPending ? "loading" : ""}`}
            >
              <LogIn size={18} />
              {isPending ? t("authenticating") : t("signIn")}
            </button>
          </form>

          <footer className="auth-footer">
            {t("noAccount")} <Link href="/register">{t("createAccount")}</Link>
            <div className="mt-4">
               <Link href="#" className="forgot-link">{t("forgotPassword")}</Link>
            </div>
          </footer>
        </motion.div>
      </main>

      <style jsx>{`
        .auth-header { margin-bottom: 2rem; }
        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--accent-primary); }
        .auth-icon-title {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        h1 { color: var(--text-primary); font-size: 1.5rem; font-weight: 800; margin: 0; line-height: 1.2; }
        p { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem; }
        
        .auth-alert {
          padding: 0.85rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          border-left: 4px solid transparent;
        }
        .auth-alert.error {
          background-color: rgba(239, 68, 68, 0.1);
          border-color: var(--danger);
          color: var(--text-primary);
        }
        .auth-alert.success {
          background-color: rgba(16, 185, 129, 0.1);
          border-color: var(--success);
          color: var(--text-primary);
        }
        
        .mt-4 { margin-top: 1rem; }
        .forgot-link { font-size: 0.85rem; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
        .forgot-link:hover { color: var(--accent-secondary); }
      `}</style>
    </div>
  );
}

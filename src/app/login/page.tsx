"use client";

import { LogIn, Key, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { authenticate } from "@/app/actions/authActions";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";

/**
 * LoginPage - User login screen.
 * Documents: English. Standard: High-Standard Engineering.
 * Uses modular AuthCard and AuthInput for consistency.
 */
export default function LoginPage() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(authenticate, {
    error: null,
    success: false,
  });
  const router = useRouter();

  /**
   * Redirect to dashboard on successful login.
   */
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  return (
    <AuthCard
      title={t("welcomeBack")}
      subtitle={t("signInSubtitle")}
      icon={<LogIn size={24} className="card-icon" />}
      footer={
        <>
          {t("noAccount")} <Link href="/register">{t("createAccount")}</Link>
          <div className="mt-4">
             <Link href="/recovery" className="forgot-link">{t("forgotPassword")}</Link>
          </div>
        </>
      }
    >
      <form action={formAction} className="auth-form">
        {/* Account Name Field */}
        <AuthInput
          label={t("accountName")}
          icon={<Shield size={14} />}
          delay={0.04}
          zIndex={20}
        >
          <input
            name="login"
            type="text"
            placeholder={t("placeholderAccountId")}
            required
            autoFocus
            autoComplete="off"
          />
        </AuthInput>

        {/* Password Field */}
        <AuthInput
          label={t("password")}
          icon={<Key size={14} />}
          delay={0.06}
          zIndex={10}
        >
          <input
            name="password"
            type="password"
            placeholder={t("placeholderPassword")}
            required
          />
        </AuthInput>

        {/* Authentication Alerts */}
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

      {/* Legacy CSS preserved for specific alert styles */}
      <style jsx>{`
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
    </AuthCard>
  );
}

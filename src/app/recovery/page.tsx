"use client";

import { Mail, Shield, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { requestRecovery } from "@/app/actions/recoveryActions";
import { motion } from "framer-motion";
import { LangSection } from "@/components/common/LangSection";
import { Turnstile } from "@/components/auth/Turnstile";

/**
 * RecoveryPage - Password recovery screen.
 * Documents: English. Standard: High-Standard Engineering.
 * Features: Modular components, Server Actions, Responsive full-screen mobile layout.
 */
export default function RecoveryPage() {
  const { t, language } = useLanguage();

  const [state, formAction, isPending] = useActionState(
    (prevState: any, fd: FormData) => requestRecovery(prevState, fd, language),
    { error: null, success: false }
  );

  return (
    <AuthCard
      title={t("recoveryTitle")}
      subtitle={t("recoverySubtitle")}
      isCompact={true}
      footer={
        <>
          <Link href="/login" className="back-to-login">
            <ArrowLeft size={14} /> {t("login")}
          </Link>
        </>
      }
    >
      <form action={formAction} className="auth-form">
        {/* Account Name Field */}
        <AuthInput
          label={t("accountName")}
          icon={<Shield size={14} />}
          delay={0.04}
          zIndex={10}
        >
          <input 
            name="login"
            type="text" 
            placeholder={t("placeholderAccountId")}
            required
            autoComplete="off"
            disabled={isPending || state.success}
          />
        </AuthInput>

        {/* Email Field */}
        <AuthInput
          label={t("email")}
          icon={<Mail size={14} />}
          delay={0.06}
        >
          <input 
            name="email"
            type="email" 
            placeholder={t("placeholderEmail")}
            required
            autoComplete="email"
            disabled={isPending || state.success}
          />
        </AuthInput>

        {/* Turnstile Protection */}
        <Turnstile />

        {/* Result Alerts */}
        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-alert error"
          >
            {state.error}
          </motion.div>
        )}

        {state.success && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="auth-alert success"
          >
            {t("recoverySuccess")}
          </motion.div>
        )}

        <LangSection delay={0.08}>
          <button 
            type="submit" 
            className={`btn btn-primary btn-block ${isPending ? "loading" : ""}`}
            disabled={isPending || state.success}
          >
            {isPending ? (
              t("authenticating")
            ) : (
              <>
                <Send size={18} />
                {t("sendRecovery")}
              </>
            )}
          </button>
        </LangSection>
      </form>

      <style jsx>{`
        .auth-alert {
          padding: 0.85rem 1rem;
          border-radius: 10px;
          font-size: 0.9rem;
          border-left: 4px solid transparent;
          margin-bottom: 1rem;
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
        .back-to-login {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-to-login:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </AuthCard>
  );
}

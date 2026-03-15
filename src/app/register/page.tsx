"use client";

import { UserPlus, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { PasswordRequirements } from "@/components/auth/PasswordRequirements";
import { EmailAutocomplete } from "@/components/auth/EmailAutocomplete";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { LangSection } from "@/components/common/LangSection";
import { register } from "@/app/actions/registrationActions";
import { motion } from "framer-motion";

/**
 * RegisterPage - User registration screen.
 * Documents: English. Standard: High-Standard Engineering.
 * Features: Staggered animation, Email suggestions, Password validation, Server Actions.
 */
export default function RegisterPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  
  // State for immediate UI feedback (autocomplete, password strength)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Server Action State management
  const [state, formAction, isPending] = useActionState(
    (prevState: any, fd: FormData) => register(prevState, fd, language),
    { error: null, success: false }
  );

  /**
   * Effect to redirect on successful registration.
   */
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <AuthCard
      title={t("createAccount")}
      subtitle={t("registerSubtitle")}
      isCompact={true}
      footer={
        <>
          {t("alreadyHaveAccount")} <Link href="/login">{t("login")}</Link>
        </>
      }
    >
      <form action={formAction} className="auth-form">
        {/* Username Field */}
        <AuthInput
          label={t("username")}
          icon={<User size={14} />}
          delay={0.04}
          zIndex={50}
        >
          <input 
            name="username"
            type="text" 
            placeholder={t("placeholderAccountId")}
            required
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            autoComplete="off"
            disabled={isPending}
          />
        </AuthInput>

        {/* Email Field with Autocomplete */}
        <AuthInput
          label={t("email")}
          icon={<Mail size={14} />}
          delay={0.06}
          zIndex={40}
          extra={
            <EmailAutocomplete 
              email={formData.email} 
              onSelect={(val) => setFormData({...formData, email: val})} 
            />
          }
        >
          <input 
            name="email"
            type="email" 
            placeholder={t("placeholderEmail")}
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            autoComplete="off"
            disabled={isPending}
          />
        </AuthInput>

        {/* Password Field with Requirements */}
        <AuthInput
          label={t("password")}
          icon={<Lock size={14} />}
          delay={0.08}
          zIndex={30}
          extra={<PasswordRequirements password={formData.password} />}
        >
          <input 
            name="password"
            type="password" 
            placeholder={t("placeholderPassword")}
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            disabled={isPending}
          />
        </AuthInput>

        {/* Confirm Password Field */}
        <AuthInput
          label={t("confirmPassword")}
          icon={<Lock size={14} />}
          delay={0.10}
          zIndex={20}
        >
          <input 
            name="confirmPassword"
            type="password" 
            placeholder={t("placeholderPassword")}
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            disabled={isPending}
          />
        </AuthInput>

        {/* Action Result Alerts */}
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
            {t("authSuccess")}
          </motion.div>
        )}

        <LangSection delay={0.12}>
          <button 
            type="submit" 
            className={`btn btn-primary btn-block ${isPending ? "loading" : ""}`}
            disabled={isPending || state.success}
          >
            {isPending ? (
              t("authenticating")
            ) : (
              <>
                <UserPlus size={18} />
                {t("createAccount")}
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
      `}</style>
    </AuthCard>
  );
}

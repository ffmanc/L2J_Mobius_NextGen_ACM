"use client";

import React from "react";
import { Check, Circle } from "lucide-react";
import { AUTH_CONFIG } from "@/lib/config";
import { useLanguage } from "@/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Requirement {
  key: string;
  met: boolean;
  label: string;
}

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const { t } = useLanguage();
  const cfg = AUTH_CONFIG.password;

  const requirements: Requirement[] = [
    {
      key: "min",
      met: password.length >= cfg.minLength,
      label: `${t("reqMinChars")} (${cfg.minLength})`,
    },
    {
      key: "upper",
      met: /[A-Z]/.test(password),
      label: t("reqUppercase"),
    },
    {
      key: "number",
      met: /[0-9]/.test(password),
      label: t("reqNumber"),
    },
    {
      key: "special",
      met: /[^A-Za-z0-9]/.test(password),
      label: t("reqSpecialChar"),
    },
  ];

  return (
    <AnimatePresence>
      {password && (
        <motion.div 
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          className="password-requirements-card"
        >
          <div className="requirements-grid">
            {requirements.map((req) => (
              <div key={req.key} className={`req-chip ${req.met ? "met" : ""}`}>
                <div className="status-dot">
                  {req.met ? <Check size={10} strokeWidth={4} /> : <Circle size={4} fill="currentColor" />}
                </div>
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

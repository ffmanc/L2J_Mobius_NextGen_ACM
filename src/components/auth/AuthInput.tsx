"use client";

import { ReactNode } from "react";
import { LangSection } from "@/components/common/LangSection";

interface AuthInputProps {
  label: string;
  icon: ReactNode;
  children: ReactNode; // The actual input element
  delay: number;
  zIndex?: number;
  extra?: ReactNode; // For Autocomplete or Requirements components
  className?: string;
}

/**
 * AuthInput Component
 * 
 * A reusable form field wrapper that handles:
 *  1. Staggered animations via LangSection.
 *  2. Stacking contexts (zIndex) for dropdowns/popovers.
 *  3. Standardized layout (Labels, Icons, Inputs).
 * 
 * @param label - Field label text
 * @param icon - Lucide icon component
 * @param children - The HTML input or specialized input component
 * @param delay - Animation delay for LangSection
 * @param zIndex - Stacking priority (higher values appear "above")
 * @param extra - Optional floating UI (Autocomplete, Validation chips)
 */
export function AuthInput({
  label,
  icon,
  children,
  delay,
  zIndex,
  extra,
  className = "",
}: AuthInputProps) {
  return (
    <LangSection delay={delay} zIndex={zIndex}>
      <div className={`input-field ${zIndex ? "relative" : ""} ${className}`.trim()}>
        <label>
          {icon} {label}
        </label>
        {children}
        {extra}
      </div>
    </LangSection>
  );
}

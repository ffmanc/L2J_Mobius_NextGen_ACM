"use server";

import { db } from "@/lib/db";
import { Language, translations } from "@/lib/translations";

/**
 * Recovery Success/Error Response
 */
export interface RecoveryState {
  error: string | null;
  success: boolean;
}

/**
 * Cloudflare Turnstile Verification Helper
 */
async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const outcome = await res.json();
    return outcome.success;
  } catch (e) {
    return false;
  }
}

/**
 * Server Action to handle password recovery requests.
 */
export async function requestRecovery(
  prevState: RecoveryState, 
  formData: FormData,
  lang: Language = "en"
): Promise<RecoveryState> {
  const email = formData.get("email") as string;
  const login = formData.get("login") as string;
  const cfToken = formData.get("cf-turnstile-response") as string;

  const t = (key: keyof (typeof translations)["en"]) =>
    translations[lang][key] || translations["en"][key] || key;

  // 1. Cloudflare Turnstile Protection
  const isHuman = await verifyTurnstile(cfToken);
  if (!isHuman) {
    return { error: "Security check failed. Please try again.", success: false };
  }

  // 2. Basic Validation
  if (!email || !login) {
    return { error: t("errorAllFieldsRequired"), success: false };
  }

  try {
    // 3. Verify if the account and email match
    const account = await db.account.findUnique({
      where: { login: login },
    });

    if (!account || account.email !== email) {
      return { error: t("errorRecoveryNotFound"), success: false };
    }

    // 4. TODO: Implement actual Email Service integration (SMTP)
    console.log(`Recovery requested for: ${login} (${email})`);

    return { error: null, success: true };

  } catch (err) {
    console.error("Recovery Error:", err);
    return { error: t("errorInternalServer"), success: false };
  }
}

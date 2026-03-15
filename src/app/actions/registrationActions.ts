"use server";

import { db } from "@/lib/db";
import { L2jCrypto } from "@/lib/l2jCrypto";
import { cookies } from "next/headers";
import { Language, translations } from "@/lib/translations";

/**
 * Registration Success/Error Response
 */
export interface RegistrationState {
  error: string | null;
  success: boolean;
  fieldErrors?: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
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
 * Server Action to handle user registration.
 */
export async function register(
  prevState: RegistrationState, 
  formData: FormData,
  lang: Language = "en"
): Promise<RegistrationState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const cfToken = formData.get("cf-turnstile-response") as string;

  const t = (key: keyof (typeof translations)["en"]) =>
    translations[lang][key] || translations["en"][key] || key;

  // 1. Cloudflare Turnstile Protection
  const isHuman = await verifyTurnstile(cfToken);
  if (!isHuman) {
    return { error: "Security check failed. Please try again.", success: false };
  }

  // 2. Basic Validation
  if (!username || !email || !password || !confirmPassword) {
    return { error: t("errorAllFieldsRequired"), success: false };
  }

  // Username rules (Alphanumeric, 4-14 chars)
  if (!/^[a-zA-Z0-9]{4,14}$/.test(username)) {
    return { error: t("errorInvalidUsername"), success: false };
  }

  // Password match
  if (password !== confirmPassword) {
    return { error: t("errorPasswordMismatch"), success: false };
  }

  // Password strength (Basic check)
  if (password.length < 6) {
    return { error: t("errorPasswordTooShort"), success: false };
  }

  try {
    // 2. Check for existing account
    const existingAccount = await db.account.findUnique({
      where: { login: username },
    });

    if (existingAccount) {
      return { error: t("errorAccountExists"), success: false };
    }

    // 3. Hash password and create account
    const hashedPassword = L2jCrypto.hashPassword(password);

    await db.account.create({
      data: {
        login: username,
        password: hashedPassword,
        email: email,
        lastactive: BigInt(Date.now()),
        accessLevel: 0,
        lastIP: "127.0.0.1",
        // @ts-ignore - Prisma might not have generated the type yet
        activated: 0, // Requires email verification
      },
    });

    return { error: null, success: true };

  } catch (err) {
    console.error("Registration Error:", err);
    return { error: t("errorInternalServer"), success: false };
  }
}

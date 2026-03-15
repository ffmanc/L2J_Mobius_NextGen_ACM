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
 * Server Action to handle user registration.
 * Documents: English. Standard: High-Standard Engineering.
 * 
 * @param prevState - The previous state of the form
 * @param formData - The submitted form data
 * @param lang - The current user language for server-side error messages
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

  const t = (key: keyof (typeof translations)["en"]) =>
    translations[lang][key] || translations["en"][key] || key;

  // 1. Basic Validation
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
        lastIP: "127.0.0.1", // Default local IP for initialization
      },
    });

    // 4. Set session cookie automatically after successful registration
    const cookieStore = await cookies();
    cookieStore.set("l2j_session", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 Week
      path: "/",
    });

    return { error: null, success: true };

  } catch (err) {
    console.error("Registration Error:", err);
    return { error: t("errorInternalServer"), success: false };
  }
}

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
 * Server Action to handle password recovery requests.
 * Documents: English. Standard: High-Standard Engineering.
 * 
 * @param prevState - The previous state of the form
 * @param formData - The submitted form data
 * @param lang - The current user language
 */
export async function requestRecovery(
  prevState: RecoveryState, 
  formData: FormData,
  lang: Language = "en"
): Promise<RecoveryState> {
  const email = formData.get("email") as string;
  const login = formData.get("login") as string;

  const t = (key: keyof (typeof translations)["en"]) =>
    translations[lang][key] || translations["en"][key] || key;

  if (!email || !login) {
    return { error: t("errorAllFieldsRequired"), success: false };
  }

  try {
    // 1. Verify if the account and email match in the database
    const account = await db.account.findUnique({
      where: { login: login },
    });

    if (!account || account.email !== email) {
      // For security, usually we don't differentiate between "not found" 
      // and "mismatch", but here we keep it simple for the user.
      return { error: t("errorRecoveryNotFound"), success: false };
    }

    // 2. TODO: Implement actual Email Service integration (SMTP)
    // For now, we simulate a successful request.
    console.log(`Recovery requested for: ${login} (${email})`);

    return { error: null, success: true };

  } catch (err) {
    console.error("Recovery Error:", err);
    return { error: t("errorInternalServer"), success: false };
  }
}

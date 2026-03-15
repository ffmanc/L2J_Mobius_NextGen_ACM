"use server";

import { db } from "@/lib/db";
import { L2jCrypto } from "@/lib/l2jCrypto";
import { cookies } from "next/headers";

/**
 * Next.js Server Action to handle user login.
 * This runs entirely on the backend, ensuring database queries
 * and secret password hashing never reach the client bundle.
 */
/**
 * Cloudflare Turnstile Verification Helper
 */
async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("Turnstile Secret Key missing. Skipping verification.");
    return true; 
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const outcome = await res.json();
    return outcome.success;
  } catch (e) {
    console.error("Turnstile Error:", e);
    return false;
  }
}

/**
 * Next.js Server Action to handle user login.
 * This runs entirely on the backend, ensuring database queries
 * and secret password hashing never reach the client bundle.
 */
export async function authenticate(prevState: any, formData: FormData) {
  const loginName = formData.get("login") as string;
  const password = formData.get("password") as string;
  const cfToken = formData.get("cf-turnstile-response") as string;

  if (!loginName || !password) {
    return { error: "Username and password are required.", success: false };
  }

  // 1. Cloudflare Turnstile Protection
  const isHuman = await verifyTurnstile(cfToken);
  if (!isHuman) {
    return { error: "Security check failed. Please try again.", success: false };
  }

  try {
    // 2. Fetch account from the L2 Mobius database
    const account = await db.account.findUnique({
      where: { login: loginName },
    });

    if (!account || !account.password) {
      return { error: "Account not found or password incorrect.", success: false };
    }

    // 3. Safely verify password using L2J Base64-SHA1 hash
    const isValid = L2jCrypto.verifyPassword(password, account.password);

    if (!isValid) {
      return { error: "Username or password incorrect.", success: false };
    }

    // 4. Verification Check (The new 'activated' field)
    // @ts-ignore - Prisma might not have generated the type yet
    if (account.activated === 0) {
      return { error: "Your account is not activated. Please check your email.", success: false };
    }

    // 5. Security checks matching L2 conventions (Banned)
    if (account.accessLevel === -1) {
      return { error: "This account has been banned.", success: false };
    }

    // 6. Update the login history and Last IP
    await db.account.update({
      where: { login: account.login },
      data: {
        lastactive: Date.now(),
      },
    });

    // 7. Set session cookie - in a real app, sign this as a JWT
    const cookieStore = await cookies();
    cookieStore.set("l2j_session", account.login, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 Week
      path: "/",
    });

    return { error: null, success: true };

  } catch (err) {
    console.error("Login Error:", err);
    return { error: "Internal server error connecting to the Game Database.", success: false };
  }
}
export async function logout() {
  const { cookies } = await import("next/headers");
  (await cookies()).delete("l2j_session");
  const { redirect } = await import("next/navigation");
  redirect("/login");
}
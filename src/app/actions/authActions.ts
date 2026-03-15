"use server";

import { db } from "@/lib/db";
import { L2jCrypto } from "@/lib/l2jCrypto";
import { cookies } from "next/headers";

/**
 * Next.js Server Action to handle user login.
 * This runs entirely on the backend, ensuring database queries
 * and secret password hashing never reach the client bundle.
 */
export async function authenticate(prevState: any, formData: FormData) {
  const loginName = formData.get("login") as string;
  const password = formData.get("password") as string;

  if (!loginName || !password) {
    return { error: "Username and password are required.", success: false };
  }

  try {
    // 1. Fetch account from the L2 Mobius database
    const account = await db.account.findUnique({
      where: { login: loginName },
    });

    if (!account) {
      return { error: "Account not found or password incorrect.", success: false };
    }

    if (!account.password) {
       return { error: "Account data corrupted.", success: false };
    }

    // 2. Safely verify password using L2J Base64-SHA1 hash
    const isValid = L2jCrypto.verifyPassword(password, account.password);

    if (!isValid) {
      return { error: "Username or password incorrect.", success: false };
    }

    // 3. Security checks matching L2 conventions (Banned/Unverified)
    if (account.accessLevel === -1) {
      return { error: "This account has been banned.", success: false };
    }

    if (account.accessLevel === -2) {
      return { error: "This account is awaiting email verification.", success: false };
    }

    // 4. Update the login history and Last IP
    // For a real prod app, get IP from headers x-forwarded-for
    await db.account.update({
      where: { login: account.login },
      data: {
        lastactive: Date.now(),
      },
    });

    // 5. Set session cookie - in a real app, sign this as a JWT
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
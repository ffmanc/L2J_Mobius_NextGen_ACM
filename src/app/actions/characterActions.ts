"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Server Action to Unstuck a character.
 * Teleports the character to Giran Harbor safe zone.
 */
export async function unstuckCharacter(charId: number) {
  const cookieStore = await cookies();
  const session = cookieStore.get("l2j_session");

  if (!session?.value) {
    return { error: "You must be logged in.", success: false };
  }

  try {
    // 1. Verify ownership
    const character = await db.character.findUnique({
      where: { charId },
    });

    if (!character || character.account_name !== session.value) {
      return { error: "Character not found or access denied.", success: false };
    }

    // 2. Prevent unstuck if character is online
    if (character.online === 1) {
      return { error: "Logout from the game before using Unstuck.", success: false };
    }

    // 3. Update coordinates to Giran (Safe Zone)
    // Giran Center: 82836, 148817, -3464
    await db.character.update({
      where: { charId },
      data: {
        x: 82836,
        y: 148817,
        z: -3464,
      },
    });

    revalidatePath("/dashboard");
    return { error: null, success: true };

  } catch (err) {
    console.error("Unstuck Error:", err);
    return { error: "Failed to unstuck character.", success: false };
  }
}

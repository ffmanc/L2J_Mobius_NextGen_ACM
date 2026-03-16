"use server";

import { ConfigStore, PanelSettings } from "@/lib/configStore";
import { revalidatePath } from "next/cache";

/**
 * Server Action to update panel settings.
 * Only allowed for MASTER role (enforced in page/layout).
 */
export async function updatePanelSettings(formData: FormData) {
  const settings = ConfigStore.get();
  
  // Update fields from form data
  settings.server.name = formData.get("serverName") as string;
  settings.server.website = formData.get("serverWebsite") as string;
  settings.server.discord = formData.get("serverDiscord") as string;
  
  settings.branding.primaryColor = formData.get("primaryColor") as string;
  settings.branding.theme = formData.get("theme") as 'light' | 'dark';
  
  settings.features.emailVerification = formData.get("emailVerification") === "on";
  settings.features.allowRegister = formData.get("allowRegister") === "on";
  settings.features.protectionProvider = formData.get("protectionProvider") as any;

  const success = ConfigStore.update(settings);
  if (success) {
    revalidatePath("/admin/settings");
    return { success: true };
  }
  return { success: false, error: "Failed to save settings." };
}

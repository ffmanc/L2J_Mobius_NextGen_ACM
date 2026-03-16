import { ConfigStore } from "@/lib/configStore";
import SettingsPage from "@/components/admin/SettingsUI";

/**
 * Server Component: System Settings
 * Fetches initial settings and renders the client-side UI.
 */
export default async function Page() {
  const settings = ConfigStore.get(true); // Force reload to ensure fresh data

  return <SettingsPage initialSettings={settings} />;
}

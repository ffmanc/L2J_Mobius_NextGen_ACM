import fs from 'fs';
import path from 'path';

/**
 * Panel Settings Interface
 * Centralized type definition for all system configurations.
 */
export interface PanelSettings {
  server: {
    name: string;
    version: string;
    website: string;
    discord: string;
  };
  branding: {
    logoPath: string;
    primaryColor: string;
    theme: 'light' | 'dark';
  };
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
    fromEmail: string;
  };
  features: {
    emailVerification: boolean;
    allowRegister: boolean;
    protectionProvider: 'none' | 'simple' | 'cloudflare' | 'recaptcha';
  };
  shop: {
    currencyName: string;
    exchangeRate: number;
    minAmount: number;
  };
}

const CONFIG_PATH = path.join(process.cwd(), 'src/config/panel_settings.json');

/**
 * ConfigStore Utility
 * Handles reading and writing system settings with type safety.
 * This is used for the CMS-like administration features.
 */
export class ConfigStore {
  private static cachedConfig: PanelSettings | null = null;

  /**
   * Reads the configuration from the JSON file.
   * Leverages caching in-memory for performance, but allows forcing a reload.
   */
  static get(forceReload = false): PanelSettings {
    if (this.cachedConfig && !forceReload) {
      return this.cachedConfig;
    }

    try {
      const data = fs.readFileSync(CONFIG_PATH, 'utf8');
      this.cachedConfig = JSON.parse(data) as PanelSettings;
      return this.cachedConfig;
    } catch (error) {
      console.error('Failed to read panel_settings.json:', error);
      // Return a safe default if file is missing or corrupt
      return {
        server: { name: "L2 NextGen ACM", version: "1.0.0", website: "", discord: "" },
        branding: { logoPath: "/logo.png", primaryColor: "#CCFF00", theme: "dark" },
        smtp: { host: "localhost", port: 1025, user: "", pass: "", fromEmail: "" },
        features: { emailVerification: true, allowRegister: true, protectionProvider: "none" },
        shop: { currencyName: "NG", exchangeRate: 1.0, minAmount: 10 }
      };
    }
  }

  /**
   * Updates the configuration file.
   * Only accessible via Server Actions to ensure security.
   */
  static update(newSettings: PanelSettings): boolean {
    try {
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(newSettings, null, 2), 'utf8');
      this.cachedConfig = newSettings;
      return true;
    } catch (error) {
      console.error('Failed to update panel_settings.json:', error);
      return false;
    }
  }
}

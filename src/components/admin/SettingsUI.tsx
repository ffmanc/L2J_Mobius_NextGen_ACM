"use client";

import { useTransition } from "react";
import { Save, Shield, Mail, Palette, Globe } from "lucide-react";
import { updatePanelSettings } from "@/app/actions/adminActions";
import { motion } from "framer-motion";
import "./settings.css";

export default function SettingsPage({ initialSettings }: { initialSettings: any }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updatePanelSettings(formData);
      if (result.success) {
        alert("Settings updated successfully!");
      } else {
        alert(result.error || "An error occurred.");
      }
    });
  };

  return (
    <div className="admin-page-premium">
      <div className="page-header mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Shield className="text-blue-500" /> System Settings
        </h1>
        <p className="text-slate-400 mt-2">Manage your project configurations and customizations.</p>
      </div>

      <form action={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Server Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-card"
        >
          <div className="card-header border-b border-slate-800 pb-4 mb-4 flex items-center gap-2">
            <Globe className="text-emerald-400" size={20} />
            <h2 className="text-xl font-semibold text-white">General Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="settings-label">Server Name</label>
              <input 
                name="serverName" 
                defaultValue={initialSettings.server.name}
                className="settings-input" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="settings-label">Website URL</label>
              <input 
                name="serverWebsite" 
                defaultValue={initialSettings.server.website}
                className="settings-input" 
                placeholder="https://..."
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="settings-label">Discord Invite Link</label>
              <input 
                name="serverDiscord" 
                defaultValue={initialSettings.server.discord}
                className="settings-input" 
              />
            </div>
          </div>
        </motion.div>

        {/* Branding Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="settings-card"
        >
          <div className="card-header border-b border-slate-800 pb-4 mb-4 flex items-center gap-2">
            <Palette className="text-purple-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Branding & Theme</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="settings-label">Primary Color (Hex)</label>
              <div className="flex gap-2">
                <input 
                  name="primaryColor" 
                  defaultValue={initialSettings.branding.primaryColor}
                  className="settings-input" 
                />
                <div 
                  className="w-10 h-10 rounded border border-slate-700"
                  style={{ backgroundColor: initialSettings.branding.primaryColor }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="settings-label">Preferred Theme</label>
              <select 
                name="theme" 
                defaultValue={initialSettings.branding.theme}
                className="settings-input"
              >
                <option value="dark">Dark Mode (Premium)</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Features & Protection */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="settings-card"
        >
          <div className="card-header border-b border-slate-800 pb-4 mb-4 flex items-center gap-2">
            <Shield className="text-red-400" size={20} />
            <h2 className="text-xl font-semibold text-white">Security & Controls</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
              <div>
                <p className="text-white font-medium">Email Verification</p>
                <p className="text-xs text-slate-400">Require email activation for new accounts.</p>
              </div>
              <input 
                type="checkbox" 
                name="emailVerification" 
                defaultChecked={initialSettings.features.emailVerification}
                className="settings-toggle"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50">
              <div>
                <p className="text-white font-medium">Allow New Registrations</p>
                <p className="text-xs text-slate-400">Toggle public account creation.</p>
              </div>
              <input 
                type="checkbox" 
                name="allowRegister" 
                defaultChecked={initialSettings.features.allowRegister}
                className="settings-toggle"
              />
            </div>
            <div className="form-group mt-4">
              <label className="settings-label">Bot Protection Provider</label>
              <select 
                name="protectionProvider" 
                defaultValue={initialSettings.features.protectionProvider}
                className="settings-input"
              >
                <option value="none">None</option>
                <option value="simple">Simple Captcha</option>
                <option value="cloudflare">Cloudflare Turnstile</option>
                <option value="recaptcha">Google reCaptcha v3</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isPending}
            className="btn-premium flex items-center gap-2 py-3 px-8 text-lg"
          >
            <Save size={20} />
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

    </div>
  );
}

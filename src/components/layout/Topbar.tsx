"use client";

import { useState } from "react";
import { 
  UserCircle, LogOut, Settings, 
  History as HistoryIcon, 
  Menu, ChevronDown, Bell 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ServerStatusBadge } from "@/components/layout/ServerStatusBadge";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BalanceBadge } from "@/components/layout/BalanceBadge";

export function Topbar({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="topbar-premium">
      <div className="topbar-left">
        <ServerStatusBadge />
      </div>

      <div className="topbar-right">
        <BalanceBadge />
        
        <div className="topbar-controls">
          <LanguageToggle />
          <ThemeToggle />
          
          <button className="topbar-action-btn">
            <Bell size={18} />
          </button>
        </div>

        <div className="dropdown-divider-vertical" />

        {/* Profile Dropdown */}
        <div className="profile-dropdown-container">
          <button 
            className="profile-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          >
            <div className="profile-avatar">
              <UserCircle size={24} />
            </div>
            <div className="profile-info d-none d-md-flex">
              <span className="profile-name">{username}</span>
              <span className="profile-role">Player</span>
            </div>
            <ChevronDown size={14} className={`chevron ${dropdownOpen ? "open" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="dropdown-menu-premium"
              >
                <div className="dropdown-header">
                  <div className="profile-avatar-large">
                    <UserCircle size={40} />
                  </div>
                  <div className="dropdown-user-info">
                    <strong>{username}</strong>
                    <span>{username}@rosevain.com</span>
                  </div>
                </div>
                
                <div className="dropdown-content">
                  <Link href="/dashboard/settings" className="dropdown-item">
                    <Settings size={18} /> Account Settings
                  </Link>
                  <Link href="/dashboard/history" className="dropdown-item">
                    <HistoryIcon size={18} /> Login History
                  </Link>
                  
                  <div className="dropdown-divider" />
                  
                  <button onClick={onLogout} className="dropdown-item logout">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

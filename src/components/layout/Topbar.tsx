"use client";

import { useState } from "react";
import { UserCircle, LogOut, Settings, History, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";

export function Topbar({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-toggle d-md-none">
          <Menu size={24} />
        </button>
        <Logo size="sm" />
      </div>

      <div className="topbar-right">
        {/* Profile Dropdown */}
        <div className="profile-dropdown-container">
          <button 
            className="profile-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          >
            <UserCircle size={28} className="profile-icon" />
            <span className="profile-name">{username}</span>
            <ChevronDown size={16} className={`chevron ${dropdownOpen ? "open" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="dropdown-menu"
              >
                <div className="dropdown-header">
                  <strong>{username}</strong>
                  <span className="dropdown-role">Player</span>
                </div>
                <div className="dropdown-divider" />
                
                <Link href="/dashboard/settings" className="dropdown-item">
                  <Settings size={16} /> Account Settings
                </Link>
                <Link href="/dashboard/history" className="dropdown-item">
                  <History size={16} /> Login History
                </Link>
                
                <div className="dropdown-divider" />
                
                <button onClick={onLogout} className="dropdown-item text-danger">
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

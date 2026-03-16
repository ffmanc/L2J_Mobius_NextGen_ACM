"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Gamepad, Settings, Heart, ChartArea, 
  List, LogOut, CheckSquare, Server,
  ChevronLeft, ChevronRight, LayoutDashboard,
  ShieldCheck, History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/Logo";
import { PERMISSIONS } from "@/lib/permissions";

export function Sidebar({ userPermissions = [] }: { userPermissions?: string[] }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hasPermission = (node: string) => userPermissions.includes(node);

  const mainLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: PERMISSIONS.ACCOUNT_VIEW },
    { name: "Shop", href: "/dashboard/shop", icon: Gamepad, permission: PERMISSIONS.ACCOUNT_VIEW },
    { name: "Claim Free VIP", href: "/dashboard/vip", icon: ShieldCheck, permission: PERMISSIONS.ACCOUNT_VIEW },
    { name: "My Donations", href: "/dashboard/donations", icon: Heart, permission: PERMISSIONS.ACCOUNT_VIEW },
    { name: "Account Settings", href: "/dashboard/settings", icon: Settings, permission: PERMISSIONS.ACCOUNT_MODIFY },
    { name: "Login History", href: "/dashboard/history", icon: History, permission: PERMISSIONS.ACCOUNT_VIEW },
  ];

  const staffLinks = [
    { name: "Server Logic", href: "/admin/game-data", icon: Server, permission: PERMISSIONS.ADMIN_VIEW_PLAYERS },
    { name: "Donations history", href: "/admin/donations", icon: ChartArea, permission: PERMISSIONS.ADMIN_VIEW_LOGS },
    { name: "Tasks Management", href: "/admin/tasks", icon: CheckSquare, permission: PERMISSIONS.ADMIN_VIEW_LOGS },
  ];

  const panelLinks = [
    { name: "Branding", href: "/admin/branding", icon: Heart, permission: PERMISSIONS.PANEL_BRANDING },
    { name: "System Settings", href: "/admin/settings", icon: Settings, permission: PERMISSIONS.PANEL_CONFIG_MODIFY },
    { name: "RBAC Manager", href: "/admin/rbac", icon: ShieldCheck, permission: PERMISSIONS.PANEL_RBAC_MODIFY },
  ];

  return (
    <motion.aside 
      className={`sidebar-premium ${isCollapsed ? "collapsed" : ""}`}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sidebar-header">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="sidebar-logo-wrap"
            >
              <Logo size="sm" className="sidebar-logo-compact" hideText={isCollapsed} />
            </motion.div>
          ) : (
            <motion.div
              key="icon-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="sidebar-logo-icon"
            >
              <Logo size="sm" hideIcon={false} className="icon-only" hideText />
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="sidebar-content">
        {/* Account Section */}
        <div className="nav-section">
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="section-label"
            >
              Account
            </motion.span>
          )}
          <div className="nav-list">
            {mainLinks.map((link) => {
              if (!hasPermission(link.permission)) return null;
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  title={isCollapsed ? link.name : ""}
                >
                  <Icon size={20} className="nav-icon" />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="nav-text"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Staff Administration Section */}
        {staffLinks.some(link => hasPermission(link.permission)) && (
          <div className="nav-section admin">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="section-label"
              >
                In-game Administration
              </motion.span>
            )}
            <div className="nav-list">
              {staffLinks.map((link) => {
                if (!hasPermission(link.permission)) return null;
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    title={isCollapsed ? link.name : ""}
                  >
                    <Icon size={20} className="nav-icon text-red-500" />
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="nav-text"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Panel Administration Section */}
        {panelLinks.some(link => hasPermission(link.permission)) && (
          <div className="nav-section admin">
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="section-label"
              >
                Panel Administration
              </motion.span>
            )}
            <div className="nav-list">
              {panelLinks.map((link) => {
                if (!hasPermission(link.permission)) return null;
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    title={isCollapsed ? link.name : ""}
                  >
                    <Icon size={20} className="nav-icon text-blue-500" />
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="nav-text"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {/* Redundant logout removed from here */}
      </div>
    </motion.aside>
  );
}

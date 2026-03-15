"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad, Settings, Heart, ChartArea, List, LogOut, CheckSquare, Server } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  const links = [
    { name: "Characters", href: "/dashboard", icon: Gamepad },
    { name: "My Donations", href: "/dashboard/donations", icon: Heart },
    { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const adminLinks = [
    { name: "Game Data", href: "/admin/game-data", icon: Server },
    { name: "Donations History", href: "/admin/donations", icon: ChartArea },
    { name: "Task Manager", href: "/admin/tasks", icon: CheckSquare },
    { name: "ACM Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo size="md" />
      </div>

      <div className="sidebar-nav">
        <div className="nav-heading">Main Menu</div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="nav-heading" style={{ marginTop: "1rem" }}>Administration</div>
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </aside>
  );
}

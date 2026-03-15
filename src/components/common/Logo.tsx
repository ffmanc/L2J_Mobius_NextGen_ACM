"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  hideIcon?: boolean;
}

const sizeMap: Record<string, number> = {
  sm: 80, // Drastically increased for Top-bar
  md: 60,
  lg: 72,
};

export function Logo({ className = "", size = "md", hideIcon = false }: LogoProps) {
  const px = sizeMap[size];

  return (
    <Link
      href="/"
      className={`logo-container logo-${size} ${className}`}
      style={{ gap: hideIcon ? 0 : "0.75rem" }}
    >
      {!hideIcon && (
        <div
          className="logo-img-wrapper"
          style={{ width: px, height: px, flexShrink: 0 }}
        >
          <Image
            src="/logo.png"
            alt="L2J Mobius NextGen ACM Logo"
            width={px}
            height={px}
            className="logo-img"
            priority
          />
        </div>
      )}
      <div className="logo-text-group">
        <span className="logo-text">
          L2J Mobius <span className="accent">NextGen</span> ACM
        </span>
        <span className="logo-subtext">Powered by NextJS</span>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  hideIcon?: boolean;
  hideText?: boolean;
  orientation?: "horizontal" | "vertical";
}

const sizeMap: Record<string, number> = {
  sm: 40,
  md: 64,
  lg: 80,
  xl: 240,
};

export function Logo({ 
  className = "", 
  size = "md", 
  hideIcon = false,
  hideText = false,
  orientation = "horizontal"
}: LogoProps) {
  const px = sizeMap[size];

  return (
    <Link
      href="/"
      className={`logo-container logo-${size} logo-${orientation} ${className}`}
      style={{ gap: hideIcon ? 0 : orientation === "vertical" ? "1.5rem" : "0.75rem" }}
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
      {!hideText && (
        <div className="logo-text-container">
          <span className="logo-text">
            L2 <span className="accent">NextGen</span> ACM
          </span>
          <span className="logo-subtext">Powered by NextJS</span>
        </div>
      )}
    </Link>
  );
}

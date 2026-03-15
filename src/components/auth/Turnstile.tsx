"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: any) => string;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface TurnstileProps {
  onVerify?: (token: string) => void;
}

/**
 * Lightweight Cloudflare Turnstile component.
 * Dynamically loads the official script and renders the widget.
 * Uses NEXT_PUBLIC_TURNSTILE_SITE_KEY or a testing placeholder.
 */
export function Turnstile({ onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. Ensure the script is loaded
    let script = document.querySelector('script[src*="turnstile/v0/api.js"]');
    if (!script) {
      script = document.createElement("script");
      (script as HTMLScriptElement).src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      (script as HTMLScriptElement).async = true;
      (script as HTMLScriptElement).defer = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
            callback: (token: string) => {
              if (onVerify) onVerify(token);
              
              // Also find the nearest form and ensure a hidden field exists
              const form = containerRef.current?.closest("form");
              if (form) {
                let input = form.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement;
                if (!input) {
                  input = document.createElement("input");
                  input.type = "hidden";
                  input.name = "cf-turnstile-response";
                  form.appendChild(input);
                }
                input.value = token;
              }
            },
            theme: "dark",
          });
        } catch (err) {
          console.error("Turnstile render error:", err);
        }
      }
    };

    // Wait for the Turnstile object to be ready
    const interval = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [onVerify]);

  return (
    <div 
      ref={containerRef} 
      className="cf-turnstile-wrapper" 
      style={{ 
        minHeight: "65px", 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem 0"
      }} 
    />
  );
}

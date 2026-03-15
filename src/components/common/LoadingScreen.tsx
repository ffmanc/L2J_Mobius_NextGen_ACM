"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/Logo";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Smart loading: Only show on valid application entry points
  const isValidRoute = ["/", "/login", "/register", "/recovery", "/dashboard"].some(
    route => pathname === route || pathname?.startsWith("/dashboard/")
  );

  useEffect(() => {
    if (!isValidRoute) {
      setIsVisible(false);
      return;
    }

    // Hide loading screen after a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, [isValidRoute]);

  if (!isValidRoute) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="loading-screen"
        >
          <div className="loader-content">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: 1,
                filter: [
                  "drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))", 
                  "drop-shadow(0 0 40px rgba(99, 102, 241, 0.7))", 
                  "drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))"
                ]
              }}
              transition={{ 
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.5 }
              }}
              className="loader-logo"
            >
              <Logo size="xl" orientation="vertical" />
            </motion.div>

            <div className="loader-bar">
              <motion.div 
                className="loader-progress"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "circOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

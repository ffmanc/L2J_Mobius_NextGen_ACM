"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // 1.5s for a more premium impact
    return () => clearTimeout(timer);
  }, []);

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
              <div style={{ width: 220, height: 220, display: "flex" }}>
                <Image 
                  src="/logo.png"
                  alt="Logo"
                  width={220}
                  height={220}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </motion.div>
            
            <motion.div
              className="loader-text-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.h1 className="loader-title">
                L2J Mobius <span className="accent">NextGen</span> ACM
              </motion.h1>
              
              <motion.p 
                className="loader-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Powered by NextJS
              </motion.p>
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

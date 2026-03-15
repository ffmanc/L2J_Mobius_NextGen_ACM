"use client";

import React, { useState, useEffect, useRef } from "react";
import { AUTH_CONFIG } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

interface EmailAutocompleteProps {
  email: string;
  onSelect: (value: string) => void;
}

export function EmailAutocomplete({ email, onSelect }: EmailAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (email.includes("@")) {
      const [local, domain] = email.split("@");
      if (local && !domain.includes(".")) {
        const filtered = AUTH_CONFIG.emailSuggestions
          .filter(d => d.startsWith(domain))
          .map(d => `${local}@${d}`);
        
        setSuggestions(filtered.slice(0, 4));
        setIsOpen(filtered.length > 0);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  }, [email]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="email-autocomplete-float" 
          ref={containerRef}
        >
          <div className="suggestions-header">
            <Mail size={12} /> Sugestões de e-mail
          </div>
          <div className="suggestions-list-premium">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onSelect(suggestion);
                  setIsOpen(false);
                }}
                className="suggestion-item-premium"
              >
                <span className="local-part">{suggestion.split("@")[0]}</span>
                <span className="domain-part">@{suggestion.split("@")[1]}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

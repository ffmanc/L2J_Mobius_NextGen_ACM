"use client";

import { motion } from "framer-motion";
import { User, Swords, Skull, Clock, Trophy, Shield, Activity } from "lucide-react";

interface CharacterCardProps {
  char: any;
}

import { useState } from "react";
import { unstuckCharacter } from "@/app/actions/characterActions";

/**
 * Premium Character Card Component
 * Uses Framer Motion for smooth entry and glassmorphism styling
 */
export function CharacterCard({ char }: CharacterCardProps) {
  const [isUnstucking, setIsUnstucking] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleUnstuck = async () => {
    if (char.online) {
      setFeedback({ text: "Logout from game first", type: "error" });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    setIsUnstucking(true);
    const result = await unstuckCharacter(char.charId);
    setIsUnstucking(false);

    if (result.success) {
      setFeedback({ text: "Character Unstuck!", type: "success" });
    } else {
      setFeedback({ text: result.error || "Failed to unstuck", type: "error" });
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <motion.div 
      className={`character-card-premium ${char.online ? "is-online" : "is-offline"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
    >
      <div className="card-glare" />
      
      {feedback && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`card-feedback-overlay ${feedback.type}`}
        >
          {feedback.text}
        </motion.div>
      )}

      <div className="card-header">
        <div className="char-avatar">
          <User size={24} />
        </div>
        <div className="char-name-group">
          <strong className="char-name">{char.char_name}</strong>
          <span className="char-level">Lvl {char.level || 0}</span>
        </div>
        <div className={`status-pill ${char.online ? "online" : "offline"}`}>
          <div className="status-dot" />
          <span>{char.online ? "Online" : "Offline"}</span>
        </div>
      </div>

      <div className="card-divider" />

      <div className="card-body">
        <div className="char-stat-grid">
          <div className="char-stat">
            <Shield size={14} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Class</span>
              <span className="stat-value">{char.classid ?? "Unknown"}</span>
            </div>
          </div>
          <div className="char-stat">
            <Swords size={14} className="stat-icon pvp" />
            <div className="stat-info">
              <span className="stat-label">PvP / PK</span>
              <span className="stat-value">{char.pvpkills || 0} / {char.pkkills || 0}</span>
            </div>
          </div>
          <div className="char-stat">
            <Clock size={14} className="stat-icon" />
            <div className="stat-info">
              <span className="stat-label">Time Played</span>
              <span className="stat-value">{char.onlinetime ? Math.floor(char.onlinetime / 60) : 0}h</span>
            </div>
          </div>
          <div className="char-stat">
            <Trophy size={14} className="stat-icon exp" />
            <div className="stat-info">
              <span className="stat-label">EXP</span>
              <span className="stat-value">{char.exp ? (Number(char.exp) / 1000000).toFixed(1) : 0}M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button 
          className={`btn-card-action primary ${isUnstucking ? "loading" : ""}`}
          onClick={handleUnstuck}
          disabled={isUnstucking || char.online}
        >
          {isUnstucking ? (
            <Activity size={14} className="animate-spin" />
          ) : (
            <Activity size={14} />
          )}
          <span>{isUnstucking ? "Processing..." : "Unstuck"}</span>
        </button>
      </div>
    </motion.div>
  );
}

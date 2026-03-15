"use client";

import React, { useEffect, useState } from "react";
import { Server, Activity, Users, ShieldCheck, Ghost, ChevronDown } from "lucide-react";
import { getServerStatus } from "@/app/actions/statusActions";
import { useLanguage } from "@/components/LanguageContext";

export function ServerStatusBadge() {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const status = await getServerStatus();
      setData(status);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // 60s async poll
    return () => clearInterval(interval);
  }, []);

  // Determine overall status based on Game Server
  const isOnline = data?.gameStatus === true;

  return (
    <div className="status-badge-container">
      <button className="status-trigger-btn">
        <Server size={14} className="status-trigger-icon" />
        <span className="status-trigger-label">{t("serverStatus")}</span>
        <div className="status-dot-wrapper">
          <div className={`status-dot ${isOnline ? "online pulse-dot" : "offline"}`} />
        </div>
        <ChevronDown size={14} className="status-chevron" />
      </button>

      {/* Hover Dropdown */}
      <div className="status-hover-card">
        <div className="status-hover-header">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-accent-primary" />
            <span className="status-hover-title">Live Metrics</span>
          </div>
          <button 
            className={`status-refresh-btn ${loading ? "spinning" : ""}`} 
            onClick={fetchStatus}
            disabled={loading}
          >
            <Server size={12} />
          </button>
        </div>

        <div className="status-hover-grid">
          <div className="status-hover-row">
            <div className="flex items-center">
              <Server size={14} className="status-hover-icon" />
              <span className="status-hover-label">Login Server</span>
            </div>
            <span className={`status-pill ${data?.loginStatus ? "online" : "offline"}`}>
              {data?.loginStatus ? "ON" : "OFF"}
            </span>
          </div>
          
          <div className="status-hover-row">
            <div className="flex items-center">
              <ShieldCheck size={14} className="status-hover-icon" />
              <span className="status-hover-label">Game Server</span>
            </div>
            <span className={`status-pill ${data?.gameStatus ? "online" : "offline"}`}>
              {data?.gameStatus ? "ON" : "OFF"}
            </span>
          </div>

          <div className="status-hover-row">
            <div className="flex items-center">
              <Users size={14} className="status-hover-icon" />
              <span className="status-hover-label">Online Players</span>
            </div>
            <span className="status-hover-count">{data?.onlinePlayers ?? 0}</span>
          </div>

          <div className="status-hover-row">
            <div className="flex items-center">
              <Ghost size={14} className="status-hover-icon" />
              <span className="status-hover-label">Active GMs</span>
            </div>
            <span className="status-hover-count">{data?.onlineGMs ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

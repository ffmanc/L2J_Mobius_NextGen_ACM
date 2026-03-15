"use client";

import React, { useEffect, useState } from "react";
import { Server, ShieldCheck, Users, Ghost, RefreshCw } from "lucide-react";
import { getServerStatus } from "@/app/actions/statusActions";
import { useLanguage } from "@/components/LanguageContext";
import { LangSection } from "@/components/common/LangSection";

export function ServerStatus() {
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
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const StatusCard = ({ 
    icon: Icon, 
    label, 
    value, 
    status = null,
    delay = 0,
  }: { 
    icon: any;
    label: string;
    value: string | number;
    status?: boolean | null;
    delay?: number;
  }) => (
    <LangSection delay={delay}>
      <div className="status-widget-card">
        <div className="card-icon-wrapper">
          <Icon size={20} className="card-icon" />
        </div>
        <div className="card-info">
          <span className="card-label">{label}</span>
          <div className="card-value-row">
            <span className="card-value">{value}</span>
            {status !== null && (
              <span className={`status-indicator ${status ? "online" : "offline"}`}>
                {status ? t("online") : t("offline")}
              </span>
            )}
          </div>
        </div>
      </div>
    </LangSection>
  );

  return (
    <section className="server-status-section">
      {/* Section header fades independently */}
      <LangSection delay={0}>
        <div className="section-header">
          <h2 className="section-title">{t("serverStatus")}</h2>
          <button 
            className={`refresh-btn ${loading ? "spinning" : ""}`} 
            onClick={fetchStatus}
            disabled={loading}
            title="Refresh Status"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </LangSection>
      
      {/* Each card fades in with a progressive delay */}
      <div className="status-grid">
        <StatusCard 
          icon={Server} 
          label={t("loginServer")} 
          value="" 
          status={data?.loginStatus}
          delay={0.05}
        />
        <StatusCard 
          icon={ShieldCheck} 
          label={t("gameServer")} 
          value="" 
          status={data?.gameStatus}
          delay={0.10}
        />
        <StatusCard 
          icon={Users} 
          label={t("onlinePlayers")} 
          value={data?.onlinePlayers ?? 0}
          delay={0.15}
        />
        <StatusCard 
          icon={Ghost} 
          label={t("onlineGMs")} 
          value={data?.onlineGMs ?? 0}
          delay={0.20}
        />
      </div>
    </section>
  );
}

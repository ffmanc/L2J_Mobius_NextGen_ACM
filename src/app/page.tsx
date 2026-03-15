"use client";

import { motion, type Variants } from "framer-motion";
import {
  Download, Zap, Shield, Database, Layout, Code2, Cpu,
  Users, Lock, BarChart3, CreditCard, Box, Vote,
  UserX, PackagePlus, Settings2, Globe, Server,
  GitBranch, Package, Blocks, Wifi, ArrowRight, CheckCircle2
} from "lucide-react";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { ServerStatus } from "@/components/dashboard/ServerStatus";
import { useLanguage } from "@/components/LanguageContext";
import { LangSection } from "@/components/common/LangSection";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/common/Logo";

export default function Home() {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("l2j_session"));
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  const playerFeatures = [
    { icon: Lock,       key: "accountMgmt",  desc: "accountMgmtDesc"  },
    { icon: Users,      key: "charMgmt",      desc: "charMgmtDesc"     },
    { icon: BarChart3,  key: "donationMgmt",  desc: "donationMgmtDesc" },
    { icon: CreditCard, key: "gateways",      desc: "gatewaysDesc"     },
    { icon: Box,        key: "autoDelivery",  desc: "autoDeliveryDesc" },
    { icon: Vote,       key: "vipVoting",     desc: "vipVotingDesc"    },
  ] as const;

  const adminFeatures = [
    { icon: UserX,       key: "adminTools",  desc: "adminToolsDesc"  },
    { icon: PackagePlus, key: "itemBlessing", desc: "itemBlessingDesc" },
    { icon: Settings2,  key: "statsEdit",    desc: "statsEditDesc"   },
  ] as const;

  const techStack = [
    { icon: Layout,    name: "Next.js 14",       cat: "React Framework",   detail: "SSR, App Router, Edge runtime" },
    { icon: Cpu,       name: "TypeScript 5",      cat: "Type Safety",       detail: "Strict mode, type-safe API calls" },
    { icon: Database,  name: "Prisma ORM",        cat: "Database Layer",    detail: "MySQL/MariaDB, type-safe queries" },
    { icon: Shield,    name: "NextAuth v5",       cat: "Auth & Sessions",   detail: "JWT, credential provider, RBAC" },
    { icon: Zap,       name: "Framer Motion",     cat: "Animation Layer",   detail: "Spring physics, GPU-accelerated" },
    { icon: Code2,     name: "Vanilla CSS",       cat: "Global Styling",    detail: "CSS vars, dark/light theming" },
    { icon: Server,    name: "Node.js / Edge",    cat: "Backend Runtime",   detail: "Server Actions, Edge API Routes" },
    { icon: GitBranch, name: "Vercel / Docker",   cat: "Deployment",        detail: "One-click deploy or self-hosted" },
    { icon: Package,   name: "Lucide Icons",      cat: "Icon System",       detail: "600+ optimized SVG icons" },
    { icon: Blocks,    name: "React 18",          cat: "UI Framework",      detail: "Concurrent, Suspense, streaming" },
    { icon: Wifi,      name: "Server Actions",    cat: "Data Fetching",     detail: "Real-time status, zero-polling" },
    { icon: Globe,     name: "i18n Built-in",     cat: "Internationalization","detail": "EN / PT / ES / DE / RU" },
  ];

  return (
    <div className="page-wrapper home-bg">
      <LandingHeader isLoggedIn={isLoggedIn} />

      <main className="landing-main">

        {/* ─── HERO ─── */}
        <section className="hero-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-logo-wrapper"
          >
            <Logo size="xl" orientation="vertical" />
          </motion.div>

          <LangSection delay={0}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="landing-subtitle"
            >
              {t("welcomeSub")}
            </motion.p>
          </LangSection>

          <LangSection delay={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="cta-group"
            >
              <div className="cta-buttons-grid">
                <button
                  className="btn btn-primary btn-xl pulse-glow hero-grid-btn"
                  onClick={() => window.open("https://github.com/L2J-Mobius-ACM", "_blank")}
                >
                  <Download size={20} className="opacity-90" />
                  <span>{t("download")}</span>
                </button>
                <a 
                  href="#features" 
                  onClick={(e) => handleScrollTo(e, "features")} 
                  className="btn btn-secondary btn-xl hero-grid-btn"
                >
                  <Box size={20} className="text-accent-primary opacity-80" />
                  <span>{t("exploreFeatures")}</span>
                </a>
                <a 
                  href="#admin-control-center" 
                  onClick={(e) => handleScrollTo(e, "admin-control-center")} 
                  className="btn btn-secondary btn-xl hero-grid-btn"
                >
                  <Settings2 size={20} className="text-red-400 opacity-80" />
                  <span>{t("exploreAdmin")}</span>
                </a>
                <a 
                  href="#techstack" 
                  onClick={(e) => handleScrollTo(e, "techstack")} 
                  className="btn btn-secondary btn-xl hero-grid-btn"
                >
                  <Blocks size={20} className="text-emerald-400 opacity-80" />
                  <span>{t("exploreTechStack")}</span>
                </a>
              </div>

              {/* Social proof chips */}
              <div className="hero-chips">
                <span className="hero-chip"><CheckCircle2 size={14} /> Free &amp; Open Source</span>
                <span className="hero-chip"><CheckCircle2 size={14} /> Multi-language</span>
                <span className="hero-chip"><CheckCircle2 size={14} /> Self-Hosted or Cloud</span>
              </div>
            </motion.div>
          </LangSection>
        </section>

        {/* ─── PLAYER FEATURES ─── */}
        <section className="lp-section" id="features">
          <LangSection delay={0.1}>
            <span className="section-badge">{t("userFeatures")}</span>
            <h2 className="lp-title">{t("featuresTitle")}</h2>
            <p className="lp-subtitle">{t("commercialIntro")}</p>
          </LangSection>

          <div className="feature-grid">
            {playerFeatures.map(({ icon: Icon, key, desc }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="feature-card"
              >
                <div className="feature-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="feature-card-title">{t(key as any)}</h3>
                <p className="feature-card-desc">{t(desc as any)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── ADMIN CONTROL ─── */}
        <section className="lp-section lp-alt" id="admin-control-center">
          <div className="lp-inner">
            <LangSection delay={0.1}>
              <span className="section-badge red">{t("adminBadge")}</span>
              <h2 className="lp-title">{t("adminTitle")}</h2>
              <p className="lp-subtitle">{t("adminSectionSubtitle")}</p>
            </LangSection>

            <div className="admin-grid">
              {adminFeatures.map(({ icon: Icon, key, desc }, i) => (
                <motion.div
                  key={key}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="admin-card"
                >
                  <div className="admin-icon-wrap">
                    <Icon size={26} />
                  </div>
                  <div className="admin-card-body">
                    <h3 className="admin-card-title">{t(key as any)}</h3>
                    <p className="admin-card-desc">{t(desc as any)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ECOSYSTEM / SERVICES ─── */}
        <section className="lp-section eco-section">
          <div className="eco-layout">
            <div className="eco-text">
              <LangSection delay={0.1}>
                <span className="section-badge">{t("businessModel")}</span>
                <h2 className="lp-title text-left">{t("ecoTitle")}</h2>
                <p className="eco-desc">{t("ecoSubtitle")}</p>
              </LangSection>

              <ul className="eco-list">
                <li>
                  <div className="eco-item-icon"><Globe size={20} /></div>
                  <div>
                    <strong>{t("serviceSites")}</strong>
                    <p>{t("serviceSitesDesc")}</p>
                  </div>
                </li>
                <li>
                  <div className="eco-item-icon"><Server size={20} /></div>
                  <div>
                    <strong>{t("serviceSupport")}</strong>
                    <p>{t("serviceSupportDesc")}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="eco-visual">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="eco-ring"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="eco-ring eco-ring-inner"
              />
              <Image
                src="/logo.png"
                alt="ACM Ecosystem"
                width={180}
                height={180}
                className="eco-logo"
              />
            </div>
          </div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section className="lp-section lp-alt" id="techstack">
          <LangSection delay={0.1}>
            <span className="section-badge">{t("techStack")}</span>
            <h2 className="lp-title">{t("techStack")}</h2>
            <p className="lp-subtitle">{t("development")}</p>
          </LangSection>

          <div className="tech-grid-premium">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="tech-item"
              >
                <div className="tech-item-icon">
                  <tech.icon size={20} />
                </div>
                <div className="tech-item-body">
                  <span className="tech-item-name">{tech.name}</span>
                  <span className="tech-item-cat">{tech.cat}</span>
                  <span className="tech-item-detail">{tech.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <div className="newsletter-wrapper">
          <div className="newsletter-card">
            <LangSection delay={0.1}>
              <h2 className="lp-title smaller">{t("newsletterTitle")}</h2>
              <p className="lp-subtitle">{t("newsletterSubtitle")}</p>
            </LangSection>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="newsletter-input"
              />
              <button className="btn btn-primary">{t("subscribe")}</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

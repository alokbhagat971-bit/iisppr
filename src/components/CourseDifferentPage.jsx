// pages/CourseDifferentPage.jsx — "What Makes This Course Different?" section

import { motion } from "framer-motion";
import {
  Brain,
  Globe,
  Rocket,
  MessageSquare,
  ArrowRight,
  Users,
} from "lucide-react";

import PillarCard from "./courseDifferent/PillarCard";
import FloatIcon  from "./courseDifferent/FloatIcon";
import earthBg from "../assets/globe.png";
import { CARDS } from "./courseDifferent/data/cards";

// When you have earth-bg.png, uncomment:
// import earthBg from "../images/earth-bg.png";

import './courseDifferent/styles/global.css';
import './courseDifferent/styles/CourseDifferentPage.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" },
  }),
};

// Each icon: position on page + stem length going down to the cards
// stemHeight measured from bottom of icon to top of card grid
const FLOAT_ICONS = [
  {
    // Top-left: Brain — green — large, with long stem
    style:      { top: 100, left: "6%" },
    size:       82,
    color:      "#3ddb7a",
    icon:       Brain,
    iconSize:   32,
    duration:   5.2,
    stemHeight: 110,
  },
  {
    // Mid-left: Globe — yellow — smaller, shorter stem
    style:      { top: 218, left: "15%" },
    size:       64,
    color:      "#f5c518",
    icon:       Globe,
    iconSize:   26,
    duration:   6.8,
    stemHeight: 70,
  },
  {
    // Top-right: Rocket — blue — large, long stem
    style:      { top: 95, right: "6%" },
    size:       78,
    color:      "#5b8fff",
    icon:       Rocket,
    iconSize:   30,
    duration:   4.8,
    stemHeight: 105,
  },
  {
    // Mid-right: MessageSquare — purple — smaller, shorter stem
    style:      { top: 215, right: "14%" },
    size:       62,
    color:      "#bf7aff",
    icon:       MessageSquare,
    iconSize:   24,
    duration:   5.8,
    stemHeight: 68,
  },
];

const MARQUEE_ITEMS = [
  { label: "Critical Thinking",       color: "#e8a020" },
  { label: "Data Literacy",           color: "#f5c518" },
  { label: "Global Perspective",      color: "#00d4c8" },
  { label: "Problem Solving",         color: "#bf7aff" },
  { label: "Communication Skills",    color: "#e8a020" },
  { label: "Industry Mentors",        color: "#f5c518" },
  { label: "Capstone Projects",       color: "#00d4c8" },
  { label: "Certificate of Excellence", color: "#bf7aff" },
];

const PARTICLES = [
  { left: "10%", top: "18%", duration: "8s",  delay: "0s"   },
  { left: "20%", top: "68%", duration: "11s", delay: "1.2s" },
  { left: "33%", top: "38%", duration: "9s",  delay: "2s"   },
  { left: "47%", top: "80%", duration: "13s", delay: "1.5s" },
  { left: "58%", top: "25%", duration: "10s", delay: "0.5s" },
  { left: "70%", top: "62%", duration: "12s", delay: "3s"   },
  { left: "83%", top: "16%", duration: "9s",  delay: "2.2s" },
  { left: "91%", top: "76%", duration: "14s", delay: "1s"   },
  { left: "14%", top: "48%", duration: "10s", delay: "4s"   },
  { left: "40%", top: "8%",  duration: "8s",  delay: "2.5s" },
  { left: "64%", top: "88%", duration: "15s", delay: "0s"   },
  { left: "76%", top: "44%", duration: "11s", delay: "1.8s" },
  { left: "3%",  top: "60%", duration: "9s",  delay: "3.5s" },
  { left: "52%", top: "55%", duration: "12s", delay: "0.8s" },
];

export default function CourseDifferentPage() {
  return (
    
    <>
    
      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(({ label, color }, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-item__dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>
         

      <div className="page">

        {/* ── Background planet arc ──────────────────────────────
            Place earth-bg.png in src/images/ then replace this
            div with:
              <img src={earthBg} alt="" className="page-planet-bg" aria-hidden="true" />
        ─────────────────────────────────────────────────────── */}
        <img
          src={earthBg}
          alt=""
          className="page-planet-bg"
          aria-hidden="true"
        />

        {/* ── Ambient particles ── */}
        <div className="page-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={{
                left: p.left,
                top:  p.top,
                animationDuration: p.duration,
                animationDelay:    p.delay,
              }}
            />
          ))}
        </div>

        {/* ── Floating icon blobs with stems ── */}
        {FLOAT_ICONS.map(({ style, size, color, icon: Icon, iconSize, duration, stemHeight }, i) => (
          <FloatIcon
            key={i}
            style={style}
            size={size}
            color={color}
            duration={duration}
            stemHeight={stemHeight}
          >
            <Icon size={iconSize} />
          </FloatIcon>
        ))}

        <div className="page__inner">

          {/* ── Section Header ── */}
          <motion.div
            className="section-header"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeUp}
          >
            <span className="header-pill">The IISPPR Difference</span>

            <h1 className="header-title">
              What Makes This<br />
              <span className="header-title__gradient">Course Different?</span>
            </h1>

            <p className="header-sub">
              We go beyond classrooms. Experience policy-relevant learning designed<br />
              to build{" "}
              <strong>real-world changemakers, critical thinkers, and future policymakers.</strong>
            </p>
          </motion.div>

          {/* ── Cards Grid ── */}
          <div className="cards-grid">
            {CARDS.map((card, i) => (
              <PillarCard key={card.num} card={card} index={i} />
            ))}
          </div>

          {/* ── CTA Bar ── */}
          <motion.div
            className="cta-bar"
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="cta-bar__left">
              <div className="cta-bar__gift-icon" aria-hidden="true">
                <Users size={24} />
              </div>
              <div>
                <strong className="cta-bar__title">
                  Join the Next Generation of{" "}
                  <span>Thinkers &amp; Innovators</span>
                </strong>
                <p className="cta-bar__subtitle">
                  Enrol today and transform the way you think.
                </p>
              </div>
            </div>

            <div className="cta-bar__center">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="cta-bar__image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=280&q=80"
                    alt="Group of students collaborating"
                    className="cta-bar__group-img"
                    loading="lazy"
                  />
                  <div className="cta-bar__image-badge">2K+</div>
                </div>
                <p className="cta-bar__social-proof">
                  <strong>2,000+ learners</strong>{" "}
                  already transformed their future.
                </p>
              </div>
            </div>

            <a
              href="https://iisppracademy.com/course"
              className="cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your Journey Today
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </motion.div>

        </div>
      </div>

    </>
  );
}
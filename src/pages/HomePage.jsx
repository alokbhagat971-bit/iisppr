// pages/HomePage.jsx — IISPPR Academy · Creative Home Page
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Play, Star, Users, Award, BookOpen,
  ChevronDown, ChevronUp, Zap, Globe, Brain, BarChart2,
  CheckCircle, Shield, TrendingUp, Lightbulb, Target,
  GraduationCap, Clock, Sparkles, Rocket, MessageSquare,
} from "lucide-react";

import Navbar from "../components/Navbar";
import PillarCard from "../components/PillarCard";
import FloatIcon from "../components/FloatIcon";
import "../styles/global.css";
import "../styles/HomePage.css";
import "../styles/CourseDifferentPage.css";

/* ─── Image assets ─── */
import heroBg    from "../images/hero_bg.png";
import brainImg  from "../images/brain.png";
import computerImg from "../images/computer.png";
import earthImg  from "../images/earth.png";
import masterImg from "../images/master.png";
import earthBg from "../images/globe.png";

/* ─── Data ─── */
import { CARDS } from "../data/cards";

/* ─── Framer Motion helpers ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.6, ease: "easeOut" },
  }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { delay: d, duration: 0.5 },
  }),
};

/* ─── Data ─── */
const STATS = [
  { num: "2,000+",  label: "Students Enrolled",     icon: Users,       accent: "#e8a020" },
  { num: "96%",     label: "Completion Rate",        icon: TrendingUp,  accent: "#f5c518" },
  { num: "12+",     label: "Expert Instructors",     icon: Award,       accent: "#00d4c8" },
  { num: "4.9 ★",  label: "Average Rating",         icon: Star,        accent: "#bf7aff" },
];

const AUDIENCE = [
  {
    icon: GraduationCap,
    color: "#e8a020",
    bg: "rgba(232,160,32,0.1)",
    title: "Students & Graduates",
    desc: "Build skills that go far beyond the syllabus and stand out in competitive job markets.",
  },
  {
    icon: TrendingUp,
    color: "#f5c518",
    bg: "rgba(245,197,24,0.1)",
    title: "Working Professionals",
    desc: "Upskill at your own pace and switch into data-driven, high-growth career paths.",
  },
  {
    icon: Lightbulb,
    color: "#00d4c8",
    bg: "rgba(0,212,200,0.1)",
    title: "Entrepreneurs & Founders",
    desc: "Learn to make smarter decisions using data insights and analytical thinking.",
  },
];

const AUDIENCE_VISUALS = [
  { emoji: "🎓", title: "Curriculum Crafted by IIT Alumni", sub: "Industry-first approach" },
  { emoji: "🌍", title: "Global Perspective", sub: "50+ case studies" },
  { emoji: "💻", title: "Hands-on Projects", sub: "Real datasets" },
  { emoji: "🏆", title: "Certificate of Excellence", sub: "Industry recognised" },
  { emoji: "🤝", title: "Mentorship Sessions", sub: "1:1 guidance" },
];

const MODULES = [
  {
    week: "Module 01",
    title: "Foundations of Critical Thinking",
    desc: "Master the art of structured reasoning, logical analysis, and evidence-based decision making.",
    topics: ["Logic & Fallacies", "Mental Models", "Bayesian Thinking"],
    accent: "#e8a020",
  },
  {
    week: "Module 02",
    title: "Data Literacy & Interpretation",
    desc: "Understand data at a deep level — spot trends, detect biases, and draw accurate conclusions.",
    topics: ["Statistics Basics", "Visual Data", "Bias Detection"],
    accent: "#f5c518",
  },
  {
    week: "Module 03",
    title: "Global Trends & Local Impact",
    desc: "Connect macro-level global trends to micro-level decisions affecting your daily life and career.",
    topics: ["Economics", "Technology Trends", "Policy Analysis"],
    accent: "#00d4c8",
  },
  {
    week: "Module 04",
    title: "Problem Solving Frameworks",
    desc: "Apply industry-tested frameworks like First Principles, MECE, and Design Thinking.",
    topics: ["First Principles", "MECE", "Design Thinking"],
    accent: "#bf7aff",
  },
  {
    week: "Module 05",
    title: "Communication & Storytelling",
    desc: "Turn complex insights into compelling narratives that influence and inspire action.",
    topics: ["Data Storytelling", "Presentation Skills", "Executive Communication"],
    accent: "#e8a020",
  },
  {
    week: "Module 06",
    title: "Capstone & Real-World Project",
    desc: "Apply everything to a real-world problem — research, analyse, and present your findings.",
    topics: ["Industry Project", "Peer Review", "Expert Feedback"],
    accent: "#f5c518",
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "IISPPR completely changed how I approach problems. I went from a generic engineering graduate to someone who thinks clearly and communicates with impact. Got placed at a top MNC within 2 months.",
    name: "Arjun Mehta",
    role: "Data Analyst @ Infosys",
    initial: "A",
    bg: "#e8a020",
    featured: true,
  },
  {
    stars: 5,
    quote: "The global lens module was an eye-opener. I finally understand why things happen in the world and how they affect my industry. Brilliant course!",
    name: "Priya Sharma",
    role: "MBA Student, IIM Ahmedabad",
    initial: "P",
    bg: "#f5c518",
  },
  {
    stars: 5,
    quote: "As an entrepreneur, I was making decisions on gut feel. IISPPR taught me to validate with data and think systematically. My startup's growth rate doubled.",
    name: "Rahul Gupta",
    role: "Founder, EdTech Startup",
    initial: "R",
    bg: "#00d4c8",
  },
];

const FAQS = [
  {
    q: "Who is this course designed for?",
    a: "This course is designed for students, graduates, working professionals, and entrepreneurs who want to develop critical thinking, data literacy, and analytical skills that are relevant in any career path.",
  },
  {
    q: "How long is the course, and is it self-paced?",
    a: "The course spans 6 weeks with approximately 3–4 hours of learning per week. It is fully self-paced — you can learn at any time that suits your schedule.",
  },
  {
    q: "Will I get a certificate upon completion?",
    a: "Yes! Upon completing all modules and the capstone project, you will receive an industry-recognised Certificate of Excellence from IISPPR Academy.",
  },
  {
    q: "Do I need any prior knowledge or degree to enrol?",
    a: "Absolutely not. The course is designed from the ground up to be accessible to anyone with curiosity and a willingness to learn. No prior technical background is required.",
  },
  {
    q: "Is there mentorship or live interaction available?",
    a: "Yes, enrolled students get access to monthly live Q&A sessions with instructors and optional 1:1 mentorship slots that can be booked through the student portal.",
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

const HERO_MODULES = [
  { icon: Brain,     color: "#e8a020", bg: "rgba(232,160,32,0.12)",  name: "Critical Thinking", sub: "6 core modules",   badge: "Popular", badgeBg: "rgba(232,160,32,0.2)",  badgeColor: "#e8a020" },
  { icon: BarChart2, color: "#f5c518", bg: "rgba(245,197,24,0.12)",  name: "Data Literacy",     sub: "Real datasets",    badge: "New",     badgeBg: "rgba(245,197,24,0.2)",  badgeColor: "#f5c518" },
  { icon: Globe,     color: "#00d4c8", bg: "rgba(0,212,200,0.12)",   name: "Global Trends",     sub: "50+ case studies", badge: "🌍",      badgeBg: "rgba(0,212,200,0.15)",  badgeColor: "#00d4c8" },
];

/* ── Course Different Page Floating Icons ── */
const FLOAT_ICONS = [
  {
    style:      { top: 100, left: "6%" },
    size:       82,
    color:      "#3ddb7a",
    icon:       Brain,
    iconSize:   32,
    duration:   5.2,
    stemHeight: 110,
  },
  {
    style:      { top: 218, left: "15%" },
    size:       64,
    color:      "#f5c518",
    icon:       Globe,
    iconSize:   26,
    duration:   6.8,
    stemHeight: 70,
  },
  {
    style:      { top: 95, right: "6%" },
    size:       78,
    color:      "#5b8fff",
    icon:       Rocket,
    iconSize:   30,
    duration:   4.8,
    stemHeight: 105,
  },
  {
    style:      { top: 215, right: "14%" },
    size:       62,
    color:      "#bf7aff",
    icon:       MessageSquare,
    iconSize:   24,
    duration:   5.8,
    stemHeight: 68,
  },
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

/* ─── Sub-components ─── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="faq-question__text">{q}</span>
        <span className="faq-question__icon">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="faq-answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="home" aria-label="Hero section"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center top" }}>
        <div className="hero__inner">

          {/* Left content */}
          <div className="hero__content">
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
              <span className="hero__badge">
                <span className="hero__badge-dot" />
                Now Enrolling · Batch 2026
              </span>
            </motion.div>

            <motion.h1 className="hero__title" custom={0.1} initial="hidden" animate="visible" variants={fadeUp}>
              Think Deeper.<br />
              <span className="hero__title-green">Grow Smarter.</span><br />
              <span className="hero__title-yellow">Lead Better.</span>
            </motion.h1>

            <motion.p className="hero__subtitle" custom={0.2} initial="hidden" animate="visible" variants={fadeUp}>
              IISPPR Academy's flagship course builds the <strong>critical thinking, data literacy,
              and global awareness</strong> that universities don't teach — but every top employer demands.
            </motion.p>

            <motion.div className="hero__ctas" custom={0.3} initial="hidden" animate="visible" variants={fadeUp}>
              <a href="https://iisppracademy.com/course" target="_blank" rel="noopener noreferrer" className="hero__cta-primary">
                Enrol Now — Free Preview
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#curriculum" className="hero__cta-secondary">
                <Play size={14} aria-hidden="true" />
                See Curriculum
              </a>
            </motion.div>

            <motion.div className="hero__trust" custom={0.4} initial="hidden" animate="visible" variants={fadeUp}>
              <div className="hero__trust-avatars" aria-hidden="true">
                {["A","P","R","S","K"].map((l, i) => (
                  <div key={i} className="hero__trust-avatar"
                    style={{ background: ["#1a3a24","#2a300a","#0f2040","#2a1a3a","#1a2a30"][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <p className="hero__trust-text">
                <strong>2,000+ learners</strong> already enrolled.<br />Join the next cohort today.
              </p>
            </motion.div>
          </div>

          {/* Right visual card */}
          <motion.div className="hero__visual" custom={0.2} initial="hidden" animate="visible" variants={fadeIn}>
            <div className="hero__card-stack">

              {/* Floating stat card */}
              <motion.div
                className="hero__float-card hero__float-card--stat"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="hero__float-icon" style={{ background: "rgba(61,219,122,0.12)" }}>
                  <Users size={18} color="#3ddb7a" />
                </div>
                <div>
                  <div className="hero__float-val">2,000+</div>
                  <div className="hero__float-label">Active Learners</div>
                </div>
              </motion.div>

              {/* Main card */}
              <div className="hero__main-card">
                <span className="hero__card-tag">
                  <Sparkles size={10} />
                  Flagship Program 2026
                </span>
                <h2 className="hero__card-title">
                  The IISPPR<br />Thinking Edge
                </h2>
                <p className="hero__card-desc">
                  A transformative 6-week program designed to make you think, lead, and communicate at the highest level.
                </p>
                <div className="hero__card-modules">
                  {HERO_MODULES.map(({ icon: Icon, color, bg, name, sub, badge, badgeBg, badgeColor }) => (
                    <div key={name} className="hero__module">
                      <div className="hero__module-icon" style={{ background: bg }}>
                        <Icon size={16} color={color} />
                      </div>
                      <div className="hero__module-text">
                        <div className="hero__module-name">{name}</div>
                        <div className="hero__module-sub">{sub}</div>
                      </div>
                      <span className="hero__module-badge" style={{ background: badgeBg, color: badgeColor }}>
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cert card */}
              <motion.div
                className="hero__float-card hero__float-card--cert"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="hero__float-icon" style={{ background: "rgba(245,197,24,0.12)" }}>
                  <Award size={18} color="#f5c518" />
                </div>
                <div>
                  <div className="hero__float-val" style={{ fontSize: 14 }}>Certificate</div>
                  <div className="hero__float-label">On completion</div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

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

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="stats-section" id="stats" aria-label="Course statistics">
        <div className="stats-inner">
          <div className="stats-grid">
            {STATS.map(({ num, label, icon: Icon, accent }, i) => (
              <motion.div
                key={label}
                className="stat-card"
                style={{ "--accent-color": accent }}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="stat-card__icon" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
                  <Icon size={22} color={accent} />
                </div>
                <div className="stat-card__num">{num}</div>
                <div className="stat-card__label">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ──────────────────────────────── */}
      <section className="audience-section" id="whyus" aria-label="Who is this for">
        <div className="audience-inner">

          <motion.div
            className="audience__left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="section-pill">Who Is This For?</span>
            <h2 className="section-title">Built for the <span>Next Generation</span> of Thinkers</h2>
            <p className="section-desc">
              Whether you're a student hungry for an edge, a professional seeking a career leap,
              or an entrepreneur who wants to make smarter decisions — this course was crafted for you.
            </p>
            <div className="audience__cards">
              {AUDIENCE.map(({ icon: Icon, color, bg, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="audience-card"
                  custom={i * 0.1 + 0.2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <div className="audience-card__icon" style={{ background: bg, border: `1px solid ${color}33` }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <div className="audience-card__title">{title}</div>
                    <div className="audience-card__desc">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="audience__right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={0.3}
          >
            {/* Photo grid replacing emoji cards */}
            <div className="audience-photo-grid">
              <motion.div className="audience-photo-card audience-photo-card--wide"
                whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={masterImg} alt="Expert instructor teaching" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🏆 IIT Alumni Crafted</span>
                  <p>Industry-first approach</p>
                </div>
              </motion.div>

              <motion.div className="audience-photo-card"
                whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={brainImg} alt="Critical thinking brain" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🧠 Critical Thinking</span>
                  <p>6 core modules</p>
                </div>
              </motion.div>

              <motion.div className="audience-photo-card"
                whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={computerImg} alt="Hands-on learning" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">💻 Hands-on Projects</span>
                  <p>Real datasets</p>
                </div>
              </motion.div>

              <motion.div className="audience-photo-card audience-photo-card--wide"
                whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={earthImg} alt="Global perspective" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🌍 Global Perspective</span>
                  <p>50+ case studies</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── CURRICULUM ───────────────────────────────────── */}
      <section className="curriculum-section" id="curriculum" aria-label="Course curriculum">
        <div className="curriculum-inner">
          <motion.div
            className="curriculum-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-pill">The Curriculum</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              6 Weeks. <span>Life-Changing</span> Skills.
            </h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "14px auto 0", maxWidth: 520 }}>
              Every module is designed to challenge you, build on the last, and leave you with
              a tangible, portfolio-ready skill.
            </p>
          </motion.div>

          <div className="curriculum-grid">
            {MODULES.map(({ week, title, desc, topics, accent }, i) => (
              <motion.div
                key={week}
                className="curriculum-card"
                style={{ "--c-accent": accent }}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
              >
                <div className="curriculum-card__week">{week}</div>
                <div className="curriculum-card__title">{title}</div>
                <div className="curriculum-card__desc">{desc}</div>
                <div className="curriculum-card__topics">
                  {topics.map((t) => (
                    <span key={t} className="curriculum-card__topic">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE DIFFERENT (What Makes This Course Different) ───────────────────────────────────── */}
      <div className="page">

        {/* ── Background planet arc ── */}
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

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="testimonials-section" id="reviews" aria-label="Student testimonials">
        <div className="testimonials-inner">
          <motion.div
            className="testimonials-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-pill">Student Stories</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Real People. <span>Real Transformations.</span>
            </h2>
          </motion.div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map(({ stars, quote, name, role, initial, bg, featured }, i) => (
              <motion.div
                key={name}
                className={`testimonial-card${featured ? " testimonial-card--featured" : ""}`}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div className="testimonial-stars" aria-label={`${stars} stars`}>
                  {Array.from({ length: stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#f5c518" stroke="none" />
                  ))}
                </div>
                <p className="testimonial-quote">"{quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: bg }}>{initial}</div>
                  <div>
                    <div className="testimonial-name">{name}</div>
                    <div className="testimonial-role">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="faq-section" id="faq" aria-label="Frequently asked questions">
        <div className="faq-inner">
          <motion.div
            className="faq-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-pill">Got Questions?</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Frequently Asked <span>Questions</span>
            </h2>
          </motion.div>

          <motion.div
            className="faq-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="final-cta-section" aria-label="Enrol call to action">
        <motion.div
          className="final-cta-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="final-cta__title">
            Ready to Unlock Your <span>Thinking Potential?</span>
          </h2>
          <p className="final-cta__desc">
            Join thousands of learners who are already thinking differently, communicating better,
            and growing faster. Your transformation starts today.
          </p>
          <div className="final-cta__actions">
            <a href="https://iisppracademy.com/course" target="_blank" rel="noopener noreferrer" className="final-cta__btn">
              Start Learning Today
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="final-cta__note">
            <Shield size={12} />
            No prerequisites · Self-paced · Certificate included
          </p>
        </motion.div>
      </section>
    </>
  );
}

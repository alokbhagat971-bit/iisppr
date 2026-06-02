// pages/HomePage.jsx — IISPPR Academy · Creative Home Page
import { motion } from "framer-motion";
import {
  ArrowRight, Star, Users, Award,
  Shield, TrendingUp, Lightbulb,
  GraduationCap,
} from "lucide-react";

import './courseDifferent/styles/global.css';
import './courseDifferent/styles/LandingSections.css';
import './courseDifferent/styles/CourseDifferentPage.css';


/* ─── Image assets ─── */
import brainImg  from '../assets/brain.png';
import computerImg from '../assets/computer.png';
import earthImg  from '../assets/earth.png';
import masterImg from '../assets/master.png';

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





/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function LandingSections() {
  return (
    <>

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





      {/* ── FAQ ──────────────────────────────────────────── */}


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

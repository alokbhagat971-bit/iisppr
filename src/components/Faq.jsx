import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./courseDifferent/styles/LandingSections.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: "easeOut" },
  }),
};

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

export default function Faq() {
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

  return (
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
  );
}

// data/cards.js — Pillar card content and configuration

import { Brain, Globe, Rocket, MessageSquare } from "lucide-react";

// ─── Local image imports ───────────────────────────────────────
// Place these files in src/images/
import brain    from "../images/brain.png";
import earth    from "../images/earth.png";
import computer from "../images/computer.png";
import master   from "../images/master.png";

// ─── Background planet/earth arc image ───────────────────────
// Place this file in src/images/ — it's the large glowing green
// planet curve visible at the bottom of the reference image.
// Import it in CourseDifferentPage.jsx like this:
//   import earthBg from "../images/earth-bg.png";
// Then use it as the src of the .page-planet-bg <img> element.
// File name to use: earth-bg.png

export const CARDS = [
  {
    num: "01",
    accent: "#3ddb7a",       // green
    icon: Brain,
    title: "Critical, Not Just Technical",
    desc: "We go beyond memorising frameworks and mugging policy documents.",
    bullets: ["Deep constitutional & governance clarity", "Critical policy analysis focus"],
    img: brain,
    dotActive: 1,
  },
  {
    num: "02",
    accent: "#f5c518",       // yellow/gold
    icon: Globe,
    title: "Global & Local Lens",
    desc: "Understand how the 17 SDGs connect to everyday governance and community impact.",
    bullets: ["SDG case studies from 50+ countries", "Local policy, global perspective"],
    img: earth,
    dotActive: 2,
  },
  {
    num: "03",
    accent: "#5b8fff",       // blue
    icon: Rocket,
    title: "Practical Skills You Can Use",
    desc: "Hands-on modules, live policy briefs, and applied SDG project work.",
    bullets: ["Draft real policy recommendations", "Build a public impact portfolio"],
    img: computer,
    dotActive: 3,
  },
  {
    num: "04",
    accent: "#bf7aff",       // purple
    icon: MessageSquare,
    title: "Learn to Communicate With Impact",
    desc: "Translate complex policy findings into compelling narratives that move people.",
    bullets: ["Storytelling for social change", "Present to real stakeholders"],
    img: master,
    dotActive: 4,
  },
];

export const AVATARS = ["av1.jpg", "av2.jpg", "av3.jpg", "av4.jpg"];
export const AVATAR_FALLBACKS = ["#1e4028", "#0f2a1a", "#173320", "#0a1e0f"];

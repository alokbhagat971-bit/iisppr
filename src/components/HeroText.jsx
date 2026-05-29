import { useEffect, useState } from "react";

// ─── IISPPR Color Palette ────────────────────────────────────────
// Background:        #02060B
// Card / Surface:    #0A111B
// Border:            #15222D
// Primary Cyan/Teal: #00D5E0
// Accent Gold:       #E3B323
// White Text:        #F1F5F9
// Muted Text:        #8A919B
// ────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&family=Inter:wght@300;400;500&display=swap');

  /* ── Keyframes ─────────────────────────────────────────────── */
  @keyframes ht-wordUp {
    0%   { opacity: 0; transform: translateY(60px) skewY(6deg); filter: blur(10px); }
    65%  { filter: blur(0); }
    100% { opacity: 1; transform: translateY(0) skewY(0); filter: blur(0); }
  }
  @keyframes ht-charDrop {
    0%   { opacity: 0; transform: rotateX(-80deg) translateY(24px); filter: blur(4px); }
    100% { opacity: 1; transform: rotateX(0deg) translateY(0); filter: blur(0); }
  }
  @keyframes ht-fadeUp {
    0%   { opacity: 0; transform: translateY(28px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes ht-lineDraw {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes ht-pulseGlow {
    0%, 100% { opacity: .6; box-shadow: 0 0 6px 0 #00D5E066; }
    50%       { opacity: 1;  box-shadow: 0 0 18px 3px #00D5E099; }
  }
  @keyframes ht-ctaPulse {
    0%, 100% { box-shadow: 0 0 0 0 #00D5E025; }
    50%       { box-shadow: 0 0 22px 5px #00D5E040; }
  }
  @keyframes ht-dotBlink {
    0%, 100% { opacity: .5; box-shadow: 0 0 4px 1px #00D5E0; }
    50%       { opacity: 1;  box-shadow: 0 0 10px 3px #00D5E0; }
  }
  @keyframes ht-goldShimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 250% center; }
  }
  @keyframes ht-cyanSweep {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  /* ── Text Masks ─────────────────────────────────────────────── */

  /* Gold shimmer mask — "Excellence in Research" */
  .ht-mask-gold {
    background: linear-gradient(
      115deg,
      #b8860b 0%,
      #E3B323 18%,
      #f7e07a 38%,
      #E3B323 52%,
      #c9921a 68%,
      #f0c93a 82%,
      #E3B323 100%
    );
    background-size: 250% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ht-goldShimmer 4s linear infinite;
  }

  /* Cyan light sweep mask — "IISPPR" */
  .ht-mask-cyan {
    background: linear-gradient(
      160deg,
      #00D5E0 0%,
      #a8f0f4 30%,
      #ffffff 50%,
      #a8f0f4 70%,
      #00D5E0 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ht-cyanSweep 5s ease-in-out infinite alternate;
    filter: drop-shadow(0 0 20px #00D5E055);
  }

  /* White fade-down mask — "Field & Research Fellowship" */
  .ht-mask-white {
    background: linear-gradient(180deg, #F1F5F9 0%, #c8d4e0 60%, #8A919B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Animated spans ─────────────────────────────────────────── */
  .ht-w {
    display: inline-block;
    opacity: 0;
    animation: ht-wordUp .75s cubic-bezier(.22,1,.36,1) forwards;
  }
  .ht-c {
    display: inline-block;
    opacity: 0;
    perspective: 900px;
    animation: ht-charDrop .44s cubic-bezier(.22,1,.36,1) forwards;
  }
  .ht-fu {
    opacity: 0;
    animation: ht-fadeUp .65s cubic-bezier(.22,1,.36,1) forwards;
  }

  /* ── Divider ─────────────────────────────────────────────────── */
  .ht-divider {
    height: 1px;
    background: linear-gradient(90deg, #00D5E0, #E3B323 50%, transparent);
    width: 0;
    max-width: 320px;
    animation: ht-lineDraw .9s cubic-bezier(.22,1,.36,1) forwards,
               ht-pulseGlow 2.8s ease-in-out infinite;
  }

  /* ── Badge ───────────────────────────────────────────────────── */
  .ht-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 14px;
    border-radius: 50px;
    border: 1px solid #15222D;
    background: #0A111B;
    color: #8A919B;
    font-family: 'Inter', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    opacity: 0;
    animation: ht-fadeUp .55s cubic-bezier(.22,1,.36,1) forwards;
  }
  .ht-badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00D5E0;
    flex-shrink: 0;
    animation: ht-dotBlink 1.8s ease-in-out infinite;
  }

  /* ── CTA Button ──────────────────────────────────────────────── */
  .ht-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 36px;
    border-radius: 50px;
    border: 1.5px solid #00D5E0;
    background: transparent;
    color: #00D5E0;
    font-family: 'Sora', sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: .1em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: ht-fadeUp .65s cubic-bezier(.22,1,.36,1) forwards,
               ht-ctaPulse 3s ease-in-out infinite;
    transition: color .25s, transform .2s;
    pointer-events: all;
  }
  .ht-cta-fill {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, #00D5E0, #009eac);
    opacity: 0;
    transition: opacity .28s;
  }
  .ht-cta:hover .ht-cta-fill { opacity: 1; }
  .ht-cta:hover { color: #02060B; transform: translateY(-2px) scale(1.02); }
  .ht-cta-lbl, .ht-cta-arr { position: relative; z-index: 1; }
  .ht-cta-arr { font-size: 16px; transition: transform .28s; }
  .ht-cta:hover .ht-cta-arr { transform: translateX(5px); }

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .ht-root { padding: 0 clamp(24px, 6vw, 60px) !important; }
  }
  @media (max-width: 600px) {
    .ht-badge  { font-size: 9.5px; padding: 4px 12px; }
    .ht-cta    { padding: 11px 26px; font-size: 11.5px; }
  }
`;

/* ── AnimatedWords ─────────────────────────────────────────────── */
function AnimatedWords({ text, baseDelay, maskClass }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={`ht-w ${maskClass}`}
          style={{ animationDelay: `${baseDelay + i * 0.1}s`, marginRight: "0.26em" }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

/* ── AnimatedChars ─────────────────────────────────────────────── */
function AnimatedChars({ text, baseDelay, maskClass }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`ht-c ${maskClass}`}
          style={{ animationDelay: `${baseDelay + i * 0.065}s` }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}

/* ── Main Export ───────────────────────────────────────────────── */
export default function HeroText() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Small delay so Kyra's slider background is visible before text animates in
    const t = setTimeout(() => setActive(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{css}</style>

      
        <div
          className="ht-root"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",         // vertically center the text beautifully
            justifyContent: "flex-start",
            padding: "0 clamp(48px, 9vw, 150px)",
            paddingTop: "90px",           // safety spacing for the fixed navbar
            pointerEvents: "none",
            zIndex: 8,
          }}
        >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(8px, 2vh, 24px)",
            maxWidth: 860,
            width: "100%",
          }}
        >

          {/* ── Badge ── */}
          {active && (
            <div className="ht-badge" style={{ animationDelay: ".15s" }}>
              <span className="ht-badge-dot" />
              Field &amp; Research Fellowship 2026
            </div>
          )}

          {/* ── "Excellence in Research" — GOLD SHIMMER MASK ── */}
          {active && (
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(18px, 2.6vw, 36px)",
                fontWeight: 600,
                letterSpacing: "-.01em",
                lineHeight: 1.2,
              }}
            >
              <AnimatedWords
                text="Excellence in Research"
                baseDelay={0.25}
                maskClass="ht-mask-gold"
              />
            </div>
          )}

          {/* ── Gradient divider ── */}
          {active && (
            <div className="ht-divider" style={{ animationDelay: ".88s" }} />
          )}

          {/* ── "IISPPR" — CYAN LIGHT SWEEP MASK, char by char ── */}
          {active && (
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(52px, 8.5vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-.03em",
                lineHeight: .95,
              }}
            >
              <AnimatedChars
                text="IISPPR"
                baseDelay={1.05}
                maskClass="ht-mask-cyan"
              />
            </div>
          )}

          {/* ── "Field & Research Fellowship" — WHITE FADE MASK ── */}
          {active && (
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(22px, 3.6vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                marginTop: "-4px",
              }}
            >
              <AnimatedWords
                text="Field & Research Fellowship"
                baseDelay={1.7}
                maskClass="ht-mask-white"
              />
            </div>
          )}

          {/* ── Sub-text ── */}
          {active && (
            <p
              className="ht-fu"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(13px, 1.2vw, 15.5px)",
                fontWeight: 400,
                color: "#8A919B",
                lineHeight: 1.8,
                maxWidth: 460,
                margin: 0,
                animationDelay: "1.9s",
              }}
            >
              Shape the future with data-driven insights.
            </p>
          )}

          {/* ── CTA Button ── */}
          {active && (
            <a
              href="https://iisppracademy.com/course"
              className="ht-cta"
              style={{ marginTop: "4px", animationDelay: "2.2s, 2.8s" }}
            >
              <div className="ht-cta-fill" />
              <span className="ht-cta-lbl">Get Course Now</span>
              <span className="ht-cta-arr">→</span>
            </a>
          )}

        </div>
      </div>
    </>
  );
}

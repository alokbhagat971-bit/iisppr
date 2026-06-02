import { useState, useCallback, useEffect, useRef } from 'react';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';

const SLIDES = [
  { image: img1, position: '45% center' },
  { image: img2, position: '70% 40%' },
  { image: img3, position: '50% center' },
  { image: img4, position: '0% center' },
  { image: img5, position: '68% 40%' },
];

const TRANSITION_MS = 900;
const AUTO_INTERVAL_MS = 5500;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setPrev(current);
    setCurrent(index);
    setProgressKey((k) => k + 1);
    setTimeout(() => { setPrev(null); setIsAnimating(false); }, TRANSITION_MS);
  }, [isAnimating, current]);

  const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_INTERVAL_MS);
  }, [goNext]);

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [resetTimer]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { goPrev(); resetTimer(); }
      if (e.key === 'ArrowRight') { goNext(); resetTimer(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, resetTimer]);

  const handleNav = (fn) => () => { fn(); resetTimer(); };

  return (
    <section className="slider-root" aria-label="Hero Image Slider">

      {/* ── Main slider ── */}
      <div className="slider-slider">

        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`slider-slide-bg ${
              i === current ? 'slider-slide-bg--active'
              : i === prev  ? 'slider-slide-bg--prev'
              : 'slider-slide-bg--hidden'
            }`}
            style={{
              backgroundImage:    `url(${slide.image})`,
              backgroundPosition: slide.position,
            }}
            aria-hidden={i !== current}
          />
        ))}

        {/* LEFT — solid block fading into image, holds text area */}
        <div className="slider-overlay-left" />

        {/* TOP — subtle fade for top edge */}
        <div className="slider-overlay-top" />

        {/* BOTTOM — soft fade into page */}
        <div className="slider-overlay-bottom" />

        {/* VIGNETTE — subtle edge darkening */}
        <div className="slider-overlay-vignette" />

        <button className="slider-arrow slider-arrow--left" onClick={handleNav(goPrev)} aria-label="Previous slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="slider-arrow slider-arrow--right" onClick={handleNav(goNext)} aria-label="Next slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="slider-dots" role="tablist" aria-label="Slide indicators">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`slider-dot ${i === current ? 'slider-dot--active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
            />
          ))}
        </div>

        <div className="slider-progress-track" aria-hidden="true">
          <div key={progressKey} className="slider-progress-fill" style={{ animationDuration: `${AUTO_INTERVAL_MS}ms` }} />
        </div>

        <div className="slider-counter" aria-live="polite" aria-atomic="true">
          <span className="slider-counter-current">{String(current + 1).padStart(2, '0')}</span>
          <span className="slider-counter-sep">/</span>
          <span className="slider-counter-total">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

      </div>
      {/* ── END slider-slider ── */}


      <style>{`
        .slider-root {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          background-color: #02060B;
          overflow: hidden;
        }

        .slider-slider {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          background-color: #02060B;
        }

        /* ── Slide layers ── */
        .slider-slide-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          will-change: opacity;
          transition: opacity ${TRANSITION_MS}ms cubic-bezier(0.45, 0, 0.55, 1);
        }
        .slider-slide-bg--active {
          opacity: 1;
          z-index: 1;
        }
        .slider-slide-bg--prev {
          opacity: 0;
          z-index: 2;
          pointer-events: none;
        }
        .slider-slide-bg--hidden {
          opacity: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* ── LEFT — solid dark block that naturally dissolves into the photo ── */
        .slider-overlay-left {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 60%;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(
            to right,
            #02060B        0%,
            #02060B        12%,
            rgba(2,6,11,0.92) 28%,
            rgba(2,6,11,0.60) 48%,
            rgba(2,6,11,0.25) 70%,
            transparent    100%
          );
        }

        /* ── TOP — gentle edge fade ── */
        .slider-overlay-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 35%;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(2,6,11,0.75) 0%,
            rgba(2,6,11,0.30) 60%,
            transparent       100%
          );
        }

        /* ── BOTTOM — blends into page bg ── */
        .slider-overlay-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 30%;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(2,6,11,1.00) 0%,
            rgba(2,6,11,0.55) 55%,
            transparent       100%
          );
        }

        /* ── Vignette — darkens right/top-right edge subtly ── */
        .slider-overlay-vignette {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: radial-gradient(
            ellipse at 72% 50%,
            transparent        28%,
            rgba(2,6,11,0.35) 100%
          );
        }

        /* ── Arrows ── */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(241,245,249,0.2);
          background: rgba(2,6,11,0.5);
          backdrop-filter: blur(8px);
          color: #F1F5F9;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          outline: none;
        }
        .slider-arrow:hover {
          border-color: #00D5E0;
          color: #00D5E0;
          background: rgba(0,213,224,0.1);
        }
        .slider-arrow:focus-visible { outline: 2px solid #00D5E0; outline-offset: 3px; }
        .slider-arrow--left  { left: 20px; }
        .slider-arrow--right { right: 20px; }

        /* ── Dots ── */
        .slider-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex; gap: 8px; align-items: center;
        }
        .slider-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          border: none;
          background: rgba(241,245,249,0.35);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0; outline: none;
        }
        .slider-dot--active { width: 24px; border-radius: 3px; background: #00D5E0; }
        .slider-dot:focus-visible { outline: 2px solid #00D5E0; outline-offset: 3px; }

        /* ── Progress bar ── */
        .slider-progress-track {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(241,245,249,0.08);
          z-index: 10;
        }
        .slider-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00D5E0, #E3B323);
          width: 0%;
          animation: kProgress linear forwards;
        }
        @keyframes kProgress { from { width: 0%; } to { width: 100%; } }

        /* ── Counter ── */
        .slider-counter {
          position: absolute;
          bottom: 22px; right: 24px;
          z-index: 10;
          display: flex; align-items: baseline; gap: 3px;
          font-weight: 600;
          font-family: 'Outfit', 'Inter', system-ui, sans-serif;
        }
        .slider-counter-current { font-size: 1.1rem; color: #F1F5F9; line-height: 1; }
        .slider-counter-sep     { font-size: 0.72rem; color: #8A919B; }
        .slider-counter-total   { font-size: 0.72rem; color: #8A919B; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .slider-root,
          .slider-slider {
            min-height: 100vh;
            min-height: 100dvh;
          }

          .slider-slide-bg {
            background-size: cover;
            background-position: center;
          }

          .slider-arrow {
            width: 40px;
            height: 40px;
          }
          .slider-arrow--left  { left: 14px; }
          .slider-arrow--right { right: 14px; }

          .slider-dots {
            bottom: clamp(22px, 4dvh, 38px);
          }

          .slider-counter {
            bottom: clamp(24px, 4dvh, 40px);
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .slider-root,
          .slider-slider {
            min-height: 100vh;
            min-height: 100dvh;
          }

          .slider-slide-bg {
            background-size: cover;
            background-position: center;
          }

          .slider-arrow {
            width: 36px;
            height: 36px;
            top: 50%;
            transform: translateY(-50%);
          }
          .slider-arrow--left  { left: 10px; right: auto; }
          .slider-arrow--right { right: 10px; left: auto; }

          .slider-dots {
            bottom: max(18px, env(safe-area-inset-bottom));
          }

          .slider-counter {
            bottom: max(20px, calc(env(safe-area-inset-bottom) + 2px));
            right: auto;
            left: 16px;
          }

          .slider-overlay-left {
            width: 90%;
            background: linear-gradient(
              to right,
              #02060B           0%,
              #02060B           20%,
              rgba(2,6,11,0.92) 38%,
              rgba(2,6,11,0.65) 58%,
              rgba(2,6,11,0.20) 80%,
              transparent       100%
            );
          }
        }

        @media (max-width: 480px) {
          .slider-root,
          .slider-slider {
            min-height: 100vh;
            min-height: 100dvh;
          }

          .slider-arrow {
            width: 32px;
            height: 32px;
          }
          .slider-arrow--left  { left: 8px; right: auto; }
          .slider-arrow--right { right: 8px; left: auto; }

          .slider-overlay-left {
            width: 100%;
            background: linear-gradient(
              to right,
              #02060B           0%,
              #02060B           15%,
              rgba(2,6,11,0.90) 40%,
              rgba(2,6,11,0.55) 65%,
              rgba(2,6,11,0.15) 85%,
              transparent       100%
            );
          }
        }
      `}</style>
    </section>
  );
}

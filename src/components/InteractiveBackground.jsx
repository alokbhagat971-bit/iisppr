import { useEffect, useRef } from "react";
import "./courseDifferent/styles/InteractiveBackground.css";

export default function InteractiveBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="interactive-bg" ref={containerRef}>
      {/* 3D Perspective Grid */}
      <div className="interactive-bg__grid-3d-wrap">
        <div className="interactive-bg__grid-3d" />
      </div>

      {/* Spotlight Glow following mouse */}
      <div className="interactive-bg__spotlight" />

      {/* Floating Ambient Blobs */}
      <div className="interactive-bg__blob interactive-bg__blob--cyan" />
      <div className="interactive-bg__blob interactive-bg__blob--gold" />
      <div className="interactive-bg__blob interactive-bg__blob--purple" />
      <div className="interactive-bg__blob interactive-bg__blob--cyan-two" />
    </div>
  );
}

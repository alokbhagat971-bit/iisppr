// components/FloatIcon.jsx
// Desktop-only floating icon blob with glowing stem.
// Hidden on mobile via CSS class to prevent title overlap.
import { motion } from "framer-motion";
import "../styles/CourseDifferentPage.css";

export default function FloatIcon({
  children,
  style,
  size = 56,
  color,
  duration = 5,
  stemHeight = 0,
}) {
  return (
    <div
      className="float-icon-wrapper"   // ← hidden on mobile via CSS
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 2,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Animated blob */}
      <motion.div
        style={{ width: size, height: size, position: "relative", flexShrink: 0 }}
        animate={{ y: [0, -18, 0], scale: [1, 1.07, 1] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
      >
        {/* Pulse ring */}
        <div style={{
          position: "absolute",
          inset: "-10px",
          borderRadius: "50%",
          border: `1px solid ${color}22`,
          background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
          animation: `iconPulse ${duration * 0.9}s ease-in-out infinite`,
        }} />

        {/* Inner ring */}
        <div style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "50%",
          border: `1px solid ${color}20`,
        }} />

        {/* Main glowing circle */}
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          background: `radial-gradient(circle at 42% 38%, ${color}28 0%, rgba(3,10,6,0.80) 65%)`,
          border: `1px solid ${color}50`,
          boxShadow: `
            0 0 0 1px ${color}18,
            0 0 18px ${color}55,
            0 0 40px ${color}28,
            0 0 70px ${color}12,
            inset 0 1px 0 ${color}30
          `,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          willChange: "transform",
        }}>
          {children}
        </div>
      </motion.div>

      {/* Static stem — never moves */}
      {stemHeight > 0 && (
        <div style={{
          width: "1px",
          height: stemHeight,
          background: `linear-gradient(to bottom, ${color}95, transparent)`,
          boxShadow: `0 0 5px ${color}80, 0 0 10px ${color}40`,
          flexShrink: 0,
        }} />
      )}
    </div>
  );
}
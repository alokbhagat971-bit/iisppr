import React from 'react';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="relative min-h-[180vh] bg-bg-dark text-white-text flex flex-col font-sans">
      {/* Consolidated Reusable Navbar */}
      <Navbar />

      {/* Component Sandbox Container */}
      <main className="flex-grow pt-36 px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center justify-center text-cyan-accent text-lg font-bold mb-6">
          I
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          IISPPR Component Portal
        </h1>
        <p className="text-muted-text text-sm md:text-base max-w-md mb-24">
          Stand-alone workspace for reviewing the responsive header. Scroll down to test the scroll spy transitions, direction-based auto-hiding, and blurred glassmorphism.
        </p>

        {/* Scroll Spacers to test Scroll-Spy Highlights */}
        <div className="space-y-40 w-full mb-20 opacity-40">
          <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-accent to-transparent mx-auto" />
          
          <section id="research" className="scroll-mt-24">
            <span className="text-xs font-semibold text-cyan-accent uppercase tracking-widest block mb-1">Anchor Link Target</span>
            <h3 className="text-lg font-bold">#research Section</h3>
          </section>

          <section id="briefs" className="scroll-mt-24">
            <span className="text-xs font-semibold text-gold-accent uppercase tracking-widest block mb-1">Anchor Link Target</span>
            <h3 className="text-lg font-bold">#briefs Section</h3>
          </section>

          <section id="publications" className="scroll-mt-24">
            <span className="text-xs font-semibold text-cyan-accent uppercase tracking-widest block mb-1">Anchor Link Target</span>
            <h3 className="text-lg font-bold">#publications Section</h3>
          </section>

          <section id="about" className="scroll-mt-24">
            <span className="text-xs font-semibold text-gold-accent uppercase tracking-widest block mb-1">Anchor Link Target</span>
            <h3 className="text-lg font-bold">#about Section</h3>
          </section>
        </div>
      </main>
    </div>
  );
}

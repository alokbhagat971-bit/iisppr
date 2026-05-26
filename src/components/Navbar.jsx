import React, { useState, useEffect } from 'react';
import { X, Globe, Landmark, Search, FileText, Layers, Info } from 'lucide-react';

/**
 * Navbar - A premium, self-contained, responsive navigation bar component.
 * Features:
 *  - Scroll-triggered style shifting (transparency to blurred glassmorphism).
 *  - Scroll-direction-aware auto-hiding (slides out on scroll down, slide-in on scroll up).
 *  - Configurable custom links, brand names, and CTA buttons via React props.
 *  - Standard ARIA accessibility (keyboard Escape key handler and body scroll locking).
 */
export default function Navbar({
  logoText = "IISPPR",
  logoSubtext = "Policy Institute",
  links = [
    { name: 'Research', href: '#research' },
    { name: 'Policy Briefs', href: '#briefs' },
    { name: 'Publications', href: '#publications' },
    { name: 'Initiatives', href: '#initiatives' },
    { name: 'About Us', href: '#about' }
  ],
  ctaText = "Access Portal",
  onCtaClick = () => {
    const el = document.getElementById('portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Portal CTA clicked");
    }
  }
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // 1. Scroll event listener: transparency toggle & auto-hide based on direction
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check transparency toggle threshold
      setIsScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down, show immediately on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 250) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Scroll Spy: Highlights links based on the section currently visible in viewport
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;
      
      for (const link of links) {
        const targetId = link.href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(targetId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [links]);

  // 3. Mobile Menu A11y: Escape key closing & background scroll locking
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Smooth scroll click handler
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  // Maps Lucide React icons dynamically to mobile links for enhanced aesthetic UI
  const getMobileLinkIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'research': return <Search className="w-5 h-5 text-cyan-accent" />;
      case 'policy briefs': return <Landmark className="w-5 h-5 text-gold-accent" />;
      case 'publications': return <FileText className="w-5 h-5 text-cyan-accent" />;
      case 'initiatives': return <Layers className="w-5 h-5 text-gold-accent" />;
      case 'about us': return <Info className="w-5 h-5 text-cyan-accent" />;
      default: return <Globe className="w-5 h-5 text-cyan-accent" />;
    }
  };

  return (
    <>
      {/* Sticky Header Layout */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-bg-dark/85 backdrop-blur-md border-b border-border-dark py-3.5 shadow-[0_10px_30px_rgba(2,6,11,0.5)]' 
            : 'bg-transparent border-b border-transparent py-6'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-accent/30 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-accent to-gold-accent opacity-10 rounded-xl blur-[1px]" />
              <svg className="w-7.5 h-7.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#E3B323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#00D5E0" strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-white-text tracking-wider text-xl leading-none group-hover:text-cyan-accent transition-colors duration-300">
                {logoText}
              </span>
              {logoSubtext && (
                <span className="font-sans text-[0.68rem] tracking-[0.25em] font-semibold text-muted-text uppercase mt-0.5 select-none">
                  {logoSubtext}
                </span>
              )}
            </div>
          </a>

          {/* Center Links (Hidden on Mobile/Tablet) */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative font-sans text-[0.93rem] font-medium tracking-wide py-2 transition-colors duration-300 focus:outline-none ${
                        isActive ? 'text-cyan-accent' : 'text-muted-text hover:text-white-text'
                      }`}
                    >
                      {link.name}
                      <span 
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-accent to-gold-accent transition-all duration-300 ease-out ${
                          isActive ? 'w-full' : 'w-0 hover:w-full group-hover:w-full'
                        }`} 
                        style={{ transformOrigin: 'center' }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: CTA Button & Mobile Hamburger Menu */}
          <div className="flex items-center gap-4">
            {ctaText && (
              <button
                onClick={onCtaClick}
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest text-bg-dark bg-cyan-accent border border-cyan-accent hover:bg-transparent hover:text-cyan-accent hover:shadow-[0_0_20px_rgba(0,213,224,0.45)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300"
              >
                {ctaText}
              </button>
            )}

            {/* Mobile Hamburger menu toggle button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center rounded-full border border-border-dark bg-surface-dark/40 hover:bg-surface-dark/80 hover:border-cyan-accent/35 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-accent/50"
              aria-expanded={isMobileOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Custom CSS Hamburger Line Morphing to X */}
              <div className="w-5 h-3.5 flex flex-col justify-between">
                <span className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out transform ${isMobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out ${isMobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out transform ${isMobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Accessible Responsive Mobile Slide-out Drawer */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Semi-transparent backdrop blur */}
        <div 
          className="absolute inset-0 bg-bg-dark/85 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer slide-out panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-surface-dark border-l border-border-dark p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border-dark">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-accent to-gold-accent flex items-center justify-center font-bold text-bg-dark text-sm shadow-[0_0_15px_rgba(0,213,224,0.3)]">
                  {logoText ? logoText[0] : 'I'}
                </div>
                <span className="font-sans font-extrabold text-white-text tracking-wider text-lg">
                  {logoText}
                </span>
              </div>
              
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-muted-text hover:text-white-text transition-colors duration-250 hover:bg-border-dark rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-accent/50"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links inside drawer */}
            <nav className="mt-8 space-y-2">
              {links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      isActive 
                        ? 'bg-border-dark/30 border-cyan-accent/20 text-white-text shadow-[0_2px_10px_rgba(0,213,224,0.05)]' 
                        : 'border-transparent text-muted-text hover:text-white-text hover:bg-border-dark/20'
                    }`}
                  >
                    {getMobileLinkIcon(link.name)}
                    <span className="font-sans font-medium text-[1.05rem] tracking-wide">
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Drawer CTA Action */}
          {ctaText && (
            <div className="pt-6 border-t border-border-dark">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onCtaClick();
                }}
                className="w-full py-3.5 px-6 rounded-xl font-sans font-bold text-center tracking-wider text-bg-dark bg-gradient-to-r from-cyan-accent to-cyan-accent hover:from-cyan-accent hover:to-gold-accent flex items-center justify-center gap-2 hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,213,224,0.25)] hover:shadow-[0_4px_20px_rgba(227,179,35,0.25)] transition-all duration-300"
              >
                {ctaText}
              </button>
              <p className="text-center text-xs text-muted-text/50 mt-4 tracking-wider">
                &copy; {new Date().getFullYear()} {logoText} Research
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

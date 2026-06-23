import { useState, useEffect } from 'react';
import { X, FileText, Layers, Info, MessageSquare, HelpCircle } from 'lucide-react';
import logo from "../assets/logo.png";

/**
 * Navbar - Premium Responsive Navigation Component
 */

export default function Navbar({
  logoText = "IISPPR",
  logoSubtext = "Policy Institute",

  links = [
    { name: 'About', href: '#whyus' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ],

  ctaText = "Login",

  onCtaClick = () => {
    const el = document.getElementById('portal');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Login clicked");
    }
  }

}) {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /**
   * Active Section Highlight
   */
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

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };

  }, [links]);

  /**
   * Mobile Accessibility
   */
  useEffect(() => {

    if (!isMobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };

  }, [isMobileOpen]);

  /**
   * Smooth Scroll
   */
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

  /**
   * Mobile Icons
   */
  const getMobileLinkIcon = (name) => {

    switch (name.toLowerCase()) {

      case 'about':
        return <Info className="w-5 h-5 text-cyan-accent" />;

      case 'testimonials':
        return <MessageSquare className="w-5 h-5 text-cyan-accent" />;

      case 'curriculum':
        return <FileText className="w-5 h-5 text-cyan-accent" />;

      case 'faq':
        return <HelpCircle className="w-5 h-5 text-gold-accent" />;

      default:
        return <Layers className="w-5 h-5 text-cyan-accent" />;
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className="absolute left-0 right-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[92%] lg:max-w-6xl z-40 top-0 py-6 bg-transparent border-b border-transparent lg:top-8 lg:py-7 lg:bg-transparent lg:px-10"
      >

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-0 flex items-center justify-between relative">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-accent/30 rounded-lg p-1"
          >

            <img
              src={logo}
              alt="IISPPR Logo"
              className="h-10 w-auto object-contain"
            />

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

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">

            <ul className="flex items-center gap-8 list-none">

              {links.map((link) => {

                const isActive = activeSection === link.href.replace('#', '');

                return (
                  <li key={link.name}>

                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`group relative font-sans text-[0.93rem] font-medium tracking-wide py-2 transition-colors duration-300 focus:outline-none ${isActive
                        ? 'text-cyan-accent'
                        : 'text-muted-text hover:text-white-text'
                        }`}
                    >

                      {link.name}

                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-accent to-gold-accent transition-all duration-300 ease-out ${isActive
                          ? 'w-full'
                          : 'w-0 hover:w-full group-hover:w-full'
                          }`}
                        style={{ transformOrigin: 'center' }}
                      />

                    </a>

                  </li>
                );

              })}

            </ul>

          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* CTA */}
            {ctaText && (

             <button
               onClick={onCtaClick}
               style={{ paddingLeft: '1.7rem', paddingRight: '1.7rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
               className="hidden lg:inline-flex items-center justify-center rounded-full font-sans text-xs font-bold uppercase tracking-[0.2em] text-cyan-accent border-2 border-cyan-accent/35 bg-cyan-accent/10 hover:bg-cyan-accent hover:text-bg-dark hover:border-cyan-accent hover:shadow-[0_0_30px_rgba(0,213,224,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
             >
               {ctaText}
             </button>     
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center rounded-full border border-border-dark bg-surface-dark/40 hover:bg-surface-dark/80 hover:border-cyan-accent/35 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-accent/50"
              aria-expanded={isMobileOpen}
              aria-label="Toggle navigation menu"
            >

              <div className="w-5 h-3.5 flex flex-col justify-between">

                <span
                  className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out transform ${isMobileOpen
                    ? 'rotate-45 translate-y-[6px]'
                    : ''
                    }`}
                />

                <span
                  className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out ${isMobileOpen
                    ? 'opacity-0 scale-x-0'
                    : ''
                    }`}
                />

                <span
                  className={`block h-[2px] w-5 bg-white-text rounded-full transition-all duration-300 ease-in-out transform ${isMobileOpen
                    ? '-rotate-45 -translate-y-[6px]'
                    : ''
                    }`}
                />

              </div>

            </button>

          </div>

        </div>

      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${isMobileOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-bg-dark/85 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-surface-dark border-l border-border-dark p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${isMobileOpen
            ? 'translate-x-0'
            : 'translate-x-full'
            }`}
        >

          <div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border-dark">

              <div className="flex items-center gap-3">

                <img
                  src={logo}
                  alt="IISPPR Logo"
                  className="h-10 w-auto object-contain"
                />

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

            {/* Mobile Links */}
            <nav className="mt-8 space-y-2">

              {links.map((link) => {

                const isActive = activeSection === link.href.replace('#', '');

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 ${isActive
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

          {/* Mobile CTA */}
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
                &copy; {new Date().getFullYear()} {logoText}
              </p>

            </div>

          )}

        </div>

      </div>
    </>
  );
}
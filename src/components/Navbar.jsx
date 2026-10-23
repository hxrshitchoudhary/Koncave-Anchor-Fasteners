import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconPhone, IconMail, IconMenu, IconX, IconArrowRight } from './Icons.jsx';

const Navbar = ({ openInquiryModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu automatically on any route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `font-mono text-[0.85rem] font-bold uppercase tracking-[0.8px] transition-colors duration-200 py-2 relative ${
      isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `font-mono text-[1rem] font-bold uppercase tracking-[0.8px] transition-colors duration-200 py-3.5 px-2 border-b border-border-subtle flex items-center justify-between ${
      isActive ? 'text-accent bg-accent/5' : 'text-text-primary hover:text-accent'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-border-light shadow-xs w-full">
      
      {/* Top Utility Bar (28px mobile / 32px desktop) */}
      <div className="bg-steel-dark text-white h-[28px] md:h-[32px] px-4 sm:px-8 text-[0.68rem] sm:text-[0.74rem] font-mono border-b border-white/8 flex items-center">
        <div className="max-w-[1380px] w-full mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[#CBD5E1] truncate">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-dot shrink-0"></span>
              <span className="truncate">ISO 9001:2015 CERTIFIED</span>
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline text-[#94A3B8] truncate">
              APPROVED VENDOR: NBCC, CPWD, PWD, RLDA, DMRC
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${companyInfo.phones[0]}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-accent transition-colors"
            >
              <IconPhone size={12} className="text-accent shrink-0" />
              <span>{companyInfo.phones[0]}</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href={`mailto:${companyInfo.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-white hover:text-accent transition-colors"
            >
              <IconMail size={12} className="text-accent shrink-0" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (60px mobile / 68px desktop) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-[60px] md:h-[68px] flex items-center justify-between relative bg-white/95">
        
        {/* Brand Logo & Text */}
        <Link to="/" onClick={handleNavClick} className="no-underline flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <img
            src="/logo.svg"
            alt="Koncave"
            className="h-7 sm:h-9 w-auto object-contain shrink-0"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[1.3rem] sm:text-[1.65rem] font-black tracking-[0.5px] text-steel-dark uppercase leading-[1] group-hover:text-accent transition-colors truncate">
              KONCAVE
            </span>
            <span className="font-mono text-[0.56rem] sm:text-[0.66rem] font-bold tracking-[1.8px] sm:tracking-[2.2px] text-accent uppercase truncate mt-0.5">
              ANCHOR FASTENERS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <NavLink to="/" onClick={handleNavClick} className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" onClick={handleNavClick} className={navLinkClass}>Product Range</NavLink>
          <NavLink to="/applications" onClick={handleNavClick} className={navLinkClass}>Applications</NavLink>
          <NavLink to="/certifications" onClick={handleNavClick} className={navLinkClass}>Certifications</NavLink>
          <NavLink to="/about" onClick={handleNavClick} className={navLinkClass}>About Us</NavLink>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              handleNavClick();
              openInquiryModal();
            }}
            className="btn btn-primary !py-2.5 !px-5 !text-[0.82rem] group"
          >
            <span>Bulk Inquiry</span>
            <IconArrowRight size={15} className="transition-transform duration-250 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="lg:hidden p-2.5 -mr-1 text-steel-dark hover:text-accent cursor-pointer rounded-[4px] hover:bg-bg-pedestal focus:outline-none flex items-center justify-center"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Mobile Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <IconX size={26} /> : <IconMenu size={26} />}
        </button>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop to close menu when tapping outside */}
          <div
            className="lg:hidden fixed inset-0 top-[88px] md:top-[100px] bg-black/40 backdrop-blur-[1px] z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-accent shadow-2xl p-5 sm:p-6 animate-fade-in w-full z-50">
            <nav className="flex flex-col mb-5">
              <NavLink to="/" onClick={handleNavClick} className={mobileNavLinkClass}>
                <span>Home</span>
                <span className="text-accent font-bold">›</span>
              </NavLink>
              <NavLink to="/products" onClick={handleNavClick} className={mobileNavLinkClass}>
                <span>Product Range</span>
                <span className="text-accent font-bold">›</span>
              </NavLink>
              <NavLink to="/applications" onClick={handleNavClick} className={mobileNavLinkClass}>
                <span>Applications</span>
                <span className="text-accent font-bold">›</span>
              </NavLink>
              <NavLink to="/certifications" onClick={handleNavClick} className={mobileNavLinkClass}>
                <span>Certifications</span>
                <span className="text-accent font-bold">›</span>
              </NavLink>
              <NavLink to="/about" onClick={handleNavClick} className={mobileNavLinkClass}>
                <span>About Us</span>
                <span className="text-accent font-bold">›</span>
              </NavLink>
            </nav>
            <button
              type="button"
              onClick={() => {
                handleNavClick();
                openInquiryModal();
              }}
              className="btn btn-primary w-full justify-center py-3.5 text-[0.9rem]"
            >
              <span>Request Bulk Inquiry</span>
              <IconArrowRight size={16} />
            </button>
          </div>
        </>
      )}

    </header>
  );
};

export default Navbar;
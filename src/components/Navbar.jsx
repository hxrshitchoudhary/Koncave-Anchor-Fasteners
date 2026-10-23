import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconPhone, IconMail, IconMenu, IconX, IconArrowRight } from './Icons.jsx';

const Navbar = ({ openInquiryModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `font-mono text-[0.85rem] font-bold uppercase tracking-[0.8px] transition-colors duration-200 py-2 relative ${
      isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `font-mono text-[1.05rem] font-bold uppercase tracking-[0.8px] transition-colors duration-200 py-3.5 border-b border-border-subtle block ${
      isActive ? 'text-accent' : 'text-text-primary'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-border-light shadow-xs w-full overflow-hidden">
      
      {/* Top Utility Bar - Hidden on small mobile screens to prevent overflow, visible on sm+ */}
      <div className="bg-steel-dark text-white py-1.5 px-4 sm:px-8 text-[0.7rem] sm:text-[0.75rem] font-mono border-b border-white/8">
        <div className="max-w-[1380px] mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[#CBD5E1]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-dot shrink-0"></span>
              ISO 9001:2015 CERTIFIED
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${companyInfo.phones[0]}`} className="inline-flex items-center gap-1.5 text-white hover:text-accent transition-colors">
              <IconPhone size={12} className="text-accent shrink-0" />
              <span>{companyInfo.phones[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-[60px] md:h-[68px] flex items-center justify-between">
        
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
            <span className="font-display text-[1.25rem] sm:text-[1.6rem] font-black tracking-[0.5px] text-steel-dark uppercase leading-[1] group-hover:text-accent transition-colors truncate">
              KONCAVE
            </span>
            <span className="font-mono text-[0.58rem] sm:text-[0.66rem] font-bold tracking-[1.8px] text-accent uppercase truncate">
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
            onClick={openInquiryModal}
            className="btn btn-primary !py-2.5 !px-5 !text-[0.82rem] group"
          >
            <span>Bulk Inquiry</span>
            <IconArrowRight size={15} className="transition-transform duration-250 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-steel-dark hover:text-accent cursor-pointer rounded focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border-light shadow-2xl p-5 sm:p-6 animate-fade-in w-full">
          <nav className="flex flex-col mb-5">
            <NavLink to="/" onClick={handleNavClick} className={mobileNavLinkClass}>Home</NavLink>
            <NavLink to="/products" onClick={handleNavClick} className={mobileNavLinkClass}>Product Range</NavLink>
            <NavLink to="/applications" onClick={handleNavClick} className={mobileNavLinkClass}>Applications</NavLink>
            <NavLink to="/certifications" onClick={handleNavClick} className={mobileNavLinkClass}>Certifications</NavLink>
            <NavLink to="/about" onClick={handleNavClick} className={mobileNavLinkClass}>About Us</NavLink>
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openInquiryModal();
            }}
            className="btn btn-primary w-full justify-center py-3 text-[0.9rem]"
          >
            Request Bulk Inquiry
          </button>
        </div>
      )}

    </header>
  );
};

export default Navbar;
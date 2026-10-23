import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconAward, IconMapPin, IconPhone, IconMail, IconFileText } from './Icons.jsx';

const Footer = () => {
  const testReports = [
    { name: "Cocave Wedge Anchor.pdf", file: "/reports/Cocave%20Wedge%20Anchor.pdf" },
    { name: "8X100MM Anchor Test Report.pdf", file: "/reports/8X100MM%20Anchor%20Test%20Report.pdf" },
    { name: "10X100 Anchor Test Report.pdf", file: "/reports/10X100%20Anchor%20Test%20Report.pdf" },
    { name: "12X150 Anchor Test Report.pdf", file: "/reports/12X150%20Anchor%20Test%20Report.pdf" },
    { name: "16x220mm Anchor Test Report.pdf", file: "/reports/16x220mm%20Anchor%20Test%20Report.pdf" },
    { name: "Atmay - SS M10 -Pullout Test Certificate.pdf", file: "/reports/Atmay%20-%20SS%20M10%20-Pullout%20Test%20Certificate.pdf" },
    { name: "Atmay SS -Wedge Anchors -M10 X 100 - Tesile Test.pdf", file: "/reports/Atmay%20SS%20-Wedge%20Anchors%20-M10%20X%20100%20-%20Tesile%20Test.pdf" },
    { name: "Atmay SS M12 Wedge Anchor - Pull Out Test.pdf", file: "/reports/Atmay%20SS%20M12%20Wedge%20Anchor%20-%20Pull%20Out%20Test.pdf" },
    { name: "Atmay - SS wedge anchor M12 x 100 - Tensile Test - Koncave.pdf", file: "/reports/Atmay%20-%20SS%20wedge%20anchor%20M12%20x%20100%20-%20Tensile%20Test%20-%20Koncave.pdf" }
  ];

  const linkClass =
    "text-[#94A3B8] flex items-center gap-2 text-[0.85rem] leading-[1.4] hover:text-white transition-colors group";

  return (
    <footer className="bg-steel-dark text-white mt-16 border-t-[4px] border-accent blueprint-grid relative z-10 overflow-hidden">
      {/* Main Footer Grid */}
      <div className="container-custom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-12 pb-10 border-b border-white/10">
        
        {/* Col 1: Brand & Initiative */}
        <div className="flex flex-col items-start w-full">
          <Link to="/" className="no-underline flex items-center gap-3 mb-3">
            <img
              src="/images/logo.png"
              alt="Koncave"
              className="max-h-[34px] w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="font-display text-[1.6rem] font-black tracking-[0.5px] text-white uppercase leading-[0.95] m-0">
              {companyInfo.name}
            </span>
          </Link>
          <p className="text-[#94A3B8] text-[0.86rem] mb-4 leading-[1.6]">
            A dedicated participant in the "Make in India" initiative, forging high-performance structural anchoring and fastening solutions.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/40 px-2.5 py-1 rounded-[3px] font-mono text-[0.7rem] font-bold text-white">
              <IconAward size={13} className="text-accent shrink-0" /> {companyInfo.certifications}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-[3px] font-mono text-[0.7rem] font-semibold text-[#CBD5E1]">
              IS 1608, P1:2022
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col items-start w-full">
          <h3 className="font-display mb-3 text-[1.1rem] tracking-[1px] uppercase border-b-2 border-accent pb-1 w-full text-white">
            Navigation
          </h3>
          <ul className="list-none flex flex-col gap-2.5 w-full pl-0">
            <li>
              <Link to="/" className={linkClass}>
                <span className="text-accent font-bold">›</span> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                <span className="text-accent font-bold">›</span> About Us & Values
              </Link>
            </li>
            <li>
              <Link to="/products" className={linkClass}>
                <span className="text-accent font-bold">›</span> Full Technical Catalogue
              </Link>
            </li>
            <li>
              <Link to="/inquiry" className={linkClass}>
                <span className="text-accent font-bold">›</span> Request Custom Tender Quote
              </Link>
            </li>
            <li>
              <a href="/catalogue/catalogue.pdf" download className={linkClass}>
                <span className="text-accent font-bold">›</span> Download Master Dossier (PDF)
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Lab Test Reports */}
        <div className="flex flex-col items-start w-full">
          <h3 className="font-display mb-3 text-[1.1rem] tracking-[1px] uppercase border-b-2 border-accent pb-1 w-full text-white">
            Lab Test Reports (MTC)
          </h3>
          <ul className="list-none flex flex-col gap-2 w-full max-h-[190px] overflow-y-auto pr-1 pl-0">
            {testReports.map((report, idx) => (
              <li key={idx}>
                <a
                  href={report.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-[#94A3B8] flex items-center gap-2 text-[0.76rem] font-mono leading-[1.3] hover:text-white transition-colors py-0.5"
                >
                  <IconFileText size={12} className="text-accent shrink-0" />
                  <span className="truncate">{report.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Manufacturing Unit / Contact */}
        <div className="flex flex-col items-start w-full">
          <h3 className="font-display mb-3 text-[1.1rem] tracking-[1px] uppercase border-b-2 border-accent pb-1 w-full text-white">
            Manufacturing Unit
          </h3>
          <ul className="list-none flex flex-col gap-3 w-full pl-0">
            <li className="flex gap-2.5 text-[#94A3B8] text-[0.85rem] items-start leading-[1.45]">
              <IconMapPin size={17} className="text-accent shrink-0 mt-0.5" />
              <span>{companyInfo.address}</span>
            </li>
            <li className="flex gap-2.5 text-[#94A3B8] text-[0.85rem] items-start leading-[1.45]">
              <IconPhone size={16} className="text-accent shrink-0 mt-0.5" />
              <span className="font-mono text-white text-[0.8rem] break-all">{companyInfo.phones.join(' / ')}</span>
            </li>
            <li className="flex gap-2.5 text-[#94A3B8] text-[0.85rem] items-start leading-[1.45]">
              <IconMail size={16} className="text-accent shrink-0 mt-0.5" />
              <span className="font-mono text-white text-[0.8rem] break-all">{companyInfo.email}</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#05080C] py-4 text-center text-steel-light font-mono text-[0.72rem]">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
          <p className="m-0">&copy; 2026 {companyInfo.legalName}. All rights reserved.</p>
          <p className="m-0 text-[#64748B]">ISO 9001:2015 Certified // {companyInfo.website}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
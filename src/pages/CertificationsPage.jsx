import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconShield, IconAward, IconCheck, IconDownload, IconFileText, IconArrowRight } from '../components/Icons.jsx';

const CertificationsPage = () => {
  const certificates = [
    {
      id: "quality",
      title: "quality-cert.jpg",
      displayName: "ISO 9001:2015 — Quality Management System",
      category: "ISO 9001:2015 Standard",
      issuer: "Universal Certification Services",
      desc: "Certified quality management system covering manufacturing, precision threading, and structural fastener production.",
      image: "/Certificates/quality-cert.jpg"
    },
    {
      id: "health",
      title: "health-cert.jpg",
      displayName: "ISO 45001:2018 — Occupational Health & Safety",
      category: "ISO 45001:2018 Standard",
      issuer: "Universal Certification Services",
      desc: "Comprehensive safety compliance ensuring secure manufacturing practices across our Rohtak plant floor.",
      image: "/Certificates/health-cert.jpg"
    },
    {
      id: "environmental",
      title: "environmental-cert.jpg",
      displayName: "ISO 14001:2015 — Environmental Management",
      category: "ISO 14001:2015 Standard",
      issuer: "Universal Certification Services",
      desc: "Certified eco-friendly manufacturing processes, waste reduction, and sustainable industrial operations.",
      image: "/Certificates/environmental-cert.jpg"
    }
  ];

  return (
    <div className="pt-navbar animate-fade-in bg-bg-main pb-24">
      
      {/* Clean, Elegant Header Banner */}
      <section className="bg-steel-dark text-white py-12 md:py-16 border-b-4 border-accent blueprint-grid relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-[840px] text-center mx-auto">
          <span className="section-pre-title text-accent !justify-center mb-2">
            <span></span> STATUTORY COMPLIANCE & QUALITY <span></span>
          </span>
          <h1 className="text-[2.4rem] sm:text-[3.4rem] uppercase leading-[1.05] mb-4 text-white">
            Official Quality <br />
            <span className="bg-gradient-to-r from-[#FF3B42] to-[#D9232A] bg-clip-text text-transparent">
              Certifications.
            </span>
          </h1>
          <p className="text-[#94A3B8] text-[1rem] md:text-[1.08rem] leading-[1.6] max-w-[660px] mx-auto m-0">
            {companyInfo.legalName} maintains uncompromising manufacturing standards. Review our verified ISO management certificates below for technical tenders and quality verification.
          </p>
        </div>
      </section>

      {/* Certificate Grid Section */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-[1280px] mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-border-light border-t-4 border-t-steel-dark rounded-[6px] shadow-sm flex flex-col justify-between overflow-hidden hover:border-t-accent hover:shadow-xl transition-all group h-full"
            >
              {/* Portrait Certificate Display Container */}
              <div className="w-full aspect-[1/1.35] bg-[#0B101B] relative overflow-hidden border-b border-border-light flex items-center justify-center p-3">
                <img
                  src={cert.image}
                  alt={cert.displayName}
                  className="w-full h-full object-contain bg-white rounded-[2px] shadow-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute top-4 left-4 bg-steel-dark/95 text-white font-mono text-[0.65rem] px-2.5 py-1 rounded-[2px] uppercase font-bold tracking-[1px] shadow-sm border border-white/15">
                  VERIFIED ISO
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="font-mono text-[0.72rem] text-accent font-bold uppercase tracking-[1.2px] block mb-1.5">
                    {cert.category}
                  </span>
                  <h3 className="font-display text-[1.25rem] text-steel-dark uppercase mb-2.5 leading-[1.3]">
                    {cert.displayName}
                  </h3>
                  <p className="text-text-secondary text-[0.9rem] leading-[1.6] mb-6">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-border-subtle flex items-center justify-end gap-3 mt-auto">
                  <a
                    href={cert.image}
                    download
                    className="btn btn-sm btn-primary w-full justify-center"
                  >
                    <IconDownload size={15} /> Download Official Document
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Industrial Callout */}
      <section className="container-custom mt-6">
        <div className="bg-steel-dark text-white p-10 md:p-14 rounded-[4px] border-t-4 border-accent blueprint-grid text-center flex flex-col items-center">
          <span className="section-pre-title text-accent"><span></span> DIRECT FACTORY DISPATCH <span></span></span>
          <h2 className="text-white text-[2rem] md:text-[2.6rem] uppercase mb-4 max-w-[700px]">
            Require Specific Test Reports for Your Project?
          </h2>
          <p className="text-[#94A3B8] text-[1.05rem] max-w-[640px] mb-8">
            Our engineering team supplies complete material test dossiers, NABL certificates, and chemical composition breakdowns for all structural tenders.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/inquiry" className="btn btn-primary">
              Request Engineering Submittal
            </Link>
            <a href="/catalogue/catalogue.pdf" download className="btn btn-outline-white">
              <IconDownload size={18} /> Download Master Catalogue
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CertificationsPage;
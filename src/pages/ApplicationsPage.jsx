import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconZoomIn, IconX, IconDownload } from '../components/Icons.jsx';

const ApplicationsPage = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  const industries = [
    {
      title: "Solar",
      subtitle: "Renewable Energy & PV Mounting",
      desc: "High-tensile wedge anchors and corrosion-resistant fasteners engineered for rooftop and ground-mounted solar PV structures.",
      image: "/Applications/Solar.jpg"
    },
    {
      title: "Lift",
      subtitle: "Vertical Transportation Systems",
      desc: "Precision heavy-duty anchors and vibration-resistant fixings designed for elevator guide rails and hoistway steel frameworks.",
      image: "/Applications/Lift.jpg"
    },
    {
      title: "Delhi Wholesale Market",
      subtitle: "Commercial Racking & Warehousing",
      desc: "Heavy load-bearing floor anchors built for multi-tier industrial storage racks and wholesale distribution godowns.",
      image: "/Applications/Delhi.png"
    },
    {
      title: "Chemical Plants",
      subtitle: "Process Industry & Piping",
      desc: "Stainless Steel A2 (304) and A4 (316) chemical-resistant anchors engineered to withstand corrosive industrial environments.",
      image: "/Applications/Plants.jpg"
    },
    {
      title: "Railways",
      subtitle: "Transit Infrastructure & Viaducts",
      desc: "Approved anchor systems supplied for metro rail viaducts, railway electrification brackets, and station platform revamping.",
      image: "/Applications/Railway.png"
    },
    {
      title: "Furniture and Interior Fixings",
      subtitle: "Architectural & Commercial Fit-outs",
      desc: "Specialized nylon frame anchors and counter-sunk screws for modular office interiors and heavy partition wall mounting.",
      image: "/Applications/Furniture.jpg"
    },
    {
      title: "Machinery",
      subtitle: "Heavy Engineering & Factory Floors",
      desc: "Vibration-proof dynamic load anchors and threaded studs engineered to anchor high-tonnage CNC machines and presses safely.",
      image: "/Applications/Industry.jpg"
    }
  ];

  return (
    <div className="pt-navbar bg-bg-main pb-24">
      
      {/* Attractive Industrial Header Banner */}
      <section className="bg-steel-dark text-white py-16 md:py-20 border-b-4 border-accent blueprint-grid relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-[840px] text-center mx-auto">
          <span className="section-pre-title text-accent !justify-center mb-2">
            <span></span> SECTOR CAPABILITIES & FIELD DEPLOYMENT <span></span>
          </span>
          <h1 className="text-[2.6rem] sm:text-[3.6rem] uppercase leading-[1.05] mb-4 text-white">
            Industries <br />
            <span className="bg-gradient-to-r from-[#FF3B42] to-[#D9232A] bg-clip-text text-transparent">
              We Serve.
            </span>
          </h1>
          <p className="text-[#94A3B8] text-[1.05rem] md:text-[1.12rem] leading-[1.6] max-w-[700px] mx-auto m-0">
            We continue to serve fabricators, OEMs, EPC contractors, and infrastructure developers with the quality they trust.
          </p>
        </div>
      </section>

      {/* Grid Section with Centered Layout for Wrapped Items */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[1280px] mx-auto">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`bg-white border border-border-light border-t-4 border-t-steel-dark rounded-[6px] shadow-sm flex flex-col justify-between overflow-hidden hover:border-t-accent hover:shadow-xl transition-all group h-full w-full ${
                i === industries.length - 1 && industries.length % 3 === 1 ? 'lg:col-span-3 lg:max-w-[410px]' : ''
              }`}
            >
              {/* Image Preview Container with Zoom Trigger */}
              <div
                onClick={() => setLightboxImage(ind.image)}
                className="h-[280px] bg-slate-100 relative overflow-hidden cursor-pointer border-b border-border-light flex items-center justify-center group"
              >
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute top-3 left-3 bg-steel-dark/90 text-white font-mono text-[0.65rem] px-2.5 py-1 rounded-[2px] uppercase font-bold tracking-[1px] shadow-xs">
                  {ind.subtitle}
                </div>
                <div className="absolute inset-0 bg-steel-dark/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="bg-steel-dark text-white font-mono text-[0.78rem] font-bold px-4 py-2.5 rounded-[3px] border border-white/20 inline-flex items-center gap-2 shadow-xl">
                    <IconZoomIn size={16} className="text-accent" /> Click to Inspect Sector
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="font-display text-[1.35rem] text-steel-dark uppercase mb-2 tracking-[0.5px]">
                    {ind.title}
                  </h3>
                  <p className="text-text-secondary text-[0.92rem] leading-[1.6] mb-6">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-border-subtle flex items-center justify-between font-mono text-[0.72rem] text-accent font-bold mt-auto">
                  <span>IS 1608 COMPLIANT</span>
                  <button
                    type="button"
                    onClick={() => setLightboxImage(ind.image)}
                    className="inline-flex items-center gap-1 text-steel-dark hover:text-accent cursor-pointer"
                  >
                    ZOOM IMAGE <IconZoomIn size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Callout Banner */}
      <section className="container-custom mt-6">
        <div className="bg-steel-dark text-white p-10 md:p-14 rounded-[4px] border-t-4 border-accent blueprint-grid text-center flex flex-col items-center">
          <span className="section-pre-title text-accent"><span></span> DIRECT FACTORY DISPATCH <span></span></span>
          <h2 className="text-white text-[2rem] md:text-[2.6rem] uppercase mb-4 max-w-[700px]">
            Require Fasteners For Your Industry Sector?
          </h2>
          <p className="text-[#94A3B8] text-[1.05rem] max-w-[640px] mb-8">
            Get factory-direct pricing, material test certificates (MTC), and rapid dispatch from our Rohtak manufacturing unit.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/inquiry" className="btn btn-primary">
              Open Engineering RFQ Form
            </Link>
            <Link to="/products" className="btn btn-outline-white">
              Explore Technical Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Full-Screen Zoom Lightbox Modal via Portal */}
      {lightboxImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[100000] bg-[#05080E]/92 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="w-full max-w-[1000px] h-[90vh] bg-steel-dark border border-white/18 border-t-4 border-t-accent rounded-[4px] shadow-2xl flex flex-col overflow-hidden text-white blueprint-grid"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center py-3.5 px-6 bg-[#06090F] border-b border-white/12 shrink-0">
                <div>
                  <span className="font-mono text-[0.66rem] font-bold text-accent tracking-[1.2px] block">
                    SECTOR APPLICATION VIEWER
                  </span>
                  <h3 className="text-white text-[1.2rem] uppercase m-0 leading-tight">
                    High-Resolution Field Inspection
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={lightboxImage}
                    download
                    className="btn btn-sm btn-primary"
                  >
                    <IconDownload size={15} /> Download Image
                  </a>
                  <button
                    type="button"
                    className="bg-accent/20 border border-accent/50 text-white w-[36px] h-[36px] rounded-[3px] inline-flex items-center justify-center cursor-pointer hover:bg-accent transition-all"
                    onClick={() => setLightboxImage(null)}
                    aria-label="Close Lightbox"
                  >
                    <IconX size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-[radial-gradient(circle_at_center,#141D2D_0%,#090D14_100%)] p-6 flex items-center justify-center overflow-auto">
                <img
                  src={lightboxImage}
                  alt="Application Zoom"
                  className="max-w-full max-h-[74vh] object-contain rounded-[3px] shadow-2xl bg-black/40"
                />
              </div>

              <div className="py-3 px-6 bg-[#06090F] border-t border-white/12 text-center shrink-0">
                <p className="font-mono text-[0.78rem] text-[#94A3B8] m-0">
                  {companyInfo.legalName} — Industrial Sector Application Gallery
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

    </div>
  );
};

export default ApplicationsPage;
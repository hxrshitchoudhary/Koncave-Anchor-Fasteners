import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aboutUsData, products } from '../data.js';
import {
  IconAward,
  IconArrowRight,
  IconDownload,
  IconShield,
  IconFactory,
  IconCheck
} from '../components/Icons.jsx';

const HomePage = ({ openQuoteModal, openInquiryModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      url: "/images/app-wedge.jpg",
      caption: "HEAVY-DUTY STRUCTURAL STEEL ANCHORING",
      shortTitle: "Structural Ste.",
      sector: "BRIDGES & HIGH-RISE CORES",
      peakLoad: "72,084 KG",
      recommended: "Wedge Anchor Series (SS 304 / A2)"
    },
    {
      url: "/images/app-nylon-csk.jpg",
      caption: "VENTILATED FACADES & ARCHITECTURAL CLADDING",
      shortTitle: "Facade Systems",
      sector: "CURTAIN WALLS & GLAZING",
      peakLoad: "18.4 kN",
      recommended: "Nylon Frame & CSK Anchors"
    },
    {
      url: "/images/app-nylon-hex.jpg",
      caption: "METRO, RAILWAY & INFRASTRUCTURE TUNNELING",
      shortTitle: "Metro & Tunnels",
      sector: "DMRC / RLDA VIADUCTS",
      peakLoad: "84.48 kN",
      recommended: "Heavy-Duty Throughbolt M16"
    },
    {
      url: "/images/app-drop-in.jpg",
      caption: "INDUSTRIAL MACHINERY & HVAC SUSPENSION",
      shortTitle: "MEP & HVAC",
      peakLoad: "42.8 kN",
      recommended: "Flush Drop-In Anchor Series"
    }
  ];

  const tickerItems = [
    "IS 1608, P1:2022 TENSILE & PULL-OUT TESTED",
    "STAINLESS STEEL A2 (304) & A4 (316)",
    "ALKALINE ZINC PLATED (EUROPEAN STANDARD)",
    "NBCC / CPWD / PWD / RLDA / DMRC APPROVED",
    "ISO 9001:2015 CERTIFIED MUNDKA FACILITY",
    "HIGH-LOAD WEDGE, NYLON & DROP-IN ANCHORS"
  ];

  const whyChooseUs = [
    {
      icon: <IconShield size={28} className="text-accent" />,
      title: "NABL Lab Tested & Certified",
      desc: "Every batch undergoes rigorous tensile, shear, and pull-out load testing compliant with IS 1608:2022 standards."
    },
    {
      icon: <IconFactory size={28} className="text-accent" />,
      title: "Direct Mill Test Certificates (MTC)",
      desc: "Complete chemical composition breakdowns and material test reports supplied with every bulk tender dispatch."
    },
    {
      icon: <IconAward size={28} className="text-accent" />,
      title: "Govt & PSU Approved Vendor",
      desc: "Trusted and officially registered supplier for premier national infrastructure bodies including NBCC, CPWD, PWD, RLDA, and DMRC."
    },
    {
      icon: <IconCheck size={28} className="text-accent" />,
      title: "Zero-Slippage Threading",
      desc: "Precision CNC cold-formed threading engineered to maintain unyielding grip under intense dynamic vibration and seismic loads."
    }
  ];

  const performanceMetrics = [
    { label: "Tensile Load Capacity", value: "Up to 84.48 kN", desc: "Tested under extreme static and dynamic pull loads for high-rise anchoring." },
    { label: "Corrosion Resistance", value: "1,000+ Hrs Salt Spray", desc: "Coated with heavy-duty alkaline zinc and grade-verified stainless steel." },
    { label: "Seismic Compliance", value: "Zone IV & V Rated", desc: "Engineered to absorb structural shifts and seismic shock waves securely." },
    { label: "Dimensional Tolerance", value: "±0.02 mm Precision", desc: "Manufactured using multi-axis CNC cold heading and threading machinery." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* MOBILE-OPTIMIZED HERO SECTION */}
      <div className="mt-[56px] md:mt-[64px] min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex flex-col justify-between bg-[#04060A] relative overflow-hidden">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu animate-black-to-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-95 will-change-transform"
          >
            <source src="/hero-section/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04060A]/95 via-[#04060A]/85 to-[#04060A]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-transparent to-[#04060A]/60"></div>
          <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        </div>

        {/* Hero Content Stage */}
        <section className="relative z-10 py-10 lg:py-4 flex-1 flex flex-col justify-center text-white">
          <div className="container-custom">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
              
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in-up">
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 bg-accent/25 border border-accent/50 px-3 py-1 rounded-full text-white font-mono text-[0.65rem] sm:text-[0.68rem] font-bold tracking-[1px] shadow-sm">
                    <IconAward size={13} className="text-accent shrink-0" />
                    <span>MAKE IN INDIA // ISO 9001:2015</span>
                  </div>
                </div>

                <h1 className="font-display font-black uppercase tracking-[0.02em] leading-[0.92] text-[2.2rem] sm:text-[3.2rem] xl:text-[3.8rem] text-white mb-4">
                  <span className="text-transparent-outline block">PRECISION FORGED</span>
                  <span className="block mt-0.5">STRUCTURAL</span>
                  <span className="bg-gradient-to-r from-[#FF3B42] via-[#D9232A] to-[#FF6B70] bg-clip-text text-transparent block mt-0.5">
                    ANCHOR SYSTEMS.
                  </span>
                </h1>

                <p className="text-white/90 text-[0.9rem] sm:text-[1.05rem] leading-[1.6] max-w-[600px] mb-6 border-l-2 border-accent pl-3.5 bg-black/40 p-3 rounded-r-[4px]">
                  {aboutUsData.hero.subtitle} Engineered in Stainless Steel A2 (304), A4 (316), and Zinc-Plated Carbon Steel for zero-slippage critical infrastructure loads.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full mb-4">
                  <button
                    type="button"
                    onClick={openInquiryModal}
                    className="btn btn-primary !px-4 sm:!px-5 !py-2.5 sm:!py-3 !text-[0.8rem] sm:!text-[0.85rem] group shadow-md"
                  >
                    <span>Request Tender Quote</span>
                    <IconArrowRight size={15} className="transition-transform duration-250 group-hover:translate-x-1" />
                  </button>
                  <Link
                    to="/products"
                    className="btn btn-outline-white !px-4 sm:!px-5 !py-2.5 sm:!py-3 !text-[0.8rem] sm:!text-[0.85rem] group bg-white/10"
                  >
                    <span>Technical Catalogue</span>
                    <IconArrowRight size={15} className="transition-transform duration-250 group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Interactive Live Field Preview Card */}
              <div className="lg:col-span-5 relative animate-fade-in w-full">
                <div className="relative rounded-[6px] bg-gradient-to-b from-white/20 to-white/5 p-[1px] shadow-2xl">
                  <div className="relative bg-[#06090F] rounded-[5px] overflow-hidden border border-white/20">
                    
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/70 border-b border-white/15 font-mono text-[0.62rem] sm:text-[0.65rem]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot"></span>
                        <span className="text-white font-bold tracking-[1px]">LIVE FIELD DEPLOYMENT</span>
                      </div>
                      <span className="text-accent font-bold">{heroSlides[currentSlide].sector}</span>
                    </div>

                    <div className="relative h-[220px] sm:h-[270px] w-full overflow-hidden bg-black">
                      {heroSlides.map((slide, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                          }`}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center contrast-110 brightness-90"
                            style={{ backgroundImage: `url('${slide.url}')` }}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
                        </div>
                      ))}

                      <div className="absolute top-2.5 right-2.5 z-20 bg-black/80 border border-white/20 border-r-2 border-r-accent px-2.5 py-1 rounded-[3px] text-right font-mono shadow-md">
                        <span className="block text-[0.5rem] text-[#94A3B8] uppercase tracking-[1px]">VERIFIED HOLD</span>
                        <strong className="text-[0.85rem] sm:text-[0.95rem] text-white font-bold">{heroSlides[currentSlide].peakLoad}</strong>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 bg-black/90 border border-white/20 border-l-4 border-l-accent p-2.5 sm:p-3 rounded-[4px] shadow-lg">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold text-accent uppercase tracking-[1px]">
                            APPLICATION 0{currentSlide + 1}
                          </span>
                          <span className="font-mono text-[0.55rem] text-[#22C55E] bg-[#22C55E]/20 px-1 py-0.5 rounded font-bold">
                            IS 1608
                          </span>
                        </div>
                        <h3 className="font-display text-[0.95rem] sm:text-[1.05rem] text-white uppercase tracking-[0.5px] mb-0.5 truncate">
                          {heroSlides[currentSlide].caption}
                        </h3>
                        <div className="flex items-center justify-between text-[0.62rem] sm:text-[0.68rem] font-mono text-[#CBD5E1] pt-1 border-t border-white/15">
                          <span className="truncate">SPEC: {heroSlides[currentSlide].recommended}</span>
                          <Link
                            to="/products"
                            className="text-white hover:text-accent font-bold inline-flex items-center gap-1 shrink-0 ml-2"
                          >
                            VIEW <IconArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 bg-black/85 border-t border-white/15">
                      {heroSlides.map((slide, idx) => {
                        const active = idx === currentSlide;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            className={`relative py-2 px-2 text-left font-mono transition-colors cursor-pointer border-r border-b sm:border-b-0 border-white/15 last:border-r-0 ${
                              active ? 'bg-white/15 text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span className={`absolute top-0 left-0 right-0 h-[2px] ${active ? 'bg-accent' : 'bg-transparent'}`}></span>
                            <span className={`block text-[0.58rem] font-bold ${active ? 'text-accent' : 'text-[#94A3B8]'}`}>0{idx + 1}</span>
                            <span className="block text-[0.64rem] font-bold truncate">{slide.shortTitle}</span>
                          </button>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Spec Ticker */}
        <div className="relative z-10 bg-black/80 border-t border-white/20 border-b-[3px] border-b-accent overflow-hidden py-2 shrink-0">
          <div className="flex w-max animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 px-6 font-mono text-[0.65rem] sm:text-[0.7rem] font-bold text-white uppercase tracking-[1.4px] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-accent rotate-45 inline-block"></span>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Core Product Series Quick-Select Strip */}
      <section className="py-14 sm:py-16 bg-bg-card border-b border-border-light blueprint-grid-light">
        <div className="container-custom">
          <div className="flex justify-between items-end gap-6 mb-8 flex-wrap">
            <div>
              <div className="section-pre-title !justify-start !mb-1.5">
                <span></span> CORE PRODUCT SERIES
              </div>
              <h2 className="text-[1.8rem] sm:text-[2.5rem] uppercase mb-0">
                Engineered <span className="text-accent">Fastening Systems</span>
              </h2>
            </div>
            <Link to="/products" className="btn btn-sm btn-outline-dark group">
              Full Catalogue <IconArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {products.map((product, index) => {
              const totalVariants = product.sections
                ?.filter((s) => s.type === 'variant')
                .reduce((acc, curr) => acc + (curr.rows?.length || 0), 0);

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white border border-border-light border-t-[3px] border-t-steel-dark rounded-[3px] flex flex-col overflow-hidden transition-all duration-250 hover:border-t-accent hover:border-steel-dark hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-[150px] sm:h-[155px] bg-bg-pedestal relative overflow-hidden border-b border-border-light">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    ></div>
                    <span className="absolute top-2.5 left-2.5 bg-steel-dark/90 text-white font-mono text-[0.62rem] font-bold px-2 py-0.5 rounded-[2px] tracking-[1px]">
                      0{index + 1} // {product.category}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-white/95 text-steel-dark border border-border-light font-mono text-[0.62rem] font-bold px-2 py-0.5 rounded-[2px]">
                      {totalVariants || 4}+ Sizes
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-[1.2rem] sm:text-[1.3rem] uppercase mb-2 text-steel-dark group-hover:text-accent transition-colors">
                        {product.name.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.materials.map((mat, i) => (
                          <span
                            key={i}
                            className="bg-bg-pedestal border border-border-subtle text-text-secondary font-mono text-[0.62rem] font-semibold px-2 py-0.5 rounded-[2px]"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-dashed border-border-light flex items-center justify-between font-mono text-[0.7rem] font-bold text-steel-dark group-hover:text-accent">
                      <span>VIEW DATA TABLES</span>
                      <IconArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Infrastructure Leaders Choose Koncave */}
      <section className="py-16 sm:py-20 bg-white border-b border-border-light">
        <div className="container-custom">
          <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-14">
            <div className="section-pre-title"><span></span> QUALITY ASSURANCE & ADVANTAGE <span></span></div>
            <h2 className="text-[2rem] sm:text-[3rem] uppercase mb-3">Why Infrastructure Leaders Choose Koncave</h2>
            <p className="text-text-secondary text-[0.98rem] sm:text-[1.02rem] m-0">
              Engineered to meet the stringent mechanical performance criteria demanded by leading civil contractors and EPC consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-border-light border-t-4 border-t-steel-dark p-6 sm:p-8 rounded-[4px] shadow-sm hover:border-t-accent hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 sm:mb-5 bg-steel-dark/5 p-2.5 sm:p-3 rounded-[3px] inline-flex">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-[1.15rem] sm:text-[1.25rem] text-steel-dark uppercase mb-2.5 tracking-[0.5px]">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-[0.88rem] sm:text-[0.92rem] leading-[1.6] m-0">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-5 sm:mt-6 border-t border-dashed border-border-subtle font-mono text-[0.68rem] text-accent font-bold">
                  // VERIFIED METRIC
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structural Performance & Load Ratings Summary */}
      <section className="py-16 sm:py-20 bg-steel-dark text-white border-b border-white/10 blueprint-grid relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-between items-end gap-6 mb-10 sm:mb-12 flex-wrap">
            <div>
              <div className="section-pre-title text-accent !justify-start !mb-1.5">
                <span></span> MECHANICAL BENCHMARKS <span></span>
              </div>
              <h2 className="text-[2rem] sm:text-[3rem] uppercase mb-0 text-white">
                Structural Performance & <span className="text-accent">Load Ratings</span>
              </h2>
            </div>
            <Link to="/products" className="btn btn-sm btn-outline-white group">
              Explore Full Data <IconArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#0B101B] border border-white/15 border-t-4 border-t-accent p-6 sm:p-8 rounded-[4px] shadow-xl flex flex-col justify-between hover:border-white/30 transition-all"
              >
                <div>
                  <span className="font-mono text-[0.65rem] font-bold text-accent tracking-[1.2px] uppercase block mb-2">
                    // METRIC {idx + 1}
                  </span>
                  <h3 className="font-display text-[1.8rem] sm:text-[2rem] font-black text-white uppercase mb-2 tracking-[0.5px]">
                    {metric.value}
                  </h3>
                  <h4 className="font-sans font-bold text-[1rem] sm:text-[1.05rem] text-white mb-2">
                    {metric.label}
                  </h4>
                  <p className="text-[#94A3B8] text-[0.86rem] sm:text-[0.9rem] leading-[1.6] m-0">
                    {metric.desc}
                  </p>
                </div>
                <div className="pt-4 mt-5 sm:mt-6 border-t border-white/10 font-mono text-[0.62rem] text-[#64748B]">
                  TESTED TO IS 1608 CRITERIA
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial CTA Banner */}
      <section className="bg-gradient-to-br from-steel-dark to-[#151F30] border-t-4 border-t-accent border-b border-white/10 py-14 sm:py-18 text-white blueprint-grid">
        <div className="container-custom flex items-center justify-between gap-8 sm:gap-12 flex-wrap">
          <div className="max-w-[680px]">
            <span className="section-pre-title !justify-start"><span></span> DIRECT FACTORY DISPATCH</span>
            <h2 className="text-white text-[1.8rem] sm:text-[2.8rem] uppercase mb-2">
              Need Bulk Fasteners For Your Next Tender?
            </h2>
            <p className="text-[#94A3B8] text-[0.95rem] sm:text-[1.05rem] m-0">
              Get factory-direct pricing, material test certificates (MTC), and rapid dispatch from our Rohtak manufacturing unit.
            </p>
          </div>
          <button type="button" onClick={openInquiryModal} className="btn btn-primary btn-large group w-full sm:w-auto justify-center">
            Open Engineering RFQ Form <IconArrowRight size={18} className="transition-transform duration-250 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
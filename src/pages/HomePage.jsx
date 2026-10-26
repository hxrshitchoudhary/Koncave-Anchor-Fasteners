import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data.js';
import SEO from '../components/SEO.jsx';
import {
  IconAward,
  IconArrowRight,
  IconDownload,
  IconShield,
  IconFactory,
  IconCheck
} from '../components/Icons.jsx';

const quickDockSeries = [
  {
    code: "SERIES // 01",
    name: "Heavy-Duty Wedge Anchors",
    grade: "SS 304 (A2) / SS 316 (A4)",
    peakLoad: "72,084 KG",
    sizes: "M6 – M24",
    application: "Bridges, Metro Viaducts & Structural Steel Columns"
  },
  {
    code: "SERIES // 02",
    name: "Flush Drop-In Anchors",
    grade: "Zinc Plated / Stainless Steel",
    peakLoad: "42,800 KG",
    sizes: "M6 – M20",
    application: "HVAC Suspension, Fire Sprinklers & Cable Trays"
  },
  {
    code: "SERIES // 03",
    name: "Nylon Frame & CSK Anchors",
    grade: "Virgin PA6 + High-Tensile Screw",
    peakLoad: "18,400 KG",
    sizes: "8mm – 10mm",
    application: "Ventilated Facades, Curtain Walls & Cladding"
  },
  {
    code: "SERIES // 04",
    name: "High-Load Throughbolts",
    grade: "Carbon Steel Grade 8.8 / 10.9",
    peakLoad: "84,480 KG",
    sizes: "M8 – M24",
    application: "Seismic Zone IV/V Foundations & Heavy Machinery"
  }
];

const tickerItems = [
  "IS 1608, P1:2022 TENSILE & PULL-OUT TESTED",
  "STAINLESS STEEL A2 (304) & A4 (316)",
  "ALKALINE ZINC PLATED (EUROPEAN STANDARD)",
  "100% BATCH QUALITY & LOAD VERIFIED",
  "ISO 9001:2015 CERTIFIED ROHTAK FACILITY",
  "HIGH-LOAD WEDGE, NYLON & DROP-IN ANCHORS"
];

const performanceMetrics = [
  { label: "Tensile Load Capacity", value: "Up to 84.48 kN", desc: "Tested under extreme static and dynamic pull loads for high-rise anchoring." },
  { label: "Corrosion Resistance", value: "1,000+ Hrs Salt Spray", desc: "Coated with heavy-duty alkaline zinc and grade-verified stainless steel." },
  { label: "Seismic Compliance", value: "Zone IV & V Rated", desc: "Engineered to absorb structural shifts and seismic shock waves securely." },
  { label: "Dimensional Tolerance", value: "±0.02 mm Precision", desc: "Manufactured using multi-axis CNC cold heading and threading machinery." }
];

const isMobileOrTablet = () => {
  if (typeof window === 'undefined') return false;
  const isSmallOrTabletScreen = window.matchMedia('(max-width: 1024px)').matches;
  const isIPadOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return isSmallOrTabletScreen || isIPadOS;
};

const HomePage = ({ openQuoteModal, openInquiryModal }) => {
  const [activeAnchorIdx, setActiveAnchorIdx] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setInitialStartTime = () => {
      if (isMobileOrTablet() && video.currentTime < 6) {
        video.currentTime = 6;
      }
    };

    if (video.readyState >= 1) {
      setInitialStartTime();
    } else {
      video.addEventListener('loadedmetadata', setInitialStartTime);
    }

    return () => {
      video.removeEventListener('loadedmetadata', setInitialStartTime);
    };
  }, []);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = isMobileOrTablet() ? 6 : 0;
    video.play().catch(() => {});
  };

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
      title: "ISO 9001:2015 Certified Plant",
      desc: "In-house cold forging, precision thread rolling, and alkaline zinc plating lines at our Rohtak manufacturing facility."
    },
    {
      icon: <IconCheck size={28} className="text-accent" />,
      title: "Zero-Slippage Threading",
      desc: "Precision CNC cold-formed threading engineered to maintain unyielding grip under intense dynamic vibration and seismic loads."
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Manufacturer",
    "name": "Koncave Anchor & Fasteners Pvt. Ltd.",
    "legalName": "Koncave Anchor & Fasteners Pvt. Ltd.",
    "url": "https://koncave.co.in/",
    "logo": "https://koncave.co.in/logo.svg",
    "description": "Manufacturer of cold-forged wedge anchors, drop-in anchors, and structural fastening solutions compliant with IS 1608:2022 standards.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Manufacturing Unit, Industrial Area",
      "addressLocality": "Rohtak",
      "addressRegion": "Haryana",
      "postalCode": "124001",
      "addressCountry": "IN"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Structural Anchors Portfolio",
      "itemListElement": products.map((p) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": p.name,
          "category": p.category,
          "url": `https://koncave.co.in/product/${p.id}`
        }
      }))
    }
  };

  return (
    <div className="animate-fade-in bg-bg-main">
      <SEO
        title="Wedge Anchor & Structural Fastener Manufacturer | Koncave Anchor & Fasteners Pvt. Ltd."
        description="Direct manufacturer of high-tensile wedge anchors, flush drop-in anchors, and PA6 nylon frame anchors in Stainless Steel (304/316) & Carbon Steel. IS 1608 lab-tested."
        canonical="https://koncave.co.in/"
        schemaJson={homeSchema}
      />

      <div className="mt-[56px] md:mt-[64px] lg:h-[calc(100vh-64px)] min-h-[680px] flex flex-col justify-between bg-[#04060A] relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover scale-102 opacity-85 brightness-100 contrast-110 transition-transform duration-1000"
          >
            <source src="/hero-section/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04060A]/90 via-[#04060A]/45 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-transparent to-[#04060A]/40"></div>
        </div>

        <section className="relative z-10 py-8 lg:py-6 flex-1 flex flex-col justify-between text-white">
          <div className="container-custom flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto pt-4">
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 bg-black/45 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white font-mono text-[0.7rem] font-bold tracking-[1.2px] mb-5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span>MAKE IN INDIA // ISO 9001:2015 CERTIFIED</span>
                </div>

                <h1 className="font-display font-black uppercase tracking-[0.02em] leading-[0.9] text-[2.8rem] sm:text-[4.2rem] xl:text-[4.8rem] text-white mb-5 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]">
                  <span className="text-transparent-outline block">PRECISION FORGED</span>
                  <span className="block mt-1">STRUCTURAL</span>
                  <span className="bg-gradient-to-r from-[#FF3B42] via-[#D9232A] to-[#FF6B70] bg-clip-text text-transparent block mt-1">
                    ANCHOR SYSTEMS.
                  </span>
                </h1>

                <p className="text-white/95 text-[1rem] md:text-[1.12rem] leading-[1.6] max-w-[540px] mb-7 border-l-[3px] border-accent pl-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  Cold-forged in Stainless Steel A2/A4 and Carbon Steel for zero-slippage critical infrastructure loads.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={openInquiryModal}
                    className="btn btn-primary !px-6 !py-3.5 !text-[0.85rem] group shadow-[0_12px_30px_-8px_rgba(217,35,42,0.75)] cursor-pointer"
                  >
                    <span>Request Tender Quote</span>
                    <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <Link
                    to="/products"
                    className="btn btn-outline-white !px-5 !py-3.5 !text-[0.85rem] group bg-black/35 backdrop-blur-md border-white/30 hover:bg-white hover:text-steel-dark"
                  >
                    <span>Explore Catalogue</span>
                    <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="/catalogue/catalogue.pdf"
                    download
                    className="btn bg-black/40 hover:bg-black/65 text-white border border-white/25 !px-4 !py-3.5 !text-[0.8rem] font-mono backdrop-blur-md"
                  >
                    <IconDownload size={15} className="text-accent" />
                    <span>PDF Dossier</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-start gap-3 pt-2">
                <div className="bg-black/45 backdrop-blur-md border border-white/20 border-r-[3px] border-r-accent px-4 py-2.5 rounded-[4px] text-right font-mono shadow-xl">
                  <div className="flex items-center justify-end gap-2 text-[0.62rem] text-[#22C55E] font-bold tracking-[1px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
                    IS 1608:2022 LAB VERIFIED
                  </div>
                  <div className="text-white font-display text-[1.35rem] font-black tracking-wide leading-tight mt-0.5">
                    UP TO 84.48 kN HOLD
                  </div>
                </div>

                <div className="bg-black/45 backdrop-blur-md border border-white/20 border-r-[3px] border-r-white/60 px-4 py-2.5 rounded-[4px] text-right font-mono shadow-xl">
                  <span className="block text-[0.6rem] text-[#CBD5E1] uppercase tracking-[1px]">METALLURGY GRADES</span>
                  <strong className="text-[0.82rem] text-white font-bold tracking-[0.5px]">SS 304 (A2) • SS 316 (A4) • CARBON STEEL</strong>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-2">
              <div className="bg-[#06090F]/65 backdrop-blur-xl border border-white/20 rounded-[6px] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickDockSeries.map((item, idx) => {
                      const active = idx === activeAnchorIdx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onMouseEnter={() => setActiveAnchorIdx(idx)}
                          onClick={() => setActiveAnchorIdx(idx)}
                          className={`text-left p-2.5 rounded-[4px] font-mono transition-all duration-300 cursor-pointer border ${
                            active
                              ? 'bg-accent text-white border-accent shadow-[0_8px_20px_rgba(217,35,42,0.45)] -translate-y-0.5'
                              : 'bg-white/5 border-white/10 text-[#CBD5E1] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className={`block text-[0.58rem] font-bold tracking-[1px] ${active ? 'text-white/90' : 'text-accent'}`}>
                            {item.code}
                          </span>
                          <span className="block text-[0.74rem] font-bold truncate mt-0.5">
                            {item.name.replace('Heavy-Duty ', '').replace('Flush ', '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-5 flex items-center justify-between gap-4 bg-black/45 border border-white/10 px-4 py-2.5 rounded-[4px]">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-mono text-[0.65rem] text-accent font-bold uppercase tracking-[1px]">
                        <span>{quickDockSeries[activeAnchorIdx].grade}</span>
                        <span>•</span>
                        <span className="text-white">{quickDockSeries[activeAnchorIdx].sizes}</span>
                      </div>
                      <div className="text-white/85 text-[0.78rem] truncate mt-0.5">
                        {quickDockSeries[activeAnchorIdx].application}
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3 border-l border-white/15">
                      <span className="block font-mono text-[0.55rem] text-[#94A3B8] uppercase">PEAK LOAD</span>
                      <strong className="font-display text-[1.15rem] text-white font-black tracking-wide">
                        {quickDockSeries[activeAnchorIdx].peakLoad}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 bg-black/75 backdrop-blur-md border-t border-white/15 border-b-[3px] border-b-accent overflow-hidden py-2.5 shrink-0">
          <div className="flex w-max animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 px-8 font-mono text-[0.7rem] font-bold text-white uppercase tracking-[1.4px] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-accent rotate-45 inline-block"></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 bg-bg-card border-b border-border-light blueprint-grid-light">
        <div className="container-custom">
          <div className="flex justify-between items-end gap-6 mb-10 flex-wrap">
            <div>
              <div className="section-pre-title !justify-start !mb-1.5">
                <span></span> CORE PRODUCT SERIES
              </div>
              <h2 className="text-[2.2rem] md:text-[2.8rem] uppercase mb-0">
                Engineered <span className="text-accent">Fastening Systems</span>
              </h2>
            </div>
            <Link to="/products" className="btn btn-sm btn-outline-dark group">
              Full Searchable Catalogue <IconArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const totalVariants = product.sections
                ?.filter((s) => s.type === 'variant')
                .reduce((acc, curr) => acc + (curr.rows?.length || 0), 0);

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white border border-border-light border-t-[3px] border-t-steel-dark rounded-[4px] flex flex-col overflow-hidden transition-all duration-500 hover:border-t-accent hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-[165px] bg-bg-pedestal relative overflow-hidden border-b border-border-light">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    ></div>
                    <span className="absolute top-3 left-3 bg-steel-dark/90 text-white font-mono text-[0.66rem] font-bold px-2.5 py-1 rounded-[2px] tracking-[1px]">
                      0{index + 1} // {product.category}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-steel-dark border border-border-light font-mono text-[0.65rem] font-bold px-2.5 py-1 rounded-[2px]">
                      {totalVariants || 4}+ Sizes
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-[1.35rem] uppercase mb-2.5 text-steel-dark group-hover:text-accent transition-colors">
                        {product.name.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.materials.map((mat, i) => (
                          <span
                            key={i}
                            className="bg-bg-pedestal border border-border-subtle text-text-secondary font-mono text-[0.65rem] font-semibold px-2 py-0.5 rounded-[2px]"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-dashed border-border-light flex items-center justify-between font-mono text-[0.72rem] font-bold text-steel-dark group-hover:text-accent">
                      <span>VIEW DATA TABLES</span>
                      <IconArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-border-light">
        <div className="container-custom">
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <div className="section-pre-title"><span></span> QUALITY ASSURANCE & ADVANTAGE <span></span></div>
            <h2 className="text-[2.4rem] md:text-[3.2rem] uppercase mb-4">Why Infrastructure Leaders Choose Koncave</h2>
            <p className="text-text-secondary text-[1.05rem] m-0">
              Engineered to meet the stringent mechanical performance criteria demanded by leading civil contractors and EPC consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-border-light border-t-4 border-t-steel-dark p-8 rounded-[6px] shadow-sm hover:border-t-accent hover:-translate-y-1.5 hover:shadow-lg transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 bg-steel-dark/5 p-3.5 rounded-[4px] inline-flex">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-[1.3rem] text-steel-dark uppercase mb-3 tracking-[0.5px]">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-[0.92rem] leading-[1.6] m-0">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-dashed border-border-subtle font-mono text-[0.7rem] text-accent font-bold">
                  // VERIFIED METRIC
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-steel-dark text-white border-b border-white/10 blueprint-grid relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex justify-between items-end gap-6 mb-14 flex-wrap">
            <div>
              <div className="section-pre-title text-accent !justify-start !mb-1.5">
                <span></span> MECHANICAL BENCHMARKS <span></span>
              </div>
              <h2 className="text-[2.4rem] md:text-[3.2rem] uppercase mb-0 text-white">
                Structural Performance & <span className="text-accent">Load Ratings</span>
              </h2>
            </div>
            <Link to="/products" className="btn btn-sm btn-outline-white group">
              Explore Full Technical Data <IconArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-[#0B101B] border border-white/15 border-t-4 border-t-accent p-8 rounded-[6px] shadow-xl flex flex-col justify-between hover:border-white/40 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div>
                  <span className="font-mono text-[0.68rem] font-bold text-accent tracking-[1.2px] uppercase block mb-3">
                    // METRIC {idx + 1}
                  </span>
                  <h3 className="font-display text-[2.2rem] font-black text-white uppercase mb-2 tracking-[0.5px]">
                    {metric.value}
                  </h3>
                  <h4 className="font-sans font-bold text-[1.1rem] text-white mb-2.5">
                    {metric.label}
                  </h4>
                  <p className="text-[#94A3B8] text-[0.92rem] leading-[1.6] m-0">
                    {metric.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 font-mono text-[0.68rem] text-[#64748B]">
                  TESTED TO IS 1608 CRITERIA
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-steel-dark to-[#151F30] border-t-4 border-accent border-b border-white/10 py-20 text-white blueprint-grid">
        <div className="container-custom flex items-center justify-between gap-12 flex-wrap">
          <div className="max-w-[700px]">
            <span className="section-pre-title !justify-start"><span></span> DIRECT FACTORY DISPATCH</span>
            <h2 className="text-black text-[2.2rem] md:text-[3rem] uppercase mb-3">
              Need Bulk Fasteners For Your Next Tender?
            </h2>
            <p className="text-[#94A3B8] text-[1.05rem] m-0">
              Get factory-direct pricing, material test certificates (MTC), and rapid dispatch from our Rohtak manufacturing unit.
            </p>
          </div>
          <button
            type="button"
            onClick={openInquiryModal}
            className="btn btn-primary btn-large group cursor-pointer shadow-[0_10px_30px_rgba(217,35,42,0.4)]"
          >
            Open Engineering RFQ Form <IconArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
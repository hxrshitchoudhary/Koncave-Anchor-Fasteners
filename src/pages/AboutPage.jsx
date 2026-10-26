import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { companyInfo, aboutUsData } from '../data.js';
import {
  IconShield,
  IconFactory,
  IconAward,
  IconArrowRight,
  IconZoomIn,
  IconX
} from '../components/Icons.jsx';

const factoryPhotos = [
  { name: "Forging Area", category: "Production", file: "/factory_images/ForgingArea.png", desc: "Heavy-duty hydraulic and mechanical forging lines for high-tensile anchor bodies." },
  { name: "Rolling Area", category: "Production", file: "/factory_images/RollingArea.png", desc: "Precision thread rolling machinery ensuring accurate metric tolerances (M6 to M16)." },
  { name: "Tool Room", category: "Engineering", file: "/factory_images/ToolRoom.png", desc: "In-house tooling and die maintenance for absolute dimensional consistency." },
  { name: "Plating Area", category: "Finishing", file: "/factory_images/PlattingArea.png", desc: "Advanced alkaline galvanizing and stainless passivation surface treatments." },
  { name: "Packing Area", category: "Dispatch", file: "/factory_images/PackingArea.png", desc: "Rigorous bulk bundling and export-grade pallet packaging for safe transit." },
  { name: "Automatic Clips Bending Area", category: "Production", file: "/factory_images/AutomaticClipsBendingArea.png", desc: "Automated high-speed clipping lines for wedge anchor expansion sleeves." },
  { name: "Clip Cut Power Press Area", category: "Production", file: "/factory_images/ClipCutPowerPressArea.png", desc: "High-tonnage power presses for precise shearing and stamping operations." },
  { name: "Manual Clips Bending Area", category: "Production", file: "/factory_images/ManualClipBendingArea.png", desc: "Specialized manual assembly bays for custom structural fastener configurations." }
];

const categories = ['All', 'Production', 'Engineering', 'Finishing', 'Dispatch'];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    desc: '',
    zoom: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  const viewportRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightbox.isOpen) {
        setLightbox((prev) => ({ ...prev, isOpen: false, zoom: 1, position: { x: 0, y: 0 } }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen]);

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = 'hidden';
      const currentViewport = viewportRef.current;
      if (currentViewport) {
        const handleNativeWheel = (e) => {
          e.preventDefault();
          const delta = e.deltaY < 0 ? 0.2 : -0.2;
          setLightbox((prev) => {
            const next = Math.min(3, Math.max(1, Number((prev.zoom + delta).toFixed(2))));
            const nextPos = next === 1 ? { x: 0, y: 0 } : prev.position;
            return { ...prev, zoom: next, position: nextPos };
          });
        };
        currentViewport.addEventListener('wheel', handleNativeWheel, { passive: false });
        return () => {
          currentViewport.removeEventListener('wheel', handleNativeWheel);
          document.body.style.overflow = 'unset';
        };
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightbox.isOpen]);

  const filteredPhotos = activeTab === 'All'
    ? factoryPhotos
    : factoryPhotos.filter((p) => p.category === activeTab);

  const openLightbox = (photo) => {
    setLightbox({
      isOpen: true,
      imageSrc: photo.file,
      title: photo.name,
      desc: photo.desc,
      zoom: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 }
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false, zoom: 1, position: { x: 0, y: 0 } }));
  };

  const adjustZoom = (delta) => {
    setLightbox((prev) => {
      const next = Math.min(3, Math.max(1, Number((prev.zoom + delta).toFixed(2))));
      const nextPos = next === 1 ? { x: 0, y: 0 } : prev.position;
      return { ...prev, zoom: next, position: nextPos };
    });
  };

  const handleMouseDown = (e) => {
    if (lightbox.zoom <= 1) return;
    e.preventDefault();
    setLightbox((prev) => ({
      ...prev,
      isDragging: true,
      dragStart: { x: e.clientX - prev.position.x, y: e.clientY - prev.position.y }
    }));
  };

  const handleMouseMove = (e) => {
    if (!lightbox.isDragging || lightbox.zoom <= 1) return;
    e.preventDefault();
    setLightbox((prev) => ({
      ...prev,
      position: {
        x: e.clientX - prev.dragStart.x,
        y: e.clientY - prev.dragStart.y
      }
    }));
  };

  const handleMouseUp = () => {
    if (!lightbox.isDragging) return;
    setLightbox((prev) => ({ ...prev, isDragging: false }));
  };

  return (
    <div className="pt-navbar bg-bg-main pb-24">
      <section className="bg-steel-dark text-white py-16 md:py-24 border-b-4 border-accent blueprint-grid relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-[860px] text-center mx-auto flex flex-col items-center animate-fade-in-up">
          <span className="section-pre-title text-accent !justify-center mb-3">
            <span></span> CORPORATE HERITAGE & PLANT CAPABILITY <span></span>
          </span>

          <div className="inline-flex items-center gap-2 font-mono text-[0.75rem] font-bold text-[#CBD5E1] bg-white/5 px-3.5 py-1.5 border border-white/15 rounded-[3px] tracking-[1.5px] uppercase mb-6">
            {companyInfo.legalName} // ROHTAK, HARYANA
          </div>

          <h1 className="text-[2.6rem] sm:text-[3.8rem] md:text-[4.2rem] uppercase leading-[1.02] mb-5 text-white">
            Engineering{' '}
            <span className="text-transparent-outline">Zero-Slippage</span>{' '}
            <span className="bg-gradient-to-r from-[#FF3B42] to-[#D9232A] bg-clip-text text-transparent">
              Confidence.
            </span>
          </h1>

          <p className="text-[#94A3B8] text-[1.02rem] md:text-[1.12rem] leading-[1.65] max-w-[680px] mx-auto mb-8">
            {aboutUsData.hero.subtitle} As a proud participant in the &ldquo;{companyInfo.initiative}&rdquo; mission, we forge high-performance structural fasteners that sustain India&apos;s most demanding infrastructure.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/products" className="btn btn-primary group">
              <span>Explore Technical Catalogue</span>
              <IconArrowRight size={18} className="transition-transform duration-250 group-hover:translate-x-1" />
            </Link>
            <Link to="/inquiry" className="btn btn-outline-white">
              Request Engineering Submittal
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border-light py-10 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-border-subtle last:border-r-0">
              <span className="font-display text-[2.8rem] font-black text-steel-dark block">100%</span>
              <span className="font-mono text-[0.75rem] font-bold text-accent uppercase tracking-[1px]">Batch Tensile Tested</span>
            </div>
            <div className="p-4 border-r border-border-subtle last:border-r-0">
              <span className="font-display text-[2.8rem] font-black text-steel-dark block">IS 1608</span>
              <span className="font-mono text-[0.75rem] font-bold text-accent uppercase tracking-[1px]">Lab Standard Compliance</span>
            </div>
            <div className="p-4 border-r border-border-subtle last:border-r-0">
              <span className="font-display text-[2.8rem] font-black text-steel-dark block">ISO 9001</span>
              <span className="font-mono text-[0.75rem] font-bold text-accent uppercase tracking-[1px]">Certified Quality System</span>
            </div>
            <div className="p-4">
              <span className="font-display text-[2.8rem] font-black text-steel-dark block">ROHTAK</span>
              <span className="font-mono text-[0.75rem] font-bold text-accent uppercase tracking-[1px]">Direct Factory Facility</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-16 text-center">
        <div className="max-w-[840px] mx-auto">
          <span className="section-pre-title"><span></span> EXECUTIVE MANDATE <span></span></span>
          <h2 className="text-[1.8rem] md:text-[2.4rem] leading-[1.4] text-steel-dark font-semibold">
            "{aboutUsData.intro}"
          </h2>
        </div>
      </section>

      <section className="container-custom mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <div className="section-pre-title !justify-start"><span></span> PLANT FLOOR INFRASTRUCTURE</div>
            <h2 className="text-[2.2rem] md:text-[3rem] uppercase mb-1">Inside Our Manufacturing Unit</h2>
            <p className="text-text-secondary text-[1.02rem] max-w-[640px] m-0">
              Equipped with specialized heavy machinery, automated clipping lines, and rigorous quality inspection bays. Click any photo to inspect in full-screen zoom.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-[4px] font-sans text-[0.8rem] font-semibold cursor-pointer transition-all border ${
                  activeTab === cat
                    ? 'bg-steel-dark text-white border-steel-dark shadow-sm'
                    : 'bg-white border-border-light text-text-secondary hover:bg-bg-pedestal hover:text-steel-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => openLightbox(photo)}
              className="group bg-white border border-border-light border-t-4 border-t-steel-dark rounded-[3px] overflow-hidden shadow-sm transition-all duration-300 hover:border-t-accent hover:-translate-y-1.5 hover:shadow-lg cursor-pointer flex flex-col justify-between"
            >
              <div className="h-[200px] bg-bg-pedestal relative overflow-hidden flex items-center justify-center">
                <img
                  src={photo.file}
                  alt={photo.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute top-2.5 right-2.5 bg-steel-dark/80 text-white font-mono text-[0.62rem] px-2 py-0.5 rounded-[2px] uppercase">
                  {photo.category}
                </div>
                <div className="absolute inset-0 bg-steel-dark/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-steel-dark text-white font-mono text-[0.75rem] font-bold px-3 py-1.5 rounded-[3px] border border-white/20 inline-flex items-center gap-1.5">
                    <IconZoomIn size={16} className="text-accent" /> Zoom Photo
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <h4 className="font-display text-[1.15rem] uppercase text-steel-dark m-0 tracking-[0.5px]">
                    {photo.name}
                  </h4>
                  <p className="text-[0.82rem] text-text-secondary m-0 leading-[1.4] line-clamp-2 mt-1">
                    {photo.desc}
                  </p>
                </div>
                <div className="pt-2.5 mt-2 border-t border-dashed border-border-subtle flex items-center justify-between font-mono text-[0.7rem] text-steel-light group-hover:text-accent font-bold">
                  <span>INSPECT BAY</span>
                  <IconZoomIn size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-steel-dark text-white p-10 rounded-[4px] border-t-4 border-accent blueprint-grid shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-accent">
                <IconShield size={32} />
                <h3 className="text-white text-[2.2rem] uppercase m-0">Our Vision</h3>
              </div>
              <p className="text-[#94A3B8] text-[1.05rem] leading-[1.7] m-0">
                {aboutUsData.vision}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[0.75rem] text-[#CBD5E1]">
              TARGET // ZERO-SLIPPAGE CRITICAL INFRASTRUCTURE
            </div>
          </div>

          <div className="bg-steel-dark text-white p-10 rounded-[4px] border-t-4 border-accent blueprint-grid shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-accent">
                <IconAward size={32} />
                <h3 className="text-white text-[2.2rem] uppercase m-0">Our Mission</h3>
              </div>
              <p className="text-[#94A3B8] text-[1.05rem] leading-[1.7] m-0">
                {aboutUsData.mission}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[0.75rem] text-[#CBD5E1]">
              COMMITMENT // NABL & IS 1608:2022 QUALITY ASSURANCE
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom">
        <div className="text-left mb-10">
          <div className="section-pre-title !justify-start"><span></span> THE ENGINEERING STANDARD</div>
          <h2 className="text-[2.2rem] md:text-[3rem] uppercase mb-0">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutUsData.values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-border-light border-t-4 border-t-steel-dark p-8 rounded-[3px] shadow-sm transition-all duration-250 hover:border-t-accent hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-accent bg-bg-pedestal p-3 rounded-[3px] border border-border-light">
                    {v.icon === 'shield' ? <IconShield size={28} /> : v.icon === 'factory' ? <IconFactory size={28} /> : <IconAward size={28} />}
                  </div>
                  <span className="font-display text-[2.2rem] font-black text-slate-200">0{i + 1}</span>
                </div>
                <h4 className="text-[1.4rem] uppercase mb-3 text-steel-dark">{v.title}</h4>
                <p className="text-text-secondary text-[0.95rem] leading-[1.6] m-0">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightbox.isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100000] bg-[#05080E]/92 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in"
            onClick={closeLightbox}
          >
            <div
              className="w-full max-w-[1200px] h-[90vh] bg-steel-dark border border-white/18 border-t-4 border-t-accent rounded-[4px] shadow-2xl flex flex-col overflow-hidden text-white blueprint-grid"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center py-3.5 px-6 bg-[#06090F] border-b border-white/12 shrink-0">
                <div>
                  <span className="font-mono text-[0.66rem] font-bold text-accent tracking-[1.2px] block">
                    PLANT FLOOR INSPECTION {lightbox.zoom > 1 ? "// (DRAG TO PAN)" : ""}
                  </span>
                  <h3 className="text-white text-[1.35rem] uppercase m-0 leading-tight">{lightbox.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1.5 px-3 rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:bg-accent disabled:opacity-40"
                    onClick={() => adjustZoom(-0.25)}
                    disabled={lightbox.zoom <= 1}
                  >
                    −
                  </button>
                  <span className="font-mono text-[0.8rem] font-bold text-[#CBD5E1] min-w-[50px] text-center">
                    {Math.round(lightbox.zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1.5 px-3 rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:bg-accent disabled:opacity-40"
                    onClick={() => adjustZoom(0.25)}
                    disabled={lightbox.zoom >= 3}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1.5 px-3 rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:bg-accent"
                    onClick={() => setLightbox((prev) => ({ ...prev, zoom: 1, position: { x: 0, y: 0 } }))}
                  >
                    RESET
                  </button>
                  <button
                    type="button"
                    className="bg-accent/20 border border-accent/50 text-white w-[36px] h-[36px] rounded-[3px] inline-flex items-center justify-center cursor-pointer ml-2 hover:bg-accent transition-all"
                    onClick={closeLightbox}
                    aria-label="Close Lightbox"
                  >
                    <IconX size={20} />
                  </button>
                </div>
              </div>

              <div
                ref={viewportRef}
                className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,#141D2D_0%,#090D14_100%)] select-none ${
                  lightbox.zoom > 1 ? (lightbox.isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={lightbox.imageSrc}
                  alt={lightbox.title}
                  draggable="false"
                  className="max-w-[90%] max-h-[72vh] object-contain rounded-[3px] shadow-2xl transition-transform duration-75 ease-out origin-center pointer-events-none"
                  style={{
                    transform: `scale(${lightbox.zoom}) translate(${lightbox.position.x / lightbox.zoom}px, ${lightbox.position.y / lightbox.zoom}px)`
                  }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="py-3 px-6 bg-[#06090F] border-t border-white/12 text-center shrink-0">
                <p className="font-mono text-[0.8rem] text-[#94A3B8] m-0">
                  {lightbox.desc} {lightbox.zoom > 1 ? "— Drag image to pan around, use mouse wheel to zoom" : "— Use mouse wheel or '+' button to zoom"}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AboutPage;
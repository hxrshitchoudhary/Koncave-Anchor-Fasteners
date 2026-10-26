import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data.js';
import { IconZoomIn, IconX } from '../components/Icons.jsx';

const ApplicationsPage = () => {
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

  const openLightbox = (ind) => {
    setLightbox({
      isOpen: true,
      imageSrc: ind.image,
      title: `${ind.title} — ${ind.subtitle}`,
      desc: ind.desc,
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
                onClick={() => openLightbox(ind)}
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
                    onClick={() => openLightbox(ind)}
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

      {/* Unified Full-Screen Zoom & Pan Lightbox Modal via Portal */}
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
                    SECTOR APPLICATION VIEWER {lightbox.zoom > 1 ? "// (DRAG TO PAN)" : ""}
                  </span>
                  <h3 className="text-white text-[1.35rem] uppercase m-0 leading-tight">
                    {lightbox.title}
                  </h3>
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

export default ApplicationsPage;
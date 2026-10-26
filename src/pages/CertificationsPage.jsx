import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { IconDownload, IconZoomIn, IconX, IconShield } from '../components/Icons.jsx';

const CertificationsPage = () => {
  const [screenBlurred, setScreenBlurred] = useState(false);
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

  // Anti-Screenshot & Screen-Capture Obfuscation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape closes lightbox
      if (e.key === 'Escape' && lightbox.isOpen) {
        setLightbox((prev) => ({ ...prev, isOpen: false, zoom: 1, position: { x: 0, y: 0 } }));
      }

      // Intercept PrintScreen key
      if (e.key === 'PrintScreen') {
        setScreenBlurred(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(''); // Clear clipboard immediately
        }
        setTimeout(() => setScreenBlurred(false), 2000);
      }

      // Block Ctrl/Cmd + P (Print / Save as PDF)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
      }

      // Block Ctrl/Cmd + S (Save webpage / image)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }

      // Block F12 and DevTools shortcuts
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
      }
    };

    // When window loses focus (e.g. Snipping Tool Win+Shift+S / macOS Cmd+Shift+4)
    const handleWindowBlur = () => {
      setScreenBlurred(true);
    };

    const handleWindowFocus = () => {
      setScreenBlurred(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
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

  const openLightbox = (cert) => {
    setLightbox({
      isOpen: true,
      imageSrc: cert.image,
      title: cert.displayName,
      desc: cert.desc,
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

  const blockAction = (e) => {
    e.preventDefault();
    return false;
  };

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
    <div
      className="pt-navbar animate-fade-in bg-bg-main pb-24 select-none relative"
      onContextMenu={blockAction}
    >
      {/* Anti-Print Style Tag */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .pt-navbar { display: none !important; }
        }
      `}</style>

      {/* Screen Capture Blinding Curtain when Snipping Tool is triggered */}
      {screenBlurred && (
        <div className="fixed inset-0 z-[999999] bg-[#05080E] flex flex-col items-center justify-center text-white pointer-events-none p-6 text-center">
          <IconShield size={48} className="text-accent mb-3 animate-pulse" />
          <h2 className="font-display text-[1.8rem] uppercase text-white tracking-wide">
            Protected Document View
          </h2>
          <p className="font-mono text-[0.85rem] text-[#94A3B8]">
            Screen capture and external recording are restricted on certified documents.
          </p>
        </div>
      )}

      {/* Header Banner */}
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
            Koncave Anchor &amp; Fasteners Pvt. Ltd. maintains uncompromising manufacturing standards. Review our verified ISO management certificates below for technical tenders and quality verification.
          </p>
        </div>
      </section>

      {/* Certificate Grid Section */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-[1280px] mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onContextMenu={blockAction}
              className="bg-white border border-border-light border-t-4 border-t-steel-dark rounded-[6px] shadow-sm flex flex-col justify-between overflow-hidden hover:border-t-accent hover:shadow-xl transition-all group h-full"
            >
              {/* Protected Portrait Container with Diagonal Anti-Capture Watermark */}
              <div
                onClick={() => openLightbox(cert)}
                onContextMenu={blockAction}
                onDragStart={blockAction}
                className="w-full aspect-[1/1.35] bg-[#0B101B] relative overflow-hidden border-b border-border-light flex items-center justify-center p-3 cursor-zoom-in group select-none"
              >
                <img
                  src={cert.image}
                  alt={cert.displayName}
                  draggable="false"
                  onContextMenu={blockAction}
                  onDragStart={blockAction}
                  style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
                  className="w-full h-full object-contain bg-white rounded-[2px] shadow-md transition-transform duration-500 group-hover:scale-103 pointer-events-none select-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Anti-Screenshot Diagonal Watermark Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-around opacity-[0.09] select-none rotate-[-28deg] scale-125">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="font-mono text-[0.8rem] text-white font-black tracking-[4px] whitespace-nowrap text-center">
                      KONCAVE INTERNAL VIEW ONLY // NOT FOR REPRODUCTION
                    </span>
                  ))}
                </div>

                {/* Click / Touch Shield */}
                <div
                  className="absolute inset-0 z-20 bg-transparent"
                  onContextMenu={blockAction}
                  onDragStart={blockAction}
                />

                <div className="absolute top-4 left-4 z-30 bg-steel-dark/95 text-white font-mono text-[0.65rem] px-2.5 py-1 rounded-[2px] uppercase font-bold tracking-[1px] shadow-sm border border-white/15 pointer-events-none">
                  VERIFIED ISO
                </div>
                <div className="absolute inset-0 z-30 bg-steel-dark/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
                  <span className="bg-steel-dark text-white font-mono text-[0.75rem] font-bold px-3.5 py-2 rounded-[3px] border border-white/20 inline-flex items-center gap-1.5 shadow-xl">
                    <IconZoomIn size={16} className="text-accent" /> Inspect Certificate
                  </span>
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

                <div className="pt-4 border-t border-dashed border-border-subtle flex items-center justify-end mt-auto">
                  <button
                    type="button"
                    onClick={() => openLightbox(cert)}
                    className="btn btn-sm btn-primary w-full justify-center"
                  >
                    <IconZoomIn size={15} /> Inspect Official Certificate
                  </button>
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

      {/* Unified Zoom Modal with Anti-Capture Overlays */}
      {lightbox.isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100000] bg-[#05080E]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-fade-in select-none"
            onClick={closeLightbox}
            onContextMenu={blockAction}
          >
            <div
              className="w-full max-w-[1200px] h-[90vh] bg-steel-dark border border-white/18 border-t-4 border-t-accent rounded-[4px] shadow-2xl flex flex-col overflow-hidden text-white blueprint-grid"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={blockAction}
            >
              <div className="flex justify-between items-center py-3.5 px-6 bg-[#06090F] border-b border-white/12 shrink-0">
                <div>
                  <span className="font-mono text-[0.66rem] font-bold text-accent tracking-[1.2px] block">
                    PROTECTED ISO CERTIFICATE // VIEW ONLY {lightbox.zoom > 1 ? "(DRAG TO PAN)" : ""}
                  </span>
                  <h3 className="text-white text-[1.15rem] sm:text-[1.35rem] uppercase m-0 leading-tight">{lightbox.title}</h3>
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
                onContextMenu={blockAction}
                onDragStart={blockAction}
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
                  onContextMenu={blockAction}
                  onDragStart={blockAction}
                  style={{
                    WebkitTouchCallout: 'none',
                    userSelect: 'none',
                    transform: `scale(${lightbox.zoom}) translate(${lightbox.position.x / lightbox.zoom}px, ${lightbox.position.y / lightbox.zoom}px)`
                  }}
                  className="max-w-[90%] max-h-[72vh] object-contain bg-white p-2 rounded-[3px] shadow-2xl transition-transform duration-75 ease-out origin-center pointer-events-none select-none"
                />

                {/* Protective Invisible Shield */}
                <div
                  className="absolute inset-0 z-10 bg-transparent"
                  onContextMenu={blockAction}
                  onDragStart={blockAction}
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

export default CertificationsPage;
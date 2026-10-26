import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data.js';
import SEO from '../components/SEO.jsx';
import {
  IconChevronRight,
  IconCheck,
  IconZoomIn,
  IconX
} from '../components/Icons.jsx';

const ProductDetailPage = ({ openQuoteModal }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState('ALL');

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    desc: '',
    variant: null,
    zoom: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  const viewportRef = useRef(null);

  useEffect(() => {
    setActiveTab('ALL');
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightbox.isOpen) {
        setLightbox((prev) => ({
          ...prev,
          isOpen: false,
          zoom: 1,
          position: { x: 0, y: 0 }
        }));
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

  if (!product) {
    return (
      <div className="container-custom section-padding pt-navbar">
        <h2 className="text-[2rem]">Product not found</h2>
        <Link to="/products" className="btn btn-primary mt-6">Back to Catalogue</Link>
      </div>
    );
  }

  const openLightbox = ({ imageSrc, title, desc, variant = null }) => {
    setLightbox({
      isOpen: true,
      imageSrc: imageSrc || product.appReferenceImage || product.image,
      title: title || `${product.name} — CAD & Installation Blueprint`,
      desc: desc || 'IS 1608, P1:2022 Structural Cross-Section & Drilling Geometry',
      variant,
      zoom: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 }
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({
      ...prev,
      isOpen: false,
      zoom: 1,
      position: { x: 0, y: 0 }
    }));
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

  const hasA2 = product.sections?.some((s) => s.title.toUpperCase().includes('A2') || s.title.toUpperCase().includes('STAINLESS'));
  const hasA4 = product.sections?.some((s) => s.title.toUpperCase().includes('A4'));
  const hasGI = product.sections?.some((s) => s.title.toUpperCase().includes('G.I') || s.title.toUpperCase().includes('GI') || s.title.toUpperCase().includes('GALVANIZED'));

  const filterSections = (sections) => {
    if (!sections || activeTab === 'ALL') return sections;
    return sections.filter((sec) => {
      const t = sec.title.toUpperCase();
      if (activeTab === 'A2') return t.includes('A2') || t.includes('STAINLESS');
      if (activeTab === 'A4') return t.includes('A4') || t.includes('STAINLESS');
      if (activeTab === 'GI') return t.includes('G.I') || t.includes('GI') || t.includes('GALVANIZED') || t.includes('TECHNICAL DATA');
      return true;
    });
  };

  const visibleSections = filterSections(product.sections);
  const firstVariantRow = product.sections?.find((s) => s.type === 'variant')?.rows?.[0] || null;

  const tabBtnClass = (isActive) =>
    `px-3.5 sm:px-4 py-2 rounded-[4px] font-sans text-[0.78rem] sm:text-[0.82rem] font-semibold cursor-pointer transition-all border ${
      isActive
        ? 'bg-steel-dark text-white border-steel-dark shadow-[0_2px_6px_rgba(9,13,20,0.18)]'
        : 'bg-bg-pedestal border-border-light text-text-secondary hover:bg-white hover:border-steel-light hover:text-steel-dark'
    }`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://koncave.co.in${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Koncave"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Koncave Anchor & Fasteners Pvt. Ltd."
    },
    "material": product.materials.join(", "),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="container-custom section-padding pt-navbar">
      <SEO
        title={`${product.name} | Koncave Anchor & Fasteners Pvt. Ltd.`}
        description={`${product.description} Available in ${product.materials.join(', ')}. Conforms to IS 1608:2022 testing standards.`}
        canonical={`https://koncave.co.in/product/${product.id}`}
        schemaJson={productSchema}
      />

      <div className="mb-6 flex items-center gap-2 font-mono text-[0.75rem] sm:text-[0.8rem] font-bold uppercase text-text-secondary animate-fade-in flex-wrap">
        <Link to="/" className="hover:text-accent">Home</Link> <IconChevronRight size={14} />
        <Link to="/products" className="hover:text-accent">Product Range</Link> <IconChevronRight size={14} />
        <span className="text-steel-dark truncate">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row bg-bg-card rounded-[3px] overflow-hidden shadow-sm border border-border-light mb-6">
        <div className="flex-[1.25] p-5 sm:p-6 md:py-11 md:px-12 flex flex-col justify-center animate-slide-up-fade">
          <span className="font-mono text-[0.75rem] sm:text-[0.78rem] font-bold text-accent uppercase tracking-[1.5px] mb-1.5">
            {product.category}
          </span>
          <h1 className="text-[2rem] sm:text-[2.2rem] md:text-[2.8rem] text-steel-dark uppercase mb-3">{product.name}</h1>
          <p className="text-[0.95rem] sm:text-[1.02rem] text-text-secondary mb-6">{product.description}</p>
          <div>
            <h3 className="font-mono text-[0.76rem] sm:text-[0.8rem] uppercase tracking-[1px] text-text-secondary border-b border-border-light pb-2 mb-3">
              Available Material Grades
            </h3>
            <div className="flex gap-2 flex-wrap">
              {product.materials?.map((mat) => (
                <span
                  key={mat}
                  className="bg-steel-dark text-white px-3 sm:px-3.5 py-[5px] rounded-[3px] font-mono text-[0.72rem] sm:text-[0.76rem] font-bold tracking-[1px]"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-wrap mt-7">
            <button
              type="button"
              className="btn btn-primary w-full sm:w-auto justify-center"
              onClick={() => openQuoteModal(product, firstVariantRow)}
            >
              Request Tender Quote
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w-full sm:w-auto justify-center"
              onClick={() =>
                openLightbox({
                  imageSrc: product.appReferenceImage || product.image,
                  title: `${product.name} — Installation & Embedment Blueprint`,
                  desc: 'Full-Resolution Engineering Reference & Substrate Cross-Section',
                  variant: firstVariantRow
                })
              }
            >
              <IconZoomIn size={18} /> Open CAD Blueprint Viewer
            </button>
          </div>
        </div>

        <div
          className="flex-[0.95] bg-bg-pedestal bg-cover bg-center border-t-4 lg:border-t-0 lg:border-l-4 border-accent min-h-[240px] sm:min-h-[280px] lg:min-h-[360px] relative cursor-zoom-in group animate-fade-in flex items-center justify-center overflow-hidden"
          onClick={() =>
            openLightbox({
              imageSrc: product.image,
              title: `${product.name} — Component Profile`,
              desc: `Materials: ${product.materials.join(' | ')}`,
              variant: firstVariantRow
            })
          }
          title="Click to inspect high-resolution product profile"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
            }}
          />
          <div className="absolute bottom-3.5 right-3.5 bg-steel-dark/86 text-white px-3.5 py-[7px] rounded-[3px] border-l-[3px] border-l-accent font-mono text-[0.7rem] sm:text-[0.72rem] font-bold inline-flex items-center gap-1.5 tracking-[0.6px] uppercase transition-all group-hover:bg-accent">
            <IconZoomIn size={16} /> Click to Enlarge Spec View
          </div>
        </div>
      </div>

      {(hasA2 || hasA4 || hasGI) && product.sections?.length > 2 && (
        <div className="flex gap-2 flex-wrap mb-7 bg-bg-card py-4 px-4 sm:px-5 rounded-[3px] border border-border-light items-center animate-fade-in">
          <span className="font-mono text-[0.74rem] sm:text-[0.78rem] font-bold uppercase text-text-secondary w-full sm:w-auto mb-1 sm:mb-0 sm:mr-2">
            Filter by Material Grade:
          </span>
          <button
            type="button"
            className={tabBtnClass(activeTab === 'ALL')}
            onClick={() => setActiveTab('ALL')}
          >
            All ({product.sections.length})
          </button>
          {hasA2 && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'A2')}
              onClick={() => setActiveTab('A2')}
            >
              SS A2 (304)
            </button>
          )}
          {hasA4 && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'A4')}
              onClick={() => setActiveTab('A4')}
            >
              SS A4 (316)
            </button>
          )}
          {hasGI && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'GI')}
              onClick={() => setActiveTab('GI')}
            >
              Galvanized (G.I.)
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 sm:gap-8 w-full animate-fade-in">
        {visibleSections?.map((section, secIdx) => (
          <div
            key={secIdx}
            className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift"
          >
            <div className="py-4 px-4 sm:py-5 sm:px-8 border-b border-border-light bg-bg-pedestal flex items-center justify-between gap-2 flex-wrap">
              <div>
                <h2 className="text-[1.3rem] sm:text-[1.55rem] uppercase m-0">{section.title}</h2>
                {section.subtitle && (
                  <p className="font-mono text-accent text-[0.74rem] sm:text-[0.8rem] font-semibold mt-1 mb-0">
                    {section.subtitle}
                  </p>
                )}
              </div>
              {section.type === 'report' && (
                <span className="md:hidden font-mono text-[0.65rem] font-bold text-steel-light bg-white px-2.5 py-1 rounded-[3px] border border-border-light">
                  ← SWIPE TABLE →
                </span>
              )}
            </div>

            {section.type === 'variant' && (
              <>
                <div className="md:hidden divide-y divide-border-subtle">
                  {section.rows.map((row, i) => (
                    <div key={i} className="p-4 bg-white even:bg-[#F8FAFC] flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="block font-mono text-[0.62rem] uppercase text-text-secondary tracking-[0.8px]">
                            {section.headers?.[0] || 'ARTICLE CODE'}
                          </span>
                          <span className="font-mono text-[1rem] font-bold text-accent">
                            {row.article}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 py-2 px-3 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer transition-all uppercase bg-bg-pedestal border border-border-light text-steel-dark active:scale-95"
                            onClick={() =>
                              openLightbox({
                                imageSrc: product.appReferenceImage || product.image,
                                title: `CAD Blueprint // Article: ${row.article}`,
                                desc: `${section.title} — Drill: ${row.drill} | Length: ${row.length}${row.embed ? ` | Embed: ${row.embed}` : ''}`,
                                variant: row
                              })
                            }
                          >
                            <IconZoomIn size={14} className="text-accent" /> CAD
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary !py-2 !px-3.5"
                            onClick={() => openQuoteModal(product, row)}
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>

                      <div className={`grid ${row.embed ? 'grid-cols-3' : 'grid-cols-2'} gap-2 pt-2.5 border-t border-dashed border-border-subtle font-mono`}>
                        <div className="bg-bg-pedestal px-2.5 py-1.5 rounded-[3px] border border-border-subtle">
                          <span className="block text-[0.6rem] text-text-secondary uppercase truncate">
                            {section.headers?.[1] || 'DRILL Ø'}
                          </span>
                          <strong className="text-[0.82rem] text-steel-dark">{row.drill}</strong>
                        </div>
                        <div className="bg-bg-pedestal px-2.5 py-1.5 rounded-[3px] border border-border-subtle">
                          <span className="block text-[0.6rem] text-text-secondary uppercase truncate">
                            {section.headers?.[2] || 'LENGTH'}
                          </span>
                          <strong className="text-[0.82rem] text-steel-dark">{row.length}</strong>
                        </div>
                        {row.embed && (
                          <div className="bg-bg-pedestal px-2.5 py-1.5 rounded-[3px] border border-border-subtle">
                            <span className="block text-[0.6rem] text-text-secondary uppercase truncate">
                              {section.headers?.[3] || 'EMBEDMENT'}
                            </span>
                            <strong className="text-[0.82rem] text-steel-dark">{row.embed}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block w-full overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-steel-dark text-white">
                        {section.headers.map((h, i) => (
                          <th
                            key={i}
                            className="py-[13px] px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                        <th className="py-[13px] px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] whitespace-nowrap">
                          CAD
                        </th>
                        <th className="py-[13px] px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] whitespace-nowrap">
                          INQUIRY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, i) => (
                        <tr
                          key={i}
                          className="even:bg-[#F8FAFC] transition-colors hover:bg-accent/5"
                        >
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            <span className="font-bold text-accent">{row.article}</span>
                          </td>
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            {row.drill}
                          </td>
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            {row.length}
                          </td>
                          {row.embed && (
                            <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                              {row.embed}
                            </td>
                          )}
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            <button
                              type="button"
                              className="inline-flex items-center gap-[5px] py-[5px] px-2.5 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer transition-all uppercase bg-slate-900/5 border border-border-light text-text-secondary hover:bg-accent hover:text-white hover:border-accent"
                              onClick={() =>
                                openLightbox({
                                  imageSrc: product.appReferenceImage || product.image,
                                  title: `CAD Blueprint // Article: ${row.article}`,
                                  desc: `${section.title} — Drill: ${row.drill} | Length: ${row.length}${row.embed ? ` | Embed: ${row.embed}` : ''}`,
                                  variant: row
                                })
                              }
                            >
                              <IconZoomIn size={14} /> CAD
                            </button>
                          </td>
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => openQuoteModal(product, row)}
                            >
                              Get Quote
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {section.type === 'tech' && (
              <div className="w-full">
                <table className="w-full border-collapse block md:table">
                  <tbody className="block md:table-row-group divide-y divide-border-subtle">
                    {section.rows.map((row, i) => (
                      <tr
                        key={i}
                        className="block md:table-row even:bg-[#F8FAFC] transition-colors hover:bg-accent/5 p-4 md:p-0"
                      >
                        <th className="block md:table-cell pb-1 md:py-[13px] md:px-5 text-left md:border-b md:border-r border-border-subtle font-mono font-bold uppercase text-[0.72rem] sm:text-[0.76rem] tracking-[1px] md:bg-bg-pedestal md:w-[35%] text-accent md:text-steel-dark">
                          {row.label}
                        </th>
                        <td className="block md:table-cell md:py-[13px] md:px-5 text-left md:border-b border-border-subtle font-sans font-medium text-[0.88rem] sm:text-[0.9rem] text-steel-dark whitespace-normal">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.type === 'report' && (
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse min-w-[540px] sm:min-w-[680px]">
                  <thead>
                    <tr className="bg-steel-mid text-white">
                      {section.headers.map((h, i) => (
                        <th
                          key={i}
                          className={`py-3 px-3.5 sm:py-[13px] sm:px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.7rem] sm:text-[0.76rem] tracking-[1px] whitespace-nowrap ${
                            i === 0 ? 'sticky left-0 z-10 bg-steel-mid' : ''
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i} className="bg-white even:bg-[#F8FAFC] transition-colors hover:bg-accent/5">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`py-3 px-3.5 sm:py-[13px] sm:px-5 text-left border-b border-border-subtle font-mono text-[0.78rem] sm:text-[0.86rem] whitespace-nowrap ${
                              cellIdx === 0
                                ? 'sticky left-0 z-10 font-bold text-steel-dark bg-inherit border-r border-border-subtle'
                                : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {product.applications && (
          <div className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift">
            <div className="py-4 px-4 sm:py-5 sm:px-8 border-b border-border-light bg-bg-pedestal">
              <h2 className="text-[1.35rem] sm:text-[1.55rem] uppercase m-0">Common Structural Applications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 sm:gap-4 p-4 sm:py-7 sm:px-8">
              {product.applications.map((app, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-bg-pedestal py-3 px-3.5 rounded-[3px] border border-border-light font-semibold text-[0.88rem] sm:text-[0.9rem]"
                >
                  <IconCheck size={20} className="text-accent shrink-0" /> {app}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.appReferenceImage && (
          <div className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift">
            <div className="py-4 px-4 sm:py-5 sm:px-8 border-b border-border-light bg-bg-pedestal flex justify-between items-center gap-4 flex-wrap">
              <div>
                <h2 className="text-[1.35rem] sm:text-[1.55rem] uppercase m-0">Application & Installation References</h2>
                <p className="font-mono text-accent text-[0.74rem] sm:text-[0.8rem] font-semibold mt-1 mb-0">
                  CLICK DRAWING TO LAUNCH INTERACTIVE FULL-SCREEN CAD BLUEPRINT VIEWER
                </p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary w-full sm:w-auto justify-center"
                onClick={() =>
                  openLightbox({
                    imageSrc: product.appReferenceImage,
                    title: `${product.name} — Technical CAD & Installation Reference`,
                    desc: 'Drill Diameter, Embedment Depth & Edge-Distance Cross-Section',
                    variant: firstVariantRow
                  })
                }
              >
                <IconZoomIn size={16} /> Full-Screen CAD Blueprint
              </button>
            </div>
            <div
              className="p-4 sm:p-8 flex justify-center items-center bg-white relative cursor-zoom-in overflow-hidden group"
              onClick={() =>
                openLightbox({
                  imageSrc: product.appReferenceImage,
                  title: `${product.name} — Technical CAD & Installation Reference`,
                  desc: 'Drill Diameter, Embedment Depth & Edge-Distance Cross-Section',
                  variant: firstVariantRow
                })
              }
            >
              <img
                src={product.appReferenceImage}
                alt="Application References"
                className="max-w-full h-auto max-h-[580px] object-contain rounded-[2px]"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-steel-dark/62 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-250 group-hover:opacity-100 p-4">
                <div className="inline-flex items-center gap-2.5 bg-steel-dark text-white border border-white/20 border-l-4 border-l-accent py-3 px-5 rounded-[3px] font-mono text-[0.78rem] sm:text-[0.85rem] font-bold tracking-[1px] shadow-lg text-center">
                  <IconZoomIn size={22} className="shrink-0" />
                  <span>OPEN FULL-SCREEN CAD BLUEPRINT VIEWER</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {lightbox.isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100000] bg-[#05080E]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in"
            onClick={closeLightbox}
          >
            <div
              className="w-full max-w-[1200px] h-[90vh] bg-steel-dark border border-white/18 border-t-4 border-t-accent rounded-[4px] shadow-2xl flex flex-col overflow-hidden text-white blueprint-grid"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap justify-between items-center gap-3 py-3 px-4 sm:py-3.5 sm:px-6 bg-[#06090F] border-b border-white/12 shrink-0">
                <div className="min-w-0">
                  <span className="font-mono text-[0.62rem] sm:text-[0.66rem] font-bold text-accent tracking-[1.2px] block">
                    CAD & SPEC INSPECTION {lightbox.zoom > 1 ? "// (DRAG TO PAN)" : ""}
                  </span>
                  <h3 className="text-white text-[1.1rem] sm:text-[1.35rem] uppercase m-0 leading-tight truncate">{lightbox.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  {product.appReferenceImage && (
                    <div className="flex items-center gap-1.5 mr-1">
                      <button
                        type="button"
                        className={`py-1.5 px-2.5 rounded-[3px] font-mono text-[0.68rem] sm:text-[0.72rem] font-bold cursor-pointer border transition-all ${
                          lightbox.imageSrc === product.appReferenceImage
                            ? 'bg-accent border-accent text-white'
                            : 'bg-steel-mid border-white/18 text-[#CBD5E1] hover:bg-white/10'
                        }`}
                        onClick={() =>
                          setLightbox((prev) => ({
                            ...prev,
                            imageSrc: product.appReferenceImage,
                            zoom: 1,
                            position: { x: 0, y: 0 }
                          }))
                        }
                      >
                        Installation CAD
                      </button>
                      <button
                        type="button"
                        className={`py-1.5 px-2.5 rounded-[3px] font-mono text-[0.68rem] sm:text-[0.72rem] font-bold cursor-pointer border transition-all ${
                          lightbox.imageSrc === product.image
                            ? 'bg-accent border-accent text-white'
                            : 'bg-steel-mid border-white/18 text-[#CBD5E1] hover:bg-white/10'
                        }`}
                        onClick={() =>
                          setLightbox((prev) => ({
                            ...prev,
                            imageSrc: product.image,
                            zoom: 1,
                            position: { x: 0, y: 0 }
                          }))
                        }
                      >
                        Product Profile
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-[3px] font-mono text-[0.78rem] font-bold cursor-pointer transition-all hover:bg-accent disabled:opacity-40"
                    onClick={() => adjustZoom(-0.25)}
                    disabled={lightbox.zoom <= 1}
                  >
                    −
                  </button>
                  <span className="font-mono text-[0.75rem] sm:text-[0.8rem] font-bold text-[#CBD5E1] min-w-[44px] text-center">
                    {Math.round(lightbox.zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-[3px] font-mono text-[0.78rem] font-bold cursor-pointer transition-all hover:bg-accent disabled:opacity-40"
                    onClick={() => adjustZoom(0.25)}
                    disabled={lightbox.zoom >= 3}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="bg-steel-mid border border-white/18 text-white py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-[3px] font-mono text-[0.75rem] font-bold cursor-pointer transition-all hover:bg-accent"
                    onClick={() => setLightbox((prev) => ({ ...prev, zoom: 1, position: { x: 0, y: 0 } }))}
                  >
                    RESET
                  </button>
                  <button
                    type="button"
                    className="bg-accent/20 border border-accent/50 text-white w-[34px] h-[34px] sm:w-[36px] sm:h-[36px] rounded-[3px] inline-flex items-center justify-center cursor-pointer ml-1 hover:bg-accent transition-all"
                    onClick={closeLightbox}
                    aria-label="Close Lightbox"
                  >
                    <IconX size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={viewportRef}
                className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 bg-[radial-gradient(circle_at_center,#141D2D_0%,#090D14_100%)] select-none ${
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
                  className="max-w-[92%] max-h-[68vh] sm:max-h-[72vh] object-contain bg-white p-2 sm:p-3 rounded-[3px] shadow-2xl transition-transform duration-75 ease-out origin-center pointer-events-none"
                  style={{
                    transform: `scale(${lightbox.zoom}) translate(${lightbox.position.x / lightbox.zoom}px, ${lightbox.position.y / lightbox.zoom}px)`
                  }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="py-3 px-4 sm:px-6 bg-[#06090F] border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
                <p className="font-mono text-[0.72rem] sm:text-[0.8rem] text-[#94A3B8] m-0 text-center sm:text-left">
                  {lightbox.desc}
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-primary w-full sm:w-auto justify-center shrink-0"
                  onClick={() => {
                    const v = lightbox.variant || firstVariantRow;
                    closeLightbox();
                    openQuoteModal(product, v);
                  }}
                >
                  Request Quote For Spec
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProductDetailPage;
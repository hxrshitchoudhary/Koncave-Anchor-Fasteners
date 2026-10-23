import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, companyInfo } from '../data.js';
import {
  IconChevronRight,
  IconCheck,
  IconDownload,
  IconZoomIn,
  IconX,
  IconFileText
} from '../components/Icons.jsx';

const getMtcReportForRow = (article = "", drill = "") => {
  const art = article.toUpperCase();
  const isSS = art.includes("SA2") || art.includes("SA4");
  const d = parseInt(drill, 10);

  if (d === 8) {
    return {
      title: "M8 IS 1608 Lab Test Report",
      file: "/reports/8X100MM%20Anchor%20Test%20Report.pdf"
    };
  }
  if (d === 10) {
    if (isSS) {
      return {
        title: "SS M10 Pull-Out & Tensile MTC",
        file: "/reports/Atmay%20-%20SS%20M10%20-Pullout%20Test%20Certificate.pdf"
      };
    }
    return {
      title: "M10x100 Anchor Test Report",
      file: "/reports/10X100%20Anchor%20Test%20Report.pdf"
    };
  }
  if (d === 12) {
    if (isSS) {
      return {
        title: "SS M12 Wedge Anchor Pull-Out MTC",
        file: "/reports/Atmay%20SS%20M12%20Wedge%20Anchor%20-%20Pull%20Out%20Test.pdf"
      };
    }
    return {
      title: "M12x150 Anchor Test Report",
      file: "/reports/12X150%20Anchor%20Test%20Report.pdf"
    };
  }
  if (d === 16) {
    return {
      title: "M16x220 Heavy Duty Test Report",
      file: "/reports/16x220mm%20Anchor%20Test%20Report.pdf"
    };
  }
  return {
    title: "Master Anchor MTC Report",
    file: "/reports/Cocave%20Wedge%20Anchor.pdf"
  };
};

const ProductDetailPage = ({ openQuoteModal }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState('ALL');

  const [cadModal, setCadModal] = useState({
    isOpen: false,
    imageSrc: '',
    title: '',
    subtitle: '',
    variant: null,
    zoom: 1
  });

  useEffect(() => {
    setActiveTab('ALL');
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && cadModal.isOpen) {
        setCadModal((prev) => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cadModal.isOpen]);

  if (!product) {
    return (
      <div className="container-custom section-padding pt-navbar">
        <h2 className="text-[2rem]">Product not found</h2>
        <Link to="/products" className="btn btn-primary mt-6">Back to Catalogue</Link>
      </div>
    );
  }

  const openCadLightbox = ({ imageSrc, title, subtitle, variant = null }) => {
    setCadModal({
      isOpen: true,
      imageSrc: imageSrc || product.appReferenceImage || product.image,
      title: title || `${product.name} — CAD & Installation Blueprint`,
      subtitle: subtitle || 'IS 1608, P1:2022 Structural Cross-Section & Drilling Geometry',
      variant,
      zoom: 1
    });
  };

  const closeCadLightbox = () => {
    setCadModal((prev) => ({ ...prev, isOpen: false, zoom: 1 }));
  };

  const adjustZoom = (delta) => {
    setCadModal((prev) => {
      const next = Math.min(2.25, Math.max(1, Number((prev.zoom + delta).toFixed(2))));
      return { ...prev, zoom: next };
    });
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
    `px-4 py-2 rounded-[4px] font-sans text-[0.82rem] font-semibold cursor-pointer transition-all border ${
      isActive
        ? 'bg-steel-dark text-white border-steel-dark shadow-[0_2px_6px_rgba(9,13,20,0.18)]'
        : 'bg-bg-pedestal border-border-light text-text-secondary hover:bg-white hover:border-steel-light hover:text-steel-dark'
    }`;

  return (
    <div className="container-custom section-padding pt-navbar">
      <div className="mb-6 flex items-center gap-2 font-mono text-[0.8rem] font-bold uppercase text-text-secondary animate-fade-in">
        <Link to="/" className="hover:text-accent">Home</Link> <IconChevronRight size={14} />
        <Link to="/products" className="hover:text-accent">Product Range</Link> <IconChevronRight size={14} />
        <span className="text-steel-dark">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row bg-bg-card rounded-[3px] overflow-hidden shadow-sm border border-border-light mb-6">
        <div className="flex-[1.25] p-6 md:py-11 md:px-12 flex flex-col justify-center animate-slide-up-fade">
          <span className="font-mono text-[0.78rem] font-bold text-accent uppercase tracking-[1.5px] mb-1.5">
            {product.category}
          </span>
          <h1 className="text-[2.2rem] md:text-[2.8rem] text-steel-dark uppercase mb-3">{product.name}</h1>
          <p className="text-[1.02rem] text-text-secondary mb-6">{product.description}</p>
          <div>
            <h3 className="font-mono text-[0.8rem] uppercase tracking-[1px] text-text-secondary border-b border-border-light pb-2 mb-3">
              Approved By Infrastructure Authorities
            </h3>
            <div className="flex gap-2 flex-wrap">
              {companyInfo.approvals.map((app) => (
                <span
                  key={app}
                  className="bg-steel-dark text-white px-3.5 py-[5px] rounded-[3px] font-mono text-[0.76rem] font-bold tracking-[1px]"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mt-7">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openQuoteModal(product, firstVariantRow)}
            >
              Request Tender Quote
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() =>
                openCadLightbox({
                  imageSrc: product.appReferenceImage || product.image,
                  title: `${product.name} — Installation & Embedment Blueprint`,
                  subtitle: 'Full-Resolution Engineering Reference & Substrate Cross-Section',
                  variant: firstVariantRow
                })
              }
            >
              <IconZoomIn size={18} /> Open CAD Blueprint Viewer
            </button>
          </div>
        </div>

        <div
          className="flex-[0.95] bg-bg-pedestal bg-cover bg-center border-t-4 lg:border-t-0 lg:border-l-4 border-accent min-h-[260px] lg:min-h-[360px] relative cursor-zoom-in group animate-fade-in"
          style={{ backgroundImage: `url(${product.image})` }}
          onClick={() =>
            openCadLightbox({
              imageSrc: product.image,
              title: `${product.name} — Component Profile`,
              subtitle: `Materials: ${product.materials.join(' | ')}`,
              variant: firstVariantRow
            })
          }
          title="Click to inspect high-resolution product profile"
        >
          <div className="absolute bottom-3.5 right-3.5 bg-steel-dark/86 text-white px-3.5 py-[7px] rounded-[3px] border-l-[3px] border-l-accent font-mono text-[0.72rem] font-bold inline-flex items-center gap-1.5 tracking-[0.6px] uppercase transition-all group-hover:bg-accent">
            <IconZoomIn size={16} /> Click to Enlarge Spec View
          </div>
        </div>
      </div>

      {/* Quick MTC Certificate Access Strip */}
      <div className="flex justify-between items-center gap-6 bg-white border border-border-light border-l-[5px] border-l-accent py-4 px-6 rounded-[3px] mb-6 shadow-sm flex-wrap animate-fade-in">
        <div className="flex items-center gap-3.5">
          <IconFileText size={22} className="text-accent shrink-0" />
          <div>
            <strong className="block font-mono text-[0.8rem] text-steel-dark tracking-[0.8px]">
              INSTANT MATERIAL TEST CERTIFICATES (MTC)
            </strong>
            <span className="text-[0.86rem] text-text-secondary">
              Download NABL / IS 1608:2022 laboratory pull-out & tensile PDF certificates directly from any article row below.
            </span>
          </div>
        </div>
        <a
          href="/reports/Cocave%20Wedge%20Anchor.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="btn btn-sm btn-outline-dark"
        >
          <IconDownload size={15} /> Master Lab Dossier (PDF)
        </a>
      </div>

      {(hasA2 || hasA4 || hasGI) && product.sections?.length > 2 && (
        <div className="flex gap-2.5 flex-wrap mb-7 bg-bg-card py-4 px-5 rounded-[3px] border border-border-light items-center animate-fade-in">
          <span className="font-mono text-[0.78rem] font-bold uppercase text-text-secondary mr-2">
            Filter by Material Grade:
          </span>
          <button
            type="button"
            className={tabBtnClass(activeTab === 'ALL')}
            onClick={() => setActiveTab('ALL')}
          >
            All Specifications ({product.sections.length})
          </button>
          {hasA2 && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'A2')}
              onClick={() => setActiveTab('A2')}
            >
              Stainless Steel A2 (304)
            </button>
          )}
          {hasA4 && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'A4')}
              onClick={() => setActiveTab('A4')}
            >
              Stainless Steel A4 (316)
            </button>
          )}
          {hasGI && (
            <button
              type="button"
              className={tabBtnClass(activeTab === 'GI')}
              onClick={() => setActiveTab('GI')}
            >
              Galvanized Iron (G.I.)
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-8 w-full animate-fade-in" style={{ animationDelay: '0.15s' }}>
        {visibleSections?.map((section, secIdx) => (
          <div
            key={secIdx}
            className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift"
          >
            <div className="py-5 px-8 border-b border-border-light bg-bg-pedestal">
              <h2 className="text-[1.55rem] uppercase m-0">{section.title}</h2>
              {section.subtitle && (
                <p className="font-mono text-accent text-[0.8rem] font-semibold mt-1 mb-0">
                  {section.subtitle}
                </p>
              )}
            </div>

            <div className="w-full overflow-x-auto block">
              {section.type === 'variant' && (
                <table className="w-full border-collapse min-w-[720px]">
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
                        MTC & CAD
                      </th>
                      <th className="py-[13px] px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] whitespace-nowrap">
                        INQUIRY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => {
                      const mtcReport = getMtcReportForRow(row.article, row.drill);
                      return (
                        <tr
                          key={i}
                          className="even:bg-[#F8FAFC] transition-colors hover:bg-accent/5"
                        >
                          <td className="py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-accent">{row.article}</span>
                              <a
                                href={mtcReport.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="inline-flex items-center gap-1 py-0.5 px-[7px] bg-accent/9 border border-accent/30 text-accent rounded-[3px] font-mono text-[0.66rem] font-bold tracking-[0.4px] transition-all hover:bg-accent hover:text-white hover:border-accent"
                                title={`Download ${mtcReport.title} (PDF)`}
                              >
                                <IconDownload size={13} /> MTC PDF
                              </a>
                            </div>
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
                            <div className="inline-flex items-center gap-2">
                              <a
                                href={mtcReport.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="inline-flex items-center gap-[5px] py-[5px] px-2.5 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer transition-all uppercase bg-bg-pedestal border border-border-light text-steel-dark hover:bg-steel-dark hover:text-white hover:border-steel-dark"
                                title={mtcReport.title}
                              >
                                <IconFileText size={14} /> Test Cert
                              </a>
                              <button
                                type="button"
                                className="inline-flex items-center gap-[5px] py-[5px] px-2.5 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer transition-all uppercase bg-slate-900/5 border border-border-light text-text-secondary hover:bg-accent hover:text-white hover:border-accent"
                                onClick={() =>
                                  openCadLightbox({
                                    imageSrc: product.appReferenceImage || product.image,
                                    title: `CAD Blueprint // Article: ${row.article}`,
                                    subtitle: `${section.title} — IS 1608:2022 Installation Geometry`,
                                    variant: row
                                  })
                                }
                                title="Inspect CAD Blueprint & Dimensions"
                              >
                                <IconZoomIn size={14} /> CAD
                              </button>
                            </div>
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
                      );
                    })}
                  </tbody>
                </table>
              )}

              {section.type === 'tech' && (
                <table className="w-full border-collapse min-w-[720px]">
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i} className="even:bg-[#F8FAFC] transition-colors hover:bg-accent/5">
                        <th className="py-[13px] px-5 text-left border-b border-r border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] bg-bg-pedestal w-[35%] text-steel-dark whitespace-nowrap">
                          {row.label}
                        </th>
                        <td className="py-[13px] px-5 text-left border-b border-border-subtle font-sans font-medium text-[0.9rem] whitespace-normal">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {section.type === 'report' && (
                <table className="w-full border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-steel-mid text-white">
                      {section.headers.map((h, i) => (
                        <th
                          key={i}
                          className="py-[13px] px-5 text-left border-b border-border-subtle font-mono font-bold uppercase text-[0.76rem] tracking-[1px] whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr key={i} className="even:bg-[#F8FAFC] transition-colors hover:bg-accent/5">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`py-[13px] px-5 text-left border-b border-border-subtle font-mono text-[0.86rem] whitespace-nowrap ${
                              cellIdx === 0 ? 'font-bold text-steel-dark' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}

        {product.applications && (
          <div className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift">
            <div className="py-5 px-8 border-b border-border-light bg-bg-pedestal">
              <h2 className="text-[1.55rem] uppercase m-0">Common Structural Applications</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 py-7 px-8">
              {product.applications.map((app, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-bg-pedestal py-3 px-3.5 rounded-[3px] border border-border-light font-semibold text-[0.9rem]"
                >
                  <IconCheck size={20} className="text-accent shrink-0" /> {app}
                </div>
              ))}
            </div>
          </div>
        )}

        {product.appReferenceImage && (
          <div className="bg-bg-card rounded-[3px] shadow-sm border border-border-light border-t-4 border-t-steel-dark overflow-hidden w-full hover-lift">
            <div className="py-5 px-8 border-b border-border-light bg-bg-pedestal flex justify-between items-center gap-6 flex-wrap">
              <div>
                <h2 className="text-[1.55rem] uppercase m-0">Application & Installation References</h2>
                <p className="font-mono text-accent text-[0.8rem] font-semibold mt-1 mb-0">
                  CLICK DRAWING TO LAUNCH INTERACTIVE FULL-SCREEN CAD BLUEPRINT VIEWER
                </p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() =>
                  openCadLightbox({
                    imageSrc: product.appReferenceImage,
                    title: `${product.name} — Technical CAD & Installation Reference`,
                    subtitle: 'Drill Diameter, Embedment Depth & Edge-Distance Cross-Section',
                    variant: firstVariantRow
                  })
                }
              >
                <IconZoomIn size={16} /> Full-Screen CAD Blueprint
              </button>
            </div>
            <div
              className="p-8 flex justify-center items-center bg-white relative cursor-zoom-in overflow-hidden group"
              onClick={() =>
                openCadLightbox({
                  imageSrc: product.appReferenceImage,
                  title: `${product.name} — Technical CAD & Installation Reference`,
                  subtitle: 'Drill Diameter, Embedment Depth & Edge-Distance Cross-Section',
                  variant: firstVariantRow
                })
              }
            >
              <img
                src={product.appReferenceImage}
                alt="Application References"
                className="max-w-full h-auto max-h-[580px] object-contain rounded-[2px]"
              />
              <div className="absolute inset-0 bg-steel-dark/62 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-250 group-hover:opacity-100">
                <div className="inline-flex items-center gap-2.5 bg-steel-dark text-white border border-white/20 border-l-4 border-l-accent py-3.5 px-6 rounded-[3px] font-mono text-[0.85rem] font-bold tracking-[1px] shadow-lg">
                  <IconZoomIn size={24} />
                  <span>OPEN FULL-SCREEN CAD BLUEPRINT VIEWER</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Technical CAD Drawing Lightbox Modal */}
      {cadModal.isOpen && (
        <div
          className="fixed inset-0 z-[100000] bg-[#05080E]/88 backdrop-blur-md flex items-center justify-center p-3 md:p-8 animate-fade-in"
          onClick={closeCadLightbox}
        >
          <div
            className="w-full max-w-[1320px] h-[88vh] bg-steel-dark border border-white/18 border-t-4 border-t-accent rounded-[4px] shadow-[0_30px_70px_rgba(0,0,0,0.65)] flex flex-col overflow-hidden text-white blueprint-grid"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top CAD Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4.5 px-7 bg-[#06090F] border-b border-white/12">
              <div>
                <span className="font-mono text-[0.68rem] font-bold text-accent tracking-[1.4px]">
                  CAD BLUEPRINT // IS 1608:2022
                </span>
                <h3 className="text-white text-[1.55rem] uppercase mt-0.5 mb-0">{cadModal.title}</h3>
                <p className="font-mono text-[0.75rem] text-[#94A3B8] m-0">{cadModal.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-steel-mid border border-white/18 text-white py-[7px] px-[13px] rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:enabled:bg-accent hover:enabled:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => adjustZoom(-0.25)}
                  disabled={cadModal.zoom <= 1}
                >
                  −
                </button>
                <span className="font-mono text-[0.8rem] font-bold text-[#CBD5E1] min-w-[52px] text-center">
                  {Math.round(cadModal.zoom * 100)}%
                </span>
                <button
                  type="button"
                  className="bg-steel-mid border border-white/18 text-white py-[7px] px-[13px] rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:enabled:bg-accent hover:enabled:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => adjustZoom(0.25)}
                  disabled={cadModal.zoom >= 2.25}
                >
                  +
                </button>
                <button
                  type="button"
                  className="bg-steel-mid border border-white/18 text-white py-[7px] px-[13px] rounded-[3px] font-mono text-[0.8rem] font-bold cursor-pointer transition-all hover:bg-accent hover:border-accent"
                  onClick={() => setCadModal((prev) => ({ ...prev, zoom: 1 }))}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="bg-accent/18 border border-accent/50 text-white w-[38px] h-[38px] rounded-[3px] inline-flex items-center justify-center cursor-pointer ml-1.5 transition-all hover:bg-accent"
                  onClick={closeCadLightbox}
                  aria-label="Close CAD Viewer"
                >
                  <IconX size={22} />
                </button>
              </div>
            </div>

            {/* Main Interactive Blueprint Viewport */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_330px] overflow-hidden">
              <div className="relative overflow-auto flex items-center justify-center p-10 bg-[radial-gradient(circle_at_center,#141D2D_0%,#090D14_100%)]">
                <div className="absolute top-3.5 left-4.5 font-mono text-[0.68rem] text-white/45 tracking-[1.2px] pointer-events-none z-[2]">
                  SCALE: 1:1 NOMINAL // METRIC (MM)
                </div>
                <div className="absolute bottom-3.5 right-4.5 font-mono text-[0.68rem] text-white/45 tracking-[1.2px] pointer-events-none z-[2]">
                  KONCAVE ENGINEERING // ISO 9001:2015
                </div>
                <img
                  src={cadModal.imageSrc}
                  alt={cadModal.title}
                  className="max-w-[92%] max-h-[92%] object-contain bg-white p-3.5 rounded-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-200 origin-center"
                  style={{ transform: `scale(${cadModal.zoom})` }}
                />
              </div>

              {/* Right Engineering Telemetry Drawer inside Lightbox */}
              <aside className="bg-[#0D131E] border-t lg:border-t-0 lg:border-l border-white/10 py-7 px-6 flex flex-col gap-5 overflow-y-auto">
                <h4 className="text-white font-mono text-[0.82rem] tracking-[1.5px] border-b border-white/12 pb-2.5 m-0">
                  DIMENSIONAL TELEMETRY
                </h4>
                {cadModal.variant ? (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">SELECTED ARTICLE</span>
                      <strong className="font-mono text-[0.92rem] text-accent">{cadModal.variant.article}</strong>
                    </div>
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">NOMINAL DRILL BORE (d₀)</span>
                      <strong className="font-mono text-[0.92rem] text-white">{cadModal.variant.drill}</strong>
                    </div>
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">TOTAL ANCHOR LENGTH (L)</span>
                      <strong className="font-mono text-[0.92rem] text-white">{cadModal.variant.length}</strong>
                    </div>
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">MIN. EMBEDMENT DEPTH (hₑf)</span>
                      <strong className="font-mono text-[0.92rem] text-white">{cadModal.variant.embed || 'Fixture Dependent'}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">PRODUCT SERIES</span>
                      <strong className="font-mono text-[0.92rem] text-white">{product.name}</strong>
                    </div>
                    <div className="bg-white/4 border border-white/8 border-l-[3px] border-l-accent py-2.5 px-3 rounded-[2px]">
                      <span className="block font-mono text-[0.66rem] text-[#94A3B8]">TEST METHOD</span>
                      <strong className="font-mono text-[0.92rem] text-white">IS 1608, P1:2022</strong>
                    </div>
                  </div>
                )}

                <div>
                  <span className="block font-mono text-[0.68rem] text-[#94A3B8] mb-2">
                    SWITCH VIEWPORT DRAWING
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.appReferenceImage && (
                      <button
                        type="button"
                        className={`py-2 px-2.5 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer border ${
                          cadModal.imageSrc === product.appReferenceImage
                            ? 'bg-accent border-accent text-white'
                            : 'bg-white/5 border-white/14 text-[#CBD5E1]'
                        }`}
                        onClick={() =>
                          setCadModal((prev) => ({
                            ...prev,
                            imageSrc: product.appReferenceImage,
                            zoom: 1
                          }))
                        }
                      >
                        Installation CAD
                      </button>
                    )}
                    <button
                      type="button"
                      className={`py-2 px-2.5 rounded-[3px] font-mono text-[0.72rem] font-bold cursor-pointer border ${
                        cadModal.imageSrc === product.image
                          ? 'bg-accent border-accent text-white'
                          : 'bg-white/5 border-white/14 text-[#CBD5E1]'
                      }`}
                      onClick={() =>
                        setCadModal((prev) => ({
                          ...prev,
                          imageSrc: product.image,
                          zoom: 1
                        }))
                      }
                    >
                      Fastener Profile
                    </button>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2.5">
                  {cadModal.variant && (
                    <a
                      href={getMtcReportForRow(cadModal.variant.article, cadModal.variant.drill).file}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn btn-sm btn-outline-white w-full"
                    >
                      <IconDownload size={15} /> Download Article MTC (PDF)
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-primary w-full"
                    onClick={() => {
                      const v = cadModal.variant || firstVariantRow;
                      closeCadLightbox();
                      openQuoteModal(product, v);
                    }}
                  >
                    Request Quote For Spec
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
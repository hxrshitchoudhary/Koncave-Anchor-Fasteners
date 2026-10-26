import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, companyInfo } from '../data.js';
import { IconCheck, IconChevronRight, IconShield, IconMapPin, IconPhone, IconMail } from './Icons.jsx';

const QuoteModal = ({ quoteData }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const initialProductId = quoteData?.product?.id || products[0].id;
  const [selectedProdId, setSelectedProdId] = useState(initialProductId);

  const activeProduct = products.find((p) => p.id === selectedProdId) || products[0];
  const allVariants = activeProduct.sections
    ?.filter((s) => s.type === 'variant')
    .flatMap((s) => s.rows) || [];

  const [selectedArticle, setSelectedArticle] = useState(
    quoteData?.variant?.article || allVariants[0]?.article || "Custom / Multiple Sizes"
  );
  const [selectedGrade, setSelectedGrade] = useState("Stainless Steel A2 (304)");

  useEffect(() => {
    if (quoteData?.product) {
      setSelectedProdId(quoteData.product.id);
    }
    if (quoteData?.variant?.article) {
      setSelectedArticle(quoteData.variant.article);
    }
  }, [quoteData]);

  const handleProductChange = (e) => {
    const newId = e.target.value;
    setSelectedProdId(newId);
    const prod = products.find((p) => p.id === newId);
    const firstVar = prod?.sections?.find((s) => s.type === 'variant')?.rows?.[0]?.article || "All / Multiple Sizes";
    setSelectedArticle(firstVar);
  };

  const currentVariantObj = allVariants.find((v) => v.article === selectedArticle) || quoteData?.variant || null;

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.target);
    formData.append("access_key", "e769da46-1e41-45e4-ae33-acae1bc6b547");

    const subject = `Website RFQ: ${activeProduct.name} (Article: ${selectedArticle})`;
    formData.append("subject", subject);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-3.5 py-3 border border-border-light bg-bg-pedestal rounded-[4px] font-sans text-[0.95rem] text-text-primary transition-all focus:outline-none focus:border-accent focus:bg-white focus:ring-3 focus:ring-accent/10";
  const labelClass =
    "font-mono text-[0.76rem] font-bold text-steel-dark uppercase tracking-[0.5px]";

  return (
    <div className="min-h-[calc(100vh-88px)] pt-navbar animate-page-reveal">
      <section className="bg-steel-dark py-14 border-b-4 border-accent text-white blueprint-grid">
        <div className="container-custom">
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.8rem] font-bold uppercase text-[#94A3B8]">
            <Link to="/" className="hover:text-accent">Home</Link> <IconChevronRight size={14} />
            <Link to="/products" className="hover:text-accent">Products</Link> <IconChevronRight size={14} />
            <span className="text-white">Engineering RFQ & Bulk Inquiry</span>
          </div>
          <span className="section-pre-title !justify-start"><span></span> DIRECT FACTORY QUOTATION</span>
          <h1 className="text-white text-[2.4rem] md:text-[3.2rem] uppercase mb-2">
            Request Fastener Pricing & Technical Submittal
          </h1>
          <p className="text-[#94A3B8] max-w-[680px] m-0 text-[1.05rem]">
            Configure your anchor specifications below. Our engineering sales desk provides factory-direct pricing, IS 1608 test certificates, and rapid dispatch schedules.
          </p>
        </div>
      </section>

      <section className="section-padding container-custom !pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-10 mt-10 items-start">
          {/* Left Animated Specification Summary & Direct Contact */}
          <aside className="flex flex-col gap-6 animate-slide-left">
            <div className="bg-steel-dark text-white p-8 rounded-[3px] border-t-4 border-accent shadow-md blueprint-grid">
              <h3 className="text-white text-[1.5rem] uppercase mb-4 pb-3 border-b border-white/12">
                Selected Specification
              </h3>

              <div className="bg-white/5 border border-white/12 border-l-4 border-l-accent p-5 rounded-[2px] mb-5">
                <span className="font-mono text-[0.72rem] text-[#94A3B8] uppercase block">
                  {activeProduct.category}
                </span>
                <span className="font-display text-[1.4rem] text-white font-extrabold uppercase mb-2 block">
                  {activeProduct.name}
                </span>

                <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-dashed border-white/15">
                  <div>
                    <span className="block font-mono text-[0.7rem] text-[#94A3B8]">ARTICLE CODE</span>
                    <strong className="font-mono text-[0.92rem] text-accent">{selectedArticle}</strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-[#94A3B8]">DRILL / LENGTH</span>
                    <strong className="font-mono text-[0.92rem] text-accent">
                      {currentVariantObj
                        ? `${currentVariantObj.drill} × ${currentVariantObj.length}`
                        : "As Specified"}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-[#94A3B8]">MATERIAL GRADE</span>
                    <strong className="font-mono text-[0.8rem] text-white">{selectedGrade}</strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.7rem] text-[#94A3B8]">TEST STANDARD</span>
                    <strong className="font-mono text-[0.8rem] text-white">IS 1608, P1:2022</strong>
                  </div>
                </div>
              </div>

              <ul className="list-none flex flex-col gap-2.5 mt-4">
                <li className="flex items-center gap-2.5 text-[0.88rem] text-[#CBD5E1]">
                  <IconCheck size={18} className="text-accent shrink-0" /> ISO 9001:2015 Certified Manufacturing
                </li>
                <li className="flex items-center gap-2.5 text-[0.88rem] text-[#CBD5E1]">
                  <IconCheck size={18} className="text-accent shrink-0" /> NABL / IS 1608 Pull-Out & Tensile Reports Included
                </li>
                <li className="flex items-center gap-2.5 text-[0.88rem] text-[#CBD5E1]">
                  <IconCheck size={18} className="text-accent shrink-0" /> 100% Batch Tested for Structural & Seismic Loads
                </li>
                <li className="flex items-center gap-2.5 text-[0.88rem] text-[#CBD5E1]">
                  <IconCheck size={18} className="text-accent shrink-0" /> Pan-India Dispatch from Rohtak, Haryana
                </li>
              </ul>
            </div>

            <div className="bg-bg-card border border-border-light p-7 rounded-[3px] shadow-sm">
              <h4 className="text-[1.35rem] uppercase mb-4">Direct Engineering Desk</h4>
              <ul className="list-none flex flex-col gap-4 w-full text-text-secondary">
                <li className="flex gap-3 text-[0.9rem] items-start leading-[1.5]">
                  <IconMapPin size={20} className="text-accent shrink-0 mt-[3px]" />
                  <span>{companyInfo.address}</span>
                </li>
                <li className="flex gap-3 text-[0.9rem] items-start leading-[1.5]">
                  <IconPhone size={20} className="text-accent shrink-0 mt-[3px]" />
                  <span className="font-mono font-bold text-steel-dark">{companyInfo.phones.join(' / ')}</span>
                </li>
                <li className="flex gap-3 text-[0.9rem] items-start leading-[1.5]">
                  <IconMail size={20} className="text-accent shrink-0 mt-[3px]" />
                  <span className="font-mono font-bold text-steel-dark">{companyInfo.email}</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Animated Form Card */}
          <div className="bg-bg-card border border-border-light border-t-[5px] border-t-accent p-7 px-5 md:p-11 rounded-[3px] shadow-md animate-slide-right">
            {status === "success" ? (
              <div className="text-center py-12 px-6">
                <div className="text-[#16A34A] mb-4 inline-flex"><IconCheck size={64} /></div>
                <h2 className="text-[2rem] uppercase">RFQ Submitted Successfully</h2>
                <p className="mt-6 text-text-secondary">
                  Thank you for your inquiry regarding <strong>{activeProduct.name} ({selectedArticle})</strong>. Our engineering sales team will respond shortly with pricing and technical documentation.
                </p>
                <div className="flex gap-3 justify-center mt-8 flex-wrap">
                  <button type="button" className="btn btn-primary" onClick={() => setStatus("idle")}>
                    Submit Another Inquiry
                  </button>
                  <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/products')}>
                    Return to Catalogue
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 pb-4 border-b border-border-subtle">
                  <h2 className="text-[2.1rem] uppercase mb-1">Project & Fastener Requirement Form</h2>
                  <p className="text-text-secondary text-[0.95rem] m-0">
                    Complete all required fields (*) to receive an official factory quotation.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <input
                    type="hidden"
                    name="Product_Requested"
                    value={`${activeProduct.name} | Article: ${selectedArticle} | Grade: ${selectedGrade}`}
                  />

                  <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>1. Select Fastener Series *</label>
                      <select
                        name="fastener_series"
                        value={selectedProdId}
                        onChange={handleProductChange}
                        className={inputClass}
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>2. Select Article / Size Variant *</label>
                      <select
                        name="article_variant"
                        value={selectedArticle}
                        onChange={(e) => setSelectedArticle(e.target.value)}
                        className={inputClass}
                      >
                        <option value="Multiple Sizes / As Per BOQ">Multiple Sizes / As Per BOQ</option>
                        {allVariants.map((v, i) => (
                          <option key={i} value={v.article}>
                            {v.article} — Drill: {v.drill}, Length: {v.length}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={labelClass}>3. Preferred Material Grade *</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {[
                        "Stainless Steel A2 (304)",
                        "Stainless Steel A4 (316)",
                        "Carbon Steel Galvanized (G.I.)"
                      ].map((grade) => (
                        <div
                          key={grade}
                          onClick={() => setSelectedGrade(grade)}
                          className={`px-4 py-2 rounded-[4px] font-sans text-[0.82rem] font-semibold cursor-pointer transition-all border text-center ${
                            selectedGrade === grade
                              ? 'bg-steel-dark text-white border-steel-dark shadow-[0_2px_6px_rgba(9,13,20,0.18)]'
                              : 'bg-bg-pedestal border-border-light text-text-secondary hover:bg-white hover:border-steel-light hover:text-steel-dark'
                          }`}
                        >
                          {grade}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Full Name *</label>
                      <input type="text" name="name" required placeholder="e.g., Rajesh Sharma" className={inputClass} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Company / Contractor Name *</label>
                      <input type="text" name="company" required placeholder="e.g., Apex Infrastructure Ltd." className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Official Email Address *</label>
                      <input type="email" name="email" required placeholder="procurement@company.com" className={inputClass} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Phone / WhatsApp Number *</label>
                      <input type="tel" name="phone" required placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Estimated Order Quantity *</label>
                      <input type="text" name="quantity" required placeholder="e.g., 10,000 Pieces" className={inputClass} />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 text-left">
                      <label className={labelClass}>Project Location / Delivery City *</label>
                      <input type="text" name="delivery_city" required placeholder="e.g., New Delhi / Mumbai" className={inputClass} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={labelClass}>Project Specifications / Custom BOQ Details *</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="Specify required delivery timeline, test documentation needed, or custom sizes..."
                      className={inputClass}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-large w-full"
                    disabled={status === 'submitting'}
                  >
                    <IconShield size={20} />
                    {status === "submitting" ? "Transmitting Engineering RFQ..." : "Submit Official Quote Request"}
                  </button>

                  {status === "error" && (
                    <p className="text-accent font-semibold text-[0.9rem] m-0">
                      Something went wrong while sending your request. Please try again or call us directly.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteModal;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data.js';
import { IconSearch, IconArrowRight } from '../components/Icons.jsx';

const categories = ['All', ...new Set(products.map((p) => p.category))];

const CatalogPage = ({ openQuoteModal }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  const filtered = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.materials.some((m) => m.toLowerCase().includes(term)) ||
      p.applications?.some((app) => app.toLowerCase().includes(term));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-custom section-padding pt-navbar animate-fade-in pb-24">
      <div className="flex flex-col gap-6 mb-10 bg-bg-card p-6 md:p-9 rounded-[4px] shadow-sm border border-border-light border-l-[6px] border-l-accent">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <div>
            <span className="section-pre-title !justify-start"><span></span> ENGINEERED FASTENERS</span>
            <h1 className="text-[2.2rem] md:text-[2.6rem] uppercase m-0 text-steel-dark">Product Portfolio</h1>
          </div>

          <div className="flex items-center bg-bg-pedestal px-4 py-[11px] rounded-[4px] w-full md:w-[360px] border border-border-light focus-within:border-accent focus-within:bg-white shadow-xs">
            <IconSearch size={20} className="text-text-secondary shrink-0" />
            <input
              type="text"
              placeholder="Search anchor, grade, or application..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none bg-transparent outline-none w-full ml-2.5 font-sans text-[0.95rem]"
            />
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap pt-4 border-t border-border-subtle">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-[4px] font-sans text-[0.82rem] font-semibold cursor-pointer transition-all border ${
                selectedCategory === cat
                  ? 'bg-steel-dark text-white border-steel-dark shadow-sm'
                  : 'bg-bg-pedestal border-border-light text-text-secondary hover:bg-white hover:border-steel-light hover:text-steel-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filtered.map((product, idx) => {
          const defaultVariant = product.sections?.find((s) => s.type === 'variant')?.rows?.[0];

          return (
            <div
              key={product.id}
              className="flex flex-col md:flex-row bg-bg-card rounded-[4px] overflow-hidden border border-border-light shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-steel-dark"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div
                className="w-full md:w-[310px] min-h-[200px] md:min-h-[220px] bg-bg-pedestal bg-cover bg-center border-b-4 md:border-b-0 md:border-r-4 border-accent shrink-0"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>

              <div className="p-6 md:py-8 md:px-9 flex-1 flex flex-col justify-center">
                <span className="font-mono text-[0.75rem] font-bold text-accent uppercase tracking-[1.5px] mb-1.5 block">
                  {product.category}
                </span>
                <h2 className="text-[2rem] text-steel-dark uppercase mb-2">{product.name}</h2>
                <p className="text-text-secondary text-[0.95rem] mb-4">{product.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {product.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="bg-bg-pedestal border border-border-light text-steel-dark px-3 py-[5px] rounded-[3px] font-mono text-[0.74rem] font-semibold"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto md:min-w-[240px] py-5 px-6 md:p-8 flex flex-col items-center justify-center gap-2.5 bg-bg-pedestal border-t md:border-t-0 md:border-l border-border-light">
                <span className="font-mono text-[0.72rem] text-text-secondary uppercase">
                  {product.sections?.length || 0} Data Tables
                </span>
                <Link to={`/product/${product.id}`} className="btn btn-primary w-full group">
                  Technical Data <IconArrowRight size={16} className="transition-transform duration-250 group-hover:translate-x-1" />
                </Link>
                {openQuoteModal && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark w-full"
                    onClick={() => openQuoteModal(product, defaultVariant)}
                  >
                    Request Quote
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-bg-card p-12 text-center border border-border-light rounded-[4px] font-semibold text-text-secondary">
            No products found matching "{searchTerm}" in {selectedCategory}.
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
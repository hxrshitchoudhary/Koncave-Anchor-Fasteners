import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import QuoteModal from './components/QuoteModal.jsx';
import ScrollToTop from './components/ScrollToTopButton.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CertificationsPage from './pages/CertificationsPage.jsx';
import ApplicationsPage from './pages/ApplicationsPage.jsx';
import './App.css';

function AppContent() {
  const [quoteData, setQuoteData] = useState(null);
  const navigate = useNavigate();

  const openGeneralInquiry = () => {
    setQuoteData(null);
    navigate('/inquiry');
  };

  const openProductQuote = (product, variant = null) => {
    const defaultVariant = variant || product?.sections?.find((s) => s.type === 'variant')?.rows?.[0] || null;
    setQuoteData({ product, variant: defaultVariant });
    navigate('/inquiry');
  };

  return (
    <div className="app-layout">
      <Navbar openInquiryModal={openGeneralInquiry} />

      <main className="main-area">
        <Routes>
          <Route path="/" element={<HomePage openQuoteModal={openProductQuote} openInquiryModal={openGeneralInquiry} />} />
          <Route path="/products" element={<CatalogPage openQuoteModal={openProductQuote} />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetailPage openQuoteModal={openProductQuote} />} />
          <Route path="/inquiry" element={<QuoteModal quoteData={quoteData} setQuoteData={setQuoteData} />} />
        </Routes>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
# 🏗️ Koncave Anchor Fastners - Corporate Website

The official corporate catalog and lead-generation website for Koncave Anchor & Fasteners Pvt. Ltd. This project is a modern, high-performance React application designed to showcase technical anchoring products, provide downloadable MTC test reports, and seamlessly collect client inquiries.

## ✨ Key Features
- 📖 **Dynamic Product Catalog**: Centralized database architecture (`data.js`) rendering technical tables, size variants, and structural applications automatically.
- 📱 **Fully Responsive Design**: Styled with Tailwind CSS to ensure flawless presentation across desktops, tablets, and mobile devices—including scrollable data tables.
- ✉️ **Integrated Bulk Inquiry System**: Powered by Web3Forms for secure, backend-free quote requests and specification submissions.
- 📄 **Lab Test Reports & Certifications**: Accessible MTC PDF reports and verified ISO quality compliance documentation.
- ⚡ **Blazing Fast Builds**: Powered by Vite for instant Hot Module Replacement (HMR) and optimized production performance.

## 🛠️ Tech Stack
- **Frontend**: React.js (v18+) with React Router v6
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Form Handling**: Web3Forms API
- **Icons**: Pure Native Inline SVGs (`Icons.jsx`)

## 📂 Project Structure
```text
├── public/                  # Static assets folder (served at root)
│   ├── Applications/        # Sector application photos
│   ├── Certificates/        # ISO compliance certificates
│   ├── factory_images/      # Plant floor infrastructure photos
│   ├── images/              # Product portfolio & hero images
│   ├── reports/             # Downloadable PDF test reports (MTC)
│   └── logo.svg             # Main vector logo
├── src/                     # React source code
│   ├── components/          # Reusable UI components (Navbar, Footer, Icons, etc.)
│   ├── pages/               # Route views (HomePage, CatalogPage, ProductDetailPage, etc.)
│   ├── App.css              # Global styles & Tailwind directives
│   ├── App.jsx              # Root routing configuration
│   ├── data.js              # Central product database & specifications
│   └── main.jsx             # React entry point
└── package.json             # Project metadata and dependencies
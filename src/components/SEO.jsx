import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Koncave Anchor & Fasteners Pvt. Ltd. | Structural Anchor Manufacturer",
  description = "Manufacturer of high-tensile wedge anchors, flush drop-in anchors, and nylon frame fasteners in Stainless Steel 304, 316, and Carbon Steel. IS 1608:2022 lab tested in Rohtak, Haryana.",
  keywords = "wedge anchor manufacturer, structural fasteners India, drop in anchor, nylon frame anchor, stainless steel anchors A2 A4, Rohtak fasteners, IS 1608 tensile test, Koncave Anchor Fasteners",
  canonical = "https://koncave.co.in/",
  schemaJson = null
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Koncave Anchor & Fasteners Pvt. Ltd." />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://koncave.co.in/images/og-image.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://koncave.co.in/images/og-image.jpg" />

      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
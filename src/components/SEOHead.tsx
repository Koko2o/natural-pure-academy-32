
import { Helmet } from 'react-helmet-async';
import React from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: SEOHeadProps) {
  const siteUrl = window.location.origin;
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : window.location.href;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Nonprofit metadata for Google Ad Grant compliance */}
      <meta name="organization-type" content="nonprofit" />
      <meta name="organization-purpose" content="education" />
    </Helmet>
  );
}

export default SEOHead;

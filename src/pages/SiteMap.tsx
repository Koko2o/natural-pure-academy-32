
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sitemap from '@/components/Sitemap';
import { useTranslation } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEOHead';

const SiteMap = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={t('Site Map - Natural Pure Academy')}
        description={t('Navigate our scientific resources, research, and educational content with our comprehensive site map.')}
      />
      <Navbar />
      <main className="min-h-screen">
        <Sitemap />
      </main>
      <Footer />
    </div>
  );
};

export default SiteMap;

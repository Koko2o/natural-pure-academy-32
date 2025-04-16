
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScientificMethodologyComponent from '@/components/ScientificMethodology';
import { useTranslation } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/SEOHead';

const ScientificMethodology = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={t('Our Scientific Methodology - Natural Pure Academy')}
        description={t('Learn about our rigorous scientific approach, research protocols, and evidence-based methods that ensure the reliability of our findings.')}
      />
      <Navbar />
      <main className="min-h-screen">
        <ScientificMethodologyComponent />
      </main>
      <Footer />
    </div>
  );
};

export default ScientificMethodology;

import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Toaster } from '@/components/ui/toaster';
import './App.css';

import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';
import TranslationDebugger from './components/TranslationDebugger';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import MetricTracker from "./components/MetricTracker";
import ConversionTracker from "./components/ConversionTracker";
import ArticleEngagementTracker from "./components/ArticleEngagementTracker"; 
import ComplianceAlert from '@/components/ComplianceAlert';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';


const queryClient = new QueryClient();

const App: React.FC = () => {
  // Mode débogage pour les traductions - à désactiver en production
  const isTranslationDebugEnabled = localStorage.getItem('debugTranslation') === 'true';
  const { language, t } = useLanguage();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <div className="app flex min-h-screen flex-col bg-background">
              <Helmet>
                <html lang={language} />
                <meta name="description" content={t('meta.description')} />
                <meta name="language" content={language} />
              </Helmet>
              <Navbar />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
              <Toaster />
              <MetricTracker />
              <ConversionTracker />
              <ArticleEngagementTracker />
              <ComplianceAlert />
              {process.env.NODE_ENV !== 'production' && isTranslationDebugEnabled && <TranslationDebugger />} 
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
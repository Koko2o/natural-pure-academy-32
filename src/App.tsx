import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster'; // Corrected import path
import './App.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageDebugger from '@/components/LanguageDebugger';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import MetricTracker from "./components/MetricTracker";
import ConversionTracker from "./components/ConversionTracker";
import ArticleEngagementTracker from "./components/ArticleEngagementTracker"; 
import ComplianceAlert from '@/components/ComplianceAlert'; 
import { autoCheckCompliance } from '@/utils/adGrantCompliance'; 


const queryClient = new QueryClient();

const App: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialisation au montage du composant
  useEffect(() => {
    // Vérifier et appliquer la langue stockée lors du montage initial
    try {
      // Vérifier d'abord le paramètre d'URL (priorité maximale)
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');

      if (langParam === 'fr' || langParam === 'en') {
        console.log(`[App] Applying language from URL parameter: ${langParam}`);
        setLanguage(langParam as 'fr' | 'en');
      } else {
        // Sinon, utiliser localStorage
        const storedLanguage = localStorage.getItem('preferredLanguage');
        if (storedLanguage === 'fr' || storedLanguage === 'en') {
          console.log(`[App] Applied stored language on mount: ${storedLanguage}`);
          setLanguage(storedLanguage as 'fr' | 'en');
        }
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('[App] Error applying stored language:', error);
      setIsInitialized(true);
    }
  }, [setLanguage]);

  // Écouter les changements de langue
  useEffect(() => {
    if (isInitialized) {
      console.log(`[App] Language changed to: ${language}. Updating application...`);

      // Appliquer la langue au document HTML
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-language', language);

      // Appliquer les classes CSS
      if (language === 'fr') {
        document.body.classList.add('lang-fr');
        document.body.classList.remove('lang-en');
      } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-fr');
      }

      // Persister dans localStorage
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language, isInitialized]);


  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className={`app flex min-h-screen flex-col bg-background lang-${language}`}>
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
            <LanguageDebugger />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
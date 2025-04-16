import React from 'react';
import { Outlet, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Added import for TranslationDebugger
import { TranslationDebugger } from '@/components/TranslationHelper';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import MetricTracker from "./components/MetricTracker";
import ConversionTracker from "./components/ConversionTracker";
import ArticleEngagementTracker from "./components/ArticleEngagementTracker"; 
import ComplianceAlert from '@/components/ComplianceAlert';

const queryClient = new QueryClient();

const App: React.FC = () => {
  // Mode débogage pour les traductions - à désactiver en production
  const isTranslationDebugEnabled = localStorage.getItem('debugTranslation') === 'true';

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <div className="app flex min-h-screen flex-col bg-background">
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
              {isTranslationDebugEnabled && <TranslationDebugger />} {/* Added TranslationDebugger conditionally */}
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;

// Placeholder for TranslationDebugger component (needs to be implemented separately)
export const TranslationDebugger = () => {
  return <div>Translation Debugger</div>;
}
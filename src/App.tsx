import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageDebugger from '@/components/LanguageDebugger';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import MetricTracker from "./components/MetricTracker";
import ConversionTracker from "./components/ConversionTracker";
import ArticleEngagementTracker from "./components/ArticleEngagementTracker"; 
import ComplianceAlert from '@/components/ComplianceAlert';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
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
            <LanguageDebugger />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
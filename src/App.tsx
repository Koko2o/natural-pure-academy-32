import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import MetricTracker from "./components/MetricTracker";
import ConversionTracker from "./components/ConversionTracker";
import Article from "./pages/Article";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Nutrition from "./pages/Nutrition";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import ProfileSante from "./pages/ProfileSante";
import LaboSolutions from "./pages/LaboSolutions";
import SocialRedirect from "./pages/SocialRedirect";
import AISystem from './pages/AISystem';
import AILearningDashboard from './pages/AILearningDashboard';
import AIConfigurationDashboard from './pages/AIConfigurationDashboard';
import NosRecherches from "@/pages/NosRecherches";
import BibliothequeScientifique from './pages/BibliothequeScientifique';
import { bannedTerms, detectBannedTerms, auditPageContent } from "./utils/contentSafety";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import ArticleEngagementTracker from "./components/ArticleEngagementTracker"; 
import ComplianceAlert from '@/components/ComplianceAlert'; 
import { autoCheckCompliance } from '@/utils/adGrantCompliance'; 
import LanguageDebugger from '@/components/LanguageDebugger'; 

const queryClient = new QueryClient();

const runContentSafetyCheck = () => {
  console.log("[GoogleAdGrantsSafety] Scanning for banned terms:", bannedTerms.join(', '));
  const pageContent = document.body.textContent?.toLowerCase() || '';
  const foundTerms = detectBannedTerms(pageContent);

  if (foundTerms.length > 0) {
    console.warn("[GoogleAdGrantsSafety] Detected potentially problematic terms:", foundTerms);
    const auditResults = auditPageContent(document.body.innerHTML);
    console.warn("[GoogleAdGrantsSafety] Compliance audit:", {
      isCompliant: auditResults.isCompliant,
      issuesCount: auditResults.issues.length,
      details: auditResults.issues
    });
    document.querySelectorAll('p, h1, h2, h3, h4, h5, div, button, a').forEach((element) => {
      const content = element.textContent?.toLowerCase() || '';
      const hasBannedTerm = foundTerms.some(term => content.includes(term));
      if (hasBannedTerm) {
        console.warn("[GoogleAdGrantsSafety] Problematic section:", {
          content: element.textContent,
          element: element.tagName,
          path: getElementPath(element as HTMLElement)
        });
        element.setAttribute('data-compliance-issue', 'true');
      }
    });
    if (window.localStorage.length > 0) {
      console.log("[GoogleAdGrantsSafety] Storage check: Using secured session storage instead of localStorage");
    }
  } else {
    console.log("[GoogleAdGrantsSafety] No banned terms detected on this page");
  }
};

const getElementPath = (element: HTMLElement) => {
  const path: string[] = [];
  let currentElement: HTMLElement | null = element;
  while (currentElement && currentElement !== document.body) {
    let selector = currentElement.tagName.toLowerCase();
    if (currentElement.id) {
      selector += `#${currentElement.id}`;
    } else if (currentElement.className) {
      selector += `.${Array.from(currentElement.classList).join('.')}`;
    }
    path.unshift(selector);
    currentElement = currentElement.parentElement;
  }
  return path.join(' > ');
};

const App = () => {
  const { language, setLanguage } = useLanguage();
  const [activeAIModel] = useState("optimized");

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && (storedLang === 'en' || storedLang === 'fr') && storedLang !== language) {
      console.log(`[App] Applied stored language on mount: ${storedLang}`);
      setLanguage(storedLang as 'en' | 'fr');
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      console.log(`[App] Language changed to: ${e.detail}. Updating application...`);
      setLanguage(e.detail as 'en' | 'fr'); // Apply the changed language
    };
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);


  useEffect(() => {
    console.log(`[AI] Loading ${activeAIModel} recommendation model...`);
  }, [activeAIModel]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="antialiased">
            <div className="min-h-screen bg-background">
              <Toaster position="top-right" />
              <Outlet />
              <MetricTracker />
              <ConversionTracker />
              <ArticleEngagementTracker />
              <ComplianceAlert />
              <LanguageDebugger /> {/* Moved LanguageDebugger here for better visibility */}
            </div>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
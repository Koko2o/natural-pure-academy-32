import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import router from './routes.tsx';
import './index.css';

// Fonction pour détecter les changements de langue
const setupLanguageMonitoring = () => {
  // Synchroniser immédiatement la langue avec l'attribut HTML
  const storedLanguage = localStorage.getItem('preferredLanguage');
  console.log(`[LanguageMonitor] Initial language from storage: ${storedLanguage || 'not set'}`);
  
  // Appliquer immédiatement la langue au document HTML
  if (storedLanguage === 'fr' || storedLanguage === 'en') {
    document.documentElement.lang = storedLanguage;
    document.documentElement.setAttribute('data-language', storedLanguage);
    
    // Appliquer des classes CSS pour le ciblage
    if (storedLanguage === 'fr') {
      document.body.classList.add('lang-fr');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');
    }
    
    console.log(`[LanguageMonitor] Applied stored language to document: ${storedLanguage}`);
  }

  // Écouter les changements de langue provenant de divers événements
  document.addEventListener('app-language-changed', (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log(`[LanguageMonitor] Language change detected:`, customEvent.detail);
  });
  
  window.addEventListener('languageChange', (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log(`[LanguageMonitor] languageChange event detected:`, customEvent.detail);
  });
};

// Initialisation du moniteur de langue
setupLanguageMonitoring();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
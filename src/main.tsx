import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import router from './routes.tsx';
import './index.css';

// Fonction pour détecter les changements de langue
const setupLanguageMonitoring = () => {
  const storedLanguage = localStorage.getItem('preferredLanguage');
  console.log(`[LanguageMonitor] Initial language from storage: ${storedLanguage || 'not set'}`);

  document.addEventListener('app-language-changed', (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log(`[LanguageMonitor] Language change detected:`, customEvent.detail);
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
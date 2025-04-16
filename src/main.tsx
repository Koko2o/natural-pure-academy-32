import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import router from './routes.tsx';
import './index.css';

// Fonction pour détecter les changements de langue et assurer la cohérence
const setupLanguageMonitoring = () => {
  try {
    // Récupérer la langue depuis localStorage
    const storedLanguage = localStorage.getItem('preferredLanguage');
    console.log(`[LanguageMonitor] Initial language from storage: ${storedLanguage || 'not set'}`);

    // S'il n'y a pas de langue stockée, définir l'anglais par défaut
    if (!storedLanguage) {
      console.log(`[LanguageMonitor] No language preference found, setting English as default`);
      localStorage.setItem('preferredLanguage', 'en');
      document.documentElement.lang = 'en';
      document.documentElement.setAttribute('data-language', 'en');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-fr');
    } 
    // Sinon, appliquer la langue stockée
    else if (storedLanguage === 'fr' || storedLanguage === 'en') {
      // Application forcée des attributs HTML et des classes CSS
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

      // Réappliquer après un court délai pour s'assurer que les styles persistent
      setTimeout(() => {
        document.documentElement.lang = storedLanguage;
        if (storedLanguage === 'fr') {
          document.body.classList.add('lang-fr');
          document.body.classList.remove('lang-en');
        } else {
          document.body.classList.add('lang-en');
          document.body.classList.remove('lang-fr');
        }
      }, 100);

      console.log(`[LanguageMonitor] Applied stored language to document: ${storedLanguage}`);
    }

    // Vérifier la cohérence entre localStorage et les attributs HTML
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang !== storedLanguage) {
      console.warn(`[LanguageMonitor] Inconsistency detected: HTML lang=${htmlLang}, localStorage=${storedLanguage}`);
      // En cas d'incohérence, préférer localStorage
      if (storedLanguage === 'fr' || storedLanguage === 'en') {
        document.documentElement.lang = storedLanguage;
        console.log(`[LanguageMonitor] Fixed inconsistency by setting HTML lang to ${storedLanguage}`);
      }
    }

    // Écouter les changements de langue provenant de divers événements
    document.addEventListener('app-language-changed', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[LanguageMonitor] Language change detected:`, customEvent.detail);

      // Vérifier la cohérence après un changement
      setTimeout(() => {
        const currentStoredLang = localStorage.getItem('preferredLanguage');
        const currentHtmlLang = document.documentElement.lang;

        if (currentHtmlLang !== currentStoredLang) {
          console.warn(`[LanguageMonitor] Post-change inconsistency: HTML=${currentHtmlLang}, localStorage=${currentStoredLang}`);
          // Synchroniser si nécessaire
          if (currentStoredLang === 'fr' || currentStoredLang === 'en') {
            document.documentElement.lang = currentStoredLang;
          }
        }
      }, 300);
    });

    window.addEventListener('languageChange', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[LanguageMonitor] languageChange event detected:`, customEvent.detail);
    });
  } catch (error) {
    console.error('[LanguageMonitor] Error during setup:', error);
  }
};

// Initialisation du moniteur de langue
setupLanguageMonitoring();

// Vérifier explicitement si l'URL contient un paramètre de langue
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
if (langParam === 'en' || langParam === 'fr') {
  console.log(`[main] URL language parameter detected: ${langParam}, applying`);
  localStorage.setItem('preferredLanguage', langParam);
  document.documentElement.lang = langParam;
  document.documentElement.setAttribute('data-language', langParam);

  if (langParam === 'fr') {
    document.body.classList.add('lang-fr');
    document.body.classList.remove('lang-en');
  } else {
    document.body.classList.add('lang-en');
    document.body.classList.remove('lang-fr');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
    {import.meta.env.DEV && <TranslationDebugger />}
  </React.StrictMode>,
)

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React, { Suspense, lazy } from 'react';
import { TranslationDebugger } from '@/components/TranslationDebugger';
import { Helmet } from 'react-helmet-async';

// Lazy-loaded route components
const Home = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Articles = lazy(() => import('@/pages/Articles'));
const Article = lazy(() => import('@/pages/Article'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const LaboSolutions = lazy(() => import('@/pages/LaboSolutions'));
const ProfileSante = lazy(() => import('@/pages/ProfileSante'));
const BibliothequeScientifique = lazy(() => import('@/pages/BibliothequeScientifique'));
const NosRecherches = lazy(() => import('@/pages/NosRecherches'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  const { t, showDebugger } = useLanguage();

  return (
    <>
      <Helmet>
        <html lang={t('language_code')} />
        <title>{t('app_title')}</title>
        <meta name="description" content={t('app_description')} />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/labo-solutions" element={<LaboSolutions />} />
              <Route path="/profile-sante" element={<ProfileSante />} />
              <Route path="/bibliotheque-scientifique" element={<BibliothequeScientifique />} />
              <Route path="/nos-recherches" element={<NosRecherches />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        
        {/* Translation Debugger (only shown when enabled) */}
        {showDebugger && <TranslationDebugger />}
      </div>
    </>
  );
}

export default App;

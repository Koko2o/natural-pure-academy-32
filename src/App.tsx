import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
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
import { bannedTerms, detectBannedTerms, auditPageContent } from "./utils/contentSafety";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 2, // 2 heures exactement (ISR)
    },
  },
});

// Fonction pour détecter les termes interdits de manière optimisée
const runContentSafetyCheck = () => {
  console.log("[GoogleAdGrantsSafety] Scanning for banned terms:", bannedTerms.join(', '));

  // Version améliorée qui scanne le contenu complet
  const pageContent = document.body.textContent?.toLowerCase() || '';
  const foundTerms = detectBannedTerms(pageContent);

  if (foundTerms.length > 0) {
    console.warn("[GoogleAdGrantsSafety] Detected potentially problematic terms:", foundTerms);

    // Dans un contexte réel, on pourrait:
    // 1. Envoyer ces données à un système de surveillance
    // 2. Déclencher une alerte pour l'administrateur
    // 3. Appliquer un système de filtrage automatique

    // Analyse complète de la page pour détection de contexte
    const auditResults = auditPageContent(document.body.innerHTML);

    console.warn("[GoogleAdGrantsSafety] Compliance audit:", {
      isCompliant: auditResults.isCompliant,
      issuesCount: auditResults.issues.length,
      details: auditResults.issues
    });

    // Logique pour détecter les sections problématiques (exemple amélioré)
    document.querySelectorAll('p, h1, h2, h3, h4, h5, div, button, a').forEach((element) => {
      const content = element.textContent?.toLowerCase() || '';
      const hasBannedTerm = foundTerms.some(term => content.includes(term));

      if (hasBannedTerm) {
        // Enregistrer les sections problématiques pour faciliter le nettoyage
        console.warn("[GoogleAdGrantsSafety] Problematic section:", {
          content: element.textContent,
          element: element.tagName,
          path: getElementPath(element as HTMLElement)
        });

        // Option : ajouter un attribut data pour des outils de visualisation
        element.setAttribute('data-compliance-issue', 'true');
      }
    });

    // Tester la présence de cookies (localStorage)
    console.assert(window.localStorage.length === 0, "COOKIE LEAK DETECTED");
  } else {
    console.log("[GoogleAdGrantsSafety] No banned terms detected on this page");
  }
};

// Fonction utilitaire pour obtenir le chemin d'un élément dans le DOM
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
  // Lancer la détection au chargement de chaque page avec un délai adaptatif
  useEffect(() => {
    // Amélioration : utiliser un timestamp précis pour mesurer le temps réel
    const startTime = performance.now();

    // Délai pour s'assurer que la page est complètement chargée
    // Utiliser requestIdleCallback pour les navigateurs modernes
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        runContentSafetyCheck();
        console.log(`[GoogleAdGrantsSafety] First scan completed in ${(performance.now() - startTime).toFixed(2)}ms`);
      }, { timeout: 2000 });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas requestIdleCallback
      const timer = setTimeout(() => {
        runContentSafetyCheck();
        console.log(`[GoogleAdGrantsSafety] First scan completed in ${(performance.now() - startTime).toFixed(2)}ms`);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Vérification supplémentaire après le chargement complet des ressources
    window.addEventListener('load', () => {
      setTimeout(() => {
        runContentSafetyCheck();
        console.log(`[GoogleAdGrantsSafety] Post-load scan completed in ${(performance.now() - startTime).toFixed(2)}ms`);
      }, 2500);
    }, { once: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profil-sante" element={<ProfileSante />} />
            <Route path="/labo-solutions" element={<LaboSolutions />} />
            <Route path="/redirect/social" element={<SocialRedirect />} />
            <Route path="/ai-system" element={<AISystem />} />
            <Route path="/ai-learning" element={<AILearningDashboard />} />
        <Route path="/ai-config" element={<AIConfigurationDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
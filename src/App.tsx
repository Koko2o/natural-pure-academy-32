
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

const queryClient = new QueryClient();

// Liste des termes interdits par Google Ad Grants
const bannedTerms = [
  'achat', 'promo', 'commander', 'prix', 'offre', 'rabais', 
  'boutique', 'vente', 'acheter', 'soldes', 'discount', 'bon marché',
  'économies', 'réduction', 'promotion', 'meilleur prix', 'tarif'
];

// Fonction pour détecter les termes interdits
const detectBannedTerms = () => {
  // Cette fonction pourrait être utilisée dans un contexte réel pour scanner le contenu
  // et alerter ou nettoyer automatiquement les termes interdits
  console.log("[GoogleAdGrantsSafety] Scanning for banned terms:", bannedTerms.join(', '));
  
  // Version simplifiée pour la démonstration
  const pageContent = document.body.textContent?.toLowerCase() || '';
  const foundTerms = bannedTerms.filter(term => pageContent.includes(term.toLowerCase()));
  
  if (foundTerms.length > 0) {
    console.warn("[GoogleAdGrantsSafety] Detected potentially problematic terms:", foundTerms);
    // Dans un contexte réel, on pourrait envoyer ces données à un système de surveillance
  } else {
    console.log("[GoogleAdGrantsSafety] No banned terms detected on this page");
  }
};

const App = () => {
  // Lancer la détection au chargement de chaque page
  useEffect(() => {
    // Délai pour s'assurer que la page est complètement chargée
    const timer = setTimeout(() => {
      detectBannedTerms();
    }, 1000);
    
    return () => clearTimeout(timer);
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

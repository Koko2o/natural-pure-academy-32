
import { useState, useEffect } from "react";
import { ArrowUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileOptimizerProps {
  children: React.ReactNode;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
  ctaAction?: () => void;
}

const MobileOptimizer = ({
  children,
  showCta = true,
  ctaText = "Voir mon Profil",
  ctaHref = "/quiz",
  ctaAction
}: MobileOptimizerProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  
  // Gérer le défilement et l'affichage des éléments flottants
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton de retour en haut après 300px de défilement
      setShowScrollTop(window.scrollY > 300);
      
      // Afficher le CTA flottant après 600px de défilement
      if (showCta) {
        setShowFloatingCta(window.scrollY > 600);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showCta]);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const handleCtaClick = () => {
    if (ctaAction) {
      ctaAction();
    } else if (ctaHref) {
      window.location.href = ctaHref;
    }
  };
  
  const dismissCookie = () => {
    setShowCookie(false);
    // N'utilise pas localStorage pour la conformité
    sessionStorage.setItem("cookie_notice_seen", "true");
  };
  
  // Vérifier si la bannière de cookie a déjà été affichée
  useEffect(() => {
    if (sessionStorage.getItem("cookie_notice_seen") === "true") {
      setShowCookie(false);
    }
  }, []);
  
  return (
    <div className="relative">
      {/* Contenu principal */}
      <div className="mobile-optimized-content">
        {children}
      </div>
      
      {/* Bannière cookie en bas */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 z-50 animate-fade-in">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm mr-4">
              Ce site n'utilise que des cookies strictement nécessaires pour votre expérience.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-white border-white hover:bg-slate-700"
              onClick={dismissCookie}
            >
              J'ai compris
            </Button>
          </div>
        </div>
      )}
      
      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-20 right-4 p-2 rounded-full bg-slate-800/80 text-white shadow-md z-40 hover:bg-slate-700 transition-all"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      {/* CTA flottant */}
      {showFloatingCta && showCta && (
        <div className="fixed bottom-20 left-4 z-40 animate-fade-in">
          <Button
            onClick={handleCtaClick}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg quiz-cta px-5 py-6"
          >
            {ctaText}
          </Button>
        </div>
      )}
      
      {/* Indicateur de progression */}
      <div 
        className="fixed top-0 left-0 h-1 bg-indigo-600 z-50 transition-all duration-200" 
        style={{ 
          width: `${Math.min(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 
            100
          )}%` 
        }}
      />
      
      <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .mobile-optimized-content {
          scroll-padding-top: 80px;
        }
        
        @media (max-width: 768px) {
          .mobile-optimized-content h1 {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .mobile-optimized-content h2 {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .mobile-optimized-content p {
            font-size: 1rem;
            line-height: 1.5rem;
          }
        }
      `}
      </style>
    </div>
  );
};

export default MobileOptimizer;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, X } from "lucide-react";
import { secureStorage } from "@/utils/complianceFilter";

interface GDPRComplianceProps {
  services: string[];
  lang?: "fr" | "en";
  policyLink?: string;
}

const GDPRCompliance = ({
  services = ["basic_analytics"],
  lang = "fr",
  policyLink = "/politique-confidentialite"
}: GDPRComplianceProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const userConsent = secureStorage.get<{ consented: boolean }>("gdpr_consent", { consented: false });
    setConsented(userConsent.consented);
    
    // Afficher la bannière si l'utilisateur n'a pas encore consenti
    if (!userConsent.consented) {
      setShowBanner(true);
    }
  }, []);
  
  const handleAccept = () => {
    secureStorage.set("gdpr_consent", { 
      consented: true, 
      date: new Date().toISOString(),
      services: services
    });
    setConsented(true);
    setShowBanner(false);
  };
  
  const handleReject = () => {
    secureStorage.set("gdpr_consent", { 
      consented: false, 
      date: new Date().toISOString()
    });
    setConsented(false);
    setShowBanner(false);
  };
  
  const translations = {
    fr: {
      title: "Votre confidentialité",
      description: "Nous utilisons des cookies pour améliorer votre expérience et analyser l'utilisation du site.",
      services: "Services utilisés:",
      analytics: "Analyse d'audience",
      heatmaps: "Cartographies de chaleur",
      basic_analytics: "Statistiques de base",
      accept: "Accepter",
      reject: "Refuser",
      policy: "Politique de confidentialité"
    },
    en: {
      title: "Your Privacy",
      description: "We use cookies to enhance your experience and analyze site usage.",
      services: "Services used:",
      analytics: "Audience analytics",
      heatmaps: "Heat maps",
      basic_analytics: "Basic statistics",
      accept: "Accept",
      reject: "Decline",
      policy: "Privacy Policy"
    }
  };
  
  const t = translations[lang];
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-indigo-100 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.title}</h3>
              <p className="text-gray-600 mb-3">{t.description}</p>
              
              {services.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t.services}</p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <div key={service} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t[service as keyof typeof t] || service}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row-reverse sm:items-center gap-3">
                <Button 
                  onClick={handleAccept}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {t.accept}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleReject}
                >
                  {t.reject}
                </Button>
                {policyLink && (
                  <a 
                    href={policyLink} 
                    className="text-indigo-600 text-sm hover:underline sm:mr-auto"
                  >
                    {t.policy}
                  </a>
                )}
              </div>
            </div>
            <button 
              onClick={() => setShowBanner(false)} 
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRCompliance;

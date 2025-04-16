
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { secureStorage } from '@/utils/secureStorage';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface GDPRComplianceProps {
  services?: string[];
  lang?: "fr" | "en";
  policyLink?: string;
}

const GDPRCompliance: React.FC<GDPRComplianceProps> = ({
  services = ["basic_analytics"],
  lang = "en",
  policyLink = "/privacy-policy"
}: GDPRComplianceProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user has already given consent
    const checkConsent = async () => {
      const userConsent = await secureStorage.get<{ consented: boolean }>("gdpr_consent", { consented: false });
      setConsented(userConsent.consented);
      
      // Show banner if user hasn't consented yet
      if (!userConsent.consented) {
        setShowBanner(true);
      }
    };
    
    checkConsent();
  }, []);
  
  const handleAccept = async () => {
    await secureStorage.set("gdpr_consent", { 
      consented: true, 
      date: new Date().toISOString(),
      services: services
    });
    setConsented(true);
    setShowBanner(false);
  };
  
  const handleReject = async () => {
    await secureStorage.set("gdpr_consent", { 
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
      heatmaps: "Cartographies de clics",
      marketing: "Marketing (uniquement pour les études)",
      accept: "Accepter",
      reject: "Refuser",
      settings: "Paramètres",
      policy: "Politique de confidentialité",
      nonprofit: "Organisation à but non lucratif"
    },
    en: {
      title: "Your Privacy",
      description: "We use cookies to improve your experience and analyze site usage.",
      services: "Services used:",
      analytics: "Audience analytics",
      heatmaps: "Click heatmaps",
      marketing: "Marketing (for studies only)",
      accept: "Accept",
      reject: "Decline",
      settings: "Settings",
      policy: "Privacy Policy",
      nonprofit: "Non-profit organization"
    }
  };
  
  const t = translations[lang];
  
  if (!showBanner) return null;
  
  const serviceLabels: Record<string, string> = {
    basic_analytics: t.analytics,
    heatmaps: t.heatmaps,
    marketing: t.marketing
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container max-w-7xl mx-auto">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                {t.title}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowBanner(false)}
                aria-label="Close privacy notice"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <p className="mb-4 text-muted-foreground">{t.description}</p>
                
                <div className="mb-4">
                  <p className="font-medium mb-2">{t.services}</p>
                  <ul className="space-y-1">
                    {services.map((service) => (
                      <li key={service} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{serviceLabels[service] || service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{t.nonprofit}</span>
                  <span>•</span>
                  <a href={policyLink} className="underline hover:text-primary transition-colors">
                    {t.policy}
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/3 flex flex-col justify-end">
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleAccept}>
                    {t.accept}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleReject}
                  >
                    {t.reject}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GDPRCompliance;

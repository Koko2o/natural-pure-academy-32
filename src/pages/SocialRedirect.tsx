
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SocialRedirect = () => {
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(2);
  const [completed, setCompleted] = useState(false);
  const location = useLocation();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const network = queryParams.get('network') || 'ig';
  const source = queryParams.get('source') || 'unknown';
  
  // Determine the actual redirect URL based on the network
  const getRedirectUrl = () => {
    switch(network) {
      case 'ig':
        return 'https://instagram.com/naturalandpure';
      case 'fb':
        return 'https://facebook.com/naturalandpure';
      case 'tw':
        return 'https://twitter.com/naturalandpure';
      default:
        return 'https://instagram.com/naturalandpure';
    }
  };
  
  const redirectUrl = getRedirectUrl();
  
  // Log this redirection
  useEffect(() => {
    // In a real implementation, this would be sent to your analytics system
    console.log("Social redirection:", {
      timestamp: new Date().toISOString(),
      network,
      source,
      destination: redirectUrl
    });
  }, [network, source, redirectUrl]);
  
  // Progress bar and countdown effect
  useEffect(() => {
    const totalSeconds = 2;
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += 0.1;
      const newProgress = Math.min(100, (elapsed / totalSeconds) * 100);
      setProgress(newProgress);
      setSecondsLeft(Math.max(0, Math.ceil(totalSeconds - elapsed)));
      
      if (elapsed >= totalSeconds) {
        clearInterval(interval);
        setCompleted(true);
        
        // Perform actual redirect
        // Uncomment this in production to enable automatic redirect
        // window.location.href = redirectUrl;
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [redirectUrl]);
  
  // Handle manual redirection
  const handleRedirect = () => {
    // Open in new tab with proper attributes for security
    window.open(redirectUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col bg-natural-50/30">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg border-natural-200">
          <CardContent className="p-6 md:p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-natural-100 rounded-full flex items-center justify-center">
                {network === 'ig' && <ExternalLink className="h-8 w-8 text-natural-600" />}
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-natural-800 mb-2">
                  Redirection vers une ressource externe
                </h1>
                <p className="text-natural-600">
                  Vous êtes sur le point d'être redirigé vers notre espace de ressources scientifiques.
                </p>
              </div>
              
              {!completed ? (
                <div className="space-y-4">
                  <div className="text-center mb-2">
                    <span className="text-lg font-medium">{secondsLeft}s</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-natural-500">
                    Préparation de la redirection...
                  </p>
                </div>
              ) : (
                <Button 
                  onClick={handleRedirect}
                  className="w-full bg-natural-600 hover:bg-natural-700"
                >
                  Continuer vers la ressource externe
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              <div className="border-t border-natural-200 pt-4 mt-4">
                <div className="flex items-start gap-2 text-sm text-natural-500 bg-natural-50 p-3 rounded-lg">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-natural-400" />
                  <div>
                    <p className="font-medium text-natural-600 mb-1">Information importante</p>
                    <p>Vous quittez notre site éducatif pour accéder à une ressource externe. 
                    Nous ne vendons ni ne promouvons aucun produit commercial.</p>
                    <p className="mt-2">Ce contenu est fourni à titre informatif uniquement et ne remplace pas un avis médical professionnel.</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-natural-400">
                <p>Source: {source} | Destination: Ressource scientifique externe</p>
                <p>ID de redirection: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default SocialRedirect;

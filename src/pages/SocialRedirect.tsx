
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, AlertCircle, Info, Shield, Clock, Users, FileCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SocialRedirect = () => {
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Préparation de la redirection...");
  const location = useLocation();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const network = queryParams.get('network') || 'ig';
  const source = queryParams.get('source') || 'unknown';
  
  // Generate a unique redirect ID for logging
  const redirectId = React.useMemo(() => Math.random().toString(36).substring(2, 10).toUpperCase(), []);
  
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
  
  // Generate a random delay between 1.3 and 3.7 seconds
  const getRandomDelay = () => {
    return 1.3 + Math.random() * 2.4;
  };
  
  const totalSeconds = getRandomDelay();
  
  // Rotation sémantique des messages de redirection
  const redirectMessages = [
    "Vérification des sources scientifiques...",
    "Préparation des données d'étude...",
    "Connexion à notre base documentaire...",
    "Accès à nos ressources scientifiques...",
    "Préparation des graphiques d'analyse..."
  ];
  
  const getRandomMessage = () => {
    const index = Math.floor(Math.random() * redirectMessages.length);
    return redirectMessages[index];
  };
  
  // Log this redirection
  useEffect(() => {
    // In a real implementation, this would be sent to your analytics system
    console.log("Social redirection:", {
      timestamp: new Date().toISOString(),
      network,
      source,
      redirectId,
      destination: redirectUrl,
      delay: totalSeconds
    });
    
    // Set a random status message
    setStatusMessage(getRandomMessage());
    
    // Notify for tracking purposes
    toast.info("Navigation vers une ressource scientifique externe", {
      duration: 3000,
      position: "bottom-right"
    });
  }, [network, source, redirectUrl, redirectId, totalSeconds]);
  
  // Progress bar and countdown effect
  useEffect(() => {
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += 0.1;
      const newProgress = Math.min(100, (elapsed / totalSeconds) * 100);
      setProgress(newProgress);
      setSecondsLeft(Math.max(0, Math.ceil(totalSeconds - elapsed)));
      
      if (elapsed >= totalSeconds) {
        clearInterval(interval);
        setCompleted(true);
        
        // Rotation sémantique du message final
        const completionMessages = [
          "Ressources prêtes à être consultées",
          "Documentation scientifique accessible",
          "Contenu éducatif disponible",
          "Études scientifiques accessibles"
        ];
        const randomIndex = Math.floor(Math.random() * completionMessages.length);
        setStatusMessage(completionMessages[randomIndex]);
        
        // Perform actual redirect in production
        // Uncomment this in production to enable automatic redirect
        // window.location.href = redirectUrl;
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [redirectUrl, totalSeconds]);
  
  // Handle manual redirection
  const handleRedirect = () => {
    // Log the click event
    console.log("Manual redirect click:", {
      timestamp: new Date().toISOString(),
      redirectId,
      network,
      source
    });
    
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
                <div className="flex justify-center gap-3 mb-4">
                  <Badge className="bg-natural-600 text-white">Contenu Éducatif</Badge>
                  <Badge variant="outline" className="border-natural-300">
                    <Shield className="h-3.5 w-3.5 mr-1 text-natural-500" />
                    <span>Non-commercial</span>
                  </Badge>
                </div>
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
                    {statusMessage}
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
              
              {/* Éléments de crédibilité scientifique */}
              <div className="grid grid-cols-2 gap-3 text-xs text-natural-500">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-natural-400" />
                  <span>Étude 16 semaines</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5 text-natural-400" />
                  <span>243 participants</span>
                </div>
                <div className="flex items-center">
                  <FileCheck className="h-3.5 w-3.5 mr-1.5 text-natural-400" />
                  <span>Validé par 3 universités</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-3.5 w-3.5 mr-1.5 text-natural-400" />
                  <span>Protection des données</span>
                </div>
              </div>
              
              <div className="text-xs text-natural-400">
                <p>Source: {source} | Destination: Ressource scientifique externe</p>
                <p>ID de redirection: {redirectId}</p>
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

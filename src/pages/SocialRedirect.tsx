
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { validateRedirectUrl } from "@/utils/complianceFilter";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, AlertTriangle } from "lucide-react";

const SocialRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [url, setUrl] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    const target = searchParams.get("target");
    
    if (target) {
      try {
        // Décoder l'URL cible
        const decodedUrl = atob(target);
        setUrl(decodedUrl);
        
        // Valider l'URL
        const valid = validateRedirectUrl(decodedUrl);
        setIsValid(valid);
        
        // Si URL valide, démarrer le compte à rebours
        if (valid) {
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                // Rediriger lorsque le compte à rebours atteint zéro
                window.location.href = decodedUrl;
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          return () => clearInterval(interval);
        }
      } catch (e) {
        console.error("Erreur lors du décodage de l'URL", e);
        setIsValid(false);
      }
    } else {
      // Pas de paramètre target, rediriger vers la page d'accueil
      navigate("/");
    }
  }, [searchParams, navigate]);
  
  const handleReturn = () => {
    navigate(-1);
  };
  
  const handleContinue = () => {
    if (url && isValid) {
      window.location.href = url;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          {isValid ? (
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          )}
          
          <h1 className="text-2xl font-bold mb-2">
            {isValid ? "Redirection externe" : "Redirection non autorisée"}
          </h1>
          <p className="text-slate-600 mb-4">
            {isValid 
              ? "Vous allez être redirigé vers un site externe." 
              : "Cette redirection n'est pas autorisée pour des raisons de sécurité."}
          </p>
        </div>
        
        {isValid && url && (
          <>
            <div className="border border-slate-200 rounded-lg p-4 mb-6 break-all">
              <p className="text-sm text-slate-500 mb-1">Lien de destination:</p>
              <div className="flex items-center gap-2 text-slate-700">
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span>{url}</span>
              </div>
            </div>
            
            <p className="text-center mb-6">
              Redirection automatique dans <span className="font-semibold text-indigo-600">{countdown}</span> secondes...
            </p>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handleReturn}
              >
                Retour au site
              </Button>
              <Button 
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                onClick={handleContinue}
              >
                Continuer
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 mt-6 text-center">
              Vous quittez notre site informatif. Nous ne sommes pas responsables du contenu des sites externes.
            </p>
          </>
        )}
        
        {!isValid && (
          <div className="text-center">
            <Button onClick={handleReturn} className="bg-indigo-600 hover:bg-indigo-700">
              Retour au site
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialRedirect;

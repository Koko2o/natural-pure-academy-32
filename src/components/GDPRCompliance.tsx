
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

const GDPR_CONSENT_KEY = 'gdpr_consent_status';
const GDPR_CONSENT_VERSION = '1.0.2';

export function GDPRCompliance() {
  const [open, setOpen] = useState(false);
  const [consentGiven, setConsentGiven] = useState(true);
  const [essentialChecked, setEssentialChecked] = useState(true);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  
  useEffect(() => {
    const storedConsent = localStorage.getItem(GDPR_CONSENT_KEY);
    
    if (!storedConsent) {
      // No consent stored, show the dialog
      setTimeout(() => setOpen(true), 1000);
      setConsentGiven(false);
    } else {
      try {
        const { version, consented, preferences } = JSON.parse(storedConsent);
        
        // If the version has changed, show the dialog again
        if (version !== GDPR_CONSENT_VERSION) {
          setTimeout(() => setOpen(true), 1000);
          setConsentGiven(false);
        } else {
          setConsentGiven(consented);
          if (preferences) {
            setEssentialChecked(preferences.essential);
            setAnalyticsChecked(preferences.analytics);
            setMarketingChecked(preferences.marketing);
          }
        }
      } catch (e) {
        // Invalid stored consent, show the dialog
        setTimeout(() => setOpen(true), 1000);
        setConsentGiven(false);
      }
    }
  }, []);
  
  const handleSavePreferences = () => {
    const consentData = {
      version: GDPR_CONSENT_VERSION,
      consented: true,
      timestamp: new Date().toISOString(),
      preferences: {
        essential: essentialChecked,
        analytics: analyticsChecked,
        marketing: marketingChecked
      }
    };
    
    localStorage.setItem(GDPR_CONSENT_KEY, JSON.stringify(consentData));
    setConsentGiven(true);
    setOpen(false);
  };
  
  const handleRejectAll = () => {
    const consentData = {
      version: GDPR_CONSENT_VERSION,
      consented: false,
      timestamp: new Date().toISOString(),
      preferences: {
        essential: true,
        analytics: false,
        marketing: false
      }
    };
    
    localStorage.setItem(GDPR_CONSENT_KEY, JSON.stringify(consentData));
    setEssentialChecked(true);
    setAnalyticsChecked(false);
    setMarketingChecked(false);
    setConsentGiven(false);
    setOpen(false);
  };
  
  const openPreferences = () => {
    setOpen(true);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Paramètres de confidentialité
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, 
              analyser le trafic et personnaliser le contenu. Vous pouvez choisir quels types de cookies vous acceptez.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="essential" 
                  checked={essentialChecked} 
                  disabled 
                />
                <Label htmlFor="essential" className="font-medium">
                  Cookies essentiels
                  <p className="text-xs text-muted-foreground">Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="analytics" 
                  checked={analyticsChecked} 
                  onCheckedChange={(checked) => setAnalyticsChecked(checked === true)}
                />
                <Label htmlFor="analytics" className="font-medium">
                  Cookies analytiques
                  <p className="text-xs text-muted-foreground">Nous aident à comprendre comment vous utilisez notre site.</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketing" 
                  checked={marketingChecked} 
                  onCheckedChange={(checked) => setMarketingChecked(checked === true)}
                />
                <Label htmlFor="marketing" className="font-medium">
                  Cookies de marketing
                  <p className="text-xs text-muted-foreground">Utilisés pour vous montrer des contenus pertinents.</p>
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:space-x-2">
            <Button variant="outline" onClick={handleRejectAll}>
              Rejeter tout
            </Button>
            <Button type="submit" onClick={handleSavePreferences}>
              Enregistrer les préférences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {!open && (
        <button 
          onClick={openPreferences}
          className="fixed bottom-4 left-4 z-50 bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
          aria-label="Paramètres de confidentialité"
        >
          <Shield className="h-5 w-5 text-primary" />
        </button>
      )}
    </>
  );
}

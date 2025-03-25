
import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const InstagramCTA = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-natural-100 via-natural-50 to-white rounded-xl">
      <div className="absolute inset-0 pattern-dots pattern-natural-600/10 pattern-bg-transparent pattern-size-4 opacity-40"></div>
      <div className="relative container mx-auto px-4 py-8 md:py-10">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-natural-500/20 rounded-full mb-2">
            <Instagram className="h-6 w-6 text-natural-700" />
          </div>
          <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight text-natural-800">
            Rejoignez notre communauté Instagram
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-3">
            <span className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Conseils quotidiens
            </span>
            <span className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Recettes exclusives
            </span>
            <span className="px-3 py-1 text-sm bg-natural-100 text-natural-700 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500 mr-1.5"></span>
              Dernières innovations
            </span>
          </div>
          
          <div className="pt-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-6 py-5 text-base bg-natural-600 hover:bg-natural-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Instagram className="h-5 w-5 mr-2" />
                  Suivre @NaturalAndPure
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center p-2 bg-natural-100 rounded-full mb-3">
                    <Instagram className="h-5 w-5 text-natural-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Rejoignez notre communauté</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scannez ce QR code avec votre téléphone pour nous suivre et accéder à du contenu exclusif.
                  </p>
                  <div className="mx-auto w-48 h-48 bg-white p-2 border rounded-md mb-3">
                    <div className="w-full h-full bg-grid-natural-100 rounded relative flex items-center justify-center">
                      <div className="absolute inset-4 bg-white rounded"></div>
                      <div className="relative text-xs text-center">QR code Instagram</div>
                    </div>
                  </div>
                  <a 
                    href="https://instagram.com/naturalandpure" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-natural-600 hover:underline"
                  >
                    instagram.com/naturalandpure
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <p className="text-sm font-medium text-natural-700 pt-2">
            Plus de 10,000 passionnés de santé naturelle nous suivent déjà
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramCTA;

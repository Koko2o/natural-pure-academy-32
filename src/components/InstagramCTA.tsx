
import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const InstagramCTA = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-natural-100 via-natural-50 to-white rounded-xl">
      <div className="absolute inset-0 pattern-dots pattern-natural-600/10 pattern-bg-transparent pattern-size-4 opacity-40"></div>
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-natural-500/20 rounded-full mb-2">
            <Instagram className="h-6 w-6 text-natural-700" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-natural-800">
            Rejoignez notre communauté Instagram
          </h2>
          <ul className="text-natural-700 text-center mx-auto max-w-md space-y-2 list-none">
            <li className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500"></span>
              <span>Conseils bien-être quotidiens</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500"></span>
              <span>Recettes santé exclusives</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-natural-500"></span>
              <span>Dernières innovations en nutrition</span>
            </li>
          </ul>
          <div className="pt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button className="px-6 py-5 text-base bg-natural-600 hover:bg-natural-700 text-white shadow-lg hover:shadow-xl transition-all">
                <Instagram className="h-5 w-5 mr-2" />
                Suivre @NaturalAndPure
              </Button>
            </a>
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


import React from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

const InstagramCTA = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#EBF5FF] to-[#E3F2FD] rounded-xl">
      <div className="absolute inset-0 pattern-dots pattern-[#0A66C2]/10 pattern-bg-transparent pattern-size-4 opacity-40"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-[#0A66C2]/10 rounded-full mb-4">
            <Instagram className="h-6 w-6 text-[#0A66C2]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#0A66C2]">
            Rejoignez notre communauté sur Instagram
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez du contenu exclusif, des astuces de bien-être quotidiennes et restez informé des dernières avancées en santé naturelle.
          </p>
          <div className="pt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button className="px-8 py-6 text-lg bg-gradient-to-r from-[#0A66C2] to-[#4CAF50] hover:from-[#095fb3] hover:to-[#429a47] text-white shadow-lg hover:shadow-xl transition-shadow">
                <Instagram className="h-5 w-5 mr-2" />
                Suivre @NaturalAndPure
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            Plus de 10,000 passionnés de santé naturelle nous suivent déjà.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramCTA;

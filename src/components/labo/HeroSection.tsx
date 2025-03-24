
import React, { useState, useEffect } from 'react';
import { 
  Search, Brain, Activity, Heart, Moon, 
  Flame, Clock, ShieldCheck, Beaker
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setAnimateHero(true);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
    if (searchQuery) {
      toast({
        title: "Recherche lancée",
        description: `Résultats pour "${searchQuery}"`,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    onSearch(tag);
    toast({
      title: "Filtre appliqué",
      description: `Recherche de solutions pour "${tag}"`,
    });
  };

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${animateHero ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTIuNWEuNS41IDAgMDAtLjUtLjVoLTd2LTJoLTV2Mmgtd2EuNS41IDAgMDAtLjUuNVYyOGgydi02aDE0djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      
      {/* Cercles décoratifs animés */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse delay-300"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-sm mb-6 animate-fadeIn">
            <Beaker className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 animate-fadeIn delay-100">
            Solutions Naturelles Scientifiques
          </h1>
          <p className="text-indigo-50 text-lg md:text-xl mb-8 leading-relaxed animate-fadeIn delay-200">
            Découvrez des compléments alimentaires développés par notre équipe scientifique pour répondre à vos problématiques de santé
          </p>
          <div className="relative max-w-xl mx-auto mb-8 animate-fadeIn delay-300">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-300" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher problématiques, solutions ou ingrédients..."
              className="bg-white/90 backdrop-blur-sm border-transparent pl-10 py-6 text-base shadow-lg focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-indigo-400"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center animate-fadeIn delay-400">
            {[
              { name: 'Stress', icon: <Brain className="h-3 w-3 mr-1" /> },
              { name: 'Sommeil', icon: <Moon className="h-3 w-3 mr-1" /> },
              { name: 'Inflammation', icon: <Flame className="h-3 w-3 mr-1" /> },
              { name: 'Énergie', icon: <Activity className="h-3 w-3 mr-1" /> },
              { name: 'Immunité', icon: <ShieldCheck className="h-3 w-3 mr-1" /> },
              { name: 'Digestion', icon: <Activity className="h-3 w-3 mr-1" /> },
              { name: 'Concentration', icon: <Brain className="h-3 w-3 mr-1" /> },
              { name: 'Articulations', icon: <Activity className="h-3 w-3 mr-1" /> }
            ].map((tag) => (
              <Button 
                key={tag.name} 
                variant="outline"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-xs"
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.icon}
                {tag.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

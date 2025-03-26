
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Award, Bookmark, Share2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  className?: string;
}

const FeaturedArticle = ({
  id,
  title,
  excerpt,
  category,
  image,
  date,
  readTime,
  className
}: FeaturedArticleProps) => {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Article ajouté à vos favoris");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/article/${id}`,
      }).catch(console.error);
    } else {
      toast.success("Lien copié dans le presse-papier");
      navigator.clipboard.writeText(window.location.origin + `/article/${id}`);
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl glass shadow-md hover:shadow-lg transition-all duration-300 group",
      className
    )}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:hidden">
            <div className="text-white text-sm font-medium">En savoir plus</div>
          </div>
          <Badge className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-natural-700 hover:bg-white/90 z-10">
            {category}
          </Badge>
          <Badge 
            className="absolute top-4 right-4 bg-natural-500/90 text-white backdrop-blur-sm z-10 flex items-center gap-1"
            variant="natural"
          >
            <Award className="h-3 w-3" />
            Étude scientifique
          </Badge>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4 hidden md:flex space-x-2">
            <button 
              onClick={handleBookmark}
              className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors"
              aria-label="Sauvegarder l'article"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors"
              aria-label="Partager l'article"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {date}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {readTime}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-4 group-hover:text-natural-700 transition-colors">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {excerpt}
          </p>
          
          <div className="mt-auto">
            <div className="flex space-x-3">
              <Button 
                asChild
                className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 group"
              >
                <Link to={`/article/${id}`}>
                  Lire l'article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <div className="md:hidden flex space-x-2">
                <button 
                  onClick={handleBookmark}
                  className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors border border-natural-100"
                  aria-label="Sauvegarder l'article"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-full bg-natural-50 hover:bg-natural-100 text-natural-600 transition-colors border border-natural-100"
                  aria-label="Partager l'article"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Embellissement visuel */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-natural-100 rounded-full opacity-30 hidden md:block"></div>
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-natural-200 rounded-full opacity-20 hidden md:block"></div>
    </div>
  );
};

export default FeaturedArticle;

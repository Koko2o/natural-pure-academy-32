
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl glass shadow-md",
      className
    )}>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <Badge className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-natural-700 hover:bg-white/90">
            {category}
          </Badge>
        </div>
        <div className="p-8 flex flex-col justify-center">
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
          <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {excerpt}
          </p>
          <div>
            <Button 
              asChild
              className="bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700 group"
            >
              <Link to={`/article/${id}`}>
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;

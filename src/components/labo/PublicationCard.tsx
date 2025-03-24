
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, Download, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PublicationCardProps {
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: string;
  abstract: string;
  doi?: string;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  title,
  authors,
  journal,
  year,
  type,
  abstract,
  doi
}) => {
  const handleDownloadClick = () => {
    if (doi) {
      window.open(`https://doi.org/${doi}`, '_blank');
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group border-natural-200 animate-fadeIn">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="hidden sm:flex items-start pt-1">
            <div className="p-3 bg-natural-50 rounded-full border border-natural-100">
              {type.toLowerCase().includes('revue') ? (
                <BookOpen className="h-5 w-5 text-natural-600" />
              ) : (
                <FileText className="h-5 w-5 text-natural-600" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-natural-800 mb-2 leading-tight hover:text-natural-600 transition-colors">{title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-sm">
              <span className="text-natural-600">{authors}</span>
              <span className="text-natural-600 italic">{journal}, {year}</span>
              <Badge variant="outline" className="bg-natural-50 text-natural-700 border-natural-200">
                {type}
              </Badge>
            </div>
            <p className="text-sm text-natural-600 mb-4 bg-natural-50 p-3 rounded-lg border-l-2 border-natural-300">{abstract}</p>
            
            <div className="flex justify-between items-center pt-1">
              {doi ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={`https://doi.org/${doi}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-natural-500 hover:text-natural-700 flex items-center gap-1 group-hover:underline"
                      >
                        <FileText className="h-3 w-3" /> DOI: {doi}
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Accéder à la publication originale</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-xs text-natural-500 flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Pré-publication
                </span>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-natural-600 hover:text-natural-800 text-xs flex items-center gap-1 transition-colors border-natural-200 hover:bg-natural-50"
                  onClick={handleDownloadClick}
                >
                  <Download className="h-3 w-3" />
                  Télécharger
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="text-xs bg-natural-600 hover:bg-natural-700 flex items-center gap-1"
                >
                  Article complet
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

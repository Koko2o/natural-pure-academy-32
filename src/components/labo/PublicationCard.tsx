
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="hidden sm:flex items-start pt-1">
            <div className="p-2 bg-natural-100 rounded-lg">
              <FileText className="h-5 w-5 text-natural-700" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-natural-800 mb-1">{title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-sm">
              <span className="text-natural-600">{authors}</span>
              <span className="text-natural-600">{journal}, {year}</span>
              <span className="bg-natural-100 text-natural-700 text-xs px-2 py-0.5 rounded-full">{type}</span>
            </div>
            <p className="text-sm text-natural-600 mb-3">{abstract}</p>
            
            <div className="flex justify-between items-center pt-1">
              {doi ? (
                <a 
                  href={`https://doi.org/${doi}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-natural-500 hover:text-natural-700"
                >
                  DOI: {doi}
                </a>
              ) : (
                <span className="text-xs text-natural-500">Pré-publication</span>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-natural-600 hover:text-natural-800 text-xs flex items-center gap-1 transition-colors"
              >
                Article complet
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

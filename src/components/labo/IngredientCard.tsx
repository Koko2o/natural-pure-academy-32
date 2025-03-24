
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Leaf, PlusCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface IngredientCardProps {
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  activeCompounds: string[];
  dosage: string;
  imageUrl?: string;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  name,
  scientificName,
  description,
  benefits,
  activeCompounds,
  dosage,
  imageUrl
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-natural-200 h-full flex flex-col">
      <CardHeader className="bg-gradient-to-r from-natural-100 to-natural-50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-natural-800">{name}</CardTitle>
            <div className="text-xs italic text-natural-500 mt-0.5">{scientificName}</div>
          </div>
          <div className="p-1.5 bg-white rounded-full">
            <Leaf className="h-4 w-4 text-natural-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow flex flex-col">
        <p className="text-sm text-natural-600 mb-3">{description}</p>
        
        <div className="space-y-4 flex-grow">
          <div>
            <h4 className="text-xs font-medium uppercase text-natural-500 mb-1 flex items-center">
              <PlusCircle className="h-3 w-3 mr-1" /> Bénéfices
            </h4>
            <ul className="list-disc list-inside text-sm text-natural-700 space-y-0.5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="text-xs">{benefit}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-medium uppercase text-natural-500 mb-1 flex items-center">
              <Beaker className="h-3 w-3 mr-1" /> Composés actifs
            </h4>
            <div className="flex flex-wrap gap-1">
              {activeCompounds.map((compound, idx) => (
                <span key={idx} className="text-xs bg-natural-50 text-natural-700 px-2 py-0.5 rounded-full">
                  {compound}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-natural-600">
            <strong>Dosage:</strong> {dosage}
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-natural-600 hover:text-natural-800 p-0">
            En savoir plus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

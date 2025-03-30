
import React from 'react';
import { cn } from "@/lib/utils";

interface HighlightOptions {
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  style?: 'normal' | 'italic';
  underline?: boolean;
}

interface ScientificHighlightedTextProps {
  text: string;
  highlights?: {[key: string]: HighlightOptions};
  className?: string;
  component?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Composant pour mettre en valeur scientifiquement des termes spécifiques dans un texte
 * 
 * @example
 * ```tsx
 * <ScientificHighlightedText 
 *   text="Les antioxydants et les oméga-3 sont essentiels pour la santé cellulaire."
 *   highlights={{
 *     "antioxydants": { color: "text-emerald-600", weight: "semibold" },
 *     "oméga-3": { color: "text-blue-600", weight: "semibold", underline: true }
 *   }}
 * />
 * ```
 */
export function ScientificHighlightedText({
  text,
  highlights = {},
  className = "",
  component: Component = "p"
}: ScientificHighlightedTextProps) {
  if (!text) return null;
  
  // Fonction pour obtenir les classes Tailwind basées sur les options de mise en surbrillance
  const getHighlightClasses = (options: HighlightOptions) => {
    const classes = [];
    
    if (options.color) classes.push(options.color);
    
    switch (options.weight) {
      case 'normal': classes.push('font-normal'); break;
      case 'medium': classes.push('font-medium'); break;
      case 'semibold': classes.push('font-semibold'); break;
      case 'bold': classes.push('font-bold'); break;
    }
    
    if (options.style === 'italic') classes.push('italic');
    if (options.underline) classes.push('underline');
    
    return classes.join(' ');
  };
  
  // Création de l'expression régulière pour trouver tous les termes à mettre en surbrillance
  // Échappement des caractères spéciaux et tri par longueur décroissante pour éviter les problèmes de sous-chaînes
  const highlightTerms = Object.keys(highlights)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length);
  
  if (highlightTerms.length === 0) {
    // Si aucun terme à mettre en surbrillance, retourner simplement le texte
    return <Component className={className}>{text}</Component>;
  }
  
  const regex = new RegExp(`(${highlightTerms.join('|')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <Component className={cn(className)}>
      {parts.map((part, index) => {
        // Chercher si ce part correspond à un terme à mettre en surbrillance (insensible à la casse)
        const highlightTerm = Object.keys(highlights).find(
          term => term.toLowerCase() === part.toLowerCase()
        );
        
        if (highlightTerm && highlights[highlightTerm]) {
          const highlightClasses = getHighlightClasses(highlights[highlightTerm]);
          return <span key={index} className={highlightClasses}>{part}</span>;
        }
        
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </Component>
  );
}

export default ScientificHighlightedText;

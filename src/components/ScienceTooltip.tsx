
import { useState, ReactNode } from 'react';
import { Info } from 'lucide-react';
import { useTooltip, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ScienceTerm {
  title: string;
  definition: string;
  source?: string;
}

interface ScienceTooltipProps {
  term: ScienceTerm;
  children: ReactNode;
  className?: string;
}

const ScienceTooltip = ({ term, children, className = "" }: ScienceTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span 
            className={`relative inline-flex items-center cursor-help border-b border-dotted border-indigo-400 group ${className}`}
          >
            {children}
            <span className="ml-0.5 opacity-70">
              <Info className="h-3.5 w-3.5 inline text-indigo-500" />
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center" 
          className="max-w-sm bg-white border border-indigo-100 shadow-md p-3 rounded-lg"
        >
          <div className="science-tooltip-content">
            <h4 className="text-sm font-medium text-indigo-800 mb-1 flex items-center">
              {term.title}
            </h4>
            <p className="text-xs text-natural-700 mb-2">{term.definition}</p>
            {term.source && (
              <small className="text-[10px] text-natural-500 block">
                Source : {term.source}
              </small>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScienceTooltip;

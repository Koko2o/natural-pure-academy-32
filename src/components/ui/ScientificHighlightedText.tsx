import React from 'react';
import { cn } from '@/lib/utils';

interface ScientificHighlightedTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component to highlight scientific terms in text
 */
const ScientificHighlightedText = ({ 
  children, 
  className 
}: ScientificHighlightedTextProps) => {
  // Handle case when children is not a string
  if (typeof children !== 'string') {
    return <div className={cn('scientific-highlighted-text', className)}>{children}</div>;
  }

  // Simple implementation that just returns the text with the provided class
  return (
    <div className={cn('scientific-highlighted-text', className)}>
      {children}
    </div>
  );
};

export default ScientificHighlightedText;
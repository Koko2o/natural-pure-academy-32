import React from 'react';
import { motion } from 'framer-motion';

interface ScientificHighlightedTextProps {
  children: React.ReactNode;
  highlightColor?: string;
  className?: string;
  dataLovId?: string;
}

export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({
  children,
  highlightColor = 'bg-gradient-to-r from-blue-500 to-indigo-600',
  className = '',
  dataLovId
}) => {
  return (
    <span
      className={`relative inline-block ${className}`}
    >
      {children}
      <motion.span
        className={`absolute bottom-0 left-0 h-[0.2em] w-full rounded ${highlightColor}`}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true }}
      />
    </span>
  );
};
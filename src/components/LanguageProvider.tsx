
import React, { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageWrapperProps {
  children: ReactNode;
}

// Renamed to LanguageWrapper to avoid confusion with the main LanguageProvider
export const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div lang={language} className="antialiased">
      {children}
    </div>
  );
};

export default LanguageWrapper;

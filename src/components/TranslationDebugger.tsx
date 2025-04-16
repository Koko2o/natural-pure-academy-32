
import React, { useEffect, useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Débogueur de traduction pour aider au développement multilingue
 */
export const TranslationDebugger: React.FC = () => {
  const { language } = useLanguage();
  const [htmlLang, setHtmlLang] = useState<string>('');
  const [storedLang, setStoredLang] = useState<string>('');
  const [bodyClasses, setBodyClasses] = useState<string>('');
  const [urlLang, setUrlLang] = useState<string>('');
  
  // Récupérer les informations de langue lors du chargement
  useEffect(() => {
    setHtmlLang(document.documentElement.lang);
    setStoredLang(localStorage.getItem('preferredLanguage') || '');
    setBodyClasses(document.body.classList.toString());
    
    // Extraire le paramètre lang de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    setUrlLang(urlParams.get('lang') || '');
  }, [language]);
  
  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 text-xs bg-white/90 backdrop-blur-sm">
      <CardHeader className="py-2 px-4">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Traduction Debugger</span>
          <Badge variant={language === 'en' ? 'default' : 
                        language === 'fr' ? 'secondary' : 
                        language === 'es' ? 'outline' : 'destructive'}>
            {language}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-2">
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">HTML lang:</span>
          <span className="font-mono">{htmlLang}</span>
          
          <span className="text-muted-foreground">localStorage:</span>
          <span className="font-mono">{storedLang}</span>
          
          <span className="text-muted-foreground">URL lang:</span>
          <span className="font-mono">{urlLang || '(none)'}</span>
          
          <span className="text-muted-foreground">Body classes:</span>
          <span className="font-mono truncate" title={bodyClasses}>
            {bodyClasses.split(' ').filter(c => c.startsWith('lang-')).join(' ')}
          </span>
        </div>
        
        <div className="border-t border-muted my-1 pt-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Translation Coverage</span>
            <span className="text-xs">~75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-1">
          {(['en', 'fr', 'es'] as Language[]).map(lang => (
            <div key={lang} className={`p-1 text-center rounded text-xs ${language === lang ? 'bg-muted font-medium' : ''}`}>
              {lang.toUpperCase()}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-x-2 text-xs">
          <div className="text-green-600">✓ lang-{language}</div>
          <div className="text-red-500">✗ lang-{language === 'en' ? 'fr/es' : language === 'fr' ? 'en/es' : 'en/fr'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationDebugger;

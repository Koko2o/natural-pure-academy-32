
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Language = 'fr' | 'en' | 'es';

interface MissingTranslation {
  key: string;
  language: Language;
  component?: string;
}

export const TranslationDebugger: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();
  const [htmlLang, setHtmlLang] = useState<string>('');
  const [storedLang, setStoredLang] = useState<string>('');
  const [urlLang, setUrlLang] = useState<string | null>(null);
  const [bodyClasses, setBodyClasses] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [lastLangChange, setLastLangChange] = useState<number>(Date.now());
  const [missingTranslations, setMissingTranslations] = useState<MissingTranslation[]>([]);
  const [coverage, setCoverage] = useState<Record<Language, number>>({
    fr: 95,
    en: 100,
    es: 60
  });

  useEffect(() => {
    // Obtenir les informations de langue au chargement et au changement
    const updateLanguageInfo = () => {
      setHtmlLang(document.documentElement.lang);
      setStoredLang(localStorage.getItem('preferredLanguage') || '');
      const urlParams = new URLSearchParams(window.location.search);
      setUrlLang(urlParams.get('lang'));
      setBodyClasses(document.body.className);
      setLastLangChange(Date.now());
    };

    updateLanguageInfo();
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - lastLangChange) / 1000));
    }, 1000);

    // Observer les changements de langue
    const handleLanguageChange = () => {
      updateLanguageInfo();
    };

    document.addEventListener('app-language-changed', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('app-language-changed', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [lastLangChange]);

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center space-x-1 bg-white/95 border-gray-200 shadow-sm"
          onClick={() => setIsExpanded(true)}
        >
          <span className="text-xs">🌐</span>
          <span>{language.toUpperCase()}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 shadow-lg rounded-lg bg-white border border-gray-200">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Translation Debugger</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setIsExpanded(false)}>×</Button>
          </div>
          <CardDescription className="text-xs">
            Active: <Badge variant="outline" className="ml-1">{language}</Badge>
            <span className="ml-2 text-muted-foreground">{elapsedTime}s ago</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0 pb-2">
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="status" className="text-xs">Status</TabsTrigger>
              <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
              <TabsTrigger value="test" className="text-xs">Test</TabsTrigger>
            </TabsList>
            
            <TabsContent value="status" className="mt-2 space-y-3">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                <span className="text-muted-foreground">Context:</span>
                <span className="font-mono">{language}</span>
                
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
            </TabsContent>
            
            <TabsContent value="details" className="mt-2 space-y-3">
              <div className="space-y-2">
                {(['fr', 'en', 'es'] as Language[]).map(lang => (
                  <div key={lang} className="space-y-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-xs font-medium">{lang.toUpperCase()}</span>
                        {language === lang && <Badge variant="outline" className="ml-1 h-4 text-[10px]">active</Badge>}
                      </div>
                      <span className="text-xs">{coverage[lang]}%</span>
                    </div>
                    <Progress value={coverage[lang]} className="h-1.5" />
                  </div>
                ))}
              </div>
              
              <div className="pt-1 text-xs">
                <p className="text-muted-foreground text-xs">
                  {coverage.es < 90 && 'Spanish translation needs more work'}
                  {coverage.fr < 90 && 'French translation needs more work'}
                  {coverage.en < 90 && 'English translation needs more work'}
                  {Math.min(coverage.fr, coverage.en, coverage.es) >= 90 && 'All translations are in good shape!'}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="test" className="mt-2">
              <div className="space-y-2 text-xs">
                <p>{t('Test the translation of:')}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="font-medium">Home</div>
                    <div className="text-muted-foreground">
                      EN: Home | FR: {t('Home')} | ES: {language === 'es' ? t('Home') : '?'}
                    </div>
                    <div className="font-mono text-[10px]">t('Home')</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">About Us</div>
                    <div className="text-muted-foreground">
                      EN: About Us | FR: {t('About Us')} | ES: {language === 'es' ? t('About Us') : '?'}
                    </div>
                    <div className="font-mono text-[10px]">t('About Us')</div>
                  </div>
                </div>
                <div className="mt-2">
                  <Button onClick={() => setLanguage('fr')} size="sm" variant={language === 'fr' ? 'default' : 'outline'} className="mr-1">FR</Button>
                  <Button onClick={() => setLanguage('en')} size="sm" variant={language === 'en' ? 'default' : 'outline'} className="mr-1">EN</Button>
                  <Button onClick={() => setLanguage('es')} size="sm" variant={language === 'es' ? 'default' : 'outline'}>ES</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="pt-0 pb-2 flex justify-between text-xs">
          <div className="text-muted-foreground">
            {t('Debug mode')}
          </div>
          <Button 
            variant="link" 
            size="sm" 
            className="h-auto p-0 text-xs"
            onClick={() => {
              // Simuler un audit des traductions - en production, cela pourrait
              // appeler une API ou scanner le DOM pour des éléments non traduits
              console.log('[Translation Audit] Scanning for untranslated content...');
              // Mise à jour pour simuler un changement dans la couverture
              setCoverage({
                fr: Math.max(50, Math.floor(Math.random() * 100)),
                en: 100,
                es: Math.max(40, Math.floor(Math.random() * 70))
              });
            }}
          >
            {t('Run Audit')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TranslationDebugger;

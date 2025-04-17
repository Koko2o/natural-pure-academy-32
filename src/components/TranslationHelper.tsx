
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Check, X, Languages, Plus, Code2, RefreshCw } from 'lucide-react';

// Fonction utilitaire pour suggérer une clé de traduction
export const suggestTranslationKey = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 30);
};

/**
 * Composant pour aider les développeurs à ajouter facilement des traductions
 */
export const TranslationHelper: React.FC = () => {
  const [componentCode, setComponentCode] = useState('');
  const [extractedTexts, setExtractedTexts] = useState<{ key: string; text: string }[]>([]);
  const [frText, setFrText] = useState('');
  const [enText, setEnText] = useState('');
  const [esText, setEsText] = useState('');
  const [newKey, setNewKey] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonContent, setJsonContent] = useState('');
  const [stats, setStats] = useState({ total: 0, fr: 0, en: 0, es: 0 });
  
  const { addTranslation, translations } = useLanguage();
  
  // Calculer les statistiques de traduction
  useEffect(() => {
    if (translations) {
      const statsFr = Object.keys(translations.fr).length;
      const statsEn = Object.keys(translations.en).length;
      const statsEs = Object.keys(translations.es).length;
      
      setStats({
        total: statsFr,
        fr: statsFr,
        en: statsEn,
        es: statsEs
      });
    }
  }, [translations]);
  
  // Extraire les textes du code du composant
  const handleExtract = () => {
    if (!componentCode.trim()) {
      return;
    }
    
    // Expression régulière pour trouver du texte dans diverses situations JSX
    const patterns = [
      /<h[1-6][^>]*>\s*([^<{]+)\s*<\/h[1-6]>/g,
      /<p[^>]*>\s*([^<{]+)\s*<\/p>/g,
      /<span[^>]*>\s*([^<{]+)\s*<\/span>/g,
      /<div[^>]*>\s*([^<{]+)\s*<\/div>/g,
      /<button[^>]*>\s*([^<{]+)\s*<\/button>/g,
      /<a[^>]*>\s*([^<{]+)\s*<\/a>/g,
      /<li[^>]*>\s*([^<{]+)\s*<\/li>/g,
      /<label[^>]*>\s*([^<{]+)\s*<\/label>/g,
      /title="([^"{}]+)"/g,
      /placeholder="([^"{}]+)"/g,
      /label="([^"{}]+)"/g,
      /alt="([^"{}]+)"/g,
    ];
    
    const extractedTexts: { key: string; text: string }[] = [];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(componentCode)) !== null) {
        const text = match[1].trim();
        if (text && text.length > 1 && !/^[0-9.,%]+$/.test(text)) {
          const key = suggestTranslationKey(text);
          
          // Vérifier si la clé existe déjà
          const existingIndex = extractedTexts.findIndex(item => item.key === key);
          if (existingIndex !== -1) {
            // Si elle existe, créer une clé unique
            extractedTexts.push({
              key: `${key}_${extractedTexts.length}`,
              text
            });
          } else {
            extractedTexts.push({ key, text });
          }
        }
      }
    });
    
    setExtractedTexts(extractedTexts);
    
    // Générer du JSON pour faciliter l'ajout
    if (extractedTexts.length > 0) {
      const jsonObj: { [key: string]: string } = {};
      extractedTexts.forEach(({ key, text }) => {
        jsonObj[key] = text;
      });
      setJsonContent(JSON.stringify(jsonObj, null, 2));
    }
    
    setSuccessMessage(`${extractedTexts.length} textes extraits.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Ajouter toutes les traductions extraites
  const handleBulkAdd = () => {
    extractedTexts.forEach(({ key, text }) => {
      addTranslation(key, {
        fr: text,
        en: '', // Laisser vide pour que ça soit marqué comme manquant
        es: '' // Laisser vide pour que ça soit marqué comme manquant
      });
    });
    
    setSuccessMessage(`${extractedTexts.length} traductions ajoutées.`);
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // Réinitialiser les champs
    setComponentCode('');
    setExtractedTexts([]);
  };
  
  // Ajouter une seule traduction
  const handleSingleAdd = () => {
    if (!newKey || !frText) {
      setSuccessMessage('La clé et le texte français sont requis.');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    
    addTranslation(newKey, {
      fr: frText,
      en: enText || '',
      es: esText || ''
    });
    
    // Réinitialiser les champs
    setFrText('');
    setEnText('');
    setEsText('');
    setNewKey('');
    
    setSuccessMessage('Traduction ajoutée!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Gérer le changement du texte français et suggérer une clé
  const handleFrChange = (text: string) => {
    setFrText(text);
    if (!newKey && text) {
      setNewKey(suggestTranslationKey(text));
    }
  };
  
  // Ajouter des traductions depuis JSON
  const handleImportJson = () => {
    try {
      const jsonData = JSON.parse(jsonContent);
      const count = Object.keys(jsonData).length;
      
      Object.entries(jsonData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          addTranslation(key, { fr: value });
        } else if (typeof value === 'object') {
          const transValue = value as { fr?: string; en?: string; es?: string };
          addTranslation(key, {
            fr: transValue.fr || '',
            en: transValue.en || '',
            es: transValue.es || ''
          });
        }
      });
      
      setSuccessMessage(`${count} traductions importées depuis JSON.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setSuccessMessage('Erreur: JSON invalide.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Outil de Traduction
        </h2>
        
        <div className="flex gap-2 items-center text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">Total:</span> 
            <Badge variant="secondary">{stats.total}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">FR:</span> 
            <Badge className="bg-blue-600">{stats.fr}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">EN:</span> 
            <Badge className={stats.en < stats.fr ? "bg-amber-600" : "bg-green-600"}>
              {stats.en}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">ES:</span> 
            <Badge className={stats.es < stats.fr ? "bg-amber-600" : "bg-green-600"}>
              {stats.es}
            </Badge>
          </div>
        </div>
      </div>
      
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded flex items-center gap-2">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}
      
      <Tabs defaultValue="extract">
        <TabsList className="mb-4">
          <TabsTrigger value="extract">Extraction automatique</TabsTrigger>
          <TabsTrigger value="manual">Ajout manuel</TabsTrigger>
          <TabsTrigger value="json">Import JSON</TabsTrigger>
        </TabsList>
        
        <TabsContent value="extract" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Code du composant</label>
            <Textarea
              value={componentCode}
              onChange={(e) => setComponentCode(e.target.value)}
              placeholder="Collez le code de votre composant ici..."
              className="h-40 mb-2 font-mono text-sm"
            />
            <Button onClick={handleExtract} className="mb-4">
              <Code2 className="h-4 w-4 mr-2" />
              Extraire les textes
            </Button>
          </div>
          
          {extractedTexts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Textes extraits ({extractedTexts.length})</h3>
                <Button onClick={handleBulkAdd} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter toutes les traductions
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="py-2 px-3 text-left">Clé</th>
                      <th className="py-2 px-3 text-left">Texte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedTexts.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-3 font-mono">{item.key}</td>
                        <td className="py-2 px-3">{item.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="manual">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Clé de traduction</label>
              <Input
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="ex: welcome_message"
                className="font-mono"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1">
                  <span>🇫🇷 Français</span>
                  <Badge variant="secondary">Requis</Badge>
                </span>
              </label>
              <Textarea
                value={frText}
                onChange={(e) => handleFrChange(e.target.value)}
                placeholder="Texte en français"
                className="h-20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">🇬🇧 Anglais</label>
              <Textarea
                value={enText}
                onChange={(e) => setEnText(e.target.value)}
                placeholder="English text"
                className="h-20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">🇪🇸 Espagnol</label>
              <Textarea
                value={esText}
                onChange={(e) => setEsText(e.target.value)}
                placeholder="Texto en español"
                className="h-20"
              />
            </div>
            
            <Button onClick={handleSingleAdd}>
              Ajouter la traduction
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="json">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium">JSON de traductions</label>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-6 px-2"
                  onClick={() => {
                    setJsonContent(JSON.stringify(
                      extractedTexts.reduce((acc, { key, text }) => {
                        acc[key] = text;
                        return acc;
                      }, {} as Record<string, string>),
                      null, 2
                    ));
                  }}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Utiliser les textes extraits
                </Button>
              </div>
              <Textarea
                value={jsonContent}
                onChange={(e) => setJsonContent(e.target.value)}
                placeholder='{"key": "value", "welcome_message": "Bienvenue"}'
                className="h-60 font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                Format simple: <code>{"key": "texte français"}</code> ou complet: <code>{"key": {"fr": "texte", "en": "text", "es": "texto"}}</code>
              </p>
            </div>
            
            <Button onClick={handleImportJson}>
              Importer les traductions JSON
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TranslationHelper;

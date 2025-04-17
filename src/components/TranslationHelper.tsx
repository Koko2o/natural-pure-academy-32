
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useTranslationRecommender, suggestTranslationKey } from '@/utils/translationHelper';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Component to help developers add translations easily
 */
export const TranslationHelper: React.FC = () => {
  const [componentCode, setComponentCode] = useState('');
  const [generatedKeys, setGeneratedKeys] = useState<{ key: string; text: string }[]>([]);
  const [frText, setFrText] = useState('');
  const [enText, setEnText] = useState('');
  const [esText, setEsText] = useState('');
  const [newKey, setNewKey] = useState('');
  
  const { generateTranslationKeys, addBulkTranslations } = useTranslationRecommender();
  const { addTranslation } = useLanguage();
  
  const handleGenerate = () => {
    const keys = generateTranslationKeys(componentCode);
    setGeneratedKeys(keys);
  };
  
  const handleApplyAll = () => {
    addBulkTranslations(generatedKeys);
    alert(`Added ${generatedKeys.length} translations!`);
  };
  
  const handleSingleAdd = () => {
    if (!newKey || !frText) {
      alert('Key and French text are required');
      return;
    }
    
    addTranslation(newKey, {
      fr: frText,
      en: enText || frText, // Fallback to French if English not provided
      es: esText || frText  // Fallback to French if Spanish not provided
    });
    
    // Clear forms
    setFrText('');
    setEnText('');
    setEsText('');
    setNewKey('');
    
    alert('Translation added!');
  };
  
  const handleFrChange = (text: string) => {
    setFrText(text);
    if (!newKey) {
      setNewKey(suggestTranslationKey(text));
    }
  };
  
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">Translation Helper</h2>
      
      <div className="mb-6 border-b pb-6">
        <h3 className="text-lg font-semibold mb-2">Bulk Text Extraction</h3>
        <Textarea
          value={componentCode}
          onChange={(e) => setComponentCode(e.target.value)}
          placeholder="Paste your component code here..."
          className="h-40 mb-2"
        />
        <Button onClick={handleGenerate} className="mb-2">Extract Hardcoded Text</Button>
        
        {generatedKeys.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium">Found {generatedKeys.length} text items:</h4>
            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto border p-2 rounded">
              {generatedKeys.map((item, index) => (
                <li key={index} className="text-sm flex justify-between">
                  <div>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{item.key}</code>: "{item.text}"
                  </div>
                </li>
              ))}
            </ul>
            <Button onClick={handleApplyAll} className="mt-2">
              Add All Translations
            </Button>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Add Single Translation</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Translation Key</label>
            <Input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g. welcome_message"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">French (Required)</label>
            <Textarea
              value={frText}
              onChange={(e) => handleFrChange(e.target.value)}
              placeholder="French text..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">English</label>
            <Textarea
              value={enText}
              onChange={(e) => setEnText(e.target.value)}
              placeholder="English text..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Spanish</label>
            <Textarea
              value={esText}
              onChange={(e) => setEsText(e.target.value)}
              placeholder="Spanish text..."
            />
          </div>
          
          <Button onClick={handleSingleAdd}>Add Translation</Button>
        </div>
      </div>
    </div>
  );
};

export default TranslationHelper;

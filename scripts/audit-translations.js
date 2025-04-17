
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Fonction pour trouver tous les fichiers dans un répertoire
function findFiles(dir, extensions = ['.tsx', '.jsx', '.ts', '.js']) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'node_modules' && !item.startsWith('.')) {
      results = results.concat(findFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }

  return results;
}

// Fonction pour scanner le texte en dur dans un fichier
function scanForHardcodedText(content) {
  // Common patterns for hardcoded text in JSX
  const patterns = [
    /<h[1-6][^>]*>\s*([^<{]+)\s*<\/h[1-6]>/g,
    /<p[^>]*>\s*([^<{]+)\s*<\/p>/g,
    /<span[^>]*>\s*([^<{]+)\s*<\/span>/g,
    /<div[^>]*>\s*([^<{]+)\s*<\/div>/g,
    /<button[^>]*>\s*([^<{]+)\s*<\/button>/g,
    /<a[^>]*>\s*([^<{]+)\s*<\/a>/g,
    /<li[^>]*>\s*([^<{]+)\s*<\/li>/g,
    /<label[^>]*>\s*([^<{]+)\s*<\/label>/g,
    /<option[^>]*>\s*([^<{]+)\s*<\/option>/g,
    /<strong[^>]*>\s*([^<{]+)\s*<\/strong>/g,
    /<em[^>]*>\s*([^<{]+)\s*<\/em>/g,
    /<small[^>]*>\s*([^<{]+)\s*<\/small>/g,
    /title="([^"{}]+)"/g,
    /placeholder="([^"{}]+)"/g,
    /label="([^"{}]+)"/g,
    /alt="([^"{}]+)"/g,
    /aria-label="([^"{}]+)"/g,
    /tooltip="([^"{}]+)"/g,
  ];

  const hardcodedText = [];

  // Search for patterns
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1].trim();
      // Exclure le code, les nombres seuls et les chaînes très courtes
      if (text && 
          !text.includes('t(') && 
          text.length > 2 && 
          !/^[0-9.,%]+$/.test(text) && 
          !/^[A-Za-z0-9_]+$/.test(text)) {
        hardcodedText.push(text);
      }
    }
  });

  return [...new Set(hardcodedText)]; // Remove duplicates
}

// Fonction pour vérifier si un fichier utilise le hook useLanguage
function checkForTranslationHook(content) {
  return {
    hasImport: content.includes('import { useLanguage }') || 
               content.includes('import {useLanguage}'),
    hasHook: content.includes('const { t }') || 
             content.includes('const {t}') ||
             content.includes('const t =')
  };
}

// Fonction pour vérifier les traductions dans un fichier
function auditFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hardcodedTexts = scanForHardcodedText(content);
    const { hasImport, hasHook } = checkForTranslationHook(content);
    
    const isComponent = content.includes('export default') || 
                        content.includes('export const') ||
                        content.includes('function') && content.includes('return');
    
    return {
      path: filePath,
      hardcodedTexts,
      hasImport,
      hasHook,
      isComponent,
      needsWork: hardcodedTexts.length > 0 || (isComponent && (!hasImport || !hasHook))
    };
  } catch (error) {
    console.error(`❌ Erreur lors de l'audit de ${filePath}:`, error);
    return {
      path: filePath,
      error: error.message,
      needsWork: true
    };
  }
}

// Fonction pour récupérer les traductions actuelles
function getCurrentTranslations() {
  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
  const content = fs.readFileSync(contextPath, 'utf8');
  
  // Analyser très simplement pour trouver les problèmes évidents
  const missingEnPhrases = content.match(/en:.*?à traduire en en/g) || [];
  const missingEsPhrases = content.match(/es:.*?à traduire en es/g) || [];
  
  return {
    needsTranslationEn: missingEnPhrases.length,
    needsTranslationEs: missingEsPhrases.length
  };
}

// Point d'entrée principal
function main() {
  const targetDir = path.join(__dirname, '../src');
  console.log('🔍 Audit de traduction en cours...');
  
  const files = findFiles(targetDir);
  console.log(`📁 Analysant ${files.length} fichiers...`);
  
  const results = files.map(auditFile);
  const needsWork = results.filter(r => r.needsWork);
  
  const totalHardcodedTexts = results.reduce((sum, r) => sum + (r.hardcodedTexts ? r.hardcodedTexts.length : 0), 0);
  const componentsWithoutTranslation = results.filter(r => r.isComponent && (!r.hasImport || !r.hasHook)).length;
  
  const translations = getCurrentTranslations();
  
  // Afficher un résumé
  console.log('\n📊 RÉSUMÉ DE L\'AUDIT DE TRADUCTION');
  console.log('===============================');
  console.log(`Total de fichiers scannés: ${files.length}`);
  console.log(`Fichiers nécessitant du travail: ${needsWork.length}`);
  console.log(`Textes en dur détectés: ${totalHardcodedTexts}`);
  console.log(`Composants sans hook de traduction: ${componentsWithoutTranslation}`);
  console.log(`Traductions en anglais manquantes: ${translations.needsTranslationEn}`);
  console.log(`Traductions en espagnol manquantes: ${translations.needsTranslationEs}`);
  
  // Afficher les 10 pires fichiers (avec le plus de textes en dur)
  const topWorstFiles = [...results]
    .filter(r => r.hardcodedTexts && r.hardcodedTexts.length > 0)
    .sort((a, b) => b.hardcodedTexts.length - a.hardcodedTexts.length)
    .slice(0, 10);
  
  if (topWorstFiles.length > 0) {
    console.log('\n⚠️ TOP 10 DES FICHIERS AVEC LE PLUS DE TEXTES EN DUR:');
    topWorstFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.path.replace(targetDir, '')} - ${file.hardcodedTexts.length} textes`);
    });
  }
  
  console.log('\n📋 PROCHAINES ÉTAPES RECOMMANDÉES:');
  
  if (totalHardcodedTexts > 0) {
    console.log('1. Exécuter le script de remplacement sur les fichiers problématiques:');
    console.log('   node scripts/replace-hardcoded-text.js [chemin_du_fichier]');
  }
  
  if (translations.needsTranslationEn > 0 || translations.needsTranslationEs > 0) {
    console.log('2. Traduire manuellement les textes marqués "à traduire en..." dans src/contexts/LanguageContext.tsx');
  }
  
  console.log('3. Utiliser le TranslationDebugger pour identifier les textes manquants en temps réel');
}

main();


// Script pour ajouter automatiquement le hook useTranslation aux composants React
const fs = require('fs');
const path = require('path');

// Fonction pour ajouter le hook de traduction à un fichier
function addTranslationHook(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le hook est déjà présent
    if (content.includes('useTranslation') || content.includes('useLanguage')) {
      console.log(`✓ ${filePath} a déjà le hook de traduction`);
      return;
    }
    
    // Trouver l'import de React
    const reactImportMatch = content.match(/import React[^;]*;/);
    if (!reactImportMatch) {
      console.log(`⚠️ ${filePath} n'a pas d'import React standard, modification manuelle nécessaire`);
      return;
    }
    
    // Ajouter l'import useTranslation après l'import React
    const reactImport = reactImportMatch[0];
    const newImports = `${reactImport}\nimport { useTranslation } from '@/contexts/LanguageContext';`;
    content = content.replace(reactImport, newImports);
    
    // Chercher le début du composant
    const componentMatch = content.match(/const\s+([A-Za-z0-9_]+)\s*(?::\s*React\.FC(?:\<[^>]*\>)?)?\s*=\s*(?:\([^)]*\)|[^=>]*)\s*=>/);
    if (!componentMatch) {
      console.log(`⚠️ ${filePath} n'a pas de définition de composant standard, modification manuelle nécessaire`);
      return;
    }
    
    // Insérer le hook au début du corps du composant
    const componentName = componentMatch[1];
    const componentStart = componentMatch[0];
    const componentBodyStart = content.indexOf('{', content.indexOf(componentStart)) + 1;
    
    // Insérer le hook après l'accolade ouvrante du composant
    const hookDeclaration = '\n  const { t } = useTranslation();';
    content = content.slice(0, componentBodyStart) + hookDeclaration + content.slice(componentBodyStart);
    
    // Écrire le contenu modifié dans le fichier
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filePath} - Hook de traduction ajouté`);
  } catch (err) {
    console.error(`❌ Erreur avec ${filePath}:`, err.message);
  }
}

// Fonction récursive pour traiter un dossier
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
      addTranslationHook(filePath);
    }
  });
}

// Point d'entrée
const componentsDir = path.join(process.cwd(), 'src', 'components');
const pagesDir = path.join(process.cwd(), 'src', 'pages');

console.log('🔍 Ajout du hook useTranslation aux composants...');
processDirectory(componentsDir);
processDirectory(pagesDir);
console.log('✅ Traitement terminé!');

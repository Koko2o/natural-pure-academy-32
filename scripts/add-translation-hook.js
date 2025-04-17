
const fs = require('fs');
const path = require('path');

/**
 * Script pour ajouter automatiquement le hook useLanguage et la déclaration t
 * aux composants React
 */

// Fonction pour trouver tous les fichiers React
function findReactFiles(dir, extensions = ['.tsx', '.jsx']) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'node_modules' && !item.startsWith('.')) {
      results = results.concat(findReactFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }

  return results;
}

// Fonction pour détecter s'il s'agit d'un composant React
function isReactComponent(content) {
  // Patterns communs pour détecter un composant React
  const patterns = [
    /function\s+([A-Z][A-Za-z0-9_]*)\s*\(/,
    /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(\(|React\.forwardRef)/,
    /class\s+([A-Z][A-Za-z0-9_]*)\s+extends\s+React\.Component/,
    /export\s+(default\s+)?(function|const)\s+([A-Z][A-Za-z0-9_]*)/,
    /(React\.)?FC(<.*>)?\s*=/,
    /(React\.)?FunctionComponent(<.*>)?\s*=/
  ];

  return patterns.some(pattern => pattern.test(content));
}

// Fonction pour vérifier si le hook de traduction est déjà importé
function hasLanguageImport(content) {
  const importPatterns = [
    /import.*useLanguage.*from/,
    /import.*['"]{1}@\/contexts\/LanguageContext['"]{1}/,
    /const\s*{\s*t\s*}.*useLanguage/
  ];

  return importPatterns.some(pattern => pattern.test(content));
}

// Fonction pour ajouter le hook de traduction
function addTranslationHook(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier s'il s'agit d'un composant React
    if (!isReactComponent(content)) {
      return false;
    }
    
    // Vérifier si le hook est déjà importé
    if (hasLanguageImport(content)) {
      return false;
    }
    
    // Trouver la position pour ajouter l'import
    let newContent = content;
    let modified = false;
    
    // Ajouter l'import
    if (content.includes('import React')) {
      newContent = content.replace(/import React[^;]*;/, match => {
        modified = true;
        return `${match}\nimport { useLanguage } from '@/contexts/LanguageContext';`;
      });
    } else if (content.includes('import {')) {
      // Trouver le dernier import
      const lastImportIndex = content.lastIndexOf('import {');
      if (lastImportIndex !== -1) {
        const endOfImportIndex = content.indexOf(';', lastImportIndex);
        if (endOfImportIndex !== -1) {
          modified = true;
          const beforeImport = content.substring(0, endOfImportIndex + 1);
          const afterImport = content.substring(endOfImportIndex + 1);
          newContent = `${beforeImport}\nimport { useLanguage } from '@/contexts/LanguageContext';${afterImport}`;
        }
      }
    } else {
      // Ajouter au début du fichier
      modified = true;
      newContent = `import { useLanguage } from '@/contexts/LanguageContext';\n${content}`;
    }
    
    // Ajouter la déclaration de t
    if (modified) {
      // Chercher le début du corps du composant
      const componentBodyRegex = /(function|const)\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(\([^)]*\)\s*=>|React\.forwardRef\(|function\s*\([^)]*\))\s*{/g;
      let match;
      let lastMatch = null;
      
      while ((match = componentBodyRegex.exec(newContent)) !== null) {
        lastMatch = match;
      }
      
      if (lastMatch) {
        const insertPos = lastMatch.index + lastMatch[0].length;
        newContent = newContent.substring(0, insertPos) + 
                    '\n  const { t } = useLanguage();\n' + 
                    newContent.substring(insertPos);
      } else {
        // Essayer de trouver un autre pattern
        const altComponentBodyRegex = /export\s+(default\s+)?((function|const|class)\s+([A-Z][A-Za-z0-9_]*))/g;
        let altMatch;
        let lastAltMatch = null;
        
        while ((altMatch = altComponentBodyRegex.exec(newContent)) !== null) {
          lastAltMatch = altMatch;
        }
        
        if (lastAltMatch) {
          // Chercher la première accolade après la déclaration du composant
          const startPos = lastAltMatch.index + lastAltMatch[0].length;
          const openBracePos = newContent.indexOf('{', startPos);
          
          if (openBracePos !== -1) {
            newContent = newContent.substring(0, openBracePos + 1) + 
                        '\n  const { t } = useLanguage();\n' + 
                        newContent.substring(openBracePos + 1);
          }
        } else {
          console.log(`⚠️ Impossible de trouver le corps du composant dans ${filePath}`);
          return false;
        }
      }
    }
    
    // Si des modifications ont été apportées, enregistrer le fichier
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error);
    return false;
  }
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node add-translation-hook.js <directory>');
    console.log('Example: node add-translation-hook.js src/components');
    return;
  }
  
  const targetDir = args[0];
  console.log(`🔍 Recherche de fichiers React dans ${targetDir}...`);
  
  const files = findReactFiles(path.resolve(targetDir));
  console.log(`📁 ${files.length} fichiers trouvés.`);
  
  let modifiedCount = 0;
  
  files.forEach(file => {
    const isModified = addTranslationHook(file);
    if (isModified) {
      console.log(`✅ Hook de traduction ajouté à ${file}`);
      modifiedCount++;
    }
  });
  
  console.log(`\n🎉 Terminé! ${modifiedCount} fichiers modifiés sur ${files.length}.`);
}

main();

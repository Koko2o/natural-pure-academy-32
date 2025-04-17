
const fs = require('fs');
const path = require('path');

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

// Function to suggest a translation key
function suggestTranslationKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 30);
}

// Fonction pour remplacer les textes en dur par des appels à la fonction de traduction
function replaceHardcodedText(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hardcodedTexts = scanForHardcodedText(content);

    if (hardcodedTexts.length === 0) {
      console.log(`✓ Aucun texte en dur détecté dans ${filePath}`);
      return;
    }

    console.log(`\n🔍 Analyse de ${filePath}`);
    console.log(`🔤 ${hardcodedTexts.length} textes en dur détectés.`);

    // Collecte les traductions à ajouter
    const translations = {};

    // Pour chaque texte, suggérer une clé et préparer le remplacement
    let newContent = content;
    hardcodedTexts.forEach(text => {
      const key = suggestTranslationKey(text);

      // Éviter les duplications si la clé existe déjà
      const uniqueKey = translations[key] ? `${key}_${Object.keys(translations).length}` : key;

      // Stocker la traduction
      translations[uniqueKey] = text;

      // Échapper les caractères spéciaux pour la regex
      const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Remplacer le texte par l'appel à t()
      const regex = new RegExp(`(>\\s*)${escapedText}(\\s*<)`, 'g');
      newContent = newContent.replace(regex, `$1{t('${uniqueKey}')}$2`);

      // Remplacer les textes dans les attributs
      const attrRegex = new RegExp(`((?:title|placeholder|label|alt|aria-label)=")${escapedText}(")`, 'g');
      newContent = newContent.replace(attrRegex, `$1{t('${uniqueKey}')}$2`);

      console.log(`  ✓ "${text}" → t('${uniqueKey}')`);
    });

    // Vérifier si quelque chose a été modifié
    if (newContent !== content) {
      // Vérifier si import est nécessaire
      if (!newContent.includes('import { useLanguage }') && !newContent.includes('{ t }')) {
        // Ajouter l'import pour useLanguage si nécessaire
        if (newContent.includes('import React')) {
          newContent = newContent.replace(/import React[^;]*;/, match => `${match}\nimport { useLanguage } from '@/contexts/LanguageContext';`);
        } else {
          newContent = `import { useLanguage } from '@/contexts/LanguageContext';\n${newContent}`;
        }
        
        // Ajouter la déclaration de t si c'est un composant fonctionnel
        if (newContent.includes('function') || newContent.includes('=>') || newContent.includes('export const')) {
          const functionMatch = newContent.match(/((function|const)\s+\w+|export\s+(default\s+)?((function|const)\s+)?\w+)/);
          if (functionMatch) {
            const matchPos = functionMatch.index + functionMatch[0].length;
            const beforeFunction = newContent.substring(0, matchPos);
            const afterFunction = newContent.substring(matchPos);
            
            // Trouver où insérer le hook
            const openBracePos = afterFunction.indexOf('{');
            if (openBracePos !== -1) {
              newContent = beforeFunction + afterFunction.substring(0, openBracePos + 1) + 
                '\n  const { t } = useLanguage();' + 
                afterFunction.substring(openBracePos + 1);
            }
          }
        }
      }
      
      // Sauvegarder les modifications
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`💾 Fichier mis à jour: ${filePath}`);

      // Ajouter les traductions au contexte
      updateTranslationContext(translations);

      return translations;
    } else {
      console.log(`⚠️ Aucune modification n'a pu être appliquée dans ${filePath}`);
      return {};
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error);
    return {};
  }
}

// Fonction pour mettre à jour le fichier LanguageContext avec les nouvelles traductions
function updateTranslationContext(translations) {
  if (Object.keys(translations).length === 0) return;

  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');

  try {
    let content = fs.readFileSync(contextPath, 'utf8');

    // Pour chaque langue
    ['fr', 'en', 'es'].forEach(lang => {
      const langSection = content.indexOf(`${lang}: {`);
      if (langSection === -1) return;

      // Trouver la fin de la section
      let nestingLevel = 0;
      let endSection = langSection;
      
      for (let i = langSection; i < content.length; i++) {
        if (content[i] === '{') nestingLevel++;
        if (content[i] === '}') {
          nestingLevel--;
          if (nestingLevel === 0) {
            endSection = i;
            break;
          }
        }
      }

      const insertPoint = endSection;

      // Préparer les nouvelles traductions
      const newTranslations = Object.entries(translations)
        .map(([key, value]) => {
          // Pour l'anglais et l'espagnol, nous mettons temporairement la même valeur
          // et nous marquerons cela pour que le développeur sache qu'il faut les traduire
          let text = value;
          if (lang !== 'fr') {
            text = `${value} (à traduire en ${lang})`;
          }
          return `    ${key}: '${text.replace(/'/g, "\\'")}'`;
        })
        .join(',\n');

      // Insérer les nouvelles traductions
      if (newTranslations) {
        content = content.slice(0, insertPoint) + ',\n' + newTranslations + content.slice(insertPoint);
      }
    });

    // Sauvegarder les modifications
    fs.writeFileSync(contextPath, content, 'utf8');
    console.log(`📚 ${Object.keys(translations).length} traductions ajoutées au contexte de langue.`);

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du contexte de langue:', error);
  }
}

// Point d'entrée principal
function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0] || './src';

  console.log(`🌐 Recherche de textes en dur dans ${targetDir}...`);

  const files = findFiles(path.resolve(targetDir));
  console.log(`📁 ${files.length} fichiers trouvés.`);

  let totalTranslations = {};

  files.forEach(file => {
    const translations = replaceHardcodedText(file);
    Object.assign(totalTranslations, translations);
  });

  console.log(`\n✅ Terminé! ${Object.keys(totalTranslations).length} traductions au total.`);
  
  // Informations supplémentaires pour l'utilisateur
  console.log(`\n📋 Prochaines étapes recommandées:`);
  console.log(`1. Vérifiez les traductions générées dans src/contexts/LanguageContext.tsx`);
  console.log(`2. Complétez les traductions marquées "(à traduire en...)"`);
  console.log(`3. Utilisez le TranslationDebugger pour identifier les textes manquants`);
}

main();

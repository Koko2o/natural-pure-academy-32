const fs = require('fs');
const path = require('path');
const { scanForHardcodedText, suggestTranslationKey } = require('../src/utils/translationHelper');

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

    // Sauvegarder les modifications
    if (newContent !== content) {
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
      const endBrace = content.indexOf('}', langSection);
      const insertPoint = endBrace;

      // Préparer les nouvelles traductions
      const newTranslations = Object.entries(translations)
        .map(([key, value]) => {
          // Pour l'anglais et l'espagnol, mettre temporairement le même texte
          const text = lang === 'fr' ? value : `${value} (${lang})`;
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
}

main();
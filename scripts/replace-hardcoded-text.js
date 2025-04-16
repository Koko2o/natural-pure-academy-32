
// Script pour remplacer les textes en dur par des appels à la fonction t()
const fs = require('fs');
const path = require('path');

// Fonction pour remplacer les textes en dur dans un fichier
function replaceHardcodedText(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le hook de traduction est présent
    if (!content.includes('useTranslation') && !content.includes('useLanguage')) {
      console.log(`⚠️ ${filePath} n'a pas de hook de traduction, ajoutez-le d'abord`);
      return;
    }
    
    // Patterns pour trouver les textes en dur
    const patterns = [
      // Textes dans les balises h1, h2, h3, p, etc.
      { 
        regex: /(<h[1-6][^>]*>)([^<{][^<]*?)(<\/h[1-6]>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}${closeTag}`
      },
      { 
        regex: /(<p[^>]*>)([^<{][^<]*?)(<\/p>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}${closeTag}`
      },
      { 
        regex: /(<span[^>]*>)([^<{][^<]*?)(<\/span>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}${closeTag}`
      },
      // Attributs courants contenant du texte
      {
        regex: /(title=")([^"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(placeholder=")([^"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(alt=")([^"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(aria-label=")([^"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      }
    ];
    
    // Appliquer les patterns un par un
    let modified = false;
    patterns.forEach(pattern => {
      const newContent = content.replace(pattern.regex, pattern.replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    // Sauvegarder les changements si le fichier a été modifié
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filePath} - Textes en dur remplacés par t()`);
    } else {
      console.log(`ℹ️ ${filePath} - Aucun texte en dur trouvé avec les patterns actuels`);
    }
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
      replaceHardcodedText(filePath);
    }
  });
}

// Point d'entrée
const targetDir = process.argv[2] || path.join(process.cwd(), 'src', 'components');

console.log(`🔍 Remplacement des textes en dur dans ${targetDir}...`);
processDirectory(targetDir);
console.log('✅ Traitement terminé!');

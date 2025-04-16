
// Script amélioré pour remplacer les textes en dur par des appels à la fonction t()
const fs = require('fs');
const path = require('path');

// Fonction pour remplacer les textes en dur dans un fichier
function replaceHardcodedText(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le hook de traduction est présent
    const hasTranslationHook = content.includes('useTranslation') || content.includes('useLanguage');
    if (!hasTranslationHook) {
      console.log(`⚠️ ${filePath} n'a pas de hook de traduction, ajoutez-le d'abord`);
      return false;
    }
    
    // Vérifier si la variable t est déclarée
    const hasTFunction = /const\s+{\s*t\s*}\s*=\s*use(Translation|Language)\(\)/.test(content);
    if (!hasTFunction) {
      console.log(`⚠️ ${filePath} utilise le hook mais n'a pas déclaré la fonction t`);
      return false;
    }
    
    // Patterns pour trouver les textes en dur
    const patterns = [
      // Textes dans les balises h1, h2, h3, p, etc.
      { 
        regex: /(<h[1-6][^>]*>)([^<{][^<]*?)(<\/h[1-6]>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}</${openTag.slice(1).split(' ')[0]}>`
      },
      { 
        regex: /(<p[^>]*>)([^<{][^<]*?)(<\/p>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}</p>`
      },
      { 
        regex: /(<span[^>]*>)([^<{][^<]*?)(<\/span>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}</span>`
      },
      { 
        regex: /(<div[^>]*>)([^<{][^<]*?)(<\/div>)/g,
        replacement: (match, openTag, text, closeTag) => {
          // Ne remplacer que si le texte n'est pas juste des espaces blancs
          if (text.trim().length > 0) {
            return `${openTag}{t('${text.trim()}')}</div>`;
          }
          return match;
        }
      },
      { 
        regex: /(<li[^>]*>)([^<{][^<]*?)(<\/li>)/g,
        replacement: (match, openTag, text, closeTag) => 
          `${openTag}{t('${text.trim()}')}</li>`
      },
      // Attributs courants contenant du texte
      {
        regex: /(title=")([^{"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(placeholder=")([^{"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(alt=")([^{"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      {
        regex: /(aria-label=")([^{"]+)(")/g,
        replacement: (match, prefix, text, suffix) => 
          `${prefix}{t('${text}')}${suffix}`
      },
      // Chaînes de caractères dans les fonctions/variables
      {
        regex: /(\s*=\s*['"])([^'"{}<>]+)(['"])/g,
        replacement: (match, prefix, text, suffix) => {
          // Ignorer les URLs, chemins, etc.
          if (text.includes('/') || text.includes('.') || text.match(/^[a-zA-Z0-9_-]+$/)) {
            return match;
          }
          return `${prefix}{t('${text}')}${suffix}`;
        }
      }
    ];
    
    // Appliquer les patterns un par un
    let modified = false;
    let modifications = 0;
    
    patterns.forEach(pattern => {
      const newContent = content.replace(pattern.regex, (match, ...args) => {
        const replacement = pattern.replacement(match, ...args);
        if (replacement !== match) {
          modifications++;
          return replacement;
        }
        return match;
      });
      
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    // Sauvegarder les changements si le fichier a été modifié
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filePath} - ${modifications} textes en dur remplacés par t()`);
      return true;
    } else {
      console.log(`ℹ️ ${filePath} - Aucun texte en dur trouvé avec les patterns actuels`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Erreur avec ${filePath}:`, err.message);
    return false;
  }
}

// Fonction récursive pour traiter un dossier
function processDirectory(directory, stats = { processed: 0, modified: 0, errors: 0 }) {
  console.log(`🔍 Traitement du dossier: ${directory}`);
  
  try {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !filePath.includes('node_modules')) {
          processDirectory(filePath, stats);
        } else if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
          stats.processed++;
          const wasModified = replaceHardcodedText(filePath);
          if (wasModified) stats.modified++;
        }
      } catch (err) {
        console.error(`❌ Erreur en traitant ${filePath}:`, err.message);
        stats.errors++;
      }
    });
  } catch (err) {
    console.error(`❌ Erreur en lisant le dossier ${directory}:`, err.message);
    stats.errors++;
  }
  
  return stats;
}

// Point d'entrée
function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0] || path.join(process.cwd(), 'src');
  
  console.log(`🌐 Remplacement des textes en dur dans ${targetDir}...`);
  
  const stats = processDirectory(targetDir);
  
  console.log(`
✅ Traitement terminé!
📊 Statistiques:
  - Fichiers traités: ${stats.processed}
  - Fichiers modifiés: ${stats.modified}
  - Erreurs: ${stats.errors}
  `);
}

main();

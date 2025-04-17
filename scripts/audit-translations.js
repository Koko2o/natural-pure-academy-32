const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Configuration
const CONFIG = {
  componentsDir: 'src/components',
  pagesDir: 'src/pages',
  outputFile: 'translation-audit.json',
  skipPatterns: ['node_modules', 'dist', '.git', 'ui/'],
  languageContextPath: 'src/contexts/LanguageContext.tsx'
};

// Fonction pour scanner un fichier à la recherche de textes codés en dur
const scanFile = (filePath) => {
  const result = {
    file: filePath,
    hardcodedTexts: []
  };

  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy']
    });

    // Vérifier si useLanguage est importé
    let hasUseLanguageImport = false;
    let hasTDestructuring = false;

    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('LanguageContext') && 
            path.node.specifiers.some(s => s.imported && s.imported.name === 'useLanguage')) {
          hasUseLanguageImport = true;
        }
      },
      VariableDeclarator(path) {
        if (path.node.init && 
            path.node.init.type === 'CallExpression' && 
            path.node.init.callee.name === 'useLanguage' &&
            path.node.id.type === 'ObjectPattern') {
          if (path.node.id.properties.some(p => p.key.name === 't')) {
            hasTDestructuring = true;
          }
        }
      }
    });

    // Si le composant n'utilise pas les traductions, c'est suspect
    if (!hasUseLanguageImport || !hasTDestructuring) {
      result.hardcodedTexts.push("[ALERTE] Ce composant n'utilise pas le système de traduction!");
    }

    // Rechercher les strings literales et textes JSX
    traverse(ast, {
      StringLiteral(path) {
        // Ignorer les strings dans les importations, attributs className, etc.
        if (path.parent.type === 'ImportDeclaration' || 
            path.parent.type === 'ExportNamedDeclaration' ||
            (path.parent.type === 'JSXAttribute' && 
             ['className', 'style', 'id', 'src', 'href', 'alt'].includes(path.parent.name.name))) {
          return;
        }

        const value = path.node.value.trim();
        // Ignorer les petits strings ou les identifiants
        if (value.length > 3 && !/^[a-z0-9_]+$/.test(value)) {
          // Ignorer si c'est déjà un argument de t()
          if (path.parent.type === 'CallExpression' && 
              path.parent.callee.type === 'Identifier' && 
              path.parent.callee.name === 't') {
            return;
          }

          result.hardcodedTexts.push(value);
        }
      },
      JSXText(path) {
        const value = path.node.value.trim();
        if (value.length > 3) {
          result.hardcodedTexts.push(value);
        }
      }
    });
  } catch (error) {
    console.error(`Erreur lors de l'analyse de ${filePath}:`, error.message);
    result.error = error.message;
  }

  return result;
};

// Fonction pour scanner un répertoire re
const scanDirectory = (dir) => {
  const results = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Le répertoire ${dir} n'existe pas!`);
    return results;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Ignorer les répertoires exclus
    if (CONFIG.skipPatterns.some(pattern => fullPath.includes(pattern))) {
      continue;
    }

    if (entry.isDirectory()) {
      results.push(...scanDirectory(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
      const fileResult = scanFile(fullPath);
      if (fileResult.hardcodedTexts.length > 0) {
        results.push(fileResult);
      }
    }
  }

  return results;
};

// Extraction des traductions existantes
const extractExistingTranslations = () => {
  const contextFile = path.resolve(CONFIG.languageContextPath);
  if (!fs.existsSync(contextFile)) {
    console.error(`Fichier de contexte de langue introuvable: ${contextFile}`);
    return {};
  }

  const content = fs.readFileSync(contextFile, 'utf-8');
  const translations = {};

  // Recherche les définitions de traductions dans le fichier
  const englishMatch = content.match(/english:\s*{([^}]*)}/s);
  const frenchMatch = content.match(/french:\s*{([^}]*)}/s);
  const spanishMatch = content.match(/spanish:\s*{([^}]*)}/s);

  if (englishMatch && englishMatch[1]) {
    const entries = englishMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key) {
        translations[key] = { en: value };
      }
    });
  }

  if (frenchMatch && frenchMatch[1]) {
    const entries = frenchMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key) {
        if (!translations[key]) translations[key] = {};
        translations[key].fr = value;
      }
    });
  }

  if (spanishMatch && spanishMatch[1]) {
    const entries = spanishMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key) {
        if (!translations[key]) translations[key] = {};
        translations[key].es = value;
      }
    });
  }

  return translations;
};

// Vérifier les traductions incomplètes
const findIncompleteTranslations = () => {
  const translations = extractExistingTranslations();
  const incomplete = {
    missingFrench: [],
    missingSpanish: [],
    untranslatedFrench: [], // Où le français est juste une copie de l'anglais
    untranslatedSpanish: [] // Où l'espagnol est juste une copie de l'anglais
  };

  Object.entries(translations).forEach(([key, langs]) => {
    if (!langs.fr) {
      incomplete.missingFrench.push(key);
    } else if (langs.fr.includes('à traduire en français') || langs.fr === langs.en) {
      incomplete.untranslatedFrench.push(key);
    }

    if (!langs.es) {
      incomplete.missingSpanish.push(key);
    } else if (langs.es.includes('traducir al español') || langs.es === langs.en) {
      incomplete.untranslatedSpanish.push(key);
    }
  });

  return incomplete;
};

// Fonction principale d'audit
const runAudit = () => {
  console.log('🔍 Démarrage de l\'audit de traduction...');

  // Vérifier les traductions existantes
  const translations = extractExistingTranslations();
  console.log(`📊 ${Object.keys(translations).length} clés de traduction trouvées dans le contexte`);

  // Vérifier les traductions incomplètes
  const incomplete = findIncompleteTranslations();

  console.log(`⚠️ ${incomplete.missingFrench.length} traductions manquantes en français`);
  console.log(`⚠️ ${incomplete.missingSpanish.length} traductions manquantes en espagnol`);
  console.log(`⚠️ ${incomplete.untranslatedFrench.length} traductions non traduites en français`);
  console.log(`⚠️ ${incomplete.untranslatedSpanish.length} traductions non traduites en espagnol`);

  // Scanner les composants et pages
  console.log('🔍 Analyse des composants...');
  const componentsResults = scanDirectory(CONFIG.componentsDir);

  console.log('🔍 Analyse des pages...');
  const pagesResults = scanDirectory(CONFIG.pagesDir);

  const allResults = [...componentsResults, ...pagesResults];

  // Compter le nombre total de textes codés en dur
  const totalHardcodedTexts = allResults.reduce((sum, file) => sum + file.hardcodedTexts.length, 0);
  console.log(`⚠️ ${totalHardcodedTexts} textes codés en dur trouvés dans ${allResults.length} fichiers`);

  // Sauvegarder les résultats
  const auditResults = {
    translations: {
      total: Object.keys(translations).length,
      incomplete
    },
    hardcodedTexts: allResults
  };

  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(auditResults, null, 2));

  console.log(`✅ Audit terminé - résultats sauvegardés dans ${CONFIG.outputFile}`);

  // Afficher les 5 premiers fichiers problématiques
  if (allResults.length > 0) {
    console.log('\n🔴 Top 5 fichiers avec des textes codés en dur:');
    allResults
      .sort((a, b) => b.hardcodedTexts.length - a.hardcodedTexts.length)
      .slice(0, 5)
      .forEach(file => {
        console.log(`${file.file}: ${file.hardcodedTexts.length} textes`);
      });
  }
};

// Exécuter l'audit
runAudit();
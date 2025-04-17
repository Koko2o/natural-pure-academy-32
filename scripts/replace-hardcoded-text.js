
const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Configuration
const CONFIG = {
  scanDir: process.argv[2] || 'src/components',
  logFile: 'translation-replacements.log',
  languageContextPath: 'src/contexts/LanguageContext.tsx',
  skipPatterns: [
    'node_modules', 
    'dist',
    '.git',
    'ui',
    'test'
  ],
  // Textes à ignorer (ex: noms de propriétés, identifiants techniques)
  ignoreStrings: [
    'className', 'variant', 'size', 'name', 'id', 'type', 'placeholder',
    'src', 'alt', 'href', 'target', 'rel', 'key', 'style', 'onClick',
    'component', 'export', 'import', 'default', 'function', 'const',
    'let', 'var', 'return', 'if', 'else', 'for', 'while', 'switch',
    'case', 'break', 'continue', 'true', 'false', 'null', 'undefined'
  ],
  minLength: 3, // Longueur minimale des textes à traduire
  maxLogEntries: 1000 // Nombre max d'entrées de log avant écriture
};

// State pour le traitement
let addedTranslations = {};
let logEntries = [];

// Fonction pour vérifier si une chaîne doit être ignorée
function shouldIgnoreString(str) {
  if (!str || typeof str !== 'string') return true;
  if (str.length < CONFIG.minLength) return true;
  if (CONFIG.ignoreStrings.includes(str)) return true;
  
  // Ignorer les URLs
  if (str.startsWith('http') || str.startsWith('/') || str.includes('.')) return true;
  
  // Ignorer les chaînes qui ressemblent à des clés de traduction (t('key'))
  if (str.match(/^[a-z0-9_]+$/)) return true;
  
  return false;
}

// Générer une clé de traduction à partir d'un texte
function generateTranslationKey(text) {
  // Nettoyer et normaliser le texte
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 30); // Limiter la longueur de la clé
}

// Extraire les clés de traduction existantes du LanguageContext
function extractExistingTranslations() {
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
      if (key && value) {
        if (!translations[key]) translations[key] = {};
        translations[key].en = value;
      }
    });
  }

  if (frenchMatch && frenchMatch[1]) {
    const entries = frenchMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key && value) {
        if (!translations[key]) translations[key] = {};
        translations[key].fr = value;
      }
    });
  }

  if (spanishMatch && spanishMatch[1]) {
    const entries = spanishMatch[1].match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/g) || [];
    entries.forEach(entry => {
      const [, key, value] = entry.match(/([a-zA-Z0-9_]+):\s*["']([^"']*)["']/) || [];
      if (key && value) {
        if (!translations[key]) translations[key] = {};
        translations[key].es = value;
      }
    });
  }

  return translations;
}

// Ajouter une nouvelle traduction au LanguageContext
function addTranslationToContext(key, text) {
  // Si la traduction existe déjà, ne pas la réajouter
  if (addedTranslations[key]) return;
  
  const contextFile = path.resolve(CONFIG.languageContextPath);
  let content = fs.readFileSync(contextFile, 'utf-8');

  // Vérifier si la clé existe déjà dans le fichier
  const keyRegex = new RegExp(`\\b${key}\\b:`);
  if (content.match(keyRegex)) {
    console.log(`La clé '${key}' existe déjà dans le contexte de langue.`);
    return;
  }

  // Préparer les entrées pour chaque langue
  const newTranslations = {
    en: `    ${key}: "${text}",\n`,
    fr: `    ${key}: "${text} (à traduire en français)",\n`,
    es: `    ${key}: "${text} (traducir al español)",\n`
  };

  // Insérer dans les sections appropriées
  ['english', 'french', 'spanish'].forEach(lang => {
    const langCode = lang === 'english' ? 'en' : lang === 'french' ? 'fr' : 'es';
    const sectionRegex = new RegExp(`${lang}:\\s*{([^}]*)}`, 's');
    const match = content.match(sectionRegex);
    
    if (match && match.index !== undefined) {
      const insertPos = match.index + match[0].indexOf('{') + 1;
      content = content.substring(0, insertPos) + '\n' + newTranslations[langCode] + content.substring(insertPos);
    }
  });

  fs.writeFileSync(contextFile, content);
  addedTranslations[key] = text;
  logEntries.push(`Ajout de traduction: ${key} = "${text}"`);
}

// Fonction principale pour scanner et transformer les fichiers
function processFile(filePath) {
  console.log(`Traitement du fichier: ${filePath}`);
  
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy']
    });

    let hasImportedUseLanguage = false;
    let hasDestructuredT = false;
    let fileModified = false;
    
    // Vérifier si useLanguage est déjà importé
    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('LanguageContext') && 
            path.node.specifiers.some(s => s.imported && s.imported.name === 'useLanguage')) {
          hasImportedUseLanguage = true;
        }
      },
      VariableDeclarator(path) {
        // Vérifier si t a été destructuré de useLanguage
        if (path.node.init && 
            path.node.init.type === 'CallExpression' && 
            path.node.init.callee.name === 'useLanguage' &&
            path.node.id.type === 'ObjectPattern') {
          const properties = path.node.id.properties;
          if (properties.some(p => p.key.name === 't')) {
            hasDestructuredT = true;
          }
        }
      }
    });

    // Première passe: remplacer les chaînes de caractères par t('key')
    let stringLiteralsReplaced = false;
    traverse(ast, {
      StringLiteral(path) {
        // Ne pas traiter les chaînes dans les importations ou exportations
        if (path.parent.type === 'ImportDeclaration' || 
            path.parent.type === 'ExportNamedDeclaration' ||
            path.parent.type === 'JSXAttribute' && ['className', 'style', 'id', 'src', 'href', 'alt'].includes(path.parent.name.name)) {
          return;
        }
        
        const value = path.node.value;
        if (shouldIgnoreString(value)) return;
        
        // Générer une clé de traduction unique
        const key = generateTranslationKey(value);
        
        // Remplacer la chaîne par t('key')
        path.replaceWith(
          t.callExpression(
            t.identifier('t'),
            [t.stringLiteral(key)]
          )
        );
        
        // Ajouter la traduction au contexte
        addTranslationToContext(key, value);
        
        stringLiteralsReplaced = true;
        fileModified = true;
        
        logEntries.push(`Dans ${filePath}: "${value}" -> t('${key}')`);
      },
      JSXText(path) {
        const value = path.node.value.trim();
        if (shouldIgnoreString(value)) return;
        
        const key = generateTranslationKey(value);
        
        // Remplacer le texte JSX par {t('key')}
        path.replaceWith(
          t.jsxExpressionContainer(
            t.callExpression(
              t.identifier('t'),
              [t.stringLiteral(key)]
            )
          )
        );
        
        addTranslationToContext(key, value);
        
        stringLiteralsReplaced = true;
        fileModified = true;
        
        logEntries.push(`Dans ${filePath} (JSX): "${value}" -> {t('${key}')}`);
      }
    });

    // Si des modifications ont été faites et useLanguage n'est pas importé, l'ajouter
    if (stringLiteralsReplaced && !hasImportedUseLanguage) {
      const importStatement = t.importDeclaration(
        [t.importSpecifier(t.identifier('useLanguage'), t.identifier('useLanguage'))],
        t.stringLiteral('../contexts/LanguageContext')
      );
      
      // Insérer l'import au début du fichier
      let importInserted = false;
      traverse(ast, {
        Program(path) {
          if (!importInserted) {
            path.node.body.unshift(importStatement);
            importInserted = true;
          }
        }
      });
    }

    // Si des chaînes ont été remplacées mais t n'est pas destructuré, l'ajouter
    if (stringLiteralsReplaced && !hasDestructuredT) {
      traverse(ast, {
        FunctionDeclaration(path) {
          if (path.node.id && path.node.id.name === 'App' || path.parent.type === 'ExportDefaultDeclaration') {
            const firstStatement = path.get('body').get('body')[0];
            const tDeclaration = t.variableDeclaration(
              'const',
              [t.variableDeclarator(
                t.objectPattern([t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)]),
                t.callExpression(t.identifier('useLanguage'), [])
              )]
            );
            
            if (firstStatement) {
              firstStatement.insertBefore(tDeclaration);
            } else {
              path.get('body').unshiftContainer('body', tDeclaration);
            }
          }
        },
        ArrowFunctionExpression(path) {
          if (path.parent.type === 'VariableDeclarator' && 
              path.parent.id.type === 'Identifier' && 
              (path.parent.id.name === 'App' || path.parent.id.name.endsWith('Page'))) {
            
            const body = path.get('body');
            if (body.type === 'BlockStatement') {
              const firstStatement = body.get('body')[0];
              const tDeclaration = t.variableDeclaration(
                'const',
                [t.variableDeclarator(
                  t.objectPattern([t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)]),
                  t.callExpression(t.identifier('useLanguage'), [])
                )]
              );
              
              if (firstStatement) {
                firstStatement.insertBefore(tDeclaration);
              } else {
                body.unshiftContainer('body', tDeclaration);
              }
            }
          }
        }
      });
    }

    if (fileModified) {
      // Générer le code transformé
      const { code: transformedCode } = generate(ast, {}, code);
      fs.writeFileSync(filePath, transformedCode);
      console.log(`✅ Fichier modifié: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error);
    logEntries.push(`ERREUR: ${filePath} - ${error.message}`);
  }
  
  // Écrire les logs si nécessaire
  if (logEntries.length >= CONFIG.maxLogEntries) {
    fs.appendFileSync(CONFIG.logFile, logEntries.join('\n') + '\n');
    logEntries = [];
  }
}

// Scanner un répertoire récursivement
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Ignorer les répertoires de la liste d'exclusion
    if (entry.isDirectory() && !CONFIG.skipPatterns.some(pattern => entry.name.includes(pattern))) {
      scanDirectory(fullPath);
    } 
    // Traiter les fichiers .tsx ou .jsx
    else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
      processFile(fullPath);
    }
  }
}

// Point d'entrée principal
console.log(`📝 Démarrage du processus de remplacement des textes codés en dur...`);
console.log(`📂 Répertoire à scanner: ${CONFIG.scanDir}`);

// S'assurer que le répertoire existe
if (!fs.existsSync(CONFIG.scanDir)) {
  console.error(`❌ Le répertoire ${CONFIG.scanDir} n'existe pas!`);
  process.exit(1);
}

// Extraire les traductions existantes
const existingTranslations = extractExistingTranslations();
console.log(`🔍 ${Object.keys(existingTranslations).length} traductions existantes trouvées`);

// Initialiser le fichier de log
fs.writeFileSync(CONFIG.logFile, `*** Rapport de remplacement des textes codés en dur ***\n`);
fs.appendFileSync(CONFIG.logFile, `Date: ${new Date().toISOString()}\n`);
fs.appendFileSync(CONFIG.logFile, `Répertoire scanné: ${CONFIG.scanDir}\n\n`);

// Lancer le scan récursif
try {
  scanDirectory(CONFIG.scanDir);
  
  // Écrire les logs restants
  if (logEntries.length > 0) {
    fs.appendFileSync(CONFIG.logFile, logEntries.join('\n') + '\n');
  }
  
  // Résumé final
  const summary = `\n*** Résumé ***\n${Object.keys(addedTranslations).length} nouvelles traductions ajoutées.\n`;
  fs.appendFileSync(CONFIG.logFile, summary);
  
  console.log(`✅ Processus terminé!`);
  console.log(`📊 ${Object.keys(addedTranslations).length} nouvelles traductions ajoutées.`);
  console.log(`📋 Log détaillé disponible dans ${CONFIG.logFile}`);
} catch (error) {
  console.error(`❌ Erreur générale:`, error);
  fs.appendFileSync(CONFIG.logFile, `\nERREUR FATALE: ${error.message}\n`);
}

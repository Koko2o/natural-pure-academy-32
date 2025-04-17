
const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Configuration
const CONFIG = {
  scanDir: process.argv[2] || 'src/components',
  logFile: 'translation-hooks-added.log',
  skipPatterns: [
    'node_modules', 
    'dist',
    '.git'
  ]
};

let logEntries = [];

// Fonction principale pour ajouter les hooks de traduction aux composants React
function addTranslationHook(filePath) {
  console.log(`Analyse du fichier: ${filePath}`);
  
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy']
    });

    let hasImportedUseLanguage = false;
    let hasDestructuredT = false;
    let fileNeedsModification = false;
    
    // Vérifier si useLanguage est déjà importé
    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('LanguageContext') || 
            path.node.source.value.includes('contexts/LanguageContext')) {
          if (path.node.specifiers.some(s => 
              (s.imported && s.imported.name === 'useLanguage') || 
              (s.local && s.local.name === 'useLanguage'))) {
            hasImportedUseLanguage = true;
          }
        }
      },
      VariableDeclarator(path) {
        // Vérifier si t a été destructuré de useLanguage
        if (path.node.init && 
            path.node.init.type === 'CallExpression' && 
            path.node.init.callee && 
            path.node.init.callee.name === 'useLanguage' &&
            path.node.id.type === 'ObjectPattern') {
          const properties = path.node.id.properties;
          if (properties.some(p => 
              (p.key && p.key.name === 't') || 
              (p.value && p.value.name === 't'))) {
            hasDestructuredT = true;
          }
        }
      },
      // Détecter si le fichier contient des composants JSX (seulement pour les fichiers qui en ont besoin)
      JSXElement() {
        fileNeedsModification = true;
      },
      CallExpression(path) {
        // Détecter les appels à React.createElement pour les composants qui n'utilisent pas JSX
        if (path.node.callee.type === 'MemberExpression' && 
            path.node.callee.object.name === 'React' && 
            path.node.callee.property.name === 'createElement') {
          fileNeedsModification = true;
        }
      }
    });

    // Si le fichier a besoin de hooks de traduction mais n'en a pas, les ajouter
    let fileModified = false;

    if (fileNeedsModification && !hasImportedUseLanguage) {
      // Ajouter l'import de useLanguage
      const importStatement = t.importDeclaration(
        [t.importSpecifier(t.identifier('useLanguage'), t.identifier('useLanguage'))],
        t.stringLiteral(
          path.dirname(filePath).includes('components') 
            ? '../contexts/LanguageContext'
            : './contexts/LanguageContext'
        )
      );
      
      // Insérer l'import au début du fichier, après les autres imports React
      let importInserted = false;
      let lastImportIndex = -1;
      
      traverse(ast, {
        Program(path) {
          if (!importInserted) {
            path.node.body.forEach((node, index) => {
              if (node.type === 'ImportDeclaration') {
                lastImportIndex = index;
              }
            });
            
            if (lastImportIndex >= 0) {
              path.node.body.splice(lastImportIndex + 1, 0, importStatement);
            } else {
              path.node.body.unshift(importStatement);
            }
            
            importInserted = true;
            fileModified = true;
            logEntries.push(`Import useLanguage ajouté à ${filePath}`);
          }
        }
      });
    }

    // Ajouter la déclaration de t dans les composants si nécessaire
    if (fileNeedsModification && !hasDestructuredT && hasImportedUseLanguage) {
      // Fonction pour ajouter destructuration de t dans un composant
      const addTDestructuring = (bodyPath) => {
        const tDeclaration = t.variableDeclaration(
          'const',
          [t.variableDeclarator(
            t.objectPattern([t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)]),
            t.callExpression(t.identifier('useLanguage'), [])
          )]
        );
        
        // Pour les composants fonctionnels, ajouter au début du corps de la fonction
        if (bodyPath.isBlockStatement()) {
          bodyPath.unshiftContainer('body', tDeclaration);
          fileModified = true;
          logEntries.push(`Déclaration de t ajoutée dans un composant de ${filePath}`);
        } else if (bodyPath.isJSXElement() || bodyPath.isJSXFragment()) {
          // Pour les fonctions qui retournent directement du JSX, il faut créer un bloc
          const returnStatement = t.returnStatement(bodyPath.node);
          bodyPath.replaceWith(
            t.blockStatement([
              tDeclaration,
              returnStatement
            ])
          );
          fileModified = true;
          logEntries.push(`Déclaration de t ajoutée avec création de bloc dans ${filePath}`);
        }
      };
      
      // Chercher les composants fonctionnels (déclaration de fonction ou fonction flèche)
      traverse(ast, {
        FunctionDeclaration(path) {
          // Ne pas modifier les fonctions utilitaires non-React
          if (!path.node.body || !fileNeedsModification) return;
          
          // Vérifier si c'est un composant React (commence par une majuscule)
          if (path.node.id && /^[A-Z]/.test(path.node.id.name)) {
            addTDestructuring(path.get('body'));
          }
        },
        ArrowFunctionExpression(path) {
          // Vérifier si c'est un composant React (assignment à variable commençant par majuscule ou export)
          if (!path.node.body || !fileNeedsModification) return;
          
          const parent = path.parent;
          let isReactComponent = false;
          
          if (parent.type === 'VariableDeclarator' && parent.id && parent.id.name && /^[A-Z]/.test(parent.id.name)) {
            isReactComponent = true;
          } else if (parent.type === 'ExportDefaultDeclaration') {
            isReactComponent = true;
          }
          
          if (isReactComponent) {
            addTDestructuring(path.get('body'));
          }
        }
      });
    }

    if (fileModified) {
      // Générer le code transformé et l'écrire dans le fichier
      const { code: transformedCode } = generate(ast, {}, code);
      fs.writeFileSync(filePath, transformedCode);
      console.log(`✅ Hooks de traduction ajoutés à: ${filePath}`);
    } else {
      console.log(`✓ Aucune modification nécessaire pour: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${filePath}:`, error);
    logEntries.push(`ERREUR: ${filePath} - ${error.message}`);
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
    // Traiter les fichiers .tsx ou .jsx ou .ts
    else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
      addTranslationHook(fullPath);
    }
  }
}

// Point d'entrée principal
console.log(`🔍 Démarrage du processus d'ajout des hooks de traduction...`);
console.log(`📂 Répertoire à scanner: ${CONFIG.scanDir}`);

// S'assurer que le répertoire existe
if (!fs.existsSync(CONFIG.scanDir)) {
  console.error(`❌ Le répertoire ${CONFIG.scanDir} n'existe pas!`);
  process.exit(1);
}

// Initialiser le fichier de log
fs.writeFileSync(CONFIG.logFile, `*** Rapport d'ajout des hooks de traduction ***\n`);
fs.appendFileSync(CONFIG.logFile, `Date: ${new Date().toISOString()}\n`);
fs.appendFileSync(CONFIG.logFile, `Répertoire scanné: ${CONFIG.scanDir}\n\n`);

// Vérifier si les dépendances @babel sont installées
try {
  require('@babel/parser');
  require('@babel/traverse');
  require('@babel/generator');
  require('@babel/types');
} catch (error) {
  console.error('❌ Erreur: Dépendances @babel manquantes');
  console.log('👉 Exécutez: npm install --save-dev @babel/parser @babel/traverse @babel/generator @babel/types');
  process.exit(1);
}

// Lancer le scan récursif
try {
  scanDirectory(CONFIG.scanDir);
  
  // Écrire les logs
  fs.appendFileSync(CONFIG.logFile, logEntries.join('\n') + '\n');
  
  console.log(`✅ Processus terminé!`);
  console.log(`📋 Log détaillé disponible dans ${CONFIG.logFile}`);
} catch (error) {
  console.error(`❌ Erreur générale:`, error);
  fs.appendFileSync(CONFIG.logFile, `\nERREUR FATALE: ${error.message}\n`);
}

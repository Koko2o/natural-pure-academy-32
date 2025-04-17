
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const chalk = require('chalk');

// Configuration
const SOURCE_DIR = 'src';
const OUTPUT_FILE = 'translation-audit-report.md';
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const MIN_TEXT_LENGTH = 3;
const IGNORE_PATTERNS = [
  /import .* from/,
  /export .* from/,
  /^\s*\/\//,
  /^\s*\/\*/,
  /^\s*\*/,
  /^\s*\*\//,
  /console\.(log|error|warn|info)/,
  /className=/,
  /^\s*[{[].*[}\]]$/,
  /^\s*[a-zA-Z0-9_]+:\s*[a-zA-Z0-9_]+$/,
  /^\s*[a-zA-Z0-9_]+$/,
  /^\s*const\s+/,
  /^\s*let\s+/,
  /^\s*var\s+/,
  /^\s*function\s+/,
  /^\s*type\s+/,
  /^\s*interface\s+/,
  /^\s*import\s+/,
  /^\s*export\s+/,
  /^\s*return\s+/,
  /^\s*case\s+/,
  /^[0-9.]+$/,
  /^\s*[<>=/!&|^%*+\-]+\s*$/,
  /\$\{.*\}/,
  /^#[0-9a-fA-F]{3,8}$/,
  /^[a-z0-9-]+:[a-z0-9-]+$/,
  /`/
];

// Résultats de l'audit
const results = {
  totalFiles: 0,
  filesWithHardcodedText: 0,
  hardcodedTextCount: 0,
  hardcodedTextByFile: {}
};

// Fonction pour déterminer si une chaîne de caractères est probablement un texte à traduire
function isProbablyTranslatableText(text) {
  if (!text || typeof text !== 'string') return false;
  
  // Nettoyage de base
  const trimmedText = text.trim();
  
  // Ignorer les textes trop courts
  if (trimmedText.length < MIN_TEXT_LENGTH) return false;
  
  // Ignorer les motifs spécifiques
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(trimmedText)) return false;
  }
  
  // Vérifier si le texte contient au moins une lettre non ASCII (pour les caractères accentués)
  const hasNonASCIILetters = /[^\x00-\x7F][a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]/ui.test(trimmedText);
  
  // Vérifier si le texte contient des mots (au moins un mot de 3 lettres ou plus)
  const hasWords = /\b[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]{3,}\b/i.test(trimmedText);
  
  // Vérifier s'il s'agit probablement d'une phrase (commence par une majuscule ou contient un espace)
  const isProbablySentence = /^[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑÇŠŽ]/.test(trimmedText) || trimmedText.includes(' ');
  
  // Le texte est considéré comme traduisible s'il contient des mots ou ressemble à une phrase
  return hasWords && (isProbablySentence || hasNonASCIILetters);
}

// Fonction pour extraire les chaînes de caractères codées en dur d'un fichier
function extractHardcodedStrings(filePath) {
  const hardcodedStrings = [];
  
  try {
    // Lire le contenu du fichier
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si le fichier utilise déjà useLanguage ou t()
    const hasTranslationImport = fileContent.includes('useLanguage') || 
                                 fileContent.includes('import { t }') ||
                                 fileContent.includes('const { t }');
    
    // Analyser le fichier avec Babel
    const ast = parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true
    });
    
    // Parcourir l'AST pour trouver les chaînes de caractères
    traverse(ast, {
      StringLiteral(path) {
        const value = path.node.value;
        if (isProbablyTranslatableText(value)) {
          // Vérifier si la chaîne est déjà à l'intérieur d'un appel t()
          const parentPath = path.parentPath;
          if (parentPath && 
              parentPath.node.type === 'CallExpression' && 
              parentPath.node.callee && 
              parentPath.node.callee.name === 't') {
            return;
          }
          
          // Ajouter la chaîne à la liste
          const location = path.node.loc;
          hardcodedStrings.push({
            text: value,
            line: location ? location.start.line : 'Unknown',
            column: location ? location.start.column : 'Unknown'
          });
        }
      },
      JSXText(path) {
        const value = path.node.value;
        if (isProbablyTranslatableText(value)) {
          const location = path.node.loc;
          hardcodedStrings.push({
            text: value.trim(),
            line: location ? location.start.line : 'Unknown',
            column: location ? location.start.column : 'Unknown'
          });
        }
      },
      TemplateLiteral(path) {
        // Gérer les template literals qui pourraient contenir du texte à traduire
        const quasis = path.node.quasis;
        for (const quasi of quasis) {
          const value = quasi.value.cooked;
          if (isProbablyTranslatableText(value)) {
            // Vérifier que ce n'est pas déjà dans un t()
            const parentPath = path.parentPath;
            if (parentPath && 
                parentPath.node.type === 'CallExpression' && 
                parentPath.node.callee && 
                parentPath.node.callee.name === 't') {
              continue;
            }
            
            const location = quasi.loc;
            hardcodedStrings.push({
              text: value,
              line: location ? location.start.line : 'Unknown',
              column: location ? location.start.column : 'Unknown'
            });
          }
        }
      }
    });
    
    return { hardcodedStrings, hasTranslationImport };
  } catch (error) {
    console.error(chalk.red(`Erreur lors de l'analyse de ${filePath}:`), error);
    return { hardcodedStrings: [], hasTranslationImport: false };
  }
}

// Fonction pour parcourir récursivement les dossiers
function traverseDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Ignorer node_modules et autres dossiers spécifiques
      if (entry.name !== 'node_modules' && entry.name !== '.git' && !entry.name.startsWith('.')) {
        traverseDirectory(fullPath);
      }
    } else if (entry.isFile() && FILE_EXTENSIONS.includes(path.extname(entry.name))) {
      results.totalFiles++;
      
      // Extraire les chaînes codées en dur
      const { hardcodedStrings, hasTranslationImport } = extractHardcodedStrings(fullPath);
      
      if (hardcodedStrings.length > 0) {
        results.filesWithHardcodedText++;
        results.hardcodedTextCount += hardcodedStrings.length;
        
        const relativePath = path.relative(process.cwd(), fullPath);
        results.hardcodedTextByFile[relativePath] = {
          strings: hardcodedStrings,
          hasTranslationImport
        };
      }
    }
  }
}

// Fonction pour générer des suggestions de clés de traduction
function generateTranslationKey(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .substring(0, 30);
}

// Fonction pour générer le rapport d'audit
function generateReport() {
  let report = `# Rapport d'audit de traduction\n\n`;
  report += `Date: ${new Date().toLocaleString()}\n\n`;
  
  report += `## Résumé\n\n`;
  report += `- Fichiers analysés: ${results.totalFiles}\n`;
  report += `- Fichiers avec texte codé en dur: ${results.filesWithHardcodedText}\n`;
  report += `- Textes codés en dur trouvés: ${results.hardcodedTextCount}\n\n`;
  
  report += `## Détails par fichier\n\n`;
  
  // Trier les fichiers par nombre de chaînes codées en dur (ordre décroissant)
  const sortedFiles = Object.entries(results.hardcodedTextByFile)
    .sort(([, a], [, b]) => b.strings.length - a.strings.length);
  
  for (const [filePath, fileInfo] of sortedFiles) {
    const { strings, hasTranslationImport } = fileInfo;
    
    report += `### ${filePath}\n\n`;
    
    if (!hasTranslationImport) {
      report += `⚠️ **Ce fichier n'utilise pas encore le hook de traduction**\n\n`;
      report += `Ajoutez l'import suivant:\n\n`;
      report += "```jsx\nimport { useLanguage } from '../contexts/LanguageContext';\n```\n\n";
      report += "Et déclarez le hook:\n\n";
      report += "```jsx\nconst { t } = useLanguage();\n```\n\n";
    }
    
    report += `| Ligne:Col | Texte | Suggestion de remplacement |\n`;
    report += `| --------- | ----- | -------------------------- |\n`;
    
    for (const { text, line, column } of strings) {
      const key = generateTranslationKey(text);
      report += `| ${line}:${column} | ${text.replace(/\n/g, ' ').substring(0, 50)}${text.length > 50 ? '...' : ''} | \`t('${key}', '${text.replace(/'/g, "\\'")}')\` |\n`;
    }
    
    report += `\n`;
  }
  
  report += `## Recommandations\n\n`;
  report += `1. Utilisez la fonction \`t()\` pour tous les textes visibles par l'utilisateur\n`;
  report += `2. Ajoutez le hook \`useLanguage\` dans les composants qui n'en disposent pas encore\n`;
  report += `3. Considérez l'utilisation du script \`replace-hardcoded-text.js\` pour automatiser les remplacements\n`;
  
  return report;
}

// Exécution de l'audit
console.log(chalk.blue('Démarrage de l\'audit de traduction...'));
traverseDirectory(path.join(process.cwd(), SOURCE_DIR));

// Génération et enregistrement du rapport
const report = generateReport();
fs.writeFileSync(OUTPUT_FILE, report, 'utf8');

// Affichage du résumé
console.log(chalk.green('\nAudit terminé !'));
console.log(`Fichiers analysés: ${chalk.bold(results.totalFiles)}`);
console.log(`Fichiers avec texte codé en dur: ${chalk.bold(results.filesWithHardcodedText)}`);
console.log(`Textes codés en dur trouvés: ${chalk.bold(results.hardcodedTextCount)}`);
console.log(`\nLe rapport complet a été enregistré dans ${chalk.bold(OUTPUT_FILE)}`);

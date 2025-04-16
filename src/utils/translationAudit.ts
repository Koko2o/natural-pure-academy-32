
import fs from 'fs';
import path from 'path';

// Configuration
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');
const PAGES_DIR = path.join(process.cwd(), 'src/pages');
const OUTPUT_FILE = path.join(process.cwd(), 'translation_audit_results.json');

// Regex pour détecter les textes qui pourraient être traduits
// Ceci est une approximation; il faudra ajuster selon votre code
const TEXT_PATTERNS = [
  /<h1[^>]*>\s*([^<{]+)\s*<\/h1>/g,
  /<h2[^>]*>\s*([^<{]+)\s*<\/h2>/g,
  /<h3[^>]*>\s*([^<{]+)\s*<\/h3>/g,
  /<p[^>]*>\s*([^<{]+)\s*<\/p>/g,
  /<span[^>]*>\s*([^<{]+)\s*<\/span>/g,
  /<button[^>]*>\s*([^<{]+)\s*<\/button>/g,
  /className="[^"]*"\s*>\s*([^<{]+)\s*</g,
  /title="([^"]+)"/g,
  /label="([^"]+)"/g,
  /placeholder="([^"]+)"/g,
  /alt="([^"]+)"/g,
];

// Fonction pour vérifier si le texte contient déjà une fonction t()
const isTFunctionPresent = (content: string): boolean => {
  return /\{t\(['"][^'"]+['"]\)\}/.test(content);
};

// Fonction pour scanner un fichier et trouver les textes potentiellement non traduits
const scanFile = (filePath: string): { file: string; hardcodedTexts: string[] } => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const hardcodedTexts: string[] = [];

  // Si le fichier ne mentionne pas useTranslation ou t, il est suspect
  if (!content.includes('useTranslation') && !content.includes('useLanguage')) {
    console.log(`⚠️ ${filePath} - Ne semble pas utiliser les fonctions de traduction`);
    
    // Chercher des textes qui pourraient être traduits
    TEXT_PATTERNS.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const text = match[1].trim();
        if (text.length > 3 && !isTFunctionPresent(match[0])) {
          hardcodedTexts.push(text);
        }
      }
    });
  }

  return { file: filePath, hardcodedTexts };
};

// Fonction pour scanner un répertoire récursivement
const scanDirectory = (dir: string): { file: string; hardcodedTexts: string[] }[] => {
  const results: { file: string; hardcodedTexts: string[] }[] = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      results.push(...scanDirectory(filePath));
    } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.jsx'))) {
      const fileResult = scanFile(filePath);
      if (fileResult.hardcodedTexts.length > 0) {
        results.push(fileResult);
      }
    }
  });

  return results;
};

// Fonction principale qui exécute l'audit
export const runTranslationAudit = (): void => {
  console.log('🔍 Démarrage de l\'audit de traduction...');
  
  const componentsResults = scanDirectory(COMPONENTS_DIR);
  const pagesResults = scanDirectory(PAGES_DIR);
  
  const allResults = [...componentsResults, ...pagesResults];
  
  // Sauvegarder les résultats
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2));
  
  console.log(`✅ Audit terminé - ${allResults.length} fichiers contiennent des textes non traduits`);
  console.log(`📝 Résultats sauvegardés dans ${OUTPUT_FILE}`);
};

// Exécuter si appelé directement (avec ts-node par exemple)
if (require.main === module) {
  runTranslationAudit();
}

export default runTranslationAudit;

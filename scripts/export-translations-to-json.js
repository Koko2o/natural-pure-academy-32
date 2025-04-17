const fs = require('fs');
const path = require('path');

// Chemin vers le fichier LanguageContext.tsx
const contextFilePath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
const outputDir = path.join(__dirname, '../src/translations');

// Assurez-vous que le répertoire de sortie existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Répertoire créé: ${outputDir}`);
}

function extractTranslations() {
  console.log('🔍 Extraction des traductions depuis LanguageContext.tsx...');

  // Lire le fichier LanguageContext.tsx
  const content = fs.readFileSync(contextFilePath, 'utf8');

  // Expression régulière pour capturer le bloc defaultTranslations
  const regex = /const\s+defaultTranslations\s*:\s*Translations\s*=\s*{([\s\S]*?)};/;
  const match = content.match(regex);

  if (!match) {
    console.error('❌ Impossible de trouver le bloc de traductions dans LanguageContext.tsx');
    return;
  }

  // Transformer le contenu capturé en objet JavaScript valide
  const translationsBlock = match[1];

  // Extraire les sections pour chaque langue
  const languages = ['fr', 'en', 'es'];
  const languageTranslations = {};

  languages.forEach(lang => {
    // Regex pour extraire le bloc de chaque langue
    const langRegex = new RegExp(`${lang}\\s*:\\s*{([\\s\\S]*?)}(?:,\\s*[a-z]{2}\\s*:|\\s*})`, 'g');
    const langMatch = langRegex.exec(translationsBlock);

    if (langMatch) {
      try {
        // Créer un objet JavaScript à partir du texte capturé
        const langBlockText = `{${langMatch[1]}}`;
        // Remplacer les clés non quotées par des clés quotées pour le JSON valide
        const fixedJsonText = langBlockText.replace(/([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"');
        languageTranslations[lang] = JSON.parse(fixedJsonText);
      } catch (e) {
        console.error(`❌ Erreur lors de l'analyse des traductions pour ${lang}:`, e);
      }
    }
  });

  return languageTranslations;
}

function saveTranslationsToJson(translations) {
  if (!translations) return;

  Object.entries(translations).forEach(([lang, trans]) => {
    const outputPath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(trans, null, 2), 'utf8');
    console.log(`✅ Traductions ${lang} exportées vers: ${outputPath}`);
  });

  // Créer un fichier index.ts pour faciliter l'importation
  const indexContent = `
import fr from './fr.json';
import en from './en.json';
import es from './es.json';

export const translations = { fr, en, es };
export default translations;
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf8');
  console.log(`✅ Fichier index.ts créé dans: ${outputDir}`);
}

function generateMissingTranslationsReport(translations) {
  const report = {
    total: Object.keys(translations.fr || {}).length,
    missingEn: 0,
    missingEs: 0,
    percentCompleteEn: 0,
    percentCompleteEs: 0
  };

  // Compter les traductions manquantes
  Object.keys(translations.fr || {}).forEach(key => {
    if (!translations.en[key] || 
        translations.en[key] === translations.fr[key] ||
        translations.en[key].includes('à traduire en en')) {
      report.missingEn++;
    }

    if (!translations.es[key] || 
        translations.es[key] === translations.fr[key] ||
        translations.es[key].includes('à traduire en es')) {
      report.missingEs++;
    }
  });

  // Calculer les pourcentages
  report.percentCompleteEn = Math.round(((report.total - report.missingEn) / report.total) * 100);
  report.percentCompleteEs = Math.round(((report.total - report.missingEs) / report.total) * 100);

  console.log('\n📊 Rapport de traduction:');
  console.log(`Total des clés: ${report.total}`);
  console.log(`Anglais: ${report.percentCompleteEn}% complet (${report.missingEn} manquantes)`);
  console.log(`Espagnol: ${report.percentCompleteEs}% complet (${report.missingEs} manquantes)`);

  return report;
}

// Exécution principale
const translations = extractTranslations();
if (translations) {
  saveTranslationsToJson(translations);
  generateMissingTranslationsReport(translations);
  console.log('\n✨ Exportation terminée avec succès!');
}
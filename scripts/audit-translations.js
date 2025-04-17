
const fs = require('fs');
const path = require('path');

// Fonction pour extraire les traductions actuelles
function getCurrentTranslations() {
  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
  const content = fs.readFileSync(contextPath, 'utf8');
  
  // Expression régulière pour capturer le bloc defaultTranslations
  const regex = /const\s+defaultTranslations\s*:\s*Translations\s*=\s*{([\s\S]*?)};/;
  const match = content.match(regex);
  
  if (!match) {
    console.error('❌ Impossible de trouver le bloc de traductions dans LanguageContext.tsx');
    return null;
  }
  
  // Transformer le contenu capturé en objet JavaScript
  const translationsBlock = match[1];
  
  // Extraire les sections pour chaque langue
  const languages = ['fr', 'en', 'es'];
  const translations = {};
  
  languages.forEach(lang => {
    translations[lang] = {};
    
    // Regex pour extraire le bloc de chaque langue
    const langRegex = new RegExp(`${lang}\\s*:\\s*{([\\s\\S]*?)}(?:,\\s*[a-z]{2}\\s*:|\\s*})`, 'g');
    const langMatch = langRegex.exec(translationsBlock);
    
    if (langMatch) {
      // Extraire toutes les paires clé-valeur
      const keyValuePairs = langMatch[1].match(/([a-zA-Z0-9_]+)\s*:\s*['"](.+?)['"]/g) || [];
      
      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split(/\s*:\s*/);
        if (key && value) {
          translations[lang][key.trim()] = value.replace(/['"]/g, '').trim();
        }
      });
    }
  });
  
  return translations;
}

// Fonction pour analyser les traductions manquantes
function analyzeTranslations(translations) {
  if (!translations) return null;
  
  const report = {
    total: Object.keys(translations.fr || {}).length,
    languages: {}
  };
  
  const languages = ['fr', 'en', 'es'];
  
  languages.forEach(lang => {
    const missingKeys = [];
    const needsReviewKeys = [];
    let complete = 0;
    
    Object.entries(translations.fr).forEach(([key, frValue]) => {
      const langValue = translations[lang]?.[key];
      
      if (!langValue || langValue === frValue) {
        missingKeys.push(key);
      } else if (langValue.includes(`à traduire en ${lang}`)) {
        needsReviewKeys.push(key);
      } else {
        complete++;
      }
    });
    
    report.languages[lang] = {
      total: Object.keys(translations.fr || {}).length,
      complete,
      missing: missingKeys.length,
      needsReview: needsReviewKeys.length,
      percentComplete: Math.round((complete / report.total) * 100),
      missingKeys,
      needsReviewKeys
    };
  });
  
  return report;
}

// Fonction pour créer un rapport HTML
function generateHtmlReport(report) {
  if (!report) return '';
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport de Traduction - Natural Pure Academy</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1, h2, h3 {
      color: #2563eb;
    }
    .dashboard {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 30px;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      flex: 1;
      min-width: 250px;
    }
    .language-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .language-title img {
      width: 24px;
      height: 24px;
    }
    .progress-bar {
      height: 10px;
      background: #e5e7eb;
      border-radius: 5px;
      margin: 10px 0;
      overflow: hidden;
    }
    .progress-value {
      height: 100%;
      border-radius: 5px;
    }
    .stats {
      display: flex;
      gap: 15px;
      margin-top: 15px;
    }
    .stat {
      flex: 1;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: bold;
    }
    .stat-label {
      font-size: 14px;
      color: #6b7280;
    }
    .keys-list {
      background: #f9fafb;
      border-radius: 6px;
      padding: 15px;
      margin-top: 20px;
      max-height: 200px;
      overflow-y: auto;
    }
    .keys-list h4 {
      margin-top: 0;
    }
    .key-item {
      font-family: monospace;
      padding: 4px 8px;
      border-radius: 4px;
      margin: 4px 0;
      font-size: 14px;
    }
    .key-item:nth-child(odd) {
      background: #f3f4f6;
    }
    .missing {
      color: #dc2626;
    }
    .review {
      color: #d97706;
    }
    .complete {
      color: #059669;
    }
  </style>
</head>
<body>
  <h1>Rapport de Traduction - Natural Pure Academy</h1>
  <p>Date du rapport: ${new Date().toLocaleString()}</p>
  <p>Nombre total de clés: <strong>${report.total}</strong></p>
  
  <div class="dashboard">
    ${Object.entries(report.languages).map(([lang, stats]) => {
      let langName, flagEmoji;
      switch(lang) {
        case 'fr':
          langName = 'Français';
          flagEmoji = '🇫🇷';
          break;
        case 'en':
          langName = 'Anglais';
          flagEmoji = '🇬🇧';
          break;
        case 'es':
          langName = 'Espagnol';
          flagEmoji = '🇪🇸';
          break;
        default:
          langName = lang;
          flagEmoji = '🌐';
      }
      
      let progressColor;
      if (stats.percentComplete < 30) progressColor = '#ef4444';
      else if (stats.percentComplete < 70) progressColor = '#f59e0b';
      else progressColor = '#10b981';
      
      return `
      <div class="card">
        <div class="language-title">
          <span>${flagEmoji}</span>
          <h2>${langName}</h2>
        </div>
        
        <div class="progress-bar">
          <div class="progress-value" style="width: ${stats.percentComplete}%; background-color: ${progressColor}"></div>
        </div>
        <div style="text-align: right; font-size: 14px;">${stats.percentComplete}% complete</div>
        
        <div class="stats">
          <div class="stat">
            <div class="stat-value complete">${stats.complete}</div>
            <div class="stat-label">Traduites</div>
          </div>
          <div class="stat">
            <div class="stat-value review">${stats.needsReview}</div>
            <div class="stat-label">À réviser</div>
          </div>
          <div class="stat">
            <div class="stat-value missing">${stats.missing}</div>
            <div class="stat-label">Manquantes</div>
          </div>
        </div>
        
        ${stats.needsReview > 0 ? `
        <div class="keys-list">
          <h4>Clés à réviser (${stats.needsReview})</h4>
          ${stats.needsReviewKeys.slice(0, 10).map(key => `<div class="key-item review">${key}</div>`).join('')}
          ${stats.needsReviewKeys.length > 10 ? `<div>... et ${stats.needsReviewKeys.length - 10} autres</div>` : ''}
        </div>
        ` : ''}
        
        ${stats.missing > 0 ? `
        <div class="keys-list">
          <h4>Clés manquantes (${stats.missing})</h4>
          ${stats.missingKeys.slice(0, 10).map(key => `<div class="key-item missing">${key}</div>`).join('')}
          ${stats.missingKeys.length > 10 ? `<div>... et ${stats.missingKeys.length - 10} autres</div>` : ''}
        </div>
        ` : ''}
      </div>
      `;
    }).join('')}
  </div>
  
  <h2>Instructions pour compléter les traductions</h2>
  <ol>
    <li>Exécutez <code>node scripts/replace-hardcoded-text.js src/components</code> pour identifier les textes en dur dans les composants</li>
    <li>Exécutez <code>node scripts/replace-hardcoded-text.js src/pages</code> pour identifier les textes en dur dans les pages</li>
    <li>Ouvrez <code>src/contexts/LanguageContext.tsx</code> et recherchez les textes contenant "à traduire en"</li>
    <li>Utilisez le TranslationDebugger dans l'application (double-cliquez sur le sélecteur de langue)</li>
    <li>Réexécutez ce script après avoir effectué des modifications pour suivre votre progression</li>
  </ol>
  
  <p><em>Généré par scripts/audit-translations.js</em></p>
</body>
</html>
  `;
}

// Fonction pour enregistrer le rapport
function saveReport(report) {
  if (!report) return;
  
  // Créer un dossier pour les rapports s'il n'existe pas
  const reportsDir = path.join(__dirname, '../translation-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Générer un nom de fichier basé sur la date
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const htmlReportPath = path.join(reportsDir, `translation-report-${timestamp}.html`);
  
  // Générer et enregistrer le rapport HTML
  const htmlReport = generateHtmlReport(report);
  fs.writeFileSync(htmlReportPath, htmlReport, 'utf8');
  console.log(`📊 Rapport HTML créé: ${htmlReportPath}`);
  
  // Créer un rapport JSON pour référence
  const jsonReportPath = path.join(reportsDir, `translation-report-${timestamp}.json`);
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`📊 Rapport JSON créé: ${jsonReportPath}`);
  
  // Créer un fichier de traductions manquantes pour faciliter le travail
  const missingTranslationsPath = path.join(reportsDir, `missing-translations-${timestamp}.md`);
  
  let missingContent = `# Traductions manquantes (${timestamp})\n\n`;
  
  ['en', 'es'].forEach(lang => {
    const langStats = report.languages[lang];
    
    missingContent += `## ${lang === 'en' ? 'Anglais' : 'Espagnol'} (${langStats.missing + langStats.needsReview} à compléter)\n\n`;
    missingContent += "```javascript\n";
    
    // Ajouter les clés à réviser
    if (langStats.needsReviewKeys.length > 0) {
      langStats.needsReviewKeys.forEach(key => {
        missingContent += `${key}: "À TRADUIRE",\n`;
      });
    }
    
    // Ajouter les clés manquantes
    if (langStats.missingKeys.length > 0) {
      langStats.missingKeys.forEach(key => {
        missingContent += `${key}: "À TRADUIRE",\n`;
      });
    }
    
    missingContent += "```\n\n";
  });
  
  fs.writeFileSync(missingTranslationsPath, missingContent, 'utf8');
  console.log(`📝 Liste des traductions manquantes créée: ${missingTranslationsPath}`);
}

// Point d'entrée principal
function main() {
  console.log('🌐 Analyse des traductions...');
  
  const translations = getCurrentTranslations();
  if (!translations) {
    console.error('❌ Impossible d\'obtenir les traductions actuelles.');
    return;
  }
  
  const report = analyzeTranslations(translations);
  if (!report) {
    console.error('❌ Impossible d\'analyser les traductions.');
    return;
  }
  
  // Afficher un résumé dans la console
  console.log('\n📊 Résumé des traductions:');
  console.log(`Total: ${report.total} clés`);
  
  Object.entries(report.languages).forEach(([lang, stats]) => {
    let langName;
    switch(lang) {
      case 'fr': langName = 'Français 🇫🇷'; break;
      case 'en': langName = 'Anglais 🇬🇧'; break;
      case 'es': langName = 'Espagnol 🇪🇸'; break;
      default: langName = lang;
    }
    
    console.log(`\n${langName}:`);
    console.log(`  Complété: ${stats.percentComplete}% (${stats.complete}/${stats.total})`);
    console.log(`  À réviser: ${stats.needsReview}`);
    console.log(`  Manquant: ${stats.missing}`);
  });
  
  // Enregistrer le rapport
  saveReport(report);
  
  console.log('\n✅ Analyse terminée!');
}

main();

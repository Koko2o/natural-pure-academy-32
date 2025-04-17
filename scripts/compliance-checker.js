
const fs = require('fs');
const path = require('path');

// Termes potentiellement problématiques selon les règles Google Ad Grant
const COMMERCIAL_TERMS = [
  'achat', 'vente', 'prix', 'remise', 'solde', 'promotion', 
  'économisez', 'reduction', 'offer', 'offre', 'boutique',
  'acheter', 'acheter maintenant', 'commander', 'panier'
];

// Contextes sécurisés où ces termes peuvent être utilisés
const SAFE_CONTEXTS = [
  'étude scientifique', 'recherche', 'méthodologie',
  'non commercial', 'but éducatif', 'à titre informatif',
  'sans but lucratif', 'découverte scientifique'
];

// Fonction pour analyser les fichiers
async function scanFiles(directory, fileExtensions = ['.tsx', '.ts', '.js', '.jsx']) {
  const issues = [];
  const files = await getFiles(directory, fileExtensions);
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lowerContent = content.toLowerCase();
    
    for (const term of COMMERCIAL_TERMS) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        // Vérifier le contexte (50 caractères avant et après)
        const start = Math.max(0, match.index - 50);
        const end = Math.min(content.length, match.index + term.length + 50);
        const context = content.substring(start, end);
        
        // Vérifier si le contexte est sécurisé
        const isSafeContext = SAFE_CONTEXTS.some(safeContext => 
          context.toLowerCase().includes(safeContext.toLowerCase())
        );
        
        if (!isSafeContext) {
          issues.push({
            file: path.relative(process.cwd(), file),
            term: match[0],
            context,
            line: getLineNumber(content, match.index)
          });
        }
      }
    }
  }
  
  return issues;
}

// Fonction pour obtenir le numéro de ligne à partir de l'index
function getLineNumber(content, index) {
  const lines = content.substring(0, index).split('\n');
  return lines.length;
}

// Fonction récursive pour obtenir tous les fichiers
async function getFiles(dir, extensions) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res, extensions) : res;
    })
  );
  
  return Array.prototype.concat(...files)
    .filter(file => extensions.some(ext => file.endsWith(ext)));
}

// Fonction principale
async function main() {
  try {
    console.log('🔍 Analyse de conformité Google Ad Grant en cours...');
    
    // Analyser les répertoires clés
    const componentsIssues = await scanFiles('./src/components');
    const pagesIssues = await scanFiles('./src/pages');
    const utilsIssues = await scanFiles('./src/utils');
    
    const allIssues = [...componentsIssues, ...pagesIssues, ...utilsIssues];
    
    if (allIssues.length > 0) {
      console.log(`⚠️ ${allIssues.length} problèmes potentiels détectés:\n`);
      
      allIssues.forEach((issue, index) => {
        console.log(`${index + 1}. Fichier: ${issue.file}`);
        console.log(`   Ligne: ${issue.line}`);
        console.log(`   Terme: "${issue.term}"`);
        console.log(`   Contexte: "...${issue.context}..."`);
        console.log('');
      });
      
      console.log('📋 Recommandations:');
      console.log('1. Remplacez les termes commerciaux par un langage éducatif');
      console.log('2. Ajoutez un contexte éducatif clair autour des termes nécessaires');
      console.log('3. Vérifiez si les textes sont dans des traductions qui peuvent être modifiées');
    } else {
      console.log('✅ Aucun problème de conformité détecté!');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error);
  }
}

main();


// Script pour exécuter l'audit de traduction
const { runTranslationAudit } = require('../dist/utils/translationAudit');

console.log('🌐 Audit des traductions - détection des textes codés en dur');
runTranslationAudit();

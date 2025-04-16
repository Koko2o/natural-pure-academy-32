
import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { auditPageContent, detectBannedTerms } from '@/utils/contentSafety';

const ComplianceAlert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [bannedTerms, setBannedTerms] = useState<string[]>([]);
  
  useEffect(() => {
    // Check for banned terms on the current page
    const pageContent = document.body.textContent?.toLowerCase() || '';
    const terms = detectBannedTerms(pageContent);
    
    if (terms.length > 0) {
      setBannedTerms(terms);
      setShowAlert(true);
      
      // Log detailed audit results
      const auditResults = auditPageContent(document.body.innerHTML);
      console.warn("[GoogleAdGrantsSafety] Content audit results:", auditResults);
    }
  }, []);
  
  if (!showAlert) return null;
  
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Google Ad Grant Compliance Alert</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>This page contains terms that may violate Google Ad Grant policies:</p>
            <ul className="mt-1 list-disc list-inside">
              {bannedTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
          <div className="mt-3">
            <a
              href="/compliance-audit"
              className="text-sm font-medium text-red-800 hover:text-red-600 underline"
            >
              View Compliance Audit
            </a>
          </div>
        </div>
        <button
          type="button"
          className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
          onClick={() => setShowAlert(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ComplianceAlert;

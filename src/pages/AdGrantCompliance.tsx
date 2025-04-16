
import React from 'react';
import ComplianceAuditDashboard from '@/components/ComplianceAuditDashboard';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const AdGrantCompliance: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t('Google Ad Grant Compliance Audit')}
        description={t('Monitor and ensure compliance with Google Ad Grant policies with our comprehensive audit tool.')}
      />
      
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('Google Ad Grant Compliance Audit')}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {t('This dashboard helps monitor and ensure compliance with Google Ad Grant policies. Regular audits are essential to maintain eligibility for the Google Ad Grant program.')}
          </p>
        </div>
        
        <ComplianceAuditDashboard />
      </div>
    </>
  );
};

export default AdGrantCompliance;

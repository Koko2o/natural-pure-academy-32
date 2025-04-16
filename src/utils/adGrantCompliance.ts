
/**
 * Google Ad Grant Compliance Utility
 * 
 * This file contains utilities to help ensure our website remains compliant with
 * Google Ad Grant policies, including tracking CTR, maintaining quality content,
 * and ensuring proper conversion tracking.
 */

// Track Ad performance metrics
export const trackAdPerformance = (data: {
  campaignId: string;
  adGroupId: string;
  adId: string;
  action: 'impression' | 'click' | 'conversion';
  conversionType?: string;
  value?: number;
}) => {
  try {
    // Get or initialize the ad performance tracking data
    const adPerformanceKey = 'ad_grant_performance';
    const performanceData = JSON.parse(localStorage.getItem(adPerformanceKey) || '{}');
    
    const campaign = performanceData[data.campaignId] || { 
      impressions: 0, 
      clicks: 0, 
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      adGroups: {}
    };
    
    const adGroup = campaign.adGroups[data.adGroupId] || {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      ads: {}
    };
    
    const ad = adGroup.ads[data.adId] || {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      lastUpdate: new Date().toISOString()
    };
    
    // Update metrics based on action
    switch(data.action) {
      case 'impression':
        ad.impressions += 1;
        adGroup.impressions += 1;
        campaign.impressions += 1;
        break;
      case 'click':
        ad.clicks += 1;
        adGroup.clicks += 1;
        campaign.clicks += 1;
        break;
      case 'conversion':
        ad.conversions += 1;
        adGroup.conversions += 1;
        campaign.conversions += 1;
        
        // Track detailed conversion info
        const conversionData = {
          type: data.conversionType || 'general',
          timestamp: new Date().toISOString(),
          value: data.value || 0,
          adId: data.adId,
          adGroupId: data.adGroupId,
          campaignId: data.campaignId
        };
        
        const conversions = JSON.parse(localStorage.getItem('ad_grant_conversions') || '[]');
        conversions.push(conversionData);
        localStorage.setItem('ad_grant_conversions', JSON.stringify(conversions.slice(-100)));
        break;
    }
    
    // Calculate rates
    ad.ctr = ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
    ad.conversionRate = ad.clicks > 0 ? (ad.conversions / ad.clicks) * 100 : 0;
    ad.lastUpdate = new Date().toISOString();
    
    adGroup.ctr = adGroup.impressions > 0 ? (adGroup.clicks / adGroup.impressions) * 100 : 0;
    adGroup.conversionRate = adGroup.clicks > 0 ? (adGroup.conversions / adGroup.clicks) * 100 : 0;
    adGroup.ads[data.adId] = ad;
    
    campaign.ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
    campaign.conversionRate = campaign.clicks > 0 ? (campaign.conversions / campaign.clicks) * 100 : 0;
    campaign.adGroups[data.adGroupId] = adGroup;
    
    performanceData[data.campaignId] = campaign;
    
    // Save updated data
    localStorage.setItem(adPerformanceKey, JSON.stringify(performanceData));
    
    // Check for potential compliance issues
    checkAdGrantCompliance(performanceData);
    
    console.log('[GoogleAdGrants] Tracked ad performance:', data.action);
  } catch (error) {
    console.error('Error tracking ad performance:', error);
  }
};

// Check for Ad Grant compliance issues
export const checkAdGrantCompliance = (performanceData: any) => {
  try {
    if (!performanceData || typeof performanceData !== 'object') {
      console.error('Invalid performance data provided to checkAdGrantCompliance');
      return;
    }
    
    const issues: string[] = [];
    
    // Check CTR across campaigns (Google requires 5% CTR)
    Object.entries(performanceData).forEach(([campaignId, campaign]: [string, any]) => {
      if (campaign && campaign.impressions > 100 && campaign.ctr < 5) {
        issues.push(`Campaign ${campaignId} has CTR below 5% (${campaign.ctr.toFixed(2)}%)`);
      }
      
      // Check for keywords with Quality Score < 3
      if (campaign && campaign.adGroups) {
        Object.entries(campaign.adGroups).forEach(([adGroupId, adGroup]: [string, any]) => {
          if (adGroup && adGroup.qualityScore && adGroup.qualityScore < 3) {
            issues.push(`Ad Group ${adGroupId} in Campaign ${campaignId} has low Quality Score (${adGroup.qualityScore})`);
          }
        });
      }
    });
    
    // Store compliance issues for reporting
    if (issues.length > 0) {
      const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
      
      issues.forEach(issue => {
        complianceIssues.push({
          issue,
          timestamp: new Date().toISOString(),
          status: 'open'
        });
      });
      
      localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(complianceIssues.slice(-100)));
      console.warn('[GoogleAdGrants] Compliance issues detected:', issues);
    }
  } catch (error) {
    console.error('Error checking Ad Grant compliance:', error);
  }
};

// Generate a compliance report for monitoring
export const generateComplianceReport = () => {
  try {
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    const conversions = JSON.parse(localStorage.getItem('ad_grant_conversions') || '[]');
    
    // Calculate overall metrics
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    
    Object.values(performanceData).forEach((campaign: any) => {
      totalImpressions += campaign.impressions || 0;
      totalClicks += campaign.clicks || 0;
      totalConversions += campaign.conversions || 0;
    });
    
    const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const overallConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    
    // Count open issues
    const openIssues = complianceIssues.filter((issue: any) => issue.status === 'open').length;
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      metrics: {
        impressions: totalImpressions,
        clicks: totalClicks,
        conversions: totalConversions,
        ctr: overallCTR,
        conversionRate: overallConversionRate
      },
      compliance: {
        isCTRCompliant: overallCTR >= 5,
        openIssuesCount: openIssues,
        hasActiveConversions: conversions.length > 0,
        lastConversion: conversions.length > 0 ? conversions[conversions.length - 1].timestamp : null
      }
    };
    
    // Store the report
    const reports = JSON.parse(localStorage.getItem('ad_grant_compliance_reports') || '[]');
    reports.push(report);
    localStorage.setItem('ad_grant_compliance_reports', JSON.stringify(reports.slice(-20)));
    
    console.log('[GoogleAdGrants] Generated compliance report:', report);
    return report;
  } catch (error) {
    console.error('Error generating compliance report:', error);
    return null;
  }
};

// Track content quality metrics (important for Ad Grants)
export const trackContentQuality = (path: string, metrics: {
  wordCount: number;
  readTime: number;
  hasScientificCitations: boolean;
  hasStructuredData: boolean;
}) => {
  try {
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');
    
    contentMetrics[path] = {
      ...metrics,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('content_quality_metrics', JSON.stringify(contentMetrics));
    console.log('[GoogleAdGrants] Tracked content quality for:', path);
  } catch (error) {
    console.error('Error tracking content quality:', error);
  }
};


/**
 * Google Ad Grant Compliance Utility
 * 
 * This file contains utilities to help ensure our website remains compliant with
 * Google Ad Grant policies, including tracking CTR, maintaining quality content,
 * and ensuring proper conversion tracking.
 */

import { auditPageContent, detectBannedTerms, isUrlCompliant } from './contentSafety';

// Banned keywords for Google Ad Grants according to policy
const BANNED_SINGLE_KEYWORDS = [
  'donate', 'donation', 'download', 'course', 'training', 'webinar',
  'quiz', 'poll', 'vote', 'news', 'blog', 'event', 'info', 'information',
  'learn', 'report', 'whitepaper', 'guide', 'ebook', 'book'
];

// Exception for single-word keywords (allowed by Google)
const SINGLE_KEYWORD_EXCEPTIONS = [
  // Brand terms
  'naturalpure', 'nonprofit',
  // Medical conditions
  'cancer', 'diabetes', 'alzheimer', 'autism', 'adhd', 'covid',
  // Other allowed exceptions
  'donate', 'volunteer', 'charity'
];

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
    
    const issues: Array<{
      issue: string;
      severity: 'critical' | 'high' | 'medium' | 'low';
      affectedElement: string;
      recommendation: string;
    }> = [];
    
    // Check CTR across campaigns (Google requires 5% CTR)
    Object.entries(performanceData).forEach(([campaignId, campaign]: [string, any]) => {
      // Check campaign-level CTR compliance
      if (campaign && campaign.impressions > 100 && campaign.ctr < 5) {
        issues.push({
          issue: `Campaign ${campaignId} has CTR below 5% (${campaign.ctr.toFixed(2)}%)`,
          severity: 'critical',
          affectedElement: `campaign:${campaignId}`,
          recommendation: 'Review ad copy, keywords, and landing pages. Consider pausing underperforming ads.'
        });
      }
      
      // Check for keywords with Quality Score < 3
      if (campaign && campaign.adGroups) {
        Object.entries(campaign.adGroups).forEach(([adGroupId, adGroup]: [string, any]) => {
          if (adGroup && adGroup.qualityScore && adGroup.qualityScore < 3) {
            issues.push({
              issue: `Ad Group ${adGroupId} in Campaign ${campaignId} has low Quality Score (${adGroup.qualityScore})`,
              severity: 'high',
              affectedElement: `adGroup:${adGroupId}`,
              recommendation: 'Improve keyword relevance, ad copy quality, and landing page experience.'
            });
          }
          
          // Check ad group structure (at least 2 ads per ad group)
          if (adGroup && adGroup.ads && Object.keys(adGroup.ads).length < 2) {
            issues.push({
              issue: `Ad Group ${adGroupId} has fewer than 2 ads`,
              severity: 'medium',
              affectedElement: `adGroup:${adGroupId}`,
              recommendation: 'Add at least one more ad to comply with Google Ad Grant requirements.'
            });
          }
        });
      }
      
      // Check campaign structure (at least 2 ad groups per campaign)
      if (campaign && campaign.adGroups && Object.keys(campaign.adGroups).length < 2) {
        issues.push({
          issue: `Campaign ${campaignId} has fewer than 2 ad groups`,
          severity: 'medium',
          affectedElement: `campaign:${campaignId}`,
          recommendation: 'Create at least one more ad group to comply with Google Ad Grant requirements.'
        });
      }
    });
    
    // Check for single-word keywords violations
    const keywordsData = JSON.parse(localStorage.getItem('ad_grant_keywords') || '[]');
    keywordsData.forEach((keyword: any) => {
      if (keyword.text.split(/\s+/).length === 1 && 
          !SINGLE_KEYWORD_EXCEPTIONS.includes(keyword.text.toLowerCase())) {
        issues.push({
          issue: `Single-word keyword detected: "${keyword.text}"`,
          severity: 'high',
          affectedElement: `keyword:${keyword.id}`,
          recommendation: 'Remove or expand this single-word keyword to comply with Google Ad Grant policy.'
        });
      }
    });
    
    // Check for geographic targeting
    const geoTargetingData = JSON.parse(localStorage.getItem('ad_grant_geo_targeting') || '{}');
    if (!geoTargetingData.isConfigured) {
      issues.push({
        issue: 'Geographic targeting not properly configured',
        severity: 'medium',
        affectedElement: 'account:settings',
        recommendation: 'Set up proper geographic targeting for all campaigns to comply with Google Ad Grant requirements.'
      });
    }
    
    // Check for conversion tracking
    const conversionTrackingData = JSON.parse(localStorage.getItem('ad_grant_conversion_tracking') || '{}');
    if (!conversionTrackingData.isConfigured) {
      issues.push({
        issue: 'Conversion tracking not properly configured',
        severity: 'high',
        affectedElement: 'account:settings',
        recommendation: 'Set up at least one conversion action to comply with Google Ad Grant requirements.'
      });
    }
    
    // Store compliance issues for reporting
    if (issues.length > 0) {
      const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
      
      issues.forEach(issue => {
        complianceIssues.push({
          ...issue,
          timestamp: new Date().toISOString(),
          status: 'open'
        });
      });
      
      localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(complianceIssues.slice(-100)));
      console.warn('[GoogleAdGrants] Compliance issues detected:', issues);
    }
    
    return {
      hasIssues: issues.length > 0,
      issues,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error checking Ad Grant compliance:', error);
    return {
      hasIssues: true,
      issues: [{
        issue: 'Error checking compliance',
        severity: 'critical' as const,
        affectedElement: 'system',
        recommendation: 'Check the console for error details and fix the underlying issue.'
      }],
      timestamp: new Date().toISOString()
    };
  }
};

// Generate a compliance report for monitoring
export const generateComplianceReport = () => {
  try {
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    const conversions = JSON.parse(localStorage.getItem('ad_grant_conversions') || '[]');
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');
    
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
    
    // Count open issues by severity
    const openIssuesBySeverity = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };
    
    complianceIssues
      .filter((issue: any) => issue.status === 'open')
      .forEach((issue: any) => {
        if (issue.severity) {
          openIssuesBySeverity[issue.severity]++;
        }
      });
    
    // Evaluate content quality
    const contentQualityScore = Object.values(contentMetrics).reduce((sum: number, page: any) => {
      // Calculate page quality score (0-100)
      let pageScore = 0;
      if (page.wordCount >= 300) pageScore += 25;
      if (page.readTime >= 2) pageScore += 25;
      if (page.hasScientificCitations) pageScore += 25;
      if (page.hasStructuredData) pageScore += 25;
      return sum + pageScore;
    }, 0) / (Object.keys(contentMetrics).length || 1);
    
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
        openIssuesCount: complianceIssues.filter((issue: any) => issue.status === 'open').length,
        openIssuesBySeverity,
        hasActiveConversions: conversions.length > 0,
        lastConversion: conversions.length > 0 ? conversions[conversions.length - 1].timestamp : null,
        contentQualityScore,
        isFullyCompliant: overallCTR >= 5 && 
                          openIssuesBySeverity.critical === 0 && 
                          openIssuesBySeverity.high === 0 &&
                          conversions.length > 0 &&
                          contentQualityScore >= 70
      },
      websiteAudit: {
        // Run a live audit on the current page
        currentPage: window.location.pathname,
        contentSafetyCheck: auditPageContent(document.body.innerHTML),
        urlCompliance: isUrlCompliant(window.location.href),
        detectedBannedTerms: detectBannedTerms(document.body.textContent || '')
      },
      recommendations: generateComplianceRecommendations(
        openIssuesBySeverity, 
        overallCTR, 
        contentQualityScore, 
        conversions.length > 0
      )
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

// Generate recommendations based on compliance status
const generateComplianceRecommendations = (
  issues: {critical: number, high: number, medium: number, low: number},
  ctr: number,
  contentQualityScore: number,
  hasConversions: boolean
) => {
  const recommendations: string[] = [];
  
  // Critical issues
  if (issues.critical > 0) {
    recommendations.push('Immediately address critical compliance issues to avoid account suspension.');
  }
  
  // CTR issues
  if (ctr < 5) {
    recommendations.push('Improve overall CTR by optimizing ad copy, keywords, and landing pages.');
    if (ctr < 3) {
      recommendations.push('Consider pausing campaigns with extremely low CTR to avoid account suspension.');
    }
  }
  
  // Conversion tracking
  if (!hasConversions) {
    recommendations.push('Set up conversion tracking and ensure at least one meaningful conversion action is configured.');
  }
  
  // Content quality
  if (contentQualityScore < 70) {
    recommendations.push('Improve content quality by adding more detailed information, scientific citations, and structured data.');
  }
  
  // Account structure
  if (issues.medium > 0) {
    recommendations.push('Review account structure to ensure each campaign has at least 2 ad groups and each ad group has at least 2 ads.');
  }
  
  // Keywords
  if (issues.high > 0) {
    recommendations.push('Check for and remove single-word keywords (except allowed exceptions like brand terms and medical conditions).');
  }
  
  return recommendations;
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

// Check if a keyword is compliant with Google Ad Grant policies
export const isKeywordCompliant = (keyword: string): {
  isCompliant: boolean;
  reason?: string;
  suggestion?: string;
} => {
  // Check if it's a single-word keyword
  const words = keyword.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Check if it's an allowed exception
    if (SINGLE_KEYWORD_EXCEPTIONS.includes(keyword.toLowerCase())) {
      return { 
        isCompliant: true 
      };
    }
    
    return {
      isCompliant: false,
      reason: 'Single-word keywords are not allowed by Google Ad Grant policies (with some exceptions)',
      suggestion: `Consider expanding "${keyword}" to a more specific phrase like "${keyword} research" or "${keyword} nonprofit"`
    };
  }
  
  // Check if it's a common banned keyword
  if (BANNED_SINGLE_KEYWORDS.includes(words[0].toLowerCase())) {
    return {
      isCompliant: false,
      reason: `"${words[0]}" is a commonly banned term for Google Ad Grants when used as the first word`,
      suggestion: `Consider rephrasing to be more specific about your organization's offering`
    };
  }
  
  // Check for generic or overly broad terms
  const genericPhrases = [
    'free videos', 'cool videos', 'today news', 'youtube videos',
    'email', 'video', 'facebook', 'twitter', 'latest', 'online',
    'actus', 'vidéos gratuites', 'vidéos cool', 'nouvelles du jour'
  ];
  
  if (genericPhrases.some(phrase => keyword.toLowerCase().includes(phrase))) {
    return {
      isCompliant: false,
      reason: 'Keyword contains generic or overly broad terms',
      suggestion: 'Replace with more specific terms related to your mission'
    };
  }
  
  return {
    isCompliant: true
  };
};

// Run a comprehensive audit of the Google Ad Grant account
export const runComprehensiveAdGrantAudit = async () => {
  const auditResults = {
    timestamp: new Date().toISOString(),
    accountStructure: {
      campaigns: 0,
      adGroups: 0,
      ads: 0,
      keywords: 0,
      issues: [] as string[]
    },
    performance: {
      overallCTR: 0,
      conversionRate: 0,
      issues: [] as string[]
    },
    keywords: {
      singleWordCount: 0,
      lowQualityScoreCount: 0,
      issues: [] as string[]
    },
    contentQuality: {
      averageWordCount: 0,
      pagesWithCitations: 0,
      issues: [] as string[]
    },
    websiteCompliance: {
      scannedPages: 0,
      pagesWithIssues: 0,
      issues: [] as string[]
    },
    overallStatus: 'unknown' as 'compliant' | 'at_risk' | 'non_compliant' | 'unknown'
  };
  
  try {
    // Analyze account structure
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    
    let totalCampaigns = Object.keys(performanceData).length;
    let totalAdGroups = 0;
    let totalAds = 0;
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    
    Object.values(performanceData).forEach((campaign: any) => {
      totalImpressions += campaign.impressions || 0;
      totalClicks += campaign.clicks || 0;
      totalConversions += campaign.conversions || 0;
      
      if (campaign.adGroups) {
        const adGroupCount = Object.keys(campaign.adGroups).length;
        totalAdGroups += adGroupCount;
        
        if (adGroupCount < 2) {
          auditResults.accountStructure.issues.push(
            `Campaign ${campaign.id || 'unknown'} has only ${adGroupCount} ad group(s) (minimum 2 required)`
          );
        }
        
        Object.values(campaign.adGroups).forEach((adGroup: any) => {
          if (adGroup.ads) {
            const adCount = Object.keys(adGroup.ads).length;
            totalAds += adCount;
            
            if (adCount < 2) {
              auditResults.accountStructure.issues.push(
                `Ad Group ${adGroup.id || 'unknown'} has only ${adCount} ad(s) (minimum 2 required)`
              );
            }
          }
        });
      }
    });
    
    auditResults.accountStructure.campaigns = totalCampaigns;
    auditResults.accountStructure.adGroups = totalAdGroups;
    auditResults.accountStructure.ads = totalAds;
    
    if (totalCampaigns < 1) {
      auditResults.accountStructure.issues.push('No campaigns found in the account');
    }
    
    // Analyze performance
    auditResults.performance.overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    auditResults.performance.conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    
    if (auditResults.performance.overallCTR < 5 && totalImpressions > 100) {
      auditResults.performance.issues.push(`Overall CTR (${auditResults.performance.overallCTR.toFixed(2)}%) is below the 5% minimum requirement`);
    }
    
    if (totalConversions === 0 && totalClicks > 0) {
      auditResults.performance.issues.push('No conversions recorded - conversion tracking may not be properly set up');
    }
    
    // Analyze keywords
    const keywordsData = JSON.parse(localStorage.getItem('ad_grant_keywords') || '[]');
    
    auditResults.keywords.singleWordCount = keywordsData.filter((kw: any) => 
      kw.text.split(/\s+/).length === 1 && 
      !SINGLE_KEYWORD_EXCEPTIONS.includes(kw.text.toLowerCase())
    ).length;
    
    auditResults.keywords.lowQualityScoreCount = keywordsData.filter((kw: any) => 
      kw.qualityScore && kw.qualityScore < 3
    ).length;
    
    if (auditResults.keywords.singleWordCount > 0) {
      auditResults.keywords.issues.push(`Found ${auditResults.keywords.singleWordCount} non-compliant single-word keywords`);
    }
    
    if (auditResults.keywords.lowQualityScoreCount > 0) {
      auditResults.keywords.issues.push(`Found ${auditResults.keywords.lowQualityScoreCount} keywords with Quality Score below 3`);
    }
    
    // Analyze content quality
    const contentMetrics = JSON.parse(localStorage.getItem('content_quality_metrics') || '{}');
    const pages = Object.values(contentMetrics);
    
    if (pages.length > 0) {
      auditResults.contentQuality.averageWordCount = pages.reduce((sum: number, page: any) => sum + (page.wordCount || 0), 0) / pages.length;
      auditResults.contentQuality.pagesWithCitations = pages.filter((page: any) => page.hasScientificCitations).length;
      
      if (auditResults.contentQuality.averageWordCount < 300) {
        auditResults.contentQuality.issues.push('Average page word count is below 300 words, which may be considered thin content');
      }
    } else {
      auditResults.contentQuality.issues.push('No content quality metrics recorded - consider implementing tracking');
    }
    
    // Analyze website compliance based on stored issues
    const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    const websiteIssues = complianceIssues.filter((issue: any) => 
      issue.status === 'open' && 
      issue.timestamp && 
      new Date(issue.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
    );
    
    if (websiteIssues.length > 0) {
      auditResults.websiteCompliance.pagesWithIssues = websiteIssues.length;
      auditResults.websiteCompliance.issues = websiteIssues.map((issue: any) => issue.issue);
    }
    
    // Determine overall status
    const criticalIssues = [
      auditResults.performance.overallCTR < 5 && totalImpressions > 100,
      auditResults.keywords.singleWordCount > 0,
      auditResults.accountStructure.campaigns === 0
    ];
    
    const highRiskIssues = [
      auditResults.keywords.lowQualityScoreCount > 0,
      totalConversions === 0 && totalClicks > 50,
      auditResults.accountStructure.issues.length > 0
    ];
    
    if (criticalIssues.some(issue => issue)) {
      auditResults.overallStatus = 'non_compliant';
    } else if (highRiskIssues.some(issue => issue)) {
      auditResults.overallStatus = 'at_risk';
    } else if (auditResults.accountStructure.campaigns > 0) {
      auditResults.overallStatus = 'compliant';
    }
    
    // Store the audit results
    const audits = JSON.parse(localStorage.getItem('ad_grant_audits') || '[]');
    audits.push(auditResults);
    localStorage.setItem('ad_grant_audits', JSON.stringify(audits.slice(-10)));
    
    console.log('[GoogleAdGrants] Comprehensive audit completed:', auditResults);
    return auditResults;
  } catch (error) {
    console.error('Error performing comprehensive audit:', error);
    return {
      ...auditResults,
      error: String(error)
    };
  }
};

// Simplified function to automatically run a compliance check
export const autoCheckCompliance = () => {
  try {
    // Check content compliance on the current page
    const pageContent = document.body.textContent?.toLowerCase() || '';
    const foundTerms = detectBannedTerms(pageContent);
    
    if (foundTerms.length > 0) {
      console.warn("[GoogleAdGrantsSafety] Detected potentially problematic terms:", foundTerms);
      const auditResults = auditPageContent(document.body.innerHTML);
      
      // Store the content issue for reporting
      const complianceIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
      
      complianceIssues.push({
        issue: `Page ${window.location.pathname} contains banned terms: ${foundTerms.join(', ')}`,
        severity: 'high',
        affectedElement: `page:${window.location.pathname}`,
        recommendation: 'Review and remove these terms to maintain Google Ad Grant compliance',
        timestamp: new Date().toISOString(),
        status: 'open'
      });
      
      localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(complianceIssues.slice(-100)));
    }
    
    // Check ad performance and CTR compliance periodically
    const performanceData = JSON.parse(localStorage.getItem('ad_grant_performance') || '{}');
    checkAdGrantCompliance(performanceData);
    
    // Generate regular compliance reports
    if (Math.random() < 0.1) { // 10% chance to generate a report (to avoid too frequent reports)
      generateComplianceReport();
    }
    
    // Run comprehensive audit less frequently (approximately weekly)
    const lastAuditTime = localStorage.getItem('last_comprehensive_audit_time');
    if (!lastAuditTime || new Date(lastAuditTime) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      runComprehensiveAdGrantAudit();
      localStorage.setItem('last_comprehensive_audit_time', new Date().toISOString());
    }
  } catch (error) {
    console.error('Error in automatic compliance check:', error);
  }
};

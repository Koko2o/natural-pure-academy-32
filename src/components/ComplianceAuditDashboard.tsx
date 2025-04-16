
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { 
  generateComplianceReport, 
  runComprehensiveAdGrantAudit 
} from '@/utils/adGrantCompliance';

interface ComplianceIssue {
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedElement: string;
  recommendation: string;
  timestamp: string;
  status: 'open' | 'resolved';
}

interface ComplianceReport {
  timestamp: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
  };
  compliance: {
    isCTRCompliant: boolean;
    openIssuesCount: number;
    openIssuesBySeverity: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    hasActiveConversions: boolean;
    lastConversion: string | null;
    contentQualityScore: number;
    isFullyCompliant: boolean;
  };
  websiteAudit: {
    currentPage: string;
    contentSafetyCheck: {
      isCompliant: boolean;
      hasWarnings: boolean;
      issues: Array<{
        type: 'error' | 'warning';
        message: string;
        details?: string;
      }>;
    };
    urlCompliance: boolean;
    detectedBannedTerms: string[];
  };
  recommendations: string[];
}

const ComplianceAuditDashboard: React.FC = () => {
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [issues, setIssues] = useState<ComplianceIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load the latest report from localStorage
    const reports = JSON.parse(localStorage.getItem('ad_grant_compliance_reports') || '[]');
    if (reports.length > 0) {
      setReport(reports[reports.length - 1]);
    }

    // Load compliance issues
    const storedIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
    setIssues(storedIssues);
  }, []);

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const newReport = await generateComplianceReport();
      setReport(newReport);
      
      // Refresh issues list
      const storedIssues = JSON.parse(localStorage.getItem('ad_grant_compliance_issues') || '[]');
      setIssues(storedIssues);
    } catch (error) {
      console.error('Error running audit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runComprehensiveAudit = async () => {
    setIsLoading(true);
    try {
      await runComprehensiveAdGrantAudit();
      runAudit(); // Generate a standard report afterwards
    } catch (error) {
      console.error('Error running comprehensive audit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markIssueResolved = (index: number) => {
    const updatedIssues = [...issues];
    updatedIssues[index].status = 'resolved';
    setIssues(updatedIssues);
    localStorage.setItem('ad_grant_compliance_issues', JSON.stringify(updatedIssues));
  };

  const getComplianceScore = (): number => {
    if (!report) return 0;
    
    // Calculate a score based on various compliance factors
    let score = 0;
    
    // CTR (40% of score)
    if (report.metrics.ctr >= 5) {
      score += 40;
    } else if (report.metrics.ctr >= 3) {
      score += 20;
    }
    
    // Open issues (30% of score)
    const issuePoints = Math.max(0, 30 - (
      (report.compliance.openIssuesBySeverity.critical * 10) +
      (report.compliance.openIssuesBySeverity.high * 5) +
      (report.compliance.openIssuesBySeverity.medium * 2) +
      (report.compliance.openIssuesBySeverity.low * 0.5)
    ));
    score += issuePoints;
    
    // Content quality (20% of score)
    score += (report.compliance.contentQualityScore / 100) * 20;
    
    // Conversions (10% of score)
    if (report.compliance.hasActiveConversions) {
      score += 10;
    }
    
    return Math.min(100, Math.round(score));
  };

  const renderComplianceStatus = () => {
    if (!report) return null;
    
    const score = getComplianceScore();
    let status;
    let color;
    let icon;
    
    if (score >= 90) {
      status = "Fully Compliant";
      color = "bg-green-100 text-green-800";
      icon = <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (score >= 70) {
      status = "Mostly Compliant";
      color = "bg-blue-100 text-blue-800";
      icon = <Info className="h-5 w-5 text-blue-600" />;
    } else if (score >= 50) {
      status = "At Risk";
      color = "bg-yellow-100 text-yellow-800";
      icon = <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    } else {
      status = "Non-Compliant";
      color = "bg-red-100 text-red-800";
      icon = <AlertCircle className="h-5 w-5 text-red-600" />;
    }
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <Progress value={score} className="h-3 w-64" />
          <div className="text-center mt-2 text-sm text-gray-600">{score}% compliance score</div>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full ${color}`}>
          {icon}
          <span className="ml-2 font-medium">{status}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Google Ad Grant Compliance Dashboard</h1>
      
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={runAudit} 
          disabled={isLoading}
          className="flex items-center"
        >
          {isLoading ? 'Running...' : 'Run Quick Audit'}
        </Button>
        <Button 
          onClick={runComprehensiveAudit} 
          disabled={isLoading}
          variant="outline"
          className="flex items-center"
        >
          {isLoading ? 'Running...' : 'Run Comprehensive Audit'}
        </Button>
      </div>
      
      {report && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">
              Issues
              {issues.filter(i => i.status === 'open').length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {issues.filter(i => i.status === 'open').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>
                  Last updated: {new Date(report.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderComplianceStatus()}
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-700">CTR Status</h3>
                    <div className="flex items-center mt-2">
                      {report.compliance.isCTRCompliant ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      {report.metrics.ctr.toFixed(2)}% 
                      <span className="ml-1 text-gray-500 text-sm">(min 5% required)</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-700">Conversion Tracking</h3>
                    <div className="flex items-center mt-2">
                      {report.compliance.hasActiveConversions ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      {report.compliance.hasActiveConversions ? (
                        <span>Properly configured</span>
                      ) : (
                        <span>Not configured</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-700">Content Quality</h3>
                    <div className="mt-2">
                      <Progress value={report.compliance.contentQualityScore} className="h-2" />
                      <div className="text-right mt-1 text-sm">
                        {Math.round(report.compliance.contentQualityScore)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-700">Open Issues</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {report.compliance.openIssuesBySeverity.critical > 0 && (
                        <Badge variant="destructive">
                          {report.compliance.openIssuesBySeverity.critical} Critical
                        </Badge>
                      )}
                      {report.compliance.openIssuesBySeverity.high > 0 && (
                        <Badge variant="destructive" className="bg-orange-600">
                          {report.compliance.openIssuesBySeverity.high} High
                        </Badge>
                      )}
                      {report.compliance.openIssuesBySeverity.medium > 0 && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                          {report.compliance.openIssuesBySeverity.medium} Medium
                        </Badge>
                      )}
                      {report.compliance.openIssuesBySeverity.low > 0 && (
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {report.compliance.openIssuesBySeverity.low} Low
                        </Badge>
                      )}
                      {report.compliance.openIssuesCount === 0 && (
                        <span className="text-green-600 font-medium">No issues</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {report.websiteAudit.detectedBannedTerms.length > 0 && (
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800">Content Policy Alert</CardTitle>
                  <CardDescription>
                    The current page contains terms that may violate Google Ad Grant policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Detected problematic terms:</p>
                  <div className="flex flex-wrap gap-2">
                    {report.websiteAudit.detectedBannedTerms.map((term, i) => (
                      <Badge key={i} variant="outline" className="border-red-300 text-red-700">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-red-50">
                  <p className="text-sm text-red-700">
                    These terms could trigger policy violations. Consider revising the content.
                  </p>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Issues</CardTitle>
                <CardDescription>
                  All detected issues that need attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {issues.filter(issue => issue.status === 'open').length === 0 ? (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600">No open compliance issues found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {issues
                      .filter(issue => issue.status === 'open')
                      .map((issue, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              {issue.severity === 'critical' && (
                                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                              )}
                              {issue.severity === 'high' && (
                                <AlertCircle className="h-5 w-5 text-orange-600 mr-2 mt-0.5" />
                              )}
                              {issue.severity === 'medium' && (
                                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                              )}
                              {issue.severity === 'low' && (
                                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                              )}
                              <div>
                                <h3 className="font-medium">{issue.issue}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {issue.affectedElement}
                                </p>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                issue.severity === 'critical' ? 'destructive' :
                                issue.severity === 'high' ? 'destructive' :
                                issue.severity === 'medium' ? 'outline' : 'secondary'
                              }
                              className={
                                issue.severity === 'high' ? 'bg-orange-600' :
                                issue.severity === 'medium' ? 'border-yellow-500 text-yellow-700' : ''
                              }
                            >
                              {issue.severity}
                            </Badge>
                          </div>
                          
                          <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                            <p className="font-medium">Recommendation:</p>
                            <p>{issue.recommendation}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-500">
                              Detected: {new Date(issue.timestamp).toLocaleString()}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => markIssueResolved(index)}
                            >
                              Mark as Resolved
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key metrics that impact Google Ad Grant compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">CTR Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Current CTR</span>
                          <span className={`text-sm font-medium ${
                            report.metrics.ctr >= 5 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {report.metrics.ctr.toFixed(2)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(100, (report.metrics.ctr / 5) * 100)} 
                          className={`h-2 ${
                            report.metrics.ctr >= 5 ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">0%</span>
                          <span className="text-xs text-gray-500">5% (Required)</span>
                          <span className="text-xs text-gray-500">10%</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-3">
                          Total Impressions: {report.metrics.impressions.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Clicks: {report.metrics.clicks.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Conversion Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Conversion Rate</span>
                          <span className="text-sm font-medium">
                            {report.metrics.conversionRate.toFixed(2)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(100, report.metrics.conversionRate * 5)} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-3">
                          Total Conversions: {report.metrics.conversions.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Last Conversion: {report.compliance.lastConversion ? 
                            new Date(report.compliance.lastConversion).toLocaleString() : 
                            'None recorded'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Website Content Quality</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm font-medium">
                      {Math.round(report.compliance.contentQualityScore)}%
                    </span>
                  </div>
                  <Progress 
                    value={report.compliance.contentQualityScore} 
                    className="h-2"
                  />
                  
                  <p className="mt-4 text-sm text-gray-600">
                    This score is based on content length, scientific citations, structured data implementation, and other quality factors that impact Google Ad Grant eligibility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Actions to improve Google Ad Grant compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {report.recommendations.length === 0 ? (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600">No recommendations at this time. Your account appears to be fully compliant.</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {report.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex">
                        <span className="mr-3 text-blue-600">
                          {index + 1}.
                        </span>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="mt-8 bg-blue-50 p-4 rounded">
                  <h3 className="font-medium text-blue-800 mb-2">Google Ad Grant Policy Resources</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>
                      <a href="https://support.google.com/grants/answer/9042207" target="_blank" rel="noopener noreferrer" className="underline">
                        Google Ad Grants Policy Compliance Guide
                      </a>
                    </li>
                    <li>
                      <a href="https://support.google.com/grants/answer/9021211" target="_blank" rel="noopener noreferrer" className="underline">
                        Conversion Tracking Guidelines for Google Ad Grants
                      </a>
                    </li>
                    <li>
                      <a href="https://support.google.com/grants/answer/9958240" target="_blank" rel="noopener noreferrer" className="underline">
                        Account Structure Best Practices
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {!report && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">No compliance reports found.</p>
              <Button onClick={runAudit}>Run Your First Audit</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplianceAuditDashboard;

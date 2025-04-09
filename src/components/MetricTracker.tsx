
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricData {
  name: string;
  value: number;
  target?: number;
  unit?: string;
}

interface MetricTrackerProps {
  title: string;
  description?: string;
  metrics: MetricData[];
  showChart?: boolean;
}

const MetricTracker: React.FC<MetricTrackerProps> = ({ 
  title, 
  description, 
  metrics, 
  showChart = true 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {showChart && (
          <div className="h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const metric = metrics.find(m => m.value === value);
                    return [`${value}${metric?.unit || ''}`, name];
                  }}
                />
                <Bar dataKey="value" fill="#8884d8" />
                {metrics.some(m => m.target) && (
                  <Bar dataKey="target" fill="#82ca9d" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-semibold mr-1">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                )}
                {metric.target && (
                  <span className="text-xs text-muted-foreground ml-2">
                    / cible: {metric.target}{metric.unit || ''}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricTracker;

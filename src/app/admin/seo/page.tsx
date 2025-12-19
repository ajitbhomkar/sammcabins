'use client';

import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  GlobeAltIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface SEOMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: { path: string; views: number }[];
  topKeywords: { keyword: string; position: number; clicks: number }[];
  technicalHealth: {
    sitemap: boolean;
    robots: boolean;
    ssl: boolean;
    mobileOptimized: boolean;
    pagespeed: number;
  };
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    // Simulated data - in production, fetch from Google Analytics & Search Console APIs
    setTimeout(() => {
      setMetrics({
        pageViews: 12547,
        uniqueVisitors: 8231,
        bounceRate: 42.5,
        avgSessionDuration: '3m 24s',
        topPages: [
          { path: '/', views: 5234 },
          { path: '/cabins', views: 3421 },
          { path: '/gallery', views: 2112 },
          { path: '/contact', views: 1780 },
        ],
        topKeywords: [
          { keyword: 'porta cabin UAE', position: 3, clicks: 234 },
          { keyword: 'portable cabins Dubai', position: 5, clicks: 187 },
          { keyword: 'office cabin Sharjah', position: 7, clicks: 156 },
          { keyword: 'security cabin UAE', position: 4, clicks: 143 },
          { keyword: 'site office porta cabin', position: 9, clicks: 98 },
        ],
        technicalHealth: {
          sitemap: true,
          robots: true,
          ssl: true,
          mobileOptimized: true,
          pagespeed: 89,
        },
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading SEO metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SEO Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor your website&apos;s search performance and technical SEO health
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-amber-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Last {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Page Views"
            value={metrics?.pageViews.toLocaleString() || '0'}
            icon={ChartBarIcon}
            trend="+12.5%"
            trendUp={true}
          />
          <MetricCard
            title="Unique Visitors"
            value={metrics?.uniqueVisitors.toLocaleString() || '0'}
            icon={GlobeAltIcon}
            trend="+8.3%"
            trendUp={true}
          />
          <MetricCard
            title="Bounce Rate"
            value={`${metrics?.bounceRate}%`}
            icon={ArrowTrendingUpIcon}
            trend="-3.2%"
            trendUp={true}
          />
          <MetricCard
            title="Avg. Session"
            value={metrics?.avgSessionDuration || '0m 0s'}
            icon={ClockIcon}
            trend="+15s"
            trendUp={true}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Pages */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DocumentTextIcon className="h-6 w-6 text-amber-500" />
              Top Pages
            </h2>
            <div className="space-y-3">
              {metrics?.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {page.path === '/' ? 'Home' : page.path}
                    </span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-amber-500" />
              Top Keywords
            </h2>
            <div className="space-y-3">
              {metrics?.topKeywords.map((keyword, index) => (
                <div key={keyword.keyword} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {keyword.keyword}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Pos: {keyword.position}
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        {keyword.clicks} clicks
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${(keyword.clicks / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical SEO Health */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-amber-500" />
            Technical SEO Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HealthItem
              label="Sitemap Available"
              status={metrics?.technicalHealth.sitemap || false}
            />
            <HealthItem
              label="Robots.txt Configured"
              status={metrics?.technicalHealth.robots || false}
            />
            <HealthItem
              label="SSL Certificate"
              status={metrics?.technicalHealth.ssl || false}
            />
            <HealthItem
              label="Mobile Optimized"
              status={metrics?.technicalHealth.mobileOptimized || false}
            />
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  PageSpeed Score
                </span>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {metrics?.technicalHealth.pagespeed}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">/100</div>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${metrics?.technicalHealth.pagespeed}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📊 Connect Real Analytics
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            This dashboard shows simulated data. To display real metrics:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
            <li>Set up Google Analytics 4 and add your tracking ID</li>
            <li>Verify your site in Google Search Console</li>
            <li>Configure API access for both services</li>
            <li>Update the API endpoints in this component</li>
          </ol>
          <div className="mt-4 flex gap-4">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Google Analytics
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Console
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-amber-500" />
        <span
          className={`text-sm font-medium ${
            trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {trend}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
}

function HealthItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      {status ? (
        <CheckCircleIcon className="h-6 w-6 text-green-500" />
      ) : (
        <XCircleIcon className="h-6 w-6 text-red-500" />
      )}
    </div>
  );
}

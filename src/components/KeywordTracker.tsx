'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface KeywordData {
  keyword: string;
  position: number | string;
  impressions: number;
  clicks: number;
  ctr: number;
  change: string | number;
  status: 'ranking' | 'pending' | 'new';
}

export default function KeywordTracker() {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchKeywordData();
  }, []);

  const fetchKeywordData = async () => {
    try {
      const response = await fetch('/api/search-console?days=30');
      const data = await response.json();
      
      if (data.error) {
        setError(data.message);
      }
      
      setKeywords(data.keywords || data.demoData || []);
    } catch {
      setError('Failed to load keyword data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MagnifyingGlassIcon className="h-8 w-8 text-amber-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Keyword Rankings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your position in Google search results
            </p>
          </div>
        </div>
        <button
          onClick={fetchKeywordData}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Real Data Not Available Yet
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                {error}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded p-3 text-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  Why no rankings yet?
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Website is brand new</strong> (created yesterday)</li>
                  <li><strong>Google hasn&apos;t indexed it yet</strong> (takes 3-7 days)</li>
                  <li><strong>SEO takes time</strong> (1-6 months for rankings)</li>
                  <li><strong>Search Console not verified</strong> (see setup below)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Keyword
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Position
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Change
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Impressions
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Clicks
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                CTR
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((kw, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {kw.keyword}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-flex items-center justify-center w-16 h-8 rounded-lg font-bold ${
                    typeof kw.position === 'number'
                      ? kw.position <= 3
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : kw.position <= 10
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-500 text-xs'
                  }`}>
                    {typeof kw.position === 'number' ? kw.position : '—'}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  {typeof kw.change === 'number' ? (
                    <div className={`inline-flex items-center gap-1 ${
                      kw.change > 0
                        ? 'text-green-600 dark:text-green-400'
                        : kw.change < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {kw.change > 0 ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : kw.change < 0 ? (
                        <ArrowDownIcon className="h-4 w-4" />
                      ) : (
                        <MinusIcon className="h-4 w-4" />
                      )}
                      <span className="font-semibold">
                        {Math.abs(kw.change)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {kw.change}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-900 dark:text-white">
                  {kw.impressions.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-center font-medium text-amber-600 dark:text-amber-400">
                  {kw.clicks.toLocaleString()}
                </td>
                <td className="py-4 px-4 text-center font-medium text-gray-900 dark:text-white">
                  {kw.ctr.toFixed(1)}%
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    kw.status === 'ranking'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : kw.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {kw.status === 'ranking' ? '✓ Ranking' : kw.status === 'pending' ? '⏳ Pending' : '🆕 New'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          📊 How to Get Real Keyword Rankings:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>
            <strong>Verify site in Google Search Console</strong> 
            <a 
              href="https://search.google.com/search-console" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 underline hover:text-blue-600"
            >
              → Go to Search Console
            </a>
          </li>
          <li>
            <strong>Wait 3-7 days</strong> for Google to index your pages
          </li>
          <li>
            <strong>Submit your sitemap:</strong> https://saamzgroup.com/sitemap.xml
          </li>
          <li>
            <strong>Request indexing</strong> for each important page
          </li>
          <li>
            <strong>Wait 2-4 weeks</strong> for initial rankings to appear
          </li>
        </ol>
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Current Status:</strong> Website created Dec 18, 2025 (1 day old). 
            Rankings typically appear after 2-4 weeks of indexing.
          </p>
        </div>
      </div>

      {/* Manual Tracking Option */}
      <div className="mt-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🔍 Track Rankings Manually (While Waiting):
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Open an incognito browser window and search for these keywords on Google UAE:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {keywords.slice(0, 6).map((kw, i) => (
            <a
              key={i}
              href={`https://www.google.ae/search?q=${encodeURIComponent(kw.keyword)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors group"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 group-hover:text-amber-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                {kw.keyword}
              </span>
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          💡 Tip: Use incognito mode to see unbiased results (not personalized to your search history)
        </p>
      </div>
    </div>
  );
}

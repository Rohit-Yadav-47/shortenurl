import React from 'react';
import { Clock, Copy, QrCode } from 'lucide-react';
import { ShortenedURL } from '../types';

interface URLHistoryProps {
  urls: ShortenedURL[];
  onCopy: (url: string) => void;
  onGenerateQR: (url: ShortenedURL) => void;
}

export const URLHistory: React.FC<URLHistoryProps> = ({ urls, onCopy, onGenerateQR }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Your URL History
      </h2>
      <div className="space-y-4">
        {urls.map((url) => (
          <div
            key={url.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{formatDate(url.createdAt)}</p>
                <p className="text-gray-900 font-medium truncate">{url.originalURL}</p>
                <a
                  href={url.shortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {url.shortURL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onGenerateQR(url)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <QrCode className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onCopy(url.shortURL)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Copy className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-500">
                  {url.clicks} clicks
                </span>
              </div>
            </div>
          </div>
        ))}
        {urls.length === 0 && (
          <p className="text-center text-gray-500 py-8">No URLs shortened yet</p>
        )}
      </div>
    </div>
  );
};
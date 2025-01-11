import React, { useState, useEffect } from 'react';
import { Link } from 'lucide-react';
import { URLForm } from './components/URLForm';
import { URLHistory } from './components/URLHistory';
import { QRModal } from './components/QRModal';
import { getHistory } from './utils/storage';
import { ShortenedURL } from './types';

function App() {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<ShortenedURL | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    setUrls(getHistory());
  }, []);

  const handleURLShorten = (url: ShortenedURL) => {
    setUrls([url, ...urls]);
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <Link className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              TinyLink
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Transform your long URLs into short, memorable links. Perfect for sharing on social media, emails, or anywhere else.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold text-2xl text-blue-600">{urls.length}</span>
              <span>Links Created</span>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-semibold text-2xl text-blue-600">
                {urls.reduce((acc, url) => acc + url.clicks, 0)}
              </span>
              <span>Total Clicks</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <URLForm onURLShorten={handleURLShorten} />
          </div>
          <URLHistory
            urls={urls}
            onCopy={handleCopy}
            onGenerateQR={setSelectedUrl}
          />
        </div>

        <QRModal url={selectedUrl} onClose={() => setSelectedUrl(null)} />
        
        {showCopySuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
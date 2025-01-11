import React, { useState } from 'react';
import { Link2, Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { saveToHistory } from '../utils/storage';
import { ShortenedURL } from '../types';

interface URLFormProps {
  onURLShorten: (url: ShortenedURL) => void;
}

export const URLForm: React.FC<URLFormProps> = ({ onURLShorten }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateURL(url)) {
      setError('Please enter a valid URL');
      setIsLoading(false);
      return;
    }

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const shortenedURL: ShortenedURL = {
      id: nanoid(8),
      originalURL: url,
      shortURL: `${window.location.origin}/go/${generateShortCode()}`,
      createdAt: Date.now(),
      clicks: 0
    };

    saveToHistory(shortenedURL);
    onURLShorten(shortenedURL);
    setUrl('');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:bg-white"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </form>
  );
};
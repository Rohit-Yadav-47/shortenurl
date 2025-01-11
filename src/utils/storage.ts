import { ShortenedURL } from '../types';

const STORAGE_KEY = 'url_history';

export const saveToHistory = (url: ShortenedURL) => {
  const history = getHistory();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([url, ...history]));
};

export const getHistory = (): ShortenedURL[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const incrementClicks = (id: string) => {
  const history = getHistory();
  const updatedHistory = history.map(item => 
    item.id === id ? { ...item, clicks: (item.clicks || 0) + 1 } : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};
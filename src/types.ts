export interface ShortenedURL {
  id: string;
  originalURL: string;
  shortURL: string;
  createdAt: number;
  clicks: number;
}

export interface URLHistoryItem extends ShortenedURL {
  qrCode: boolean;
}
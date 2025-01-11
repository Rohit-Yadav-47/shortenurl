import React from 'react';
import { X } from 'lucide-react';
import { ShortenedURL } from '../types';

interface QRModalProps {
  url: ShortenedURL | null;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ url, onClose }) => {
  if (!url) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url.shortURL)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">QR Code</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-48 h-48 mb-4"
          />
          <p className="text-sm text-gray-600 text-center break-all">
            {url.shortURL}
          </p>
        </div>
      </div>
    </div>
  );
};
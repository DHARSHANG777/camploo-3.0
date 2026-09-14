import React from 'react';
import { IconCheckCircle, IconXCircle } from './Icons';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
        isSuccess 
          ? 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200' 
          : 'border-rose-500/30 bg-rose-950/80 text-rose-200'
      }`}>
        {isSuccess ? <IconCheckCircle className="w-6 h-6 text-emerald-400" /> : <IconXCircle className="w-6 h-6 text-rose-400" />}
        <p className="text-sm font-medium">{toast.message}</p>
        <button onClick={onClose} className="ml-3 text-xs opacity-60 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}

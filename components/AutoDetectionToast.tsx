
import React, { useEffect, useState } from 'react';
import { Song } from '../types';

interface AutoDetectionToastProps {
  song: { title: string; artist: string };
  onDismiss: () => void;
  onSelect: () => void;
}

const AutoDetectionToast: React.FC<AutoDetectionToastProps> = ({ song, onDismiss, onSelect }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`fixed top-6 left-4 right-4 z-[100] transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
      <div 
        onClick={onSelect}
        className="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark/95 backdrop-blur-xl border border-primary/30 shadow-[0_8px_32px_rgba(236,19,236,0.3)] cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex-none size-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-white animate-pulse">sensors</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-0.5">Auto-Detected</p>
          <p className="text-sm font-bold text-white truncate">{song.title}</p>
          <p className="text-xs text-text-secondary-dark truncate">{song.artist}</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setVisible(false); setTimeout(onDismiss, 500); }}
          className="flex-none p-1 text-gray-500 hover:text-white"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};

export default AutoDetectionToast;

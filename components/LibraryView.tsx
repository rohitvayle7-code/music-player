
import React, { useState } from 'react';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../constants';
import { Song } from '../types';
import { useAudioAutoDetection } from '../hooks/useAudioAutoDetection';
import AutoDetectionToast from './AutoDetectionToast';

interface LibraryViewProps {
  onSongSelect: (song: Song) => void;
  onOpenPlaylist: () => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ onSongSelect, onOpenPlaylist }) => {
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(false);
  const [detectedSong, setDetectedSong] = useState<{ title: string; artist: string } | null>(null);

  const { isListening } = useAudioAutoDetection(autoDetectEnabled, (result) => {
    setDetectedSong(result);
  });

  const handleToastClick = () => {
    if (detectedSong) {
      // Find matching song in library or simulate selection
      const match = MOCK_SONGS.find(s => 
        s.title.toLowerCase().includes(detectedSong.title.toLowerCase())
      ) || MOCK_SONGS[0];
      onSongSelect(match);
      setDetectedSong(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full pb-32">
      {detectedSong && (
        <AutoDetectionToast 
          song={detectedSong} 
          onDismiss={() => setDetectedSong(null)} 
          onSelect={handleToastClick}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-dark/95 backdrop-blur-md px-6 py-6 transition-colors">
        <h1 className="text-3xl font-bold leading-tight tracking-tight flex-1">My Library</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setAutoDetectEnabled(!autoDetectEnabled)}
            className={`relative size-10 rounded-full flex items-center justify-center transition-all ${autoDetectEnabled ? 'bg-primary text-white shadow-[0_0_15px_rgba(236,19,236,0.5)]' : 'bg-surface-dark text-gray-500 border border-white/5'}`}
            title="Toggle Continuous Auto-Detection"
          >
            <span className={`material-symbols-outlined ${isListening ? 'animate-pulse' : ''}`}>
              {autoDetectEnabled ? 'sensors' : 'sensors_off'}
            </span>
            {isListening && (
              <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-50"></span>
            )}
          </button>
          
          <button className="flex items-center justify-center rounded-full p-2 hover:bg-surface-dark transition-colors">
            <span className="text-primary text-base font-bold leading-normal tracking-wide shrink-0">Edit</span>
          </button>
        </div>
      </header>

      {/* SearchBar Placeholder */}
      <div className="px-6 pb-4">
        <div className="flex w-full items-center rounded-full h-12 bg-surface-dark shadow-sm ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
          <div className="flex items-center justify-center pl-4 text-text-secondary-dark">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="flex w-full flex-1 bg-transparent border-none text-base font-normal placeholder:text-text-secondary-dark px-3 focus:ring-0 text-white" 
            placeholder="Find in library..." 
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 px-6 py-2 overflow-x-auto no-scrollbar">
        {['Playlists', 'Artists', 'Albums', 'Songs', 'Genres'].map((filter, i) => (
          <button 
            key={filter}
            className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-dark border border-white/5 text-gray-300'}`}
          >
            <p className="text-sm font-bold leading-normal">{filter}</p>
          </button>
        ))}
      </div>

      {/* Recently Added Carousel */}
      <section className="mt-4">
        <div className="flex items-center justify-between px-6 pb-3">
          <h2 className="text-xl font-bold leading-tight tracking-tight">Recently Added</h2>
          <span className="material-symbols-outlined text-text-secondary-dark cursor-pointer">arrow_forward</span>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-6 pb-4 gap-4 snap-x snap-mandatory">
          {MOCK_SONGS.map(song => (
            <div 
              key={song.id} 
              onClick={() => onSongSelect(song)}
              className="snap-start flex flex-col gap-3 min-w-[160px] w-[160px] group cursor-pointer"
            >
              <div className="w-full aspect-square bg-surface-dark rounded-2xl overflow-hidden relative shadow-md ring-1 ring-white/10">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${song.coverUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-base font-bold truncate">{song.title}</p>
                <p className="text-text-secondary-dark text-sm truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Playlists List */}
      <section className="px-6 mt-4">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight">Your Playlists</h2>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full text-text-secondary-dark"><span className="material-symbols-outlined text-[20px]">grid_view</span></button>
            <button className="p-1 rounded-full bg-surface-dark text-primary shadow-sm"><span className="material-symbols-outlined text-[20px]">view_list</span></button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {MOCK_PLAYLISTS.map(playlist => (
            <div 
              key={playlist.id}
              onClick={onOpenPlaylist}
              className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-dark/50 active:scale-[0.99] transition-all cursor-pointer"
            >
              <div 
                className="h-14 w-14 shrink-0 rounded-xl bg-cover bg-center shadow-sm" 
                style={{ backgroundImage: `url(${playlist.coverUrl})` }}
              ></div>
              <div className="flex flex-1 flex-col justify-center gap-0.5 overflow-hidden">
                <p className="text-base font-bold truncate">{playlist.title}</p>
                <p className="text-sm font-medium text-text-secondary-dark truncate">{playlist.description}</p>
              </div>
              <span className="material-symbols-outlined text-text-secondary-dark opacity-0 group-hover:opacity-100">chevron_right</span>
            </div>
          ))}
          
          <div className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-dark/50 active:scale-[0.99] transition-all cursor-pointer">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-800 shadow-sm">
              <span className="material-symbols-outlined text-white text-2xl fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5 overflow-hidden">
              <p className="text-base font-bold truncate">Liked Songs</p>
              <p className="text-sm font-medium text-text-secondary-dark truncate">412 Songs • Auto-generated</p>
            </div>
            <span className="material-symbols-outlined text-text-secondary-dark opacity-0 group-hover:opacity-100">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibraryView;

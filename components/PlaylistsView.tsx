
import React, { useState } from 'react';
import { MOCK_PLAYLISTS, MOCK_SONGS } from '../constants';
import { Song, Playlist } from '../types';
import { generateSmartPlaylist } from '../services/geminiService';

interface PlaylistsViewProps {
  onSongSelect: (song: Song) => void;
}

const PlaylistsView: React.FC<PlaylistsViewProps> = ({ onSongSelect }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartPlaylists, setSmartPlaylists] = useState<Playlist[]>([]);
  const [prompt, setPrompt] = useState('');

  const handleSmartGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const res = await generateSmartPlaylist(prompt);
      const newPlaylist: Playlist = {
        id: `smart-${Date.now()}`,
        title: res.title,
        description: res.description,
        songs: MOCK_SONGS.slice(0, 3), // Simulating results
        coverUrl: `https://picsum.photos/seed/${res.title}/400/400`,
        updatedAt: 'Just now',
        pinned: true
      };
      setSmartPlaylists(prev => [newPlaylist, ...prev]);
      setPrompt('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const allPlaylists = [...smartPlaylists, ...MOCK_PLAYLISTS];

  return (
    <div className="flex flex-col h-full w-full pb-32">
      <div className="sticky top-0 z-20 flex items-center bg-background-dark/95 backdrop-blur-md px-6 py-6 justify-between">
        <h2 className="text-3xl font-bold leading-tight tracking-tight">Playlists</h2>
        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-primary text-white shadow-lg hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>add</span>
        </button>
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col gap-4 p-5 rounded-3xl bg-surface-dark border border-primary/20 shadow-neon">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">AI Smart Playlist</span>
          </div>
          <div className="flex gap-2">
            <input 
              className="flex-1 bg-background-dark/50 border border-white/5 rounded-full px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-white" 
              placeholder="E.g. Dark synth for late night coding" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
            <button 
              onClick={handleSmartGenerate}
              disabled={isGenerating}
              className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold transition-transform active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? "Creating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pb-2">
        <h3 className="text-lg font-bold mb-4">Pinned</h3>
        <div className="flex overflow-x-auto gap-6 no-scrollbar pb-2">
          {allPlaylists.filter(p => p.pinned).map(p => (
            <div key={p.id} className="flex flex-col gap-3 items-center min-w-[100px] animate-in fade-in zoom-in duration-500">
              <div 
                className="h-24 w-24 rounded-full bg-cover bg-center shadow-md relative group overflow-hidden border-2 border-primary/20" 
                style={{ backgroundImage: `url(${p.coverUrl})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-center truncate w-24">{p.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6">
        <div className="flex justify-between items-end pb-4">
          <h3 className="text-lg font-bold">All Playlists</h3>
          <span className="text-xs text-primary font-bold uppercase tracking-wider cursor-pointer">Sort By</span>
        </div>
        <div className="flex flex-col gap-1">
          {allPlaylists.map(p => (
            <div key={p.id} className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-surface-dark transition-colors cursor-pointer">
              <div className="h-16 w-16 rounded-xl bg-cover bg-center flex-shrink-0 shadow-sm border border-white/5" style={{ backgroundImage: `url(${p.coverUrl})` }}></div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-bold truncate">{p.title}</h4>
                <p className="text-sm text-text-secondary-dark truncate">{p.description}</p>
              </div>
              <div className="text-gray-500">
                <span className="material-symbols-outlined cursor-grab">drag_handle</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsView;

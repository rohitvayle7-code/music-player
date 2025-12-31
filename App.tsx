
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView, Song, PlaybackState } from './types';
import { MOCK_SONGS, MOCK_PLAYLISTS } from './constants';
import LibraryView from './components/LibraryView';
import SearchView from './components/SearchView';
import PlaylistsView from './components/PlaylistsView';
import SettingsView from './components/SettingsView';
import NowPlayingView from './components/NowPlayingView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('library');
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    currentSong: MOCK_SONGS[0],
    isPlaying: false,
    progress: 45,
    currentTime: '1:45',
    totalTime: '4:03'
  });

  const handleSongSelect = (song: Song) => {
    setPlaybackState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      progress: 0,
      currentTime: '0:00',
      totalTime: song.duration
    }));
  };

  const togglePlay = () => {
    setPlaybackState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const renderView = () => {
    switch (currentView) {
      case 'library':
        return <LibraryView onSongSelect={handleSongSelect} onOpenPlaylist={() => setCurrentView('playlists')} />;
      case 'search':
        return <SearchView onSongSelect={handleSongSelect} />;
      case 'playlists':
        return <PlaylistsView onSongSelect={handleSongSelect} />;
      case 'settings':
        return <SettingsView />;
      case 'now-playing':
        return <NowPlayingView 
                  state={playbackState} 
                  onClose={() => setCurrentView('library')} 
                  onTogglePlay={togglePlay} 
                />;
      default:
        return <LibraryView onSongSelect={handleSongSelect} onOpenPlaylist={() => setCurrentView('playlists')} />;
    }
  };

  return (
    <div className="relative h-screen w-full bg-background-dark overflow-hidden flex flex-col font-display">
      {/* View Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {renderView()}
      </div>

      {/* Persistent Mini Player (if not in now-playing view) */}
      {currentView !== 'now-playing' && playbackState.currentSong && (
        <div className="fixed bottom-[88px] left-4 right-4 z-40 transition-all duration-300">
          <div 
            onClick={() => setCurrentView('now-playing')}
            className="flex h-[64px] w-full items-center justify-between rounded-2xl bg-surface-dark/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40 pl-2 pr-4 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div 
                className={`h-12 w-12 shrink-0 rounded-full bg-cover bg-center ${playbackState.isPlaying ? 'animate-spin-slow' : ''}`}
                style={{ backgroundImage: `url(${playbackState.currentSong.coverUrl})` }}
              ></div>
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="text-white text-sm font-bold truncate">{playbackState.currentSong.title}</p>
                <p className="text-text-secondary-dark text-xs font-medium truncate">{playbackState.currentSong.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button className="p-2 text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
              </button>
              <button 
                onClick={togglePlay}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white shadow-[0_0_15px_rgba(236,19,236,0.5)] hover:bg-white hover:text-black transition-all"
              >
                <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {playbackState.isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button className="p-2 text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
              </button>
            </div>
            {/* Tiny Progress Bar Overlay */}
            <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${playbackState.progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-[80px] w-full items-start justify-around border-t border-white/5 bg-background-dark/95 backdrop-blur-md pb-6 pt-3">
        <button onClick={() => setCurrentView('library')} className={`group flex flex-col items-center gap-1 w-16 transition-colors ${currentView === 'library' ? 'text-primary' : 'text-gray-500'}`}>
          <span className={`material-symbols-outlined ${currentView === 'library' ? 'fill-1' : ''}`} style={{ fontVariationSettings: currentView === 'library' ? "'FILL' 1" : "" }}>library_music</span>
          <span className="text-[10px] font-bold">Library</span>
        </button>
        <button onClick={() => setCurrentView('search')} className={`group flex flex-col items-center gap-1 w-16 transition-colors ${currentView === 'search' ? 'text-primary' : 'text-gray-500'}`}>
          <span className={`material-symbols-outlined ${currentView === 'search' ? 'fill-1' : ''}`}>search</span>
          <span className="text-[10px] font-bold">Search</span>
        </button>
        <button onClick={() => setCurrentView('playlists')} className={`group flex flex-col items-center gap-1 w-16 transition-colors ${currentView === 'playlists' ? 'text-primary' : 'text-gray-500'}`}>
          <span className={`material-symbols-outlined ${currentView === 'playlists' ? 'fill-1' : ''}`}>queue_music</span>
          <span className="text-[10px] font-bold">Playlists</span>
        </button>
        <button onClick={() => setCurrentView('settings')} className={`group flex flex-col items-center gap-1 w-16 transition-colors ${currentView === 'settings' ? 'text-primary' : 'text-gray-500'}`}>
          <span className={`material-symbols-outlined ${currentView === 'settings' ? 'fill-1' : ''}`}>settings</span>
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default App;

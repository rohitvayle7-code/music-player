
import React from 'react';
import { PlaybackState } from '../types';

interface NowPlayingViewProps {
  state: PlaybackState;
  onClose: () => void;
  onTogglePlay: () => void;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ state, onClose, onTogglePlay }) => {
  const { currentSong, isPlaying, progress, currentTime, totalTime } = state;

  if (!currentSong) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background-dark animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <header className="flex-none px-6 pt-12 pb-2 flex flex-col items-center gap-4 relative z-10">
        <div className="w-12 h-1.5 rounded-full bg-white/10 opacity-60" onClick={onClose}></div>
        <div className="flex items-center justify-between w-full mt-2">
          <button 
            onClick={onClose}
            className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">keyboard_arrow_down</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">Now Playing</span>
          </div>
          <button className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors">
            <span className="material-symbols-outlined text-[24px]">more_horiz</span>
          </button>
        </div>
      </header>

      {/* Main Player Content */}
      <main className="flex-1 flex flex-col px-8 pb-8 pt-4 justify-evenly max-w-md mx-auto w-full h-full">
        {/* Album Art */}
        <div className="w-full aspect-square relative group">
          <div 
            className="absolute inset-4 bg-primary/40 blur-3xl rounded-full opacity-60 animate-pulse"
            style={{ backgroundColor: `${currentSong.color}66` }}
          ></div>
          <div 
            className={`relative w-full h-full bg-center bg-cover rounded-[2.5rem] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/10 transition-transform duration-700 ${isPlaying ? 'scale-100' : 'scale-[0.85]'}`}
            style={{ backgroundImage: `url(${currentSong.coverUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Track Info */}
        <div className="flex items-end justify-between mt-8 mb-2">
          <div className="flex flex-col gap-1 overflow-hidden mr-4">
            <h1 className="text-3xl font-bold leading-tight truncate text-white">{currentSong.title}</h1>
            <p className="text-lg text-primary/80 font-medium truncate">{currentSong.artist}</p>
          </div>
          <button className="flex-none mb-1 text-gray-400 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 0", fontSize: '28px' }}>favorite</span>
          </button>
        </div>

        {/* Scrubber */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <div className="relative w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-primary rounded-full shadow-[0_0_15px_rgba(236,19,236,0.6)]" style={{ width: `${progress}%` }}></div>
            {/* Knob is omitted in the background for simplicity but can be simulated */}
          </div>
          <div className="flex justify-between items-center text-xs font-medium text-gray-400 font-mono tracking-tight mt-1">
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8 mt-6">
          <div className="flex items-center justify-between w-full">
            <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[24px]">shuffle</span></button>
            <button className="text-white hover:text-primary transition-colors active:scale-90 transform duration-150">
              <span className="material-symbols-outlined text-[48px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
            </button>
            <button 
              onClick={onTogglePlay}
              className="relative size-24 flex items-center justify-center bg-primary text-white rounded-full shadow-[0_0_30px_rgba(236,19,236,0.5)] hover:shadow-[0_0_50px_rgba(236,19,236,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[64px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button className="text-white hover:text-primary transition-colors active:scale-90 transform duration-150">
              <span className="material-symbols-outlined text-[48px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
            </button>
            <button className="text-primary transition-colors relative">
              <span className="material-symbols-outlined text-[24px]">repeat</span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 bg-primary rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Volume */}
        <div className="mt-10 flex items-center gap-4 w-full">
          <span className="material-symbols-outlined text-gray-500 text-[20px]">volume_down</span>
          <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white/60 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <span className="material-symbols-outlined text-gray-500 text-[20px]">volume_up</span>
        </div>

        {/* Accessories */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-surface-dark text-primary text-sm font-medium border border-white/5 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">airplay</span>
            <span>AirPods Pro</span>
          </button>
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[24px]">queue_music</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default NowPlayingView;

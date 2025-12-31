
import React, { useState } from 'react';
import { Song } from '../types';
import { MOCK_SONGS } from '../constants';
import { searchMusicInsights } from '../services/geminiService';

interface SearchViewProps {
  onSongSelect: (song: Song) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onSongSelect }) => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setInsight(null);
    try {
      const result = await searchMusicInsights(query);
      setInsight(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs = MOCK_SONGS.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full px-6 pb-32">
      <header className="flex items-center pt-8 pb-4 justify-between shrink-0">
        <h2 className="text-3xl font-bold leading-tight tracking-tight flex-1">Search</h2>
        <div className="size-10 rounded-full overflow-hidden border-2 border-primary/20">
          <img alt="User" className="w-full h-full object-cover" src="https://picsum.photos/seed/user123/100/100" />
        </div>
      </header>

      <form onSubmit={handleSearch} className="pb-4 shrink-0">
        <div className="flex w-full items-center rounded-full h-12 bg-surface-dark border border-white/5 focus-within:border-primary transition-colors duration-200">
          <button type="submit" className="text-primary/70 flex items-center justify-center pl-4 pr-2">
            <span className="material-symbols-outlined">search</span>
          </button>
          <input 
            className="flex w-full bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 h-full text-base font-medium" 
            placeholder="Artists, songs, or albums..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="pr-4 text-white/40">
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </div>
        </div>
      </form>

      {/* AI Insight Box */}
      { (loading || insight) && (
        <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">AI Insight</span>
          </div>
          <p className="text-sm text-text-secondary-dark italic">
            {loading ? "Tuning in to your vibes..." : insight}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="w-full overflow-x-auto no-scrollbar pb-6 shrink-0">
        <div className="flex gap-3 w-max">
          {['All', 'Artists', 'Albums', 'Songs', 'Playlists'].map((cat, i) => (
            <button 
              key={cat}
              className={`flex h-9 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${i === 0 ? 'bg-primary text-white' : 'bg-surface-dark border border-white/5 text-white/80'}`}
            >
              <p className="text-sm font-semibold">{cat}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {query ? (
          <div className="flex flex-col gap-1">
            <h3 className="text-white/90 text-lg font-bold py-3">Results</h3>
            {filteredSongs.length > 0 ? filteredSongs.map(song => (
              <div 
                key={song.id} 
                onClick={() => onSongSelect(song)}
                className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="relative size-12 rounded-lg overflow-hidden shrink-0">
                  <img src={song.coverUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-white text-base font-bold truncate group-hover:text-primary transition-colors">{song.title}</p>
                  <p className="text-white/50 text-sm truncate">{song.artist} • {song.album}</p>
                </div>
                <span className="material-symbols-outlined text-white/30">more_vert</span>
              </div>
            )) : (
              <p className="text-gray-500 italic py-10 text-center">No matches found. Try a broader search.</p>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between py-3">
              <h3 className="text-white/90 text-lg font-bold">Recent Searches</h3>
              <button className="text-primary text-xs font-semibold uppercase tracking-wider">Clear</button>
            </div>
            {['The Midnight', 'Synthwave Essentials', 'Carpenter Brut'].map(term => (
              <div key={term} className="flex items-center gap-4 px-2 py-3 hover:bg-white/5 rounded-2xl transition-colors group cursor-pointer">
                <span className="material-symbols-outlined text-white/40 group-hover:text-primary">schedule</span>
                <p className="text-white text-base font-normal flex-1 truncate">{term}</p>
                <button className="text-white/40"><span className="material-symbols-outlined text-[20px]">close</span></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;

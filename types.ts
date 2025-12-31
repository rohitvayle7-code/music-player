
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  color: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  songs: Song[];
  coverUrl: string;
  updatedAt: string;
  pinned?: boolean;
}

export type AppView = 'library' | 'search' | 'playlists' | 'settings' | 'now-playing';

export interface PlaybackState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: string;
  totalTime: string;
}

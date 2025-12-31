
import { Song, Playlist } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: '4:03',
    coverUrl: 'https://picsum.photos/seed/m83/600/600',
    color: '#ff00ff'
  },
  {
    id: '2',
    title: 'Turbo Killer',
    artist: 'Carpenter Brut',
    album: 'Trilogy',
    duration: '3:28',
    coverUrl: 'https://picsum.photos/seed/carpenter/600/600',
    color: '#00ffff'
  },
  {
    id: '3',
    title: 'Night Call',
    artist: 'Kavinsky',
    album: 'OutRun',
    duration: '4:18',
    coverUrl: 'https://picsum.photos/seed/kavinsky/600/600',
    color: '#ff0055'
  },
  {
    id: '4',
    title: 'Endless Summer',
    artist: 'The Midnight',
    album: 'Endless Summer',
    duration: '6:45',
    coverUrl: 'https://picsum.photos/seed/midnight/600/600',
    color: '#ff9900'
  }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    title: 'Summer Vibes 2024',
    description: '24 Songs • Updated yesterday',
    songs: MOCK_SONGS,
    coverUrl: 'https://picsum.photos/seed/p1/400/400',
    updatedAt: 'Yesterday',
    pinned: true
  },
  {
    id: 'p2',
    title: 'Deep Focus / Coding',
    description: '52 Songs • Liked by you',
    songs: MOCK_SONGS,
    coverUrl: 'https://picsum.photos/seed/p2/400/400',
    updatedAt: '2 days ago',
    pinned: true
  },
  {
    id: 'p3',
    title: 'Road Trip 2024',
    description: '42 Songs • Updated yesterday',
    songs: MOCK_SONGS,
    coverUrl: 'https://picsum.photos/seed/p3/400/400',
    updatedAt: '3 days ago'
  },
  {
    id: 'p4',
    title: 'Late Night Lo-Fi',
    description: '120 Songs • Updated 1 week ago',
    songs: MOCK_SONGS,
    coverUrl: 'https://picsum.photos/seed/p4/400/400',
    updatedAt: '1 week ago'
  }
];

export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  albumArt: string;
  audioUrl: string;
  album: string;
  category: 'trending' | 'new' | 'popular';
  genre: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  songCount: number;
}
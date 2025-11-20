import { Song } from '@/types/song';

export async function fetchSongsFromiTunes(): Promise<Song[]> {
  const genres = ['rock', 'pop', 'electronic', 'jazz', 'alternative'];
  const allSongs: Song[] = [];

  for (const genre of genres) {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${genre}&entity=song&limit=20`
    );
    const data = await response.json();

    if (data.results) {
      const formattedSongs: Song[] = data.results.map((track: any, index: number) => ({
        id: track.trackId,
        title: track.trackName,
        artist: track.artistName,
        duration: Math.floor(track.trackTimeMillis / 1000),
        albumArt: track.artworkUrl100.replace('100x100', '300x300'),
        audioUrl: track.previewUrl,
        album: track.collectionName,
        category: index < 7 ? 'trending' : index < 14 ? 'new' : 'popular',
        genre: track.primaryGenreName,
      }));
      allSongs.push(...formattedSongs);
    }
  }

  return allSongs.sort(() => Math.random() - 0.5);
}
'use client';

import { useDispatch } from 'react-redux';
import { SongCard } from '@/components/music/SongCard';
import { SongCardSkeleton } from '@/components/music/SongCardSkeleton';
import { Song } from '@/types/song';
import { setCurrentTrack, setQueue } from '@/store/slices/playerSlice';

interface TrendingSectionProps {
  songs: Song[];
  isLoading: boolean;
  allSongs: Song[];
}

export function TrendingSection({ songs, isLoading, allSongs }: TrendingSectionProps) {
  const dispatch = useDispatch();

  const handlePlaySong = (song: Song) => {
    dispatch(setCurrentTrack(song));
    dispatch(setQueue(allSongs));
  };

  const trendingSongs = songs.filter((s) => s.category === 'trending').slice(0, 8);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">🔥 Trending Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SongCardSkeleton key={i} />)
          : trendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onClick={() => handlePlaySong(song)}
              />
            ))}
      </div>
    </section>
  );
}
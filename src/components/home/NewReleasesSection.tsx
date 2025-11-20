'use client';

import { useDispatch } from 'react-redux';
import { SongCard } from '@/components/music/SongCard';
import { SongCardSkeleton } from '@/components/music/SongCardSkeleton';
import { Song } from '@/types/song';
import { setCurrentTrack, setQueue } from '@/store/slices/playerSlice';

interface NewReleasesSectionProps {
  songs: Song[];
  isLoading: boolean;
  allSongs: Song[];
}

export function NewReleasesSection({ songs, isLoading, allSongs }: NewReleasesSectionProps) {
  const dispatch = useDispatch();

  const handlePlaySong = (song: Song) => {
    dispatch(setCurrentTrack(song));
    dispatch(setQueue(allSongs));
  };

  const newReleases = songs.filter((s) => s.category === 'new').slice(0, 8);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">🎵 New Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SongCardSkeleton key={i} />)
          : newReleases.map((song) => (
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
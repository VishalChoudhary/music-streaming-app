'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SongCard } from '@/components/music/SongCard';
import { Button } from '@/components/ui/button';
import { Song } from '@/types/song';
import { setCurrentTrack, setQueue } from '@/store/slices/playerSlice';

interface BrowseAllSectionProps {
  songs: Song[];
}

export function BrowseAllSection({ songs }: BrowseAllSectionProps) {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(12);

  const handlePlaySong = (song: Song) => {
    dispatch(setCurrentTrack(song));
    dispatch(setQueue(songs));
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, songs.length));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Browse All</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.slice(0, visibleCount).map((song) => (
          <SongCard key={song.id} song={song} onClick={() => handlePlaySong(song)} />
        ))}
      </div>

      {visibleCount < songs.length && (
        <div className="mt-8 text-center">
          <Button
            onClick={loadMore}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full"
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
'use client';

import { ArtistCard } from '@/components/music/ArtistCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Song, Artist } from '@/types/song';

interface ArtistsSectionProps {
  songs: Song[];
  isLoading: boolean;
}

export function ArtistsSection({ songs, isLoading }: ArtistsSectionProps) {
  const artists: Artist[] = songs.reduce((acc: Artist[], song) => {
    if (!acc.find((a) => a.name === song.artist)) {
      acc.push({
        id: song.artist,
        name: song.artist,
        image: song.albumArt,
        songCount: songs.filter((s) => s.artist === song.artist).length,
      });
    }
    return acc;
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">⭐ Popular Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-3" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))
          : artists.slice(0, 5).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
      </div>
    </section>
  );
}
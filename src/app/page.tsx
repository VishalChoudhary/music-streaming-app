'use client';

import { Header } from '@/components/layout/Header';
import { MusicPlayer } from '@/components/music/MusicPlayer';
import { TrendingSection } from '@/components/home/TrendingSection';
import { ArtistsSection } from '@/components/home/ArtistsSection';
import { NewReleasesSection } from '@/components/home/NewReleasesSection';
import { BrowseAllSection } from '@/components/home/BrowseAllSection';
import { useSongs } from '@/hooks/useSongs';

export default function Home() {
  const { data: songs = [], isLoading, error } = useSongs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pb-32 transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-500">Failed to load songs. Please try again.</p>
          </div>
        )}

        <TrendingSection songs={songs} isLoading={isLoading} allSongs={songs} />
        <ArtistsSection songs={songs} isLoading={isLoading} />
        <NewReleasesSection songs={songs} isLoading={isLoading} allSongs={songs} />
        <BrowseAllSection songs={songs} />
      </main>

      <MusicPlayer />
    </div>
  );
}
'use client';

import Image from 'next/image';
import { Artist } from '@/types/song';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="text-center group cursor-pointer">
      <div className="relative mb-3">
        <Image
          src={artist.image}
          alt={artist.name}
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded-full mx-auto transition-all duration-200 group-hover:scale-110"
        />
      </div>
      <h3 className="font-semibold text-white">{artist.name}</h3>
      <p className="text-sm text-gray-400">{artist.songCount} songs</p>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Song } from '@/types/song';
import { formatTime } from '@/lib/utils';

interface SongCardProps {
  song: Song;
  onClick: () => void;
}

export function SongCard({ song, onClick }: SongCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      onClick={onClick}
      className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 cursor-pointer transition-all duration-200 hover:scale-105 group"
    >
      <CardContent className="p-4">
        <div className="relative mb-3">
          {!imageError ? (
            <Image
              src={song.albumArt}
              alt={song.title}
              width={300}
              height={300}
              className="w-full aspect-square object-cover rounded-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full aspect-square bg-gray-700 rounded-md flex items-center justify-center">
              <Music className="w-12 h-12 text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
            <Play className="w-12 h-12 text-white" fill="white" />
          </div>
        </div>
        <h3 className="font-semibold text-white truncate" title={song.title}>
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate" title={song.artist}>
          {song.artist}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">{formatTime(song.duration)}</p>
          <p className="text-xs text-purple-400">{song.genre}</p>
        </div>
      </CardContent>
    </Card>
  );
}
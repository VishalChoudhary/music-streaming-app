'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { RootState } from '@/store';
import {
  togglePlayPause,
  playNext,
  playPrevious,
  updateTime,
  setDuration,
} from '@/store/slices/playerSlice';
import { formatTime } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, currentTime, duration, queue } = useSelector(
    (state: RootState) => state.player
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log('Playback failed:', e));
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log('Playback failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(updateTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickPosition / width) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      dispatch(updateTime(newTime));
    }
  };

  const handleEnded = () => {
    dispatch(playNext());
  };

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentIndex = queue.findIndex((s) => s.id === currentTrack.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3 z-50">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Image
            src={currentTrack.albumArt}
            alt={currentTrack.title}
            width={56}
            height={56}
            className="rounded object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold truncate">
              {currentTrack.title}
            </h4>
            <p className="text-sm text-gray-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => dispatch(playPrevious())}
              disabled={currentIndex <= 0}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white disabled:opacity-30"
            >
              <SkipBack className="w-5 h-5" fill="currentColor" />
            </Button>

            <Button
              onClick={() => dispatch(togglePlayPause())}
              size="icon"
              className="w-10 h-10 bg-white rounded-full hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-black" fill="black" />
              ) : (
                <Play className="w-5 h-5 text-black ml-0.5" fill="black" />
              )}
            </Button>

            <Button
              onClick={() => dispatch(playNext())}
              disabled={currentIndex >= queue.length - 1}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white disabled:opacity-30"
            >
              <SkipForward className="w-5 h-5" fill="currentColor" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={handleSeek}
              className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
            >
              <div
                className="h-full bg-white rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right spacer */}
        <div className="flex-1 hidden lg:block"></div>
      </div>
    </div>
  );
}
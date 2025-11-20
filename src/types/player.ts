import { Song } from './song';

export interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentTime: number;
  duration: number;
}
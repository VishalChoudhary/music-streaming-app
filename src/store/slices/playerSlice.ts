import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState } from '@/types/player';
import { Song } from '@/types/song';

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentTime: 0,
  duration: 0,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Song>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playNext: (state) => {
      const currentIndex = state.queue.findIndex(
        (s) => s.id === state.currentTrack?.id
      );
      if (currentIndex < state.queue.length - 1) {
        state.currentTrack = state.queue[currentIndex + 1];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    playPrevious: (state) => {
      const currentIndex = state.queue.findIndex(
        (s) => s.id === state.currentTrack?.id
      );
      if (currentIndex > 0) {
        state.currentTrack = state.queue[currentIndex - 1];
        state.isPlaying = true;
        state.currentTime = 0;
      }
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },
    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  togglePlayPause,
  playNext,
  playPrevious,
  setQueue,
  updateTime,
  setDuration,
} = playerSlice.actions;

export default playerSlice.reducer;
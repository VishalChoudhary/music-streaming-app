import { useQuery } from '@tanstack/react-query';
import { fetchSongsFromiTunes } from '@/lib/api';
import { Song } from '@/types/song';

export function useSongs() {
  return useQuery<Song[], Error>({
    queryKey: ['songs'],
    queryFn: fetchSongsFromiTunes,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: true,
  });
}
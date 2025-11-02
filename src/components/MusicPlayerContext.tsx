import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  source: 'internal' | 'sdcard';
  primaryColor?: string;
  secondaryColor?: string;
}

interface MusicPlayerState {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  darkMode: boolean;
  dominantColor: string;
  accentColor: string;
  isMinimized: boolean;
  isTransitioning: boolean;
}

interface MusicPlayerContextType extends MusicPlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  selectSong: (song: Song) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  extractColors: (imageUrl: string) => void;
  expandPlayer: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

// Mock song data with Material U colors
// Note: audioUrl is empty - to enable real audio playback, add actual audio file URLs here
// You can use Spotify preview URLs, SoundCloud links, or your own hosted audio files
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Falling Behind',
    artist: 'Laufey',
    album: 'Everything I Know About Love',
    duration: 186,
    coverUrl: 'https://images.unsplash.com/photo-1673732993073-695635eae308?w=400&h=400&fit=crop&crop=center',
    audioUrl: '', // Add your audio URL here to enable playback
    source: 'internal',
    primaryColor: '#8B7355',
    secondaryColor: '#F5E6D3'
  },
  {
    id: '2',
    title: 'The way things go',
    artist: 'beabadoobee',
    album: 'Beatopia',
    duration: 191,
    coverUrl: 'https://images.unsplash.com/photo-1611234688667-76b6d8fadd75?w=400&h=400&fit=crop&crop=center',
    audioUrl: '',
    source: 'sdcard',
    primaryColor: '#E85D75',
    secondaryColor: '#FFE4E9'
  },
  {
    id: '3',
    title: 'Soft Spot',
    artist: 'Keshi',
    album: 'GABRIEL',
    duration: 202,
    coverUrl: 'https://images.unsplash.com/photo-1628795743560-18d44cd5130e?w=400&h=400&fit=crop&crop=center',
    audioUrl: '',
    source: 'internal',
    primaryColor: '#6B9AC4',
    secondaryColor: '#E3F0FF'
  },
  {
    id: '4',
    title: 'A couple minutes',
    artist: 'Olivia Dean',
    album: 'Messy',
    duration: 214,
    coverUrl: 'https://images.unsplash.com/photo-1564267309507-a02f89e27c39?w=400&h=400&fit=crop&crop=center',
    audioUrl: '',
    source: 'sdcard',
    primaryColor: '#D4A373',
    secondaryColor: '#FFF4E6'
  },
  {
    id: '5',
    title: 'Superposition',
    artist: 'Daniel Caesar',
    album: 'Freudian',
    duration: 195,
    coverUrl: 'https://images.unsplash.com/photo-1759088009958-14e99324925d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '',
    source: 'internal',
    primaryColor: '#9B6B4F',
    secondaryColor: '#F0E5DC'
  }
];

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: mockSongs[0],
    playlist: mockSongs,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLooping: false,
    isShuffling: false,
    darkMode: false,
    dominantColor: mockSongs[0].primaryColor || '#6750A4',
    accentColor: mockSongs[0].secondaryColor || '#E8DEF8',
    isMinimized: false,
    isTransitioning: false
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      setState(prev => ({ ...prev, currentTime: Math.floor(audio.currentTime) }));
    });

    audio.addEventListener('loadedmetadata', () => {
      setState(prev => ({ ...prev, duration: Math.floor(audio.duration) }));
    });

    audio.addEventListener('ended', () => {
      if (state.isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && state.currentSong?.audioUrl) {
      audioRef.current.src = state.currentSong.audioUrl;
      if (state.isPlaying) {
        audioRef.current.play().catch(err => console.log('Audio playback failed:', err));
      }
    }
  }, [state.currentSong?.audioUrl]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying && state.currentSong?.audioUrl) {
        audioRef.current.play().catch(err => console.log('Audio playback failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [state.isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // Handle loop setting
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = state.isLooping;
    }
  }, [state.isLooping]);

  // Fallback timer for visual updates when no audio
  useEffect(() => {
    if (!state.currentSong?.audioUrl) {
      const interval = setInterval(() => {
        if (state.isPlaying && state.currentSong) {
          setState(prev => ({
            ...prev,
            currentTime: Math.min(prev.currentTime + 1, state.currentSong?.duration || 0)
          }));
          
          if (state.currentTime >= (state.currentSong?.duration || 0) - 1) {
            if (state.isLooping) {
              setState(prev => ({ ...prev, currentTime: 0 }));
            } else {
              nextSong();
            }
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.isPlaying, state.currentTime, state.currentSong?.duration, state.isLooping, state.currentSong?.audioUrl]);

  const extractColors = (imageUrl: string) => {
    // In a real app, this would use a color extraction library
    // For now, we'll use the predefined colors from the song data
    const song = state.currentSong;
    if (song?.primaryColor && song?.secondaryColor) {
      setState(prev => ({
        ...prev,
        dominantColor: song.primaryColor!,
        accentColor: song.secondaryColor!
      }));
    }
  };

  const play = () => {
    setState(prev => ({ ...prev, isPlaying: true, isMinimized: true }));
  };

  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    setState(prev => ({ 
      ...prev, 
      isPlaying: !prev.isPlaying,
      // Minimize when starting playback
      isMinimized: !prev.isPlaying ? true : prev.isMinimized
    }));
  };

  const nextSong = () => {
    let nextIndex;
    if (state.isShuffling) {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (currentSongIndex + 1) % state.playlist.length;
    }
    
    setCurrentSongIndex(nextIndex);
    const nextSong = state.playlist[nextIndex];
    setState(prev => ({
      ...prev,
      currentSong: nextSong,
      currentTime: 0,
      dominantColor: nextSong.primaryColor || '#6750A4',
      accentColor: nextSong.secondaryColor || '#E8DEF8'
    }));
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? state.playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    const prevSong = state.playlist[prevIndex];
    setState(prev => ({
      ...prev,
      currentSong: prevSong,
      currentTime: 0,
      dominantColor: prevSong.primaryColor || '#6750A4',
      accentColor: prevSong.secondaryColor || '#E8DEF8'
    }));
  };

  const selectSong = (song: Song) => {
    const index = state.playlist.findIndex(s => s.id === song.id);
    setCurrentSongIndex(index);
    setState(prev => ({
      ...prev,
      currentSong: song,
      currentTime: 0,
      isPlaying: false,
      dominantColor: song.primaryColor || '#6750A4',
      accentColor: song.secondaryColor || '#E8DEF8'
    }));
  };

  const toggleLoop = () => {
    setState(prev => ({ ...prev, isLooping: !prev.isLooping }));
  };

  const toggleShuffle = () => {
    setState(prev => ({ ...prev, isShuffling: !prev.isShuffling }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const seekTo = (time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const expandPlayer = () => {
    setState(prev => ({ ...prev, isMinimized: false, isPlaying: false, isTransitioning: true }));
    
    // After transition completes (1000ms), set isTransitioning to false
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 1000);
  };

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const contextValue: MusicPlayerContextType = {
    ...state,
    play,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    selectSong,
    toggleLoop,
    toggleShuffle,
    toggleDarkMode,
    setVolume,
    seekTo,
    extractColors,
    expandPlayer
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}
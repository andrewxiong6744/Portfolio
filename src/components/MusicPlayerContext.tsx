import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

// 🔊 Background ambient sound setup
const backgroundAudio = new Audio('/music/Bird Chirping Sound Effect.mp3');
backgroundAudio.loop = true;
backgroundAudio.volume = 0.15; // 👈 very quiet ambient volume

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
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

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

// helper to make URLs for files with spaces
const cover = (name: string) => `/covers/${encodeURIComponent(name)}`;
const audio = (name: string) => `/music/${encodeURIComponent(name)}`;

// IMPORTANT: these names must match what’s in your screenshot
const mockSongs: Song[] = [
  {
    id: "1",
    title: "A Couple Minutes",
    artist: "Olivia Dean",
    album: "The Art of Loving",
    duration: 212,
    // was: /public/covers/...
    coverUrl: cover("Olivia Dean Album Cover.png"),
    // was: /public/music/...
    audioUrl: audio("Olivia Dean - A Couple Minutes (Lyric Video).mp3"),
    primaryColor: "#404040",
    secondaryColor: "#BFBFBF",
  },
  {
    id: "2",
    title: "the way things go",
    artist: "beabadoobee",
    album: "Beatopia",
    duration: 203,
    coverUrl: cover("Beabadoobee Album Cover.jpeg"),
    audioUrl: audio("beabadoobee - the way things go.mp3"),
    primaryColor: "#BEBDBF",
    secondaryColor: "#A58169",
  },
  {
    id: "3",
    title: "Soft Spot",
    artist: "keshi",
    album: "GABRIEL",
    duration: 204,
    coverUrl: cover("Keshi Album Cover.jpeg"),
    audioUrl: audio("keshi - Soft Spot (Official Music Video).mp3"),
    primaryColor: "#262621",
    secondaryColor: "#BFBAA8",
  },
  {
    id: "4",
    title: "Falling Behind",
    artist: "Laufey",
    album: "Everything I Know About Love",
    duration: 174,
    coverUrl: cover("Laufey Album Cover.jpeg"),
    audioUrl: audio("Laufey - Falling Behind (Official Audio).mp3"),
    primaryColor: "#939848",
    secondaryColor: "#324F17",
  },
  {
    id: "5",
    title: "Blessed",
    artist: "Daniel Caesar",
    album: "Freudian",
    duration: 241,
    coverUrl: cover("Daniel Caesar Album Cover.avif"),
    // I saw “Blessed.mp3” in your music folder
    audioUrl: audio("Blessed.mp3"),
    primaryColor: "#b7ccd4",
    secondaryColor: "#78a2b7",
  },
];

export function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: mockSongs[0],
    playlist: mockSongs,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    isLooping: false,
    isShuffling: false,
    darkMode: false,
    dominantColor: mockSongs[0].primaryColor || "#6750A4",
    accentColor: mockSongs[0].secondaryColor || "#E8DEF8",
    isMinimized: false,
    isTransitioning: false,
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // create audio element once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    backgroundAudio.play().catch(err => console.log('Ambient audio failed to play:', err));

    const onTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: Math.floor(audio.currentTime),
      }));
    };

    const onLoaded = () => {
      setState((prev) => ({
        ...prev,
        duration: Math.floor(audio.duration || 0),
      }));
    };

    const onEnded = () => {
      if (state.isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when song changes, load its src
  useEffect(() => {
  if (!audioRef.current || !state.currentSong?.audioUrl) return;

  const audio = audioRef.current;
  audio.src = state.currentSong.audioUrl;
  audio.load();

  // auto-play new song if already playing
  if (state.isPlaying) {
    audio.play().catch((err) => console.log("Audio playback failed:", err));
  }
}, [state.currentSong?.audioUrl]); // ✅ removed state.isPlaying here
  useEffect(() => {
  if (!audioRef.current) return;
  const audio = audioRef.current;

  if (state.isPlaying) {
    audio.play().catch((err) => console.log("Audio playback failed:", err));
  } else {
    audio.pause();
  }
}, [state.isPlaying]);

  // sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

  // sync loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = state.isLooping;
    }
  }, [state.isLooping]);

  const play = () => {
    setState((prev) => ({ ...prev, isPlaying: true, isMinimized: true }));
  };

  const pause = () => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      isMinimized: !prev.isPlaying ? true : prev.isMinimized,
    }));
  };

  const nextSong = () => {
    let nextIndex;
    if (state.isShuffling) {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (currentSongIndex + 1) % state.playlist.length;
    }

    const next = state.playlist[nextIndex];
    setCurrentSongIndex(nextIndex);
    setState((prev) => ({
      ...prev,
      currentSong: next,
      currentTime: 0,
      dominantColor: next.primaryColor || "#6750A4",
      accentColor: next.secondaryColor || "#E8DEF8",
    }));
  };

  const previousSong = () => {
    const prevIndex =
      currentSongIndex === 0
        ? state.playlist.length - 1
        : currentSongIndex - 1;
    const prevSong = state.playlist[prevIndex];

    setCurrentSongIndex(prevIndex);
    setState((prev) => ({
      ...prev,
      currentSong: prevSong,
      currentTime: 0,
      dominantColor: prevSong.primaryColor || "#6750A4",
      accentColor: prevSong.secondaryColor || "#E8DEF8",
    }));
  };

  const selectSong = (song: Song) => {
    const index = state.playlist.findIndex((s) => s.id === song.id);
    setCurrentSongIndex(index);
    setState((prev) => ({
      ...prev,
      currentSong: song,
      currentTime: 0,
      isPlaying: false,
      dominantColor: song.primaryColor || "#6750A4",
      accentColor: song.secondaryColor || "#E8DEF8",
    }));
  };

  const toggleLoop = () => {
    setState((prev) => ({ ...prev, isLooping: !prev.isLooping }));
  };

  const toggleShuffle = () => {
    setState((prev) => ({ ...prev, isShuffling: !prev.isShuffling }));
  };

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setVolume = (volume: number) => {
    setState((prev) => ({ ...prev, volume }));
  };

  const seekTo = (time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const extractColors = (_imageUrl: string) => {
    const song = state.currentSong;
    if (song?.primaryColor && song?.secondaryColor) {
      setState((prev) => ({
        ...prev,
        dominantColor: song.primaryColor!,
        accentColor: song.secondaryColor!,
      }));
    }
  };

  const expandPlayer = () => {
    setState((prev) => ({
      ...prev,
      isMinimized: false,
      isPlaying: false,
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState((prev) => ({ ...prev, isTransitioning: false }));
    }, 1000);
  };

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    expandPlayer,
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
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}

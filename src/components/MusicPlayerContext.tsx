import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

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

// ---------- Helpers for public/ assets (spaces, parentheses, etc.) ----------
const cover = (name: string) => `/covers/${encodeURIComponent(name)}`;
const audio = (name: string) => `/music/${encodeURIComponent(name)}`;

// ---------- Your songs (ensure filenames match exactly in /public) ----------
const mockSongs: Song[] = [
  {
    id: "1",
    title: "A Couple Minutes",
    artist: "Olivia Dean",
    album: "The Art of Loving",
    duration: 212,
    coverUrl: cover("Olivia Dean Album Cover.png"),
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
    audioUrl: audio("Blessed.mp3"),
    primaryColor: "#b7ccd4",
    secondaryColor: "#78a2b7",
  },
];

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: mockSongs[0],
    playlist: mockSongs,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.20, // 👈 default volume = 50%
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

  // ---------- Ambient birds (lazy-init on first user gesture) ----------
  const AMBIENT_SRC = audio("Bird Chirping Sound Effect.mp3");
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  function startAmbient() {
    if (!ambientRef.current) {
      const a = new Audio(AMBIENT_SRC);
      a.loop = true;
      a.volume = 0.75; // quiet ambience
      ambientRef.current = a;
    }
    ambientRef.current
      .play()
      .catch(() => {
        // Autoplay blocked; will try again on next user gesture
      });
  }

  // Kick ambient off on first user interaction
  useEffect(() => {
    const kick = () => {
      startAmbient();
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
    window.addEventListener("pointerdown", kick);
    window.addEventListener("keydown", kick);
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current.src = "";
        ambientRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Slightly duck ambience while main music plays
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.volume = state.isPlaying ? 0.06 : 0.15;
    }
  }, [state.isPlaying]);

  // ---------- Create main <audio> once ----------
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

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

  // ---------- Load a new song ONLY when the source changes ----------
  useEffect(() => {
    if (!audioRef.current || !state.currentSong?.audioUrl) return;

    const audio = audioRef.current;
    audio.src = state.currentSong.audioUrl;
    audio.load();

    // If we were playing, continue with the new track
    if (state.isPlaying) {
      audio.play().catch((err) => console.log("Audio playback failed:", err));
    }
  }, [state.currentSong?.audioUrl]); // ✅ NOT dependent on isPlaying

  // ---------- Play/Pause without reloading the track ----------
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (state.isPlaying) {
      audio.play().catch((err) => console.log("Audio playback failed:", err));
    } else {
      audio.pause();
    }
  }, [state.isPlaying]);

  // ---------- Sync volume & loop ----------
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume;
  }, [state.volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = state.isLooping;
  }, [state.isLooping]);

  // ---------- Controls ----------
  const play = () => {
    startAmbient(); // ensure ambience starts after user action
    setState((prev) => ({ ...prev, isPlaying: true, isMinimized: true }));
  };

  const pause = () => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    startAmbient(); // also start ambience on toggle if needed
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
    if (audioRef.current) audioRef.current.currentTime = time;
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
      isPlaying: false, // keep as your original; change to prev.isPlaying to avoid pausing on expand
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState((prev) => ({ ...prev, isTransitioning: false }));
    }, 1000);
  };

  // ---------- Dark mode class sync ----------
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

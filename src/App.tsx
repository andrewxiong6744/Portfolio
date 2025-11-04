// src/App.tsx
import React, { useState } from "react";
import {
  MusicPlayerProvider,
  useMusicPlayer,
} from "./components/MusicPlayerContext";
import { Gramophone } from "./components/Gramophone";
import { PlayerControls } from "./components/PlayerControls";
import { SettingsPanel } from "./components/SettingsPanel";
import { MusicLibrary } from "./components/MusicLibrary";
import { SpotifyPlaylist } from "./components/SpotifyPlaylist";
import { PortfolioContent } from "./components/PortfolioContent";

// ✅ ADD THESE imports (pages + transition)
import { AboutPage } from "./components/pages/AboutPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { MusicPage } from "./components/pages/MusicPage";
import { OrigamiPage as GalleryPage } from "./components/pages/OrigamiPage"; // rename if you prefer
import { MatchaPage as InterestsPage } from "./components/pages/MatchaPage";
import { CatPage as EasterEggPage } from "./components/pages/CatPage";
import { PageTransition } from "./components/PageTransition";

type PageType = 'home' | 'about' | 'interests' | 'gallery' | 'music' | 'projects' | 'easter-egg';

function AppContent() {
  const {
    dominantColor,
    accentColor,
    isMinimized,
    minimizePlayer,
    // ...other music player bits if needed
  } = useMusicPlayer();

  // ✅ ADD page/transition state
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [transitionColor, setTransitionColor] = useState<string>('#6366f1');

  // ✅ ADD navigate helper (called from PortfolioContent)
  const navigateTo = (
    page: PageType,
    pos: { x: number; y: number },
    color: string
  ) => {
    setClickPosition(pos);
    setTransitionColor(color);
    minimizePlayer(); // optional: mimic Figma export minimizing player
    // slight delay feels nicer with the expanding circle
    setTimeout(() => setCurrentPage(page), 50);
    setTimeout(() => setClickPosition(null), 100);
  };

  const handleBackToHome = () => {
    setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTransitionColor('#6366f1');
    setTimeout(() => setCurrentPage('home'), 50);
    setTimeout(() => setClickPosition(null), 100);
  };

  // ✅ Render whatever page we're on
  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <AboutPage onBack={handleBackToHome} />;
      case 'interests': return <InterestsPage onBack={handleBackToHome} />;
      case 'gallery': return <GalleryPage onBack={handleBackToHome} />;
      case 'music': return <MusicPage onBack={handleBackToHome} />;
      case 'projects': return <ProjectsPage onBack={handleBackToHome} />;
      case 'easter-egg': return <EasterEggPage onBack={handleBackToHome} />;
      default:
        return (
          // ✅ Pass onNavigate down so clicks can trigger transitions
          <PortfolioContent
            onNavigate={(page, pos, color) =>
              navigateTo(page as PageType, pos, color)
            }
          />
        );
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* ... your existing background / player chrome ... */}

      {/* ✅ Wrap the page in PageTransition just like the Figma build */}
      <div className="absolute inset-0 z-0">
        <PageTransition
          pageKey={currentPage}
          transitionColor={transitionColor}
          clickPosition={clickPosition}
        >
          {renderPage()}
        </PageTransition>
      </div>

      {/* ... your player, controls, settings, etc. ... */}
    </div>
  );
}

export default function App() {
  return (
    <MusicPlayerProvider>
      <AppContent />
    </MusicPlayerProvider>
  );
}

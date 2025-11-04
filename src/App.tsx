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

import { AboutPage } from "./components/pages/AboutPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { MusicPage } from "./components/pages/MusicPage";
import { OrigamiPage as GalleryPage } from "./components/pages/OrigamiPage";
import { MatchaPage as InterestsPage } from "./components/pages/MatchaPage";
import { CatPage as EasterEggPage } from "./components/pages/CatPage";
import { PageTransition } from "./components/PageTransition";

type PageType =
  | "home"
  | "about"
  | "interests"
  | "gallery"
  | "music"
  | "projects"
  | "easter-egg";

function AppContent() {
  const {
    isMinimized,
    minimizePlayer,
    expandPlayer,
  } = useMusicPlayer();

  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [transitionColor, setTransitionColor] = useState<string>("#6366f1");

  const navigateTo = (
    page: PageType,
    pos: { x: number; y: number },
    color: string
  ) => {
    setClickPosition(pos);
    setTransitionColor(color);
    // optional behavior from your Figma build:
    minimizePlayer();
    setTimeout(() => setCurrentPage(page), 50);
    setTimeout(() => setClickPosition(null), 100);
  };

  const handleBackToHome = () => {
    setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setTransitionColor("#6366f1");
    setTimeout(() => setCurrentPage("home"), 50);
    setTimeout(() => setClickPosition(null), 100);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage onBack={handleBackToHome} />;
      case "interests":
        return <InterestsPage onBack={handleBackToHome} />;
      case "gallery":
        return <GalleryPage onBack={handleBackToHome} />;
      case "music":
        return <MusicPage onBack={handleBackToHome} />;
      case "projects":
        return <ProjectsPage onBack={handleBackToHome} />;
      case "easter-egg":
        return <EasterEggPage onBack={handleBackToHome} />;
      default:
        return (
          <PortfolioContent
            onNavigate={(page, pos, color) =>
              navigateTo(page as PageType, pos, color)
            }
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Page content with transitions BELOW the player */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <PageTransition
          pageKey={currentPage}
          transitionColor={transitionColor}
          clickPosition={clickPosition}
        >
          {/* allow the page itself to receive input */}
          <div className="pointer-events-auto">
            {renderPage()}
          </div>
        </PageTransition>
      </div>

      {/* Player ABOVE transitions */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Show a small pill to re-open when minimized */}
        {isMinimized ? (
          <button
            onClick={expandPlayer}
            className="rounded-full px-3 py-2 bg-black/70 text-white text-sm shadow-md"
          >
            Open Player
          </button>
        ) : (
          <div className="relative">
            <Gramophone />
            <div className="mt-2">
              <PlayerControls />
            </div>
          </div>
        )}
      </div>

      {/* Optional panels (also above transitions) */}
      <div className="z-40 relative">
        <SettingsPanel />
        <MusicLibrary />
        <SpotifyPlaylist />
      </div>
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

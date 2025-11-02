import React from "react";
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

function AppContent() {
  const {
    dominantColor,
    accentColor,
    currentSong,
    isMinimized,
    expandPlayer,
    isTransitioning,
  } = useMusicPlayer();

  return (
    <div
      className="min-h-screen transition-all duration-1000 relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Dynamic background based on album art - Material U style */}
      <div
        className="fixed inset-0 opacity-5 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${dominantColor}20 0%, ${accentColor}10 50%, transparent 100%)`,
        }}
      />

      {/* Blurred album art background for transparency effect */}
      {currentSong?.coverUrl && (
        <div
          className="fixed inset-0 opacity-8 blur-3xl scale-150 transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentSong.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Material U gradient overlay for depth */}
      <div
        className="fixed inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${dominantColor}05 0%, ${accentColor}03 100%)`,
        }}
      />

      {/* Secondary background pattern for Material U texture */}
      <div
        className="fixed inset-0 opacity-3 transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, ${dominantColor}15 0%, transparent 50%)`,
          backgroundSize: "400px 400px",
        }}
      />

      {/* Portfolio Content - Always visible as background */}
      <div className="relative z-0">
        <PortfolioContent />
      </div>

      {/* Music Player Container - Transitions from center to top-right */}
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center group ${isMinimized ? "pointer-events-none" : ""}`}
      >
        <div
          className={`
            w-full h-full transition-all duration-[1000ms] ease-linear
          `}
          style={{
            transform: isMinimized
              ? "translate(calc(50vw - 120px), calc(-50vh + 210px)) scale(0.35)"
              : "translate(0, 0) scale(1)",
            transformOrigin: "center center",
          }}
        >
          {/* Hover glow effect for minimized player */}
          {isMinimized && (
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500 pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${dominantColor}60 0%, ${accentColor}40 50%, transparent 100%)`,
                transform: "scale(3)",
              }}
            />
          )}

          {/* Hover scale effect for minimized player */}
          <div
            className={`
              w-full h-full transition-transform duration-300
              ${isMinimized ? "group-hover:scale-110" : ""}
            `}
            style={{
              transformOrigin: "center center",
            }}
          >
            <div className="w-full h-full">
              {/* Main Player Content */}
              <div
                className={`
                  relative flex flex-col items-center justify-center p-6 space-y-8 transition-all duration-[1000ms]
                  ${isMinimized ? "min-h-0 opacity-90 pointer-events-auto cursor-pointer" : "min-h-screen opacity-100"}
                `}
                onClick={isMinimized ? expandPlayer : undefined}
                style={{
                  backgroundColor:
                    isMinimized || isTransitioning
                      ? "transparent"
                      : "rgba(0, 0, 0, 0.4)",
                  backdropFilter:
                    isMinimized || isTransitioning
                      ? "none"
                      : "blur(20px)",
                  transition:
                    "background-color 300ms ease-out, backdrop-filter 300ms ease-out",
                }}
              >
                {/* Gramophone Section with enhanced ambient lighting */}
                <div className="relative flex-shrink-0">
                  {/* Enhanced ambient glow effect */}
                  <div
                    className="absolute inset-0 rounded-full opacity-15 blur-2xl transition-all duration-1000 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${dominantColor}40 0%, ${accentColor}20 70%, transparent 100%)`,
                      width: "500px",
                      height: "500px",
                      transform: "translate(-50%, -50%)",
                      left: "50%",
                      top: "50%",
                    }}
                  />
                  <Gramophone />
                </div>

                {/* Player Controls Section with glass morphism effect */}
                <div className="w-full max-w-md relative">
                  {/* Glass morphism background */}
                  <div
                    className="absolute inset-0 rounded-3xl backdrop-blur-sm transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}10 0%, ${dominantColor}05 100%)`,
                      border: `1px solid ${accentColor}20`,
                    }}
                  />
                  <div className="relative z-10 p-6">
                    <PlayerControls />
                  </div>
                </div>

                {/* Spotify Playlist Button - Prominent and Close to Player - Hidden when minimized */}
                {!isMinimized && <SpotifyPlaylist />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating color accent elements for Material U feel */}
      <div
        className="fixed top-20 left-20 w-32 h-32 rounded-full opacity-5 blur-2xl pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${dominantColor} 0%, transparent 70%)`,
        }}
      />
      <div
        className="fixed bottom-20 right-20 w-24 h-24 rounded-full opacity-5 blur-2xl pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Responsive design adjustments */}
      <style jsx>{`
        @media (max-height: 700px) {
          .min-h-screen {
            padding: 1rem;
          }
          .space-y-8 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .w-96 {
            width: 16rem;
          }
          .h-96 {
            height: 16rem;
          }
          .space-y-8 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1rem;
          }
        }

        @media (max-width: 390px) {
          .w-96 {
            width: 14rem;
          }
          .h-96 {
            height: 14rem;
          }
        }

        /* Enhanced Material U animations */
        @keyframes floating {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        .floating-element {
          animation: floating 6s ease-in-out infinite;
        }

        /* Minimized player pulse animation on hover */
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .group:hover .group-hover\\:opacity-100 {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Custom scrollbar for Material U consistency */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${dominantColor}30;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${dominantColor}50;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
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
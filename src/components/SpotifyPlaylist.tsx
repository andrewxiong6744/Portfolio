import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { Music2, Play, Pause } from 'lucide-react';
import { useMusicPlayer } from './MusicPlayerContext';
import { ScrollArea } from './ui/scroll-area';

export function SpotifyPlaylist() {
  const { dominantColor, accentColor, playlist, currentSong, selectSong, isPlaying } = useMusicPlayer();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSongClick = (song: any) => {
    selectSong(song);
    // Optionally close the sheet after selection
    // setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="w-full max-w-md group">
          <div className="relative">
            {/* Enhanced Glow effect */}
            <div 
              className="absolute inset-0 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-500"
              style={{
                background: `radial-gradient(ellipse, ${dominantColor} 0%, ${accentColor} 100%)`,
                transform: 'scale(1.1)'
              }}
            />
            
            {/* Prominent Button with Text */}
            <Button
              size="lg"
              className="w-full h-16 rounded-2xl shadow-2xl backdrop-blur-md border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110 relative group-hover:border-3 px-8"
              style={{
                backgroundColor: `${dominantColor}25`,
                borderColor: `${dominantColor}25`,
                color: dominantColor
              }}
            >
              <div className="flex items-center justify-center gap-4 w-full">
                <Music2 className="w-7 h-7 animate-pulse" />
                <div className="flex flex-col items-start">
                  <span className="text-base">Choose a Song</span>
                  <span className="text-xs opacity-70">{playlist.length} tracks available</span>
                </div>
              </div>
            </Button>
            
            {/* Subtle arrow indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <div 
                className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent animate-bounce"
                style={{
                  borderBottomColor: accentColor
                }}
              />
            </div>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] p-0 border-l-2 bg-background"
        style={{
          borderColor: `${accentColor}60`
        }}
      >
        <div className="h-full flex flex-col">
          <SheetHeader 
            className="p-6 pb-4 border-b"
            style={{
              borderColor: `${accentColor}50`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${dominantColor}40`
                  }}
                >
                  <Music2 
                    className="w-5 h-5" 
                    style={{ color: dominantColor }}
                  />
                </div>
                <div>
                  <SheetTitle className="text-xl">Playlist</SheetTitle>
                  <SheetDescription>
                    {playlist.length} songs available
                  </SheetDescription>
                </div>
              </div>
            </div>
            <SheetDescription>
              {playlist.length} songs • Click to play
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {playlist.map((song, index) => {
                const isCurrentSong = currentSong?.id === song.id;
                
                return (
                  <div
                    key={song.id}
                    onClick={() => handleSongClick(song)}
                    className="group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: isCurrentSong 
                        ? `${dominantColor}40` 
                        : `${dominantColor}15`,
                      border: isCurrentSong 
                        ? `1px solid ${accentColor}60` 
                        : `1px solid ${accentColor}30`
                    }}
                  >
                    {/* Album Art */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={song.coverUrl}
                        alt={song.album}
                        className="w-12 h-12 rounded object-cover"
                      />
                      {isCurrentSong && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/40 rounded"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                          ) : (
                            <Play className="w-5 h-5 text-white" />
                          )}
                        </div>
                      )}
                      {!isCurrentSong && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Play className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                      <p 
                        className="truncate"
                        style={{
                          color: isCurrentSong ? dominantColor : 'inherit',
                          fontWeight: isCurrentSong ? '600' : '500'
                        }}
                      >
                        {song.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {song.artist}
                      </p>
                    </div>

                    {/* Duration and Source */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${song.source === 'internal' ? dominantColor : accentColor}15`,
                          color: song.source === 'internal' ? dominantColor : accentColor
                        }}
                      >
                        {song.source === 'internal' ? 'Internal' : 'SD Card'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(song.duration)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div 
            className="p-4 border-t text-center"
            style={{
              borderColor: `${accentColor}50`
            }}
          >
            <p 
              className="text-xs"
              style={{ color: `${dominantColor}80` }}
            >
              Material U Music Player
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

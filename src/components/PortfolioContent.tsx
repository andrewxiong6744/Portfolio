import React from 'react';
import { useMusicPlayer } from './MusicPlayerContext';
import { Github, Linkedin, Mail, Code2, Palette, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import titleImage from 'figma:asset/315b07623e8dd4135f3df0d6c69bbfe2e1cd7794.png';

export function PortfolioContent() {
  const { dominantColor, accentColor } = useMusicPlayer();

  return (
    <div className="min-h-screen">
      {/* Full Page Interactive Title Image */}
      <div className="relative w-full h-screen">
        <ImageWithFallback
          src={titleImage}
          alt="Portfolio Title"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

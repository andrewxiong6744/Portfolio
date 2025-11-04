import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface MatchaPageProps { onBack: () => void; }
export function MatchaPage({ onBack }: MatchaPageProps) {
  // (keep the JSX body the same)
}

export function MusicPage({ onBack }: MusicPageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          onClick={onBack}
          variant="ghost"
          className="mb-8 hover:bg-white/50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
          <h1 className="mb-8 text-cyan-600">Music</h1>
          <div className="space-y-6">
            <p>
              Share your musical journey here! Whether you're a musician, music producer, 
              or simply want to showcase your favorite playlists and musical influences.
            </p>
            <p>
              This is the perfect place to highlight your relationship with music.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

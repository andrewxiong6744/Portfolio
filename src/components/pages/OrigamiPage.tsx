import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface OrigamiPageProps { onBack: () => void; }

export function OrigamiPage({ onBack }: OrigamiPageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-100 p-8 overflow-auto">
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
          <h1 className="mb-8 text-pink-600">Gallery</h1>
          <div className="space-y-6">
            <p>
              This is your gallery section where you can showcase your photography, 
              artwork, design work, or any visual content you'd like to display.
            </p>
            <p>
              Create a beautiful collection of images that represent your creative vision!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

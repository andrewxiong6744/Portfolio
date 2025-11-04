import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-8 overflow-auto">
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
          <h1 className="mb-8 text-rose-600">About Me</h1>
          <div className="space-y-6">
            <p>
              Welcome to my portfolio! This is where you can learn more about who I am, 
              my background, and what drives me.
            </p>
            <p>
              Add your personal story, skills, experiences, and anything else you'd like 
              visitors to know about you here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

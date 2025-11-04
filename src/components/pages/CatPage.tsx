import React from 'react';
import { ArrowLeft, Cat } from 'lucide-react';
import { Button } from '../ui/button';

interface CatPageProps { onBack: () => void; }

export function CatPage({ onBack }: CatPageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8 overflow-auto">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl text-center">
          <div className="flex justify-center mb-6">
            <Cat className="w-24 h-24 text-orange-500 animate-bounce" />
          </div>
          <h1 className="mb-8 text-orange-600">Meow! 🐱</h1>
          <div className="space-y-6">
            <p>
              You found the secret cat page! This is a fun easter egg for curious visitors.
            </p>
            <p>
              Add anything fun, quirky, or unexpected here. Maybe some cat facts, 
              a hidden message, or a fun interactive element!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

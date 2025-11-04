import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface ProjectsPageProps {
  onBack: () => void;
}

export function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8 overflow-auto">
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
          <h1 className="mb-8 text-purple-600">Projects</h1>
          <div className="space-y-6">
            <p>
              Showcase your professional work, personal projects, case studies, 
              and any other work you're proud of here.
            </p>
            <p>
              This is your opportunity to demonstrate your skills, creativity, 
              and problem-solving abilities through your portfolio of work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

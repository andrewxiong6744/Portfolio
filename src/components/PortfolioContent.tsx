import React, { useState } from "react";
import svgPaths from "../imports/svg-sofui92bd4";
import imgGeneratedImageNovember012025824Pm1 from "@/assets/frame1.png";


// Interactive outline component with hover effects
interface InteractiveOutlineProps {
  children: React.ReactNode;
  glowColor?: string;
  onClick?: () => void;
  className?: string;
}

function InteractiveOutline({ children, glowColor = "#ffffff", onClick, className = "" }: InteractiveOutlineProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group cursor-pointer transition-transform duration-300 origin-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-60 blur-2xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor}30 0%, ${glowColor}15 50%, transparent 100%)`,
          transform: 'scale(1.5)',
        }}
      />
      
      {children}
    </div>
  );
}

function NameOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#ff6b6b"
      onClick={onClick}
      className="absolute h-[274px] left-[196px] top-[84px] w-[208.05px]"
    >
      <div className="absolute bottom-0 left-0 right-[-5.8%] top-[-4.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 286">
          <g id="Name Outline">
            <path d={svgPaths.p23352a80} fill="white" id="Line 1" className="group-hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
            <path d={svgPaths.p3611dc00} fill="white" id="Line 2" className="group-hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
            <path d={svgPaths.p3cbcac80} fill="white" id="Line 3" className="group-hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
            <path d={svgPaths.p1d1c6300} fill="white" id="Line 4" className="group-hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function MatchaOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#6ddb6d"
      onClick={onClick}
      className="absolute h-[202.318px] left-[140.35px] top-[671px] w-[281.436px]"
    >
      <div className="absolute inset-[-3.29%_-0.96%_-3.17%_-2.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 216">
          <g id="Matcha Outline">
            <path d={svgPaths.p116f5c00} fill="white" id="Vector 1" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
            <path d={svgPaths.p2b096d80} fill="white" id="Vector 2" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
            <path d={svgPaths.p3da9d700} fill="white" id="Vector 3" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
            <path d={svgPaths.pa18c800} fill="white" id="Vector 6" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
            <path d={svgPaths.p32699540} fill="white" id="Vector 7" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
            <path d={svgPaths.p2faab080} fill="white" id="Vector 8" className="group-hover:drop-shadow-[0_0_8px_rgba(109,219,109,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function FlowerOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#ff69b4"
      onClick={onClick}
      className="absolute h-[260.111px] left-[877px] top-[541px] w-[213.665px]"
    >
      <div className="absolute inset-[-1.85%_-3.53%_-2.12%_-2.81%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 228 271">
          <g id="Flower Outline">
            <path d={svgPaths.p38ea500} fill="white" id="Vector 9" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
            <path d={svgPaths.p37ad8780} fill="white" id="Vector 10" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
            <path d={svgPaths.pbedc300} fill="white" id="Vector 11" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
            <path d={svgPaths.p1130fc00} fill="white" id="Vector 12" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
            <path d={svgPaths.p31325a00} fill="white" id="Vector 14" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
            <path d={svgPaths.p2dd8c180} fill="white" id="Vector 15" className="group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function MusicOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#4ecdc4"
      onClick={onClick}
      className="absolute h-[542.228px] left-[1020.24px] top-[202.5px] w-[442.895px]"
    >
      <div className="absolute inset-[-0.9%_-0.01%_-0.19%_-0.32%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 445 549">
          <g id="Music Outline">
            <path d={svgPaths.p7c74d00} fill="white" id="Vector 16" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p2ed5c800} fill="white" id="Vector 18" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p3d72ea80} fill="white" id="Vector 20" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p460cf72} fill="white" id="Vector 21" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p1c428900} fill="white" id="Vector 19" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p14eda200} fill="white" id="Vector 24" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.pacfcd80} fill="white" id="Vector 25" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
            <path d={svgPaths.p2c124d00} fill="white" id="Vector 17" className="group-hover:drop-shadow-[0_0_8px_rgba(78,205,196,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function ProjectsOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#7b68ee"
      onClick={onClick}
      className="absolute h-[331.11px] left-[799.66px] top-[74.84px] w-[392.228px]"
    >
      <div className="absolute inset-[-1.75%_-1.22%_-1.04%_-1.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 404 341">
          <g id="Projects Outline">
            <path d={svgPaths.pc32fc00} fill="white" id="Vector 28" className="group-hover:drop-shadow-[0_0_8px_rgba(123,104,238,0.8)]" />
            <path d={svgPaths.p10111600} fill="white" id="Vector 26" className="group-hover:drop-shadow-[0_0_8px_rgba(123,104,238,0.8)]" />
            <path d={svgPaths.p2df0f900} fill="white" id="Vector 27" className="group-hover:drop-shadow-[0_0_8px_rgba(123,104,238,0.8)]" />
            <path d={svgPaths.p1671e628} fill="white" id="Vector 29" className="group-hover:drop-shadow-[0_0_8px_rgba(123,104,238,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

// Interactive Cat Outline
function CatOutline({ onClick }: { onClick?: () => void }) {
  return (
    <InteractiveOutline 
      glowColor="#ffa500"
      onClick={onClick}
      className="absolute h-[74.974px] left-[554.12px] top-[477.89px] w-[71.607px]"
    >
      <div className="absolute bottom-0 left-0 right-[-9.95%] top-[-7.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 81">
          <g id="Cat Outline">
            <path d={svgPaths.pf96e580} fill="white" id="Vector 30" className="group-hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)]" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

export function PortfolioContent() {
  const handleNameClick = () => {
    console.log('Navigating to About page...');
    // Add navigation logic here
  };

  const handleMatchaClick = () => {
    console.log('Navigating to Interests page...');
    // Add navigation logic here
  };

  const handleFlowerClick = () => {
    console.log('Navigating to Gallery page...');
    // Add navigation logic here
  };

  const handleMusicClick = () => {
    console.log('Navigating to Music page...');
    // Add navigation logic here
  };

  const handleProjectsClick = () => {
    console.log('Navigating to Projects page...');
    // Add navigation logic here
  };

  const handleCatClick = () => {
    console.log('Meow! 🐱');
    // Add navigation logic here - maybe to a fun easter egg page?
  };

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {/* Full Page Interactive Portfolio - Scaled Container */}
      <div className="portfolio-scaled-container">
        <div className="bg-white relative size-full" data-name="Landing page">
          <div className="absolute h-[1024px] left-0 top-0 w-[1440px]" data-name="Generated Image November 01, 2025 - 8_24PM 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="Portfolio Background" className="absolute inset-0 size-full object-cover" src={imgGeneratedImageNovember012025824Pm1} />
            </div>
          </div>
          <NameOutline onClick={handleNameClick} />
          <MatchaOutline onClick={handleMatchaClick} />
          <FlowerOutline onClick={handleFlowerClick} />
          <MusicOutline onClick={handleMusicClick} />
          <ProjectsOutline onClick={handleProjectsClick} />
          <CatOutline onClick={handleCatClick} />
        </div>
      </div>
      
      <style jsx>{`
        .portfolio-scaled-container {
          /* Base design dimensions */
          width: 1440px;
          height: 1024px;
          position: relative;
          
          /* Scale to FILL entire viewport (use max instead of min) */
          transform: scale(max(calc(100vw / 1440), calc(100vh / 1024)));
          transform-origin: center center;
        }
      `}</style>
    </div>
  );
}

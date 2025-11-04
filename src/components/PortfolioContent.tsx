import React, { useState } from "react";
import svgPaths from "../imports/svg-sofui92bd4";
import bgImage from "../assets/Frame1.png"; // 1794 x 1024
// ✅ Add this right after your imports
interface PortfolioContentProps {
  onNavigate: (
    page: string,
    clickPosition: { x: number; y: number },
    color: string
  ) => void;
}

interface InteractiveOutlineProps {
  children: React.ReactNode;
  glowColor?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

function InteractiveOutline({
  children,
  glowColor = "#ffffff",
  onClick,
  className = "",
}: InteractiveOutlineProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group cursor-pointer transition-transform duration-300 origin-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-60 blur-2xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor}30 0%, ${glowColor}15 50%, transparent 100%)`,
          transform: "scale(1.5)",
        }}
      />
      {children}
    </div>
  );
}

/* ---- outlines (same positions) ---- */
function NameOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#ff6b6b"
      onClick={onClick}
      className="absolute h-[274px] left-[196px] top-[84px] w-[208.05px]"
    >
      <div className="absolute bottom-0 left-0 right-[-5.8%] top-[-4.24%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 221 286">
          <g>
            <path d={svgPaths.p23352a80} fill="white" />
            <path d={svgPaths.p3611dc00} fill="white" />
            <path d={svgPaths.p3cbcac80} fill="white" />
            <path d={svgPaths.p1d1c6300} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function MatchaOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#6ddb6d"
      onClick={onClick}
      className="absolute h-[202.318px] left-[140.35px] top-[671px] w-[281.436px]"
    >
      <div className="absolute inset-[-3.29%_-0.96%_-3.17%_-2.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291 216">
          <g>
            <path d={svgPaths.p116f5c00} fill="white" />
            <path d={svgPaths.p2b096d80} fill="white" />
            <path d={svgPaths.p3da9d700} fill="white" />
            <path d={svgPaths.pa18c800} fill="white" />
            <path d={svgPaths.p32699540} fill="white" />
            <path d={svgPaths.p2faab080} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function FlowerOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#ff69b4"
      onClick={onClick}
      className="absolute h-[260.111px] left-[877px] top-[541px] w-[213.665px]"
    >
      <div className="absolute inset-[-1.85%_-3.53%_-2.12%_-2.81%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 228 271">
          <g>
            <path d={svgPaths.p38ea500} fill="white" />
            <path d={svgPaths.p37ad8780} fill="white" />
            <path d={svgPaths.pbedc300} fill="white" />
            <path d={svgPaths.p1130fc00} fill="white" />
            <path d={svgPaths.p31325a00} fill="white" />
            <path d={svgPaths.p2dd8c180} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function MusicOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#4ecdc4"
      onClick={onClick}
      className="absolute h-[542.228px] left-[1020.24px] top-[202.5px] w-[442.895px]"
    >
      <div className="absolute inset-[-0.9%_-0.01%_-0.19%_-0.32%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 445 549">
          <g>
            <path d={svgPaths.p7c74d00} fill="white" />
            <path d={svgPaths.p2ed5c800} fill="white" />
            <path d={svgPaths.p3d72ea80} fill="white" />
            <path d={svgPaths.p460cf72} fill="white" />
            <path d={svgPaths.p1c428900} fill="white" />
            <path d={svgPaths.p14eda200} fill="white" />
            <path d={svgPaths.pacfcd80} fill="white" />
            <path d={svgPaths.p2c124d00} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function ProjectsOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#7b68ee"
      onClick={onClick}
      className="absolute h-[331.11px] left-[799.66px] top-[74.84px] w-[392.228px]"
    >
      <div className="absolute inset-[-1.75%_-1.22%_-1.04%_-1.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 404 341">
          <g>
            <path d={svgPaths.pc32fc00} fill="white" />
            <path d={svgPaths.p10111600} fill="white" />
            <path d={svgPaths.p2df0f900} fill="white" />
            <path d={svgPaths.p1671e628} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

function CatOutline({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <InteractiveOutline
      glowColor="#ffa500"
      onClick={onClick}
      className="absolute h-[74.974px] left-[554.12px] top-[477.89px] w-[71.607px]"
    >
      <div className="absolute bottom-0 left-0 right-[-9.95%] top-[-7.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 81">
          <g>
            <path d={svgPaths.pf96e580} fill="white" />
          </g>
        </svg>
      </div>
    </InteractiveOutline>
  );
}

export function PortfolioContent({ onNavigate }: PortfolioContentProps) {
  const handleNameClick = () => console.log("About");
  const handleMatchaClick = () => console.log("Interests");
  const handleFlowerClick = () => console.log("Gallery");
  const handleMusicClick = () => console.log("Music");
  const handleProjectsClick = () => console.log("Projects");
  const handleCatClick = () => console.log("Meow!");
// ✅ Add these inside PortfolioContent, before your return()
const handleNameClick = (e: React.MouseEvent) => {
  onNavigate('about', { x: e.clientX, y: e.clientY }, '#ff6b6b');
};

const handleMatchaClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onNavigate('interests', { x: e.clientX, y: e.clientY }, '#34d399');
};

const handleFlowerClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onNavigate('gallery', { x: e.clientX, y: e.clientY }, '#f472b6');
};

const handleMusicClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onNavigate('music', { x: e.clientX, y: e.clientY }, '#4ecdc4');
};

const handleProjectsClick = (e: React.MouseEvent) => {
  onNavigate('projects', { x: e.clientX, y: e.clientY }, '#7b68ee');
};

const handleCatClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  onNavigate('easter-egg', { x: e.clientX, y: e.clientY }, '#a78bfa');
};

  return (
    // allow horizontal scroll if viewport < 1794
    <div className="w-screen min-h-screen flex items-start justify-center overflow-auto">
      {/* outer = real image size */}
      <div className="relative" style={{ width: "1794px", height: "1024px" }}>
        {/* background image */}
        <img
          alt="Portfolio Background"
          src={bgImage}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* inner overlay = original 1440px canvas, centered inside 1794px */}
        <div
          className="absolute top-0 left-1/2"
          style={{
            width: "1440px",
            height: "1024px",
            transform: "translateX(-50%)",
          }}
        >
          <NameOutline onClick={handleNameClick} />
          <MatchaOutline onClick={handleMatchaClick} />
          <FlowerOutline onClick={handleFlowerClick} />
          <MusicOutline onClick={handleMusicClick} />
          <ProjectsOutline onClick={handleProjectsClick} />
          <CatOutline onClick={handleCatClick} />
        </div>
      </div>
    </div>
  );
}

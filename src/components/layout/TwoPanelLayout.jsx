import HudCorners from './HudCorners';

export default function TwoPanelLayout({ leftPanel, rightPanel }) {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 flex flex-col md:flex-row gap-4 h-[calc(100vh-80px)] relative overflow-hidden">
      <HudCorners />
      
      {/* Left Panel - Character & Visuals */}
      <div className="w-full md:w-[40%] h-[40%] md:h-full flex flex-col items-center justify-center bg-hud-surface border border-hud-border relative rounded-sm z-10 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {leftPanel}
      </div>

      {/* Right Panel - Chat & Controls */}
      <div className="w-full md:w-[60%] h-[60%] md:h-full flex-1 flex flex-col bg-hud-surface border border-hud-border relative rounded-sm z-10 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {rightPanel}
      </div>
    </div>
  );
}

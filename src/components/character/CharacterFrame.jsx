import { CONFIG } from '../../config/config';

export default function CharacterFrame({ status }) {
  const glowStyles = {
    idle: "shadow-[0_0_16px_2px_rgba(0,200,240,0.18)]",
    listening: "shadow-[0_0_36px_8px_rgba(0,200,122,0.55)]",
    thinking: "shadow-[0_0_28px_5px_rgba(224,138,0,0.45)] opacity-75",
    speaking: "shadow-[0_0_40px_8px_rgba(0,200,240,0.60)]"
  };

  const animStyles = {
    idle: "animate-breathe",
    listening: "animate-listen-pulse",
    thinking: "",
    speaking: "" // waves handle the visual activity here
  };

  return (
    <div className={`relative w-32 h-32 md:w-48 md:h-48 z-20 transition-all duration-400 ease-in-out ${glowStyles[status]} ${animStyles[status]}`}
         style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}>
      <div className="absolute inset-0 border-[2px] border-hud-cyan pointer-events-none z-10" 
           style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" }}></div>
      <img 
        src={CONFIG.IMAGE_URL || "/vite.svg"} 
        alt="ARIA Character" 
        className="w-full h-full object-cover object-top"
        onError={(e) => { e.target.src = "/vite.svg"; }}
      />
    </div>
  );
}

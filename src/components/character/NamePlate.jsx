import { CONFIG } from '../../config/config';

export default function NamePlate() {
  return (
    <div className="flex flex-col items-center mt-10 z-20 relative px-4">
      <h2 className="text-hud-cyan text-3xl md:text-4xl font-mono tracking-[0.3em] font-bold mb-1 shadow-hud-cyan drop-shadow-[0_0_10px_rgba(0,200,240,0.5)]">
        {CONFIG.ASSISTANT_NAME}
      </h2>
      <span className="text-hud-muted text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-center w-full">
        Advanced Reactive Intelligence Assistant
      </span>
    </div>
  );
}

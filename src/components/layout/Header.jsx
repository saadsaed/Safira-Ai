import { useLiveClock } from '../../hooks/useLiveClock';
import { useSessionTimer } from '../../hooks/useSessionTimer';

export default function Header({ status, onToggleSettings }) {
  const clock = useLiveClock();
  const sessionTime = useSessionTimer();

  const statusColors = {
    idle: "text-hud-muted border-hud-muted",
    listening: "text-hud-green border-hud-green",
    thinking: "text-hud-amber border-hud-amber",
    speaking: "text-hud-cyan border-hud-cyan"
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 border-b border-hud-border bg-hud-bg/80 backdrop-blur-md z-30 relative select-none">
      <div className="flex flex-col">
        <h1 className="text-hud-cyan text-2xl font-mono tracking-widest font-bold m-0 leading-none">J.A.R.V.I.S</h1>
        <span className="text-hud-muted text-[10px] tracking-[0.2em] mt-1">AI VOICE ASSISTANT V2.0</span>
      </div>

      <div className="hidden md:flex flex-col items-center">
        <span className="text-hud-muted text-[10px] tracking-widest uppercase mb-1">Session Active</span>
        <span className="text-hud-cyan font-mono text-sm tracking-wider">{sessionTime}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-hud-text font-mono text-lg tracking-wider">{clock}</span>
          <div className={`mt-1 px-2 py-[2px] border uppercase text-[9px] tracking-widest rounded-sm ${statusColors[status] || statusColors.idle} transition-colors duration-300`}>
            {status.toUpperCase()}
          </div>
        </div>
        <button 
          onClick={onToggleSettings}
          className="w-10 h-10 flex items-center justify-center border border-hud-border text-hud-muted hover:text-hud-cyan hover:border-hud-cyan hover:bg-hud-cyan/10 transition-colors rounded-sm cursor-pointer"
          title="Settings (Ctrl+K)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </header>
  );
}

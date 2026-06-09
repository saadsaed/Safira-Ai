export default function ControlBar({ status, onSpeak, onStop, onClear, onCopy, onExport, onToggleVoiceControls }) {
  const isIdle = status === 'idle';

  return (
    <div className="flex flex-col gap-3 mt-4 w-full">
      <div className="flex flex-wrap justify-between md:justify-center gap-2">
        <button 
          onClick={onSpeak}
          disabled={!isIdle}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-cyan text-hud-cyan hover:bg-[#00c8f015] px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed uppercase"
        >
          ◉ SPEAK
        </button>
        <button 
          onClick={onStop}
          disabled={isIdle}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-red text-hud-red hover:bg-[#e0404015] px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed uppercase"
        >
          ◼ STOP
        </button>
        <button 
          onClick={onClear}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-muted text-hud-muted hover:bg-[#1a406020] px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors uppercase cursor-pointer"
        >
          ⊘ CLEAR
        </button>
        <button 
          onClick={onCopy}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-green text-hud-green hover:bg-[#00c87a15] px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors uppercase cursor-pointer"
        >
          ⎘ COPY
        </button>
        <button 
          onClick={onExport}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-muted text-hud-muted hover:bg-[#1a406020] px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors uppercase cursor-pointer"
        >
          ↓ EXPORT
        </button>
        <button 
          onClick={onToggleVoiceControls}
          className="flex-1 md:flex-none min-w-[70px] border border-hud-muted text-hud-muted hover:bg-[#1a406020] hover:border-hud-cyan hover:text-hud-cyan px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors uppercase cursor-pointer"
        >
          ⚙ VOICE
        </button>
      </div>
    </div>
  );
}

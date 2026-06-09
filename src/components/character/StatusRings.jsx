export default function StatusRings({ status }) {
  const isThinking = status === 'thinking';
  
  const colors = {
    idle: "border-hud-cyan",
    listening: "border-hud-green",
    thinking: "border-hud-amber",
    speaking: "border-hud-cyan"
  };

  const ringStyle = colors[status] || colors.idle;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      {/* Ring 1 - Outermost */}
      <div className={`absolute w-[280px] h-[280px] rounded-full border-[1px] ${ringStyle} opacity-20 transition-colors duration-300
        ${status === 'listening' ? 'animate-listen-pulse' : 
          isThinking ? 'animate-spin-ring' : 
          status === 'speaking' ? 'animate-listen-pulse' : 'animate-pulse-ring'}`}
        style={status === 'speaking' ? { animationDuration: '0.45s' } : {}}
      />
      
      {/* Ring 2 - Middle */}
      <div className={`absolute w-[220px] h-[220px] rounded-full border-[1px] ${ringStyle} opacity-30 transition-colors duration-300
        ${status === 'listening' ? 'animate-listen-pulse' : 
          isThinking ? 'animate-spin-ring' : 
          status === 'speaking' ? 'animate-listen-pulse' : 'animate-pulse-ring'}`}
        style={{ 
          animationDelay: status === 'listening' || status === 'speaking' ? '0.1s' : '0.5s',
          animationDirection: isThinking ? 'reverse' : 'normal',
          ...(status === 'speaking' && { animationDuration: '0.45s' })
        }}
      />

      {/* Ring 3 - Innermost */}
      <div className={`absolute w-[170px] h-[170px] rounded-full border-[1.5px] ${ringStyle} opacity-40 transition-colors duration-300
        ${status === 'listening' ? 'animate-listen-pulse' : 
          isThinking ? 'animate-pulse-ring' : 
          status === 'speaking' ? 'animate-listen-pulse' : 'animate-pulse-ring'}`}
        style={{ 
          animationDelay: status === 'listening' || status === 'speaking' ? '0.2s' : '1.0s',
          ...(status === 'speaking' && { animationDuration: '0.45s' })
        }}
      />
    </div>
  );
}

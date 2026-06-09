export default function SpeakingWaves({ status }) {
  if (status !== 'speaking') return null;

  const heights = [0.3, 0.6, 1, 0.8, 0.5, 0.9, 0.4, 0.7, 1.0, 0.6, 0.3];

  return (
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end justify-center gap-[4px] h-8 z-20">
      {heights.map((h, i) => (
        <div 
          key={i}
          className="w-[3px] bg-hud-cyan rounded-full animate-speak-bar"
          style={{
            height: `${h * 100}%`,
            animationDelay: `${i * 0.07}s`
          }}
        />
      ))}
    </div>
  );
}

export default function FloatingParticles() {
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute w-1 h-1 bg-hud-cyan rounded-full animate-float-dot opacity-20"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration
          }}
        />
      ))}
    </div>
  );
}

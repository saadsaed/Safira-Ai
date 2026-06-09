export default function HudCorners() {
  return (
    <>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-hud-cyan opacity-40 pointer-events-none z-40" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-hud-cyan opacity-40 pointer-events-none z-40" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-hud-cyan opacity-40 pointer-events-none z-40" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-hud-cyan opacity-40 pointer-events-none z-40" />
    </>
  );
}

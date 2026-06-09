export default function ThinkingRing({ status }) {
  if (status !== 'thinking') return null;

  return (
    <div className="absolute w-[140px] h-[140px] md:w-[210px] md:h-[210px] rounded-full border-[2px] border-dashed border-hud-amber animate-spin-ring z-10 pointer-events-none" />
  );
}

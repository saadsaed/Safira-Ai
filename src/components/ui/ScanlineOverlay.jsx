export default function ScanlineOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent 0px, transparent 2px,
          rgba(0, 200, 240, 0.018) 2px, rgba(0, 200, 240, 0.018) 4px
        )`
      }}
    />
  );
}

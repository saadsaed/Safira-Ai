export default function StatusLine({ status }) {
  const lines = {
    idle: "All systems nominal. Standing by...",
    listening: "I'm listening, speak freely...",
    thinking: "Processing your request...",
    speaking: "Responding..."
  };

  const colors = {
    idle: "text-hud-muted",
    listening: "text-hud-green",
    thinking: "text-hud-amber",
    speaking: "text-hud-cyan"
  };

  return (
    <div className={`mt-2 text-xs italic transition-colors duration-300 font-mono tracking-wider ${colors[status] || colors.idle}`}>
      {lines[status] || lines.idle}
    </div>
  );
}

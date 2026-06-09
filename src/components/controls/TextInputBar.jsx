import { useState } from 'react';

export default function TextInputBar({ status, onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() && status === 'idle') {
      onSend(text.trim());
      setText("");
    }
  };

  const isIdle = status === 'idle';

  return (
    <div className={`mt-3 flex gap-2 w-full transition-opacity duration-300 ${!isIdle ? 'opacity-50' : 'opacity-100'}`}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        disabled={!isIdle}
        placeholder={isIdle ? "Type a message..." : "ARIA is busy..."}
        className="flex-1 bg-hud-surface border border-hud-border focus:border-hud-cyan text-hud-text px-4 py-3 rounded-sm font-mono text-sm outline-none transition-colors disabled:cursor-not-allowed"
      />
      <button
        onClick={handleSend}
        disabled={!isIdle || !text.trim()}
        className="px-6 py-3 border border-hud-cyan text-hud-cyan font-mono tracking-widest text-sm hover:border-hud-cyan hover:bg-hud-cyan/10 disabled:opacity-30 disabled:hover:bg-transparent rounded-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        SEND
      </button>
    </div>
  );
}

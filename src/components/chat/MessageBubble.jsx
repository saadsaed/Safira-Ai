import { motion } from 'framer-motion';

export default function MessageBubble({ message, onReplay }) {
  const isUser = message.role === 'user';
  
  const alignClass = isUser ? "self-end" : "self-start";
  const bgClass = isUser ? "bg-[#060f1a] border-hud-border text-hud-text" : "bg-[#030d15] border-[#082030] text-hud-cyan";
  const nameLabel = isUser ? "YOU" : "ARIA";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${alignClass} max-w-[85%] mb-4 relative group`}
    >
      <div className={`flex items-center gap-2 mb-1 ${isUser ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
        {!isUser && <span className="text-hud-muted text-[9px] tracking-widest uppercase font-mono">{nameLabel}</span>}
        <span className="text-hud-muted text-[9px] font-mono tracking-wider">{message.ts}</span>
        {isUser && <span className="text-hud-muted text-[9px] tracking-widest uppercase font-mono">{nameLabel}</span>}
      </div>
      
      <div className={`px-4 py-3 border rounded-sm ${bgClass} font-mono text-[13px] leading-[1.6] whitespace-pre-wrap break-words relative`}>
        {message.content}
        
        {!isUser && onReplay && (
          <button 
            onClick={() => onReplay(message.content)}
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-hud-bg border border-hud-border rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-hud-cyan hover:text-hud-cyan text-hud-muted cursor-pointer z-10"
            title="Read aloud"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

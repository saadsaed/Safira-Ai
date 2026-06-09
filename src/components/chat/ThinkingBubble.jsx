import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThinkingBubble({ status }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (status === 'thinking') {
      setElapsed(0);
      interval = setInterval(() => {
        setElapsed(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  if (status !== 'thinking') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col self-start max-w-[85%] mb-4"
    >
      <div className="flex items-center gap-2 mb-1 pl-1">
        <span className="text-hud-muted text-[9px] tracking-widest uppercase font-mono">ARIA</span>
      </div>
      <div className="px-4 py-3 bg-[#030d15] border border-[#082030] rounded-sm flex items-center gap-4">
        <div className="flex gap-1.5 pt-1">
          <div className="w-[4px] h-[4px] bg-hud-cyan rounded-full animate-think-dot" style={{ animationDelay: '0s' }}></div>
          <div className="w-[4px] h-[4px] bg-hud-cyan rounded-full animate-think-dot" style={{ animationDelay: '0.16s' }}></div>
          <div className="w-[4px] h-[4px] bg-hud-cyan rounded-full animate-think-dot" style={{ animationDelay: '0.32s' }}></div>
        </div>
        <span className="text-hud-muted text-xs italic font-mono">Processing... ({elapsed.toFixed(1)}s)</span>
      </div>
    </motion.div>
  );
}

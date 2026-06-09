import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ThinkingBubble from './ThinkingBubble';

export default function MessageList({ messages, status, onReplay }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, status]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 w-full overflow-y-auto p-4 flex flex-col pt-8"
    >
      {messages.length === 0 && status !== 'thinking' && (
        <div className="flex-1 flex items-center justify-center text-hud-muted font-mono tracking-widest uppercase opacity-30 text-xs">
          [ No records in active memory ]
        </div>
      )}
      
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} onReplay={onReplay} />
      ))}
      
      <ThinkingBubble status={status} />
    </div>
  );
}

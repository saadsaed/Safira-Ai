import MessageList from './MessageList';
import InterimTranscript from './InterimTranscript';

export default function ChatPanel({ messages, status, interim, onReplay, children }) {
  return (
    <div className="w-full h-full flex flex-col relative z-20">
      <MessageList messages={messages} status={status} onReplay={onReplay} />
      
      <div className="mt-auto flex flex-col border-t border-hud-border bg-hud-bg/50 backdrop-blur-sm p-4 relative z-30">
        <InterimTranscript status={status} interim={interim} />
        {children}
      </div>
    </div>
  );
}

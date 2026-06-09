import { useState } from 'react';
import { AssistantProvider, useAssistant } from './context/AssistantContext';
import { useKeyboard } from './hooks/useKeyboard';
import Header from './components/layout/Header';
import TwoPanelLayout from './components/layout/TwoPanelLayout';
import CharacterPanel from './components/character/CharacterPanel';
import ChatPanel from './components/chat/ChatPanel';
import TextInputBar from './components/controls/TextInputBar';
import ControlBar from './components/controls/ControlBar';
import VoiceControls from './components/controls/VoiceControls';
import SettingsPanel from './components/settings/SettingsPanel';
import ToastContainer from './components/ui/ToastContainer';
import ScanlineOverlay from './components/ui/ScanlineOverlay';
import FloatingParticles from './components/ui/FloatingParticles';

function MainInterface() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [voiceControlsOpen, setVoiceControlsOpen] = useState(false);

  const { 
    status, messages, interim, 
    startListening, stopAll, sendToAI, clearChat, copyLastResponse, exportChat,
    toasts, removeToast,
    tts, autoSpeak, setAutoSpeak, handsFree, setHandsFree, language, setLanguage,
    setModel, setApiKey
  } = useAssistant();

  useKeyboard({
    onSpace: () => status === 'listening' ? stopAll() : startListening(),
    onEscape: stopAll,
    onClear: clearChat,
    onSettings: () => setSettingsOpen(!settingsOpen),
    onCopy: copyLastResponse,
    onExport: exportChat
  });

  const handleSettingsSave = (config) => {
    setApiKey(config.apiKey);
    setModel(config.model);
  };

  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden bg-hud-bg">
      <ScanlineOverlay />
      <FloatingParticles />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        onSave={handleSettingsSave} 
      />

      <Header status={status} onToggleSettings={() => setSettingsOpen(true)} />

      <TwoPanelLayout
        leftPanel={<CharacterPanel status={status} />}
        rightPanel={
          <ChatPanel 
            messages={messages} 
            status={status} 
            interim={interim}
            onReplay={(text) => { stopAll(); tts.speak(text); }}
          >
            <TextInputBar status={status} onSend={sendToAI} />
            <VoiceControls 
              isOpen={voiceControlsOpen}
              voices={tts.voices}
              voiceIdx={tts.voiceIdx}
              setVoiceIdx={tts.setVoiceIdx}
              rate={tts.rate}
              setRate={tts.setRate}
              pitch={tts.pitch}
              setPitch={tts.setPitch}
              volume={tts.volume}
              setVolume={tts.setVolume}
              autoSpeak={autoSpeak}
              setAutoSpeak={setAutoSpeak}
              handsFree={handsFree}
              setHandsFree={setHandsFree}
              language={language}
              setLanguage={setLanguage}
            />
            <ControlBar 
              status={status}
              onSpeak={startListening}
              onStop={stopAll}
              onClear={clearChat}
              onCopy={copyLastResponse}
              onExport={exportChat}
              onToggleVoiceControls={() => setVoiceControlsOpen(!voiceControlsOpen)}
            />
          </ChatPanel>
        }
      />

      <div className="absolute bottom-2 h-6 w-full text-center text-hud-muted text-[10px] tracking-widest font-mono z-40 pointer-events-none opacity-50">
        [Space] Talk  &nbsp;&nbsp;[Esc] Stop  &nbsp;&nbsp;[Ctrl+K] Settings  &nbsp;&nbsp;[Ctrl+L] Clear  &nbsp;&nbsp;[Ctrl+C] Copy  &nbsp;&nbsp;[Ctrl+E] Export
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AssistantProvider>
      <MainInterface />
    </AssistantProvider>
  );
}

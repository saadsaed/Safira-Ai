import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useOpenRouter } from '../hooks/useOpenRouter';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useToast } from '../hooks/useToast';
import { CONFIG } from '../config/config';

const AssistantContext = createContext(null);

export function AssistantProvider({ children }) {
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [interim, setInterim] = useState("");
  const [model, setModel] = useState(() => {
    let saved = localStorage.getItem('jarvis_model') || CONFIG.MODEL;
    // Fix deprecated or heavily rate-limited models if stored in user's browser
    if (saved === 'meta-llama/llama-3.1-8b-instruct:free' || saved === 'meta-llama/llama-3.3-70b-instruct:free') {
      saved = 'openrouter/free';
      localStorage.setItem('jarvis_model', saved);
    }
    return saved;
  });

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('jarvis_api_key') || CONFIG.API_KEY);
  
  const [autoSpeak, setAutoSpeak] = useState(() => {
    const saved = localStorage.getItem('jarvis_autospeak');
    return saved !== null ? saved === 'true' : CONFIG.AUTO_SPEAK;
  });
  
  const [handsFree, setHandsFree] = useState(() => window.localStorage.getItem('jarvis_handsfree') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('jarvis_lang') || CONFIG.DEFAULT_LANG);
  
  const { toasts, addToast, removeToast } = useToast();
  const { sendMessage, loading } = useOpenRouter();
  
  const tts = useSpeechSynthesis();
  
  const getTimestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    localStorage.setItem('jarvis_autospeak', autoSpeak);
    localStorage.setItem('jarvis_handsfree', handsFree);
    localStorage.setItem('jarvis_lang', language);
  }, [autoSpeak, handsFree, language]);

  const handleSpeechResult = useCallback(async (text) => {
    setInterim("");
    if (!text.trim()) {
      setStatus("idle");
      return;
    }
    await sendToAI(text);
  }, []); // wrapped later below via effect

  const handleSpeechInterim = useCallback((text) => {
    setInterim(text);
  }, []);

  const stt = useSpeechRecognition({ 
    onResult: handleSpeechResult, 
    onInterim: handleSpeechInterim,
    language 
  });

  // Watch TTS state sync
  useEffect(() => {
    if (tts.isSpeaking && status !== 'speaking') {
      setStatus("speaking");
    } else if (!tts.isSpeaking && status === 'speaking') {
      setStatus("idle");
      if (handsFree && !stt.isListening) {
        setTimeout(() => startListening(), 500);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tts.isSpeaking, status, handsFree]);

  const startListening = useCallback(() => {
    tts.stop();
    if (stt.start()) {
      setStatus("listening");
    } else {
      addToast("Microphone not available or permission denied.", "error");
    }
  }, [stt, tts, addToast]);

  const stopAll = useCallback(() => {
    stt.stop();
    tts.stop();
    setInterim("");
    setStatus("idle");
  }, [stt, tts]);

  const sendToAI = useCallback(async (text) => {
    if (!text.trim()) return;
    if (!apiKey) {
      addToast("OpenRouter API key is missing. Set it in Settings.", "error");
      return;
    }

    const t = text.trim();
    const ts = getTimestamp();
    const newMsg = { role: "user", content: t, ts };
    
    setMessages(prev => [...prev, newMsg]);
    setStatus("thinking");
    
    // Prepare history for API
    setMessages(prev => {
      const historyForApi = prev.slice(-CONFIG.MAX_HISTORY).map(m => ({ role: m.role, content: m.content }));
      
      sendMessage(historyForApi, model, apiKey).then(res => {
        if (res && res.reply) {
          const aiMsg = { role: "assistant", content: res.reply, ts: getTimestamp() };
          setMessages(current => [...current, aiMsg]);
          
          if (autoSpeak) {
            setStatus("speaking");
            tts.speak(res.reply);
          } else {
            setStatus("idle");
          }
        } else {
          setStatus("idle");
          addToast(res?.error || "Failed to get response from AI.", "error");
        }
      });
      return prev;
    });

  }, [apiKey, model, autoSpeak, sendMessage, tts, addToast]);

  useEffect(() => {
    stt.onResult = async (text) => {
      setInterim("");
      if (!text.trim()) {
        setStatus("idle");
        return;
      }
      stopAll(); 
      await sendToAI(text);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToAI, stopAll]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setInterim("");
    addToast("Chat cleared.", "success");
  }, [addToast]);

  const copyLastResponse = useCallback(() => {
    const lastAiMsg = [...messages].reverse().find(m => m.role === 'assistant');
    if (lastAiMsg) {
      navigator.clipboard.writeText(lastAiMsg.content);
      addToast("Copied to clipboard.", "success");
    } else {
      addToast("No response to copy.", "info");
    }
  }, [messages, addToast]);

  const exportChat = useCallback(() => {
    if (messages.length === 0) {
      addToast("Chat is empty.", "info");
      return;
    }
    const text = messages.map(m => `[${m.ts}] ${m.role === 'user' ? 'YOU' : 'ARIA'}: ${m.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JARVIS_Chat_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Chat exported.", "success");
  }, [messages, addToast]);

  const value = {
    status, startListening, stopAll, sendToAI, clearChat, copyLastResponse, exportChat,
    messages, interim, toasts, addToast, removeToast,
    autoSpeak, setAutoSpeak, handsFree, setHandsFree, language, setLanguage,
    tts, model, setModel, setApiKey
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  return useContext(AssistantContext);
}

import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(0.9);
  const [volume, setVolume] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      let loadedVoices = window.speechSynthesis.getVoices();
      if (loadedVoices.length > 0) {
        // Sort English first
        loadedVoices.sort((a, b) => {
          if (a.lang.startsWith('en') && !b.lang.startsWith('en')) return -1;
          if (!a.lang.startsWith('en') && b.lang.startsWith('en')) return 1;
          return 0;
        });
        setVoices(loadedVoices);
        
        // Auto-select Google US English if available
        const defaultVoiceIdx = loadedVoices.findIndex(v => v.name.includes("Google US English"));
        if (defaultVoiceIdx !== -1) setVoiceIdx(defaultVoiceIdx);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    let interval;
    if (isSpeaking) {
      interval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isSpeaking]);

  const speak = useCallback((text, onEnd) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    setIsSpeaking(true);

    const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
    let chunkIdx = 0;

    function speakNextChunk() {
      if (chunkIdx >= chunks.length) { 
        setIsSpeaking(false);
        if (onEnd) onEnd(); 
        return; 
      }
      
      const u = new SpeechSynthesisUtterance(chunks[chunkIdx].trim());
      if (voices[voiceIdx]) u.voice = voices[voiceIdx];
      u.rate = rate;
      u.pitch = pitch;
      u.volume = volume;
      
      u.onend = () => { 
        chunkIdx++; 
        setTimeout(speakNextChunk, 100); 
      };
      
      u.onerror = (e) => {
        console.error("SpeechSynthesis error", e);
        if (e.error !== "interrupted") {
          setIsSpeaking(false);
          if (onEnd) onEnd();
        }
      };
      
      window.speechSynthesis.speak(u);
    }

    if (chunks.length > 0) {
      speakNextChunk();
    } else {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    }
  }, [voices, voiceIdx, rate, pitch, volume]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voices, voiceIdx, setVoiceIdx, rate, setRate, pitch, setPitch, volume, setVolume };
}

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechRecognition({ onResult, onInterim, language }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language || "en-US";
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript);
      }
      
      if (finalTranscript && onResult) {
        onResult(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onResult, onInterim]);

  const start = useCallback(() => {
    if (!recognitionRef.current) {
      console.error("Voice input needs Chrome or Edge");
      return false;
    }
    try {
      recognitionRef.current.start();
      setIsListening(true);
      return true;
    } catch (e) {
      console.error("Could not start recognition:", e);
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return { start, stop, isListening, supported: !!(window.SpeechRecognition || window.webkitSpeechRecognition) };
}

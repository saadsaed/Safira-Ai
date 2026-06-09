import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CONFIG, FREE_MODELS } from '../../config/config';

export default function SettingsPanel({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('jarvis_api_key') || CONFIG.API_KEY);
  const [model, setModel] = useState(() => localStorage.getItem('jarvis_model') || CONFIG.MODEL);
  const [name, setName] = useState(() => localStorage.getItem('jarvis_name') || CONFIG.ASSISTANT_NAME);
  const [prompt, setPrompt] = useState(() => localStorage.getItem('jarvis_prompt') || CONFIG.SYSTEM_PROMPT);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setApiKey(localStorage.getItem('jarvis_api_key') || CONFIG.API_KEY);
    setModel(localStorage.getItem('jarvis_model') || CONFIG.MODEL);
    setName(localStorage.getItem('jarvis_name') || CONFIG.ASSISTANT_NAME);
    setPrompt(localStorage.getItem('jarvis_prompt') || CONFIG.SYSTEM_PROMPT);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('jarvis_api_key', apiKey);
    localStorage.setItem('jarvis_model', model);
    localStorage.setItem('jarvis_name', name);
    localStorage.setItem('jarvis_prompt', prompt);
    if (onSave) onSave({ apiKey, model, name, prompt });
    onClose();
  };

  const handleReset = () => {
    setApiKey(CONFIG.API_KEY);
    setModel(CONFIG.MODEL);
    setName(CONFIG.ASSISTANT_NAME);
    setPrompt(CONFIG.SYSTEM_PROMPT);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-hud-surface border border-hud-border rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col font-mono text-sm overflow-hidden"
          >
            <div className="flex justify-between items-center bg-hud-bg px-4 py-3 border-b border-hud-border">
              <h2 className="text-hud-cyan tracking-widest uppercase text-xs font-bold">System Configuration</h2>
              <button onClick={onClose} className="text-hud-muted hover:text-hud-red transition-colors cursor-pointer">✕</button>
            </div>

            <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
              {/* API Key */}
              <div className="flex flex-col gap-1.5">
                <label className="text-hud-muted text-[10px] tracking-widest uppercase">OpenRouter API Key</label>
                <div className="relative">
                  <input 
                    type={showKey ? "text" : "password"} 
                    value={apiKey} 
                    onChange={e => setApiKey(e.target.value)}
                    className="w-full bg-hud-bg border border-hud-border text-hud-text px-3 py-2 rounded-sm outline-none focus:border-hud-cyan transition-colors"
                  />
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-hud-muted hover:text-hud-cyan cursor-pointer text-xs"
                  >
                    {showKey ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-hud-muted text-[10px] tracking-widest uppercase">Language Model</label>
                <select 
                  value={model} 
                  onChange={e => setModel(e.target.value)}
                  className="w-full bg-hud-bg border border-hud-border text-hud-text px-2 py-2 rounded-sm outline-none focus:border-hud-cyan transition-colors appearance-none"
                >
                  {FREE_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Assistant Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-hud-muted text-[10px] tracking-widest uppercase">Assistant Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-hud-bg border border-hud-border text-hud-text px-3 py-2 rounded-sm outline-none focus:border-hud-cyan transition-colors"
                />
              </div>

              {/* System Prompt */}
              <div className="flex flex-col gap-1.5">
                <label className="text-hud-muted text-[10px] tracking-widest uppercase">Core Directives (System Prompt)</label>
                <textarea 
                  value={prompt} 
                  onChange={e => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-hud-bg border border-hud-border text-hud-text px-3 py-2 rounded-sm outline-none focus:border-hud-cyan transition-colors resize-none text-[12px] leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-between items-center bg-hud-bg px-4 py-3 border-t border-hud-border">
              <button 
                onClick={handleReset}
                className="text-hud-muted hover:text-hud-red text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
              >
                Restore Defaults
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-1.5 border border-hud-border text-hud-muted hover:text-hud-text hover:bg-hud-surface rounded-sm text-xs tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-1.5 border border-hud-cyan text-hud-bg bg-hud-cyan hover:bg-[#00e1ff] hover:shadow-[0_0_10px_rgba(0,200,240,0.5)] rounded-sm text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
                >
                  Save & Apply
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

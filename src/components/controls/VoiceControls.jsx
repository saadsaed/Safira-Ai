import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, RECOGNITION_LANGUAGES } from '../../config/config';

export default function VoiceControls({ 
  isOpen, 
  voices, 
  voiceIdx, 
  setVoiceIdx, 
  rate, 
  setRate, 
  pitch, 
  setPitch, 
  volume, 
  setVolume,
  autoSpeak,
  setAutoSpeak,
  handsFree,
  setHandsFree,
  language,
  setLanguage
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-3"
        >
          <div className="p-4 border border-hud-border bg-hud-surface rounded-sm grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 font-mono text-[11px] text-hud-muted uppercase tracking-wider">
            
            {/* Column 1: TTS Voices & Rate & Pitch */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-20">Voice</span>
                <select 
                  className="flex-1 bg-hud-bg border border-hud-border text-hud-text px-2 py-1 outline-none text-[11px]"
                  value={voiceIdx}
                  onChange={e => setVoiceIdx(Number(e.target.value))}
                >
                  {voices.map((v, i) => (
                    <option key={i} value={i}>{v.name} ({v.lang})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="w-20">Rate <span className="text-hud-cyan ml-1">{rate.toFixed(1)}×</span></span>
                <input 
                  type="range" min="0.5" max="2.0" step="0.1"
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="flex-1 accent-hud-cyan cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="w-20">Pitch <span className="text-hud-cyan ml-1">{pitch.toFixed(1)}</span></span>
                <input 
                  type="range" min="0.5" max="1.5" step="0.1"
                  value={pitch} onChange={e => setPitch(Number(e.target.value))}
                  className="flex-1 accent-hud-cyan cursor-pointer"
                />
              </div>
            </div>

            {/* Column 2: TTS Volume, Lang, Toggles */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="w-20">Volume <span className="text-hud-cyan ml-1">{Math.round(volume * 100)}%</span></span>
                <input 
                  type="range" min="0" max="1" step="0.05"
                  value={volume} onChange={e => setVolume(Number(e.target.value))}
                  className="flex-1 accent-hud-cyan cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="w-20">Listen Lang</span>
                <select 
                  className="flex-1 bg-hud-bg border border-hud-border text-hud-text px-2 py-1 outline-none text-[11px]"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  {RECOGNITION_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setAutoSpeak(!autoSpeak)}>
                  <div className={`w-8 h-4 rounded-full p-0.5 border transition-colors relative ${autoSpeak ? 'border-hud-cyan bg-[#00c8f020]' : 'border-hud-muted bg-transparent'}`}>
                    <div className={`w-[10px] h-[10px] absolute top-[2px] rounded-full bg-hud-cyan transition-transform ${autoSpeak ? 'left-[18px]' : 'left-[2px] bg-hud-muted group-hover:bg-hud-text'}`} />
                  </div>
                  <span className={autoSpeak ? 'text-hud-cyan' : ''}>Auto-Speak</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setHandsFree(!handsFree)}>
                  <div className={`w-8 h-4 rounded-full p-0.5 border transition-colors relative ${handsFree ? 'border-hud-cyan bg-[#00c8f020]' : 'border-hud-muted bg-transparent'}`}>
                    <div className={`w-[10px] h-[10px] absolute top-[2px] rounded-full bg-hud-cyan transition-transform ${handsFree ? 'left-[18px]' : 'left-[2px] bg-hud-muted group-hover:bg-hud-text'}`} />
                  </div>
                  <span className={handsFree ? 'text-hud-cyan' : ''}>Hands-Free</span>
                </label>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

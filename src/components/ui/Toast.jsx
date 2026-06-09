import { motion } from 'framer-motion';

export default function Toast({ message, type, onDismiss }) {
  const styles = {
    success: "border-hud-green text-hud-green bg-[#00c87a10]",
    error: "border-hud-red text-hud-red bg-[#e0404010]",
    warning: "border-hud-amber text-hud-amber bg-[#e08a0010]",
    info: "border-hud-cyan text-hud-cyan bg-[#00c8f010]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`relative flex items-start gap-3 w-72 p-3 mb-2 border rounded-sm shadow-lg backdrop-blur-md pointer-events-auto ${styles[type] || styles.info}`}
    >
      <div className="flex-1 font-mono text-[13px] leading-relaxed break-words">{message}</div>
      {type === 'error' && (
        <button 
          onClick={onDismiss}
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}

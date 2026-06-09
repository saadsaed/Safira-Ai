import { AnimatePresence, motion } from 'framer-motion';

export default function InterimTranscript({ status, interim }) {
  return (
    <AnimatePresence>
      {status === 'listening' && interim && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="w-full text-center py-2 z-20"
        >
          <span className="text-hud-green text-[12px] italic font-mono tracking-wide">
            "{interim}..."
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

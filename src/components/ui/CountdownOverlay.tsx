import { motion, AnimatePresence } from 'framer-motion';

interface CountdownOverlayProps {
  count: number;
  isVisible: boolean;
}

export function CountdownOverlay({ count, isVisible }: CountdownOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {count > 0 ? (
            <span className="text-[150px] font-game font-black text-squid-pink neon-text">
              {count}
            </span>
          ) : (
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.2, 1] }}
              className="text-6xl font-game font-black text-squid-teal neon-text-teal"
            >
              GO!
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

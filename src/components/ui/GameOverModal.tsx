import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Skull, Clock, Target } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface GameOverModalProps {
  onRestart: () => void;
  onHome: () => void;
}

export function GameOverModal({ onRestart, onHome }: GameOverModalProps) {
  const { gameState, players, timeRemaining } = useGameStore();
  
  const isWin = gameState === 'won';
  const safePlayers = players.filter(p => p.isSafe);
  const eliminatedPlayers = players.filter(p => !p.isAlive);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className={`w-full max-w-md rounded-2xl p-8 border-2 ${
          isWin 
            ? 'bg-gradient-to-br from-squid-teal/20 to-green-900/20 border-squid-teal' 
            : 'bg-gradient-to-br from-squid-pink/20 to-red-900/20 border-squid-pink'
        }`}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          {isWin ? (
            <div className="w-24 h-24 rounded-full bg-squid-teal/20 flex items-center justify-center">
              <Trophy size={48} className="text-squid-teal" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-squid-pink/20 flex items-center justify-center">
              <Skull size={48} className="text-squid-pink" />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-game font-bold text-center mb-2 ${
            isWin ? 'text-squid-teal neon-text-teal' : 'text-squid-pink neon-text'
          }`}
        >
          {isWin ? 'VICTORY!' : gameState === 'timeout' ? 'TIME OUT!' : 'ELIMINATED!'}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-300 mb-8"
        >
          {isWin
            ? `${safePlayers.length} player${safePlayers.length > 1 ? 's' : ''} made it safely!`
            : gameState === 'timeout'
            ? 'You ran out of time!'
            : 'You were caught moving!'}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="text-center p-4 rounded-lg bg-white/5">
            <Target size={24} className="mx-auto mb-2 text-squid-teal" />
            <div className="text-2xl font-bold">{safePlayers.length}</div>
            <div className="text-xs text-gray-400">Safe</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5">
            <Skull size={24} className="mx-auto mb-2 text-squid-pink" />
            <div className="text-2xl font-bold">{eliminatedPlayers.length}</div>
            <div className="text-xs text-gray-400">Eliminated</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5">
            <Clock size={24} className="mx-auto mb-2 text-squid-gold" />
            <div className="text-2xl font-bold">{timeRemaining.toFixed(1)}s</div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button
            onClick={onHome}
            className="flex-1 py-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Menu
          </button>
          <button
            onClick={onRestart}
            className={`flex-[2] py-4 rounded-lg font-game font-bold flex items-center justify-center gap-2 transition-all ${
              isWin
                ? 'bg-squid-teal hover:bg-squid-teal/80'
                : 'bg-squid-pink hover:bg-squid-pink/80'
            }`}
          >
            <RotateCcw size={20} />
            PLAY AGAIN
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

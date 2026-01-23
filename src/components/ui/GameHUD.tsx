import { motion } from 'framer-motion';
import { Pause, Play, Clock, Users, AlertTriangle } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import { DIFFICULTY_CONFIGS } from '@/types/game';

interface GameHUDProps {
  onPause: () => void;
}

export function GameHUD({ onPause }: GameHUDProps) {
  const { gameState, isGreenLight, players, timeRemaining, settings } = useGameStore();
  const config = DIFFICULTY_CONFIGS[settings.difficulty];
  const progress = timeRemaining / config.timeLimit;

  const safePlayers = players.filter(p => p.isSafe).length;
  const alivePlayers = players.filter(p => p.isAlive && !p.isSafe).length;
  const eliminatedPlayers = players.filter(p => !p.isAlive).length;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Light status */}
          <motion.div
            animate={{
              backgroundColor: isGreenLight ? '#00BFA6' : '#ED1B76',
              boxShadow: isGreenLight
                ? '0 0 20px #00BFA6, 0 0 40px #00BFA6'
                : '0 0 20px #ED1B76, 0 0 40px #ED1B76',
            }}
            className="px-6 py-3 rounded-full font-game font-bold text-lg"
          >
            {isGreenLight ? 'GREEN LIGHT' : 'RED LIGHT'}
          </motion.div>

          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
            <Clock size={20} className={timeRemaining < 5 ? 'text-squid-pink animate-pulse' : 'text-squid-gold'} />
            <span className={`font-game font-bold text-xl ${timeRemaining < 5 ? 'text-squid-pink' : ''}`}>
              {timeRemaining.toFixed(1)}s
            </span>
          </div>

          {/* Pause button */}
          <button
            onClick={onPause}
            className="p-3 glass rounded-full hover:bg-white/20 transition-colors"
          >
            {gameState === 'paused' ? <Play size={24} /> : <Pause size={24} />}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: progress > 0.3 ? '#FFD93D' : '#ED1B76',
            }}
            animate={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Player status */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 glass rounded-full">
            <Users size={16} className="text-squid-teal" />
            <span className="text-sm">{alivePlayers} alive</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 glass rounded-full">
            <span className="text-squid-teal">✓</span>
            <span className="text-sm">{safePlayers} safe</span>
          </div>
          {eliminatedPlayers > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 glass rounded-full">
              <AlertTriangle size={16} className="text-squid-pink" />
              <span className="text-sm">{eliminatedPlayers} eliminated</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

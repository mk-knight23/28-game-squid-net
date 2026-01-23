import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export function MobileControls() {
  const { gameState, players, movePlayer, stopPlayer } = useGameStore();

  if (gameState !== 'playing') return null;

  const handleTouchStart = (playerId: number) => {
    const player = players.find(p => p.id === playerId);
    if (player && player.isAlive && !player.isSafe) {
      movePlayer(playerId);
    }
  };

  const handleTouchEnd = (playerId: number) => {
    stopPlayer(playerId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden">
      <div className="flex justify-center gap-4">
        {players.map((player) => (
          <motion.button
            key={player.id}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleTouchStart(player.id)}
            onTouchEnd={() => handleTouchEnd(player.id)}
            onMouseDown={() => handleTouchStart(player.id)}
            onMouseUp={() => handleTouchEnd(player.id)}
            onMouseLeave={() => handleTouchEnd(player.id)}
            disabled={!player.isAlive || player.isSafe}
            className={`w-20 h-20 rounded-full font-game font-bold text-sm transition-all ${
              !player.isAlive
                ? 'bg-gray-600 opacity-50'
                : player.isSafe
                ? 'bg-squid-teal'
                : 'bg-white/20 active:bg-white/40'
            }`}
            style={{
              borderColor: player.color,
              borderWidth: 3,
              boxShadow: player.isAlive && !player.isSafe ? `0 0 20px ${player.color}` : 'none',
            }}
          >
            <div className="text-xs opacity-70">P{player.id + 1}</div>
            <div className="text-lg">
              {!player.isAlive ? '💀' : player.isSafe ? '✓' : '↑'}
            </div>
          </motion.button>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Hold to move
      </p>
    </div>
  );
}

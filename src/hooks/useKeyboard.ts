import { useEffect, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';

export function useKeyboard() {
  const { gameState, players, movePlayer, stopPlayer } = useGameStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      const player = players.find((p) => p.controls.move === e.code || p.controls.move === e.key);
      if (player && player.isAlive && !player.isSafe) {
        movePlayer(player.id);
      }
    },
    [gameState, players, movePlayer]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const player = players.find((p) => p.controls.move === e.code || p.controls.move === e.key);
      if (player) {
        stopPlayer(player.id);
      }
    },
    [players, stopPlayer]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
}

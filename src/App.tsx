import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameScene } from '@/components/game/GameScene';
import { StartModal } from '@/components/ui/StartModal';
import { GameOverModal } from '@/components/ui/GameOverModal';
import { SettingsPanel } from '@/components/ui/SettingsPanel';
import { GameHUD } from '@/components/ui/GameHUD';
import { CountdownOverlay } from '@/components/ui/CountdownOverlay';
import { MobileControls } from '@/components/ui/MobileControls';
import { useGameStore } from '@/stores/gameStore';
import { useKeyboard } from '@/hooks/useKeyboard';
import { DIFFICULTY_CONFIGS } from '@/types/game';

function App() {
  const {
    gameState,
    setGameState,
    isGreenLight,
    setGreenLight,
    setTimeRemaining,
    players,
    settings,
    stats,
    updateStats,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
  } = useGameStore();

  const [showSettings, setShowSettings] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const dollLoopRef = useRef<number | null>(null);

  // Initialize keyboard controls
  useKeyboard();

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
    document.documentElement.classList.toggle('light', !settings.darkMode);
  }, [settings.darkMode]);

  // Game countdown
  const startCountdown = useCallback(() => {
    setShowCountdown(true);
    setCountdown(3);
    
    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countInterval);
          setTimeout(() => {
            setShowCountdown(false);
            setGameState('playing');
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [setGameState]);

  // Handle start game
  const handleStartGame = useCallback(() => {
    startGame();
    startCountdown();
    updateStats({ gamesPlayed: stats.gamesPlayed + 1 });
  }, [startGame, startCountdown, updateStats, stats.gamesPlayed]);

  // Handle pause/resume
  const handlePause = useCallback(() => {
    if (gameState === 'playing') {
      pauseGame();
    } else if (gameState === 'paused') {
      resumeGame();
    }
  }, [gameState, pauseGame, resumeGame]);

  // Doll behavior (green light / red light switching)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const config = DIFFICULTY_CONFIGS[settings.difficulty];
    
    const switchLight = () => {
      setGreenLight(!isGreenLight);
      
      const delay = isGreenLight
        ? Math.random() * (config.redLightMax - config.redLightMin) + config.redLightMin
        : Math.random() * (config.greenLightMax - config.greenLightMin) + config.greenLightMin;
      
      dollLoopRef.current = window.setTimeout(switchLight, delay);
    };

    // Start with green light
    setGreenLight(true);
    const initialDelay = Math.random() * (config.greenLightMax - config.greenLightMin) + config.greenLightMin;
    dollLoopRef.current = window.setTimeout(switchLight, initialDelay);

    return () => {
      if (dollLoopRef.current) {
        clearTimeout(dollLoopRef.current);
      }
    };
  }, [gameState, settings.difficulty, setGreenLight]);

  // Game loop (timer and win/lose conditions)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const config = DIFFICULTY_CONFIGS[settings.difficulty];
    setTimeRemaining(config.timeLimit);

    const startTime = Date.now();
    
    const gameLoop = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, config.timeLimit - elapsed);
      setTimeRemaining(remaining);

      // Check win/lose conditions
      const alivePlayers = players.filter(p => p.isAlive);
      const safePlayers = players.filter(p => p.isSafe);
      const allDead = alivePlayers.length === 0;
      const allSafe = safePlayers.length === players.length && players.length > 0;

      if (allDead && players.length > 0) {
        setGameState('lost');
        return;
      }

      if (allSafe) {
        setGameState('won');
        const completionTime = elapsed;
        if (!stats.bestTime || completionTime < stats.bestTime) {
          updateStats({ bestTime: completionTime, gamesWon: stats.gamesWon + 1 });
        } else {
          updateStats({ gamesWon: stats.gamesWon + 1 });
        }
        return;
      }

      if (remaining <= 0) {
        setGameState('timeout');
        return;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, players, settings.difficulty, setTimeRemaining, setGameState, updateStats, stats]);

  // Handle restart
  const handleRestart = useCallback(() => {
    resetGame();
    handleStartGame();
  }, [resetGame, handleStartGame]);

  // Handle home
  const handleHome = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const isGameOver = ['won', 'lost', 'timeout'].includes(gameState);

  return (
    <div className="w-full h-full relative">
      {/* 3D Game Scene */}
      <GameScene />

      {/* UI Overlays */}
      <AnimatePresence>
        {gameState === 'idle' && (
          <StartModal
            onStart={handleStartGame}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCountdown && (
          <CountdownOverlay count={countdown} isVisible={showCountdown} />
        )}
      </AnimatePresence>

      {gameState === 'playing' && (
        <>
          <GameHUD onPause={handlePause} />
          <MobileControls />
        </>
      )}

      {gameState === 'paused' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-4xl font-game font-bold text-squid-gold mb-8">PAUSED</h2>
            <button
              onClick={handlePause}
              className="btn-primary"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isGameOver && (
          <GameOverModal onRestart={handleRestart} onHome={handleHome} />
        )}
      </AnimatePresence>

      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;

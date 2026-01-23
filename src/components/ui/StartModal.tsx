import { motion } from 'framer-motion';
import { Play, Settings, Trophy, Users, Zap } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import type { Difficulty } from '@/types/game';

interface StartModalProps {
  onStart: () => void;
  onOpenSettings: () => void;
}

export function StartModal({ onStart, onOpenSettings }: StartModalProps) {
  const { settings, updateSettings, stats } = useGameStore();

  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', color: 'bg-orange-500' },
    { value: 'extreme', label: 'Extreme', color: 'bg-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md glass rounded-2xl p-8 border border-squid-pink/30"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-game font-bold text-squid-pink neon-text mb-2"
          >
            SQUID GAME
          </motion.h1>
          <p className="text-xl font-game text-squid-teal">Red Light Green Light</p>
        </div>

        {/* Player Count */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Users size={18} className="text-squid-teal" />
            Players
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => updateSettings({ playerCount: count as 1 | 2 | 3 | 4 })}
                className={`py-2 rounded-lg font-game font-bold transition-all ${
                  settings.playerCount === count
                    ? 'bg-squid-pink text-white shadow-lg shadow-squid-pink/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Zap size={18} className="text-squid-teal" />
            Difficulty
          </label>
          <div className="grid grid-cols-4 gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => updateSettings({ difficulty: diff.value })}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  settings.difficulty === diff.value
                    ? `${diff.color} text-white shadow-lg`
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 p-4 rounded-lg bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} className="text-squid-gold" />
            <span className="font-medium">Your Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Games Played:</span>
              <span className="ml-2 font-bold">{stats.gamesPlayed}</span>
            </div>
            <div>
              <span className="text-gray-400">Wins:</span>
              <span className="ml-2 font-bold text-squid-teal">{stats.gamesWon}</span>
            </div>
            <div>
              <span className="text-gray-400">Best Time:</span>
              <span className="ml-2 font-bold">
                {stats.bestTime ? `${stats.bestTime.toFixed(1)}s` : '-'}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Win Rate:</span>
              <span className="ml-2 font-bold">
                {stats.gamesPlayed > 0
                  ? `${Math.round((stats.gamesWon / stats.gamesPlayed) * 100)}%`
                  : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls Info */}
        <div className="mb-6 p-4 rounded-lg bg-white/5 text-sm">
          <p className="font-medium mb-2">Controls:</p>
          <div className="grid grid-cols-2 gap-2 text-gray-300">
            <div>Player 1: <kbd className="px-2 py-1 bg-white/10 rounded">↑ Arrow</kbd></div>
            <div>Player 2: <kbd className="px-2 py-1 bg-white/10 rounded">W</kbd></div>
            <div>Player 3: <kbd className="px-2 py-1 bg-white/10 rounded">I</kbd></div>
            <div>Player 4: <kbd className="px-2 py-1 bg-white/10 rounded">8 (Numpad)</kbd></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onOpenSettings}
            className="flex-1 py-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Settings size={20} />
            Settings
          </button>
          <button
            onClick={onStart}
            className="flex-[2] btn-primary flex items-center justify-center gap-2"
          >
            <Play size={24} />
            START GAME
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

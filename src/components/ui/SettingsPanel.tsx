import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Music, Sun, Moon } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useGameStore();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md glass rounded-2xl p-6 border border-squid-pink/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-game font-bold text-squid-pink">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sound Settings */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Audio</h3>
          
          {/* Sound Effects */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span>Sound Effects</span>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-squid-teal' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: settings.soundEnabled ? 24 : 0 }}
                className="w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </button>
          </div>

          {/* Music */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <Music size={20} />
              <span>Background Music</span>
            </div>
            <button
              onClick={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.musicEnabled ? 'bg-squid-teal' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: settings.musicEnabled ? 24 : 0 }}
                className="w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </button>
          </div>

          {/* Volume */}
          <div className="p-4 rounded-lg bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <span>Volume</span>
              <span className="text-squid-teal font-mono">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
              className="w-full accent-squid-pink"
            />
          </div>
        </div>

        {/* Display Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Display</h3>
          
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              {settings.darkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={() => updateSettings({ darkMode: !settings.darkMode })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-squid-teal' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: settings.darkMode ? 24 : 0 }}
                className="w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-lg bg-squid-pink/20 hover:bg-squid-pink/30 text-squid-pink font-medium transition-colors"
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}

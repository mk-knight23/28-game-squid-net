import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, GameMode, Player, GameSettings, GameStats } from '@/types/game';

interface GameStore {
  // Game State
  gameState: GameState;
  gameMode: GameMode;
  isGreenLight: boolean;
  timeRemaining: number;
  players: Player[];
  
  // Settings
  settings: GameSettings;
  
  // Stats
  stats: GameStats;
  
  // Actions
  setGameState: (state: GameState) => void;
  setGameMode: (mode: GameMode) => void;
  setGreenLight: (isGreen: boolean) => void;
  setTimeRemaining: (time: number) => void;
  
  // Player actions
  initializePlayers: (count: number) => void;
  movePlayer: (playerId: number) => void;
  stopPlayer: (playerId: number) => void;
  eliminatePlayer: (playerId: number) => void;
  markPlayerSafe: (playerId: number) => void;
  updatePlayerPosition: (playerId: number, position: number) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<GameSettings>) => void;
  
  // Stats actions
  updateStats: (stats: Partial<GameStats>) => void;
  
  // Game actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
}

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: 'medium',
  playerCount: 1,
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  darkMode: true,
};

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  bestTime: null,
  totalPlayersEliminated: 0,
};

const PLAYER_COLORS = ['#4ADE80', '#F472B6', '#60A5FA', '#FBBF24'];
const PLAYER_CONTROLS = ['ArrowUp', 'KeyW', 'KeyI', 'Numpad8'];

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      gameState: 'idle',
      gameMode: 'classic',
      isGreenLight: true,
      timeRemaining: 20,
      players: [],
      settings: DEFAULT_SETTINGS,
      stats: DEFAULT_STATS,
      
      // State setters
      setGameState: (gameState) => set({ gameState }),
      setGameMode: (gameMode) => set({ gameMode }),
      setGreenLight: (isGreenLight) => set({ isGreenLight }),
      setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
      
      // Player actions
      initializePlayers: (count) => {
        const players: Player[] = Array.from({ length: count }, (_, i) => ({
          id: i,
          name: `Player ${i + 1}`,
          position: 6,
          velocity: 0,
          color: PLAYER_COLORS[i],
          isAlive: true,
          isSafe: false,
          controls: { move: PLAYER_CONTROLS[i] },
        }));
        set({ players });
      },
      
      movePlayer: (playerId) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId && p.isAlive && !p.isSafe
              ? { ...p, velocity: 0.03 }
              : p
          ),
        }));
      },
      
      stopPlayer: (playerId) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, velocity: 0 } : p
          ),
        }));
      },
      
      eliminatePlayer: (playerId) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, isAlive: false, velocity: 0 } : p
          ),
        }));
      },
      
      markPlayerSafe: (playerId) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, isSafe: true, velocity: 0 } : p
          ),
        }));
      },
      
      updatePlayerPosition: (playerId, position) => {
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, position } : p
          ),
        }));
      },
      
      // Settings
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      
      // Stats
      updateStats: (newStats) => {
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        }));
      },
      
      // Game controls
      startGame: () => {
        const { settings } = get();
        get().initializePlayers(settings.playerCount);
        set({ gameState: 'starting', isGreenLight: true });
      },
      
      pauseGame: () => set({ gameState: 'paused' }),
      resumeGame: () => set({ gameState: 'playing' }),
      
      resetGame: () => {
        set({
          gameState: 'idle',
          isGreenLight: true,
          timeRemaining: 20,
          players: [],
        });
      },
    }),
    {
      name: 'squid-game-storage',
      partialize: (state) => ({
        settings: state.settings,
        stats: state.stats,
      }),
    }
  )
);

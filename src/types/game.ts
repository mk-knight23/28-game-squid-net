// Game Types
export type GameState = 'idle' | 'starting' | 'playing' | 'paused' | 'won' | 'lost' | 'timeout';
export type GameMode = 'classic' | 'timeAttack' | 'survival';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

export interface Player {
  id: number;
  name: string;
  position: number;
  velocity: number;
  color: string;
  isAlive: boolean;
  isSafe: boolean;
  controls: PlayerControls;
}

export interface PlayerControls {
  move: string;
  mobileEnabled?: boolean;
}

export interface GameSettings {
  difficulty: Difficulty;
  playerCount: 1 | 2 | 3 | 4;
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  darkMode: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number | null;
  totalPlayersEliminated: number;
}

export interface DifficultyConfig {
  timeLimit: number;
  greenLightMin: number;
  greenLightMax: number;
  redLightMin: number;
  redLightMax: number;
  playerSpeed: number;
  detectionDelay: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    timeLimit: 30,
    greenLightMin: 2000,
    greenLightMax: 4000,
    redLightMin: 1500,
    redLightMax: 3000,
    playerSpeed: 0.04,
    detectionDelay: 200,
  },
  medium: {
    timeLimit: 20,
    greenLightMin: 1500,
    greenLightMax: 3000,
    redLightMin: 1000,
    redLightMax: 2000,
    playerSpeed: 0.03,
    detectionDelay: 150,
  },
  hard: {
    timeLimit: 15,
    greenLightMin: 1000,
    greenLightMax: 2000,
    redLightMin: 750,
    redLightMax: 1500,
    playerSpeed: 0.025,
    detectionDelay: 100,
  },
  extreme: {
    timeLimit: 10,
    greenLightMin: 500,
    greenLightMax: 1500,
    redLightMin: 500,
    redLightMax: 1000,
    playerSpeed: 0.02,
    detectionDelay: 50,
  },
};

export const PLAYER_CONFIGS = [
  { name: 'Player 1', color: '#4ADE80', controls: { move: 'ArrowUp' } },
  { name: 'Player 2', color: '#F472B6', controls: { move: 'KeyW' } },
  { name: 'Player 3', color: '#60A5FA', controls: { move: 'KeyI' } },
  { name: 'Player 4', color: '#FBBF24', controls: { move: 'Numpad8' } },
];

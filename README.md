# 28-game-squid-net

<p align="center">
  <img src="https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/TresJS-7D46F5?style=for-the-badge&logo=three.js&logoColor=white" alt="TresJS">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
</p>

<p align="center">
  A premium, dystopian 3D adaptation of "Red Light, Green Light" built with Vue 3, TresJS, and high-performance WebGL.
</p>

<p align="center">
  <a href="https://two8-game-squid-net.onrender.com">🚀 Live Demo (Render)</a>
</p>

## 🎮 Live Demos

| Platform | URL |
|----------|-----|
| **Render** | [two8-game-squid-net.onrender.com](https://two8-game-squid-net.onrender.com) |

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer                           │
│  Vue 3 Components + TresJS + Tailwind CSS v4 + GSAP           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   3D Visualization Layer                       │
│  TresJS (Three.js) + OrbitControls + Stars + Sky               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    State Management                           │
│  Pinia Stores (game, settings, stats) + LocalStorage          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Game Logic Layer                            │
│  Red Light/Green Light Cycle + Detection + Scoring            │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Features Layer                              │
│  Game Modes + Settings + Achievements + Statistics            │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
28-game-squid-net/
├── src/
│   ├── components/                     # Vue components
│   │   ├── common/                    # Shared UI components
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue
│   │   │   └── Modal.vue
│   │   └── ui/                        # UI-specific components
│   │       ├── GameHUD.vue
│   │       ├── GameOver.vue
│   │       ├── Victory.vue
│   │       └── SettingsPanel.vue
│   │
│   ├── views/                          # Vue Router views
│   │   ├── Home.vue                  # Main game view
│   │   ├── Achievements.vue          # Achievements page
│   │   └── Stats.vue                 # Statistics page
│   │
│   ├── stores/                         # Pinia stores
│   │   ├── game.ts                   # Game state store
│   │   ├── settings.ts               # Settings store
│   │   └── stats.ts                  # Statistics store
│   │
│   ├── composables/                    # Vue composables
│   │   └── useKeyboardControls.ts    # Keyboard shortcuts
│   │
│   ├── router/                         # Vue Router
│   │   └── index.ts                  # Router configuration
│   │
│   ├── types/                          # TypeScript types
│   │   └── index.ts                  # Type definitions
│   │
│   ├── utils/                          # Utilities
│   │   └── constants.ts              # Game constants
│   │
│   ├── App.vue                         # Root component
│   ├── main.ts                        # Vue entry point
│   └── style.css                       # Global styles
│
├── public/                             # Static assets
│
├── .github/workflows/                  # CI/CD pipelines
│   ├── ci.yml                         # CI workflow
│   └── deploy.yml                     # Deploy workflow
│
├── docs/                               # Documentation
│   ├── architecture.md               # Architecture details
│   └── game-mechanics.md              # Game mechanics
│
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── package.json                        # Dependencies & scripts
```

### Tech Stack

```typescript
{
  frontend: {
    framework: {
      name: "Vue",
      version: "3.5.13",
      features: [
        "Composition API",
        "Script Setup",
        "Reactive State",
        "Computed Properties",
        "Teleport",
        "Suspense",
        "TypeScript support"
      ]
    },
    router: {
      name: "Vue Router",
      version: "4.6.4",
      features: [
        "Route guards",
        "Lazy loading",
        "Navigation guards",
        "History mode"
      ]
    },
    buildTool: {
      name: "Vite",
      version: "6.0.5",
      features: [
        "HMR (Hot Module Replacement)",
        "ESBuild-based",
        "Fast development",
        "Optimized production builds"
      ]
    },
    styling: {
      name: "Tailwind CSS",
      version: "4.0.0",
      features: [
        "Dark/Light/System themes",
        "Responsive utilities",
        "Custom animations",
        "Squid Game color palette (pink, red, yellow)"
      ]
    }
  },
  visualization: {
    library: "TresJS",
    version: "4.3.0",
    features: [
      "Declarative Three.js",
      "Component-based 3D",
      "Vue 3 integration",
      "Auto-disposal",
      "Type-safe"
    ],
    components: [
      "@tresjs/core - TresCanvas",
      "@tresjs/cientos - OrbitControls, Stars, Sky"
    ],
    threeVersion: "0.171.0",
    features: [
      "3D game environment",
      "Player detection",
      "Dynamic lighting",
      "Background effects (stars, sky)",
      "Orbit controls for camera"
    ]
  },
  stateManagement: {
    library: "Pinia",
    version: "2.3.1",
    stores: [
      {
        name: "gameStore",
        purpose: "Game state and mechanics",
        state: [
          "isPlaying: boolean",
          "isGameOver: boolean",
          "isVictory: boolean",
          "detectionStatus: 'green' | 'yellow' | 'red'",
          "score: number",
          "highScore: number",
          "streak: number",
          "difficulty: 'easy' | 'medium' | 'hard'",
          "isPracticeMode: boolean"
        ],
        actions: [
          "startGame(): void",
          "endGame(won: boolean): void",
          "quickRestart(): void",
          "updateScore(points: number): void",
          "setDetectionStatus(status: string): void",
          "setDifficulty(difficulty: string): void",
          "togglePracticeMode(): void"
        ],
        persistence: "LocalStorage"
      },
      {
        name: "settingsStore",
        purpose: "User preferences",
        state: [
          "settings.theme: 'dark' | 'light' | 'system'",
          "settings.volume: number",
          "settings.showHelp: boolean"
        ],
        actions: [
          "setTheme(theme: string): void",
          "setVolume(volume: number): void",
          "toggleHelp(): void",
          "initializeTheme(): void"
        ],
        persistence: "LocalStorage"
      },
      {
        name: "statsStore",
        purpose: "Game statistics",
        state: [
          "totalGames: number",
          "wins: number",
          "losses: number",
          "playTime: number",
          "achievements: Achievement[]",
          "perDifficultyHighScores: Record<string, number>"
        ],
        actions: [
          "recordGame(won: boolean, duration: number): void",
          "unlockAchievement(id: string): void",
          "getWinRate(): number",
          "getAveragePlayTime(): number"
        ],
        persistence: "LocalStorage"
      }
    ]
  },
  animation: {
    gsap: {
      version: "3.12.5",
      features: [
        "Smooth transitions",
        "Game over animations",
        "Victory animations",
        "UI animations",
        "Performance optimized"
      ]
    },
    vueMotion: {
      library: "@motionone/vue",
      version: "10.16.4",
      features: [
        "Vue 3 motion components",
        "Enter/leave transitions",
        "Layout animations"
      ]
    }
  },
  audio: {
    library: "Howler.js",
    version: "2.2.4",
    features: [
      "Sound effects",
      "Background music",
      "Volume control",
      "Cross-browser support"
    ],
    sounds: [
      "Red light signal",
      "Green light signal",
      "Elimination sound",
      "Victory sound",
      "Button clicks"
    ]
  },
  composables: {
    useKeyboardControls: {
      purpose: "Keyboard shortcuts",
      features: [
        "Register shortcuts",
        "Execute callbacks",
        "Key event handling",
        "Debouncing"
      ],
      shortcuts: {
        R: "Quick restart",
        P: "Toggle practice mode",
        ESC: "Close modals",
        Space: "Pause/resume"
      }
    }
  },
  icons: {
    library: "Lucide Vue Next",
    version: "0.563.0",
    icons: [
      "Trophy",
      "Timer",
      "Activity",
      "Settings",
      "Moon",
      "Sun",
      "Play",
      "Pause",
      "RotateCcw",
      "HelpCircle"
    ]
  },
  utilities: {
    vueuse: {
      library: "@vueuse/core",
      version: "11.3.0",
      features: [
        "LocalStorage",
        "Theme detection",
        "Media queries",
        "Event listeners"
      ]
    }
  }
}
```

### Component Architecture

```typescript
{
  components: {
    core: [
      {
        name: "App",
        purpose: "Root application component",
        features: [
          "Theme management",
          "Game state integration",
          "Keyboard shortcuts",
          "Responsive layout",
          "Router integration"
        ]
      }
    ],
    views: [
      {
        name: "Home",
        purpose: "Main game view",
        features: [
          "3D game scene",
          "Game HUD overlay",
          "Game controls",
          "Start/reset game",
          "Theme toggle",
          "Settings panel"
        ]
      },
      {
        name: "Achievements",
        purpose: "Achievement tracking",
        features: [
          "Achievement list",
          "Progress indicators",
          "Unlock status",
          "Tier badges"
        ]
      },
      {
        name: "Stats",
        purpose: "Statistics page",
        features: [
          "Game statistics",
          "Win rate",
          "Total play time",
          "Per-difficulty high scores"
        ]
      }
    ],
    ui: [
      {
        name: "GameHUD",
        purpose: "Game HUD overlay",
        features: [
          "Score display",
          "High score",
          "Streak counter",
          "Difficulty indicator",
          "Detection status",
          "Timer"
        ]
      },
      {
        name: "GameOver",
        purpose: "Game over screen",
        features: [
          "Elimination message",
          "Final score",
          "Streak reset",
          "Restart button"
        ]
      },
      {
        name: "Victory",
        purpose: "Victory screen",
        features: [
          "Victory message",
          "Final score",
          "Streak increase",
          "New high score indicator",
          "Play again button"
        ]
      },
      {
        name: "SettingsPanel",
        purpose: "Settings modal",
        features: [
          "Theme toggle",
          "Volume control",
          "Difficulty selection",
          "Practice mode toggle"
        ]
      }
    ],
    common: [
      {
        name: "Button",
        purpose: "Reusable button component",
        features: [
          "Multiple variants",
          "Disabled states",
          "Loading states",
          "Icon support"
        ]
      },
      {
        name: "Card",
        purpose: "Card container",
        features: [
          "Hover effects",
          "Squid Game styling",
          "Responsive layout"
        ]
      },
      {
        name: "Modal",
        purpose: "Modal dialogs",
        features: [
          "Animations",
          "Backdrop",
          "Keyboard navigation"
        ]
      }
    ]
  }
}
```

### State Management

```typescript
{
  gameStore: {
    purpose: "Game state and mechanics",
    state: {
      isPlaying: "boolean - Game is active",
      isGameOver: "boolean - Player eliminated",
      isVictory: "boolean - Player won",
      detectionStatus: "'green' | 'yellow' | 'red' - Traffic light status",
      score: "number - Current score",
      highScore: "number - Highest score",
      streak: "number - Consecutive wins",
      difficulty: "'easy' | 'medium' | 'hard' - Game difficulty",
      isPracticeMode: "boolean - Practice mode enabled"
    },
    actions: [
      "startGame(): void - Start the game",
      "endGame(won: boolean): void - End the game",
      "quickRestart(): void - Restart instantly",
      "updateScore(points: number): void - Update score",
      "setDetectionStatus(status: string): void - Set traffic light",
      "setDifficulty(difficulty: string): void - Set difficulty",
      "togglePracticeMode(): void - Toggle practice mode"
    ],
    persistence: "LocalStorage",
    storageKey: "squid-game"
  },
  settingsStore: {
    purpose: "User preferences",
    state: {
      theme: "'dark' | 'light' | 'system' - Theme preference",
      volume: "number - Volume level (0-100)",
      showHelp: "boolean - Show help overlay"
    },
    actions: [
      "setTheme(theme: string): void - Set theme",
      "setVolume(volume: number): void - Set volume",
      "toggleHelp(): void - Toggle help",
      "initializeTheme(): void - Initialize theme"
    ],
    persistence: "LocalStorage",
    storageKey: "squid-game-settings"
  },
  statsStore: {
    purpose: "Game statistics",
    state: {
      totalGames: "number - Total games played",
      wins: "number - Games won",
      losses: "number - Games lost",
      playTime: "number - Total play time (seconds)",
      achievements: "Achievement[] - Unlocked achievements",
      perDifficultyHighScores: "Record<string, number> - High scores by difficulty"
    },
    actions: [
      "recordGame(won: boolean, duration: number): void - Record game result",
      "unlockAchievement(id: string): void - Unlock achievement",
      "getWinRate(): number - Calculate win rate",
      "getAveragePlayTime(): number - Calculate average play time"
    ],
    persistence: "LocalStorage",
    storageKey: "squid-game-stats"
  }
}
```

### Game Mechanics

```typescript
{
  gameCycle: {
    phases: [
      {
        phase: "Countdown",
        duration: "3 seconds",
        purpose: "Preparation time",
        visual: "3-2-1 countdown"
      },
      {
        phase: "Green Light",
        duration: "Random (based on difficulty)",
        purpose: "Player can move",
        visual: "Green background",
        action: "Player moves to finish line"
      },
      {
        phase: "Yellow Warning",
        duration: "0.5-1 second",
        purpose: "Warning before red light",
        visual: "Yellow background",
        action: "Player should stop moving"
      },
      {
        phase: "Red Light",
        duration: "Random (based on difficulty)",
        purpose: "Player must stop",
        visual: "Red background",
        detection: "Movement detection active",
        action: "Eliminated if moving"
      }
    ],
    difficulties: {
      easy: {
        greenDuration: "3-5 seconds",
        redDuration: "2-3 seconds",
        reactionTime: "0.5 second",
        points: "10 per crossing",
        highScore: "0"
      },
      medium: {
        greenDuration: "2-4 seconds",
        redDuration: "2-3 seconds",
        reactionTime: "0.3 second",
        points: "25 per crossing",
        highScore: "0"
      },
      hard: {
        greenDuration: "1-3 seconds",
        redDuration: "1-2 seconds",
        reactionTime: "0.2 second",
        points: "50 per crossing",
        highScore: "0"
      }
    }
  },
  detection: {
    type: "Movement detection",
    method: "Player position tracking",
    threshold: "Any movement during red light",
    result: "Elimination",
    practiceMode: "No elimination"
  },
  scoring: {
    crossing: "Points per crossing",
    streak: "Bonus for consecutive wins",
    difficulty: "Higher difficulty = more points",
    highScore: "Tracked per difficulty"
  }
}
```

### TypeScript Interfaces

```typescript
{
  types: {
    game: {
      GameState: {
        isPlaying: boolean
        isGameOver: boolean
        isVictory: boolean
        detectionStatus: 'green' | 'yellow' | 'red'
        score: number
        highScore: number
        streak: number
        difficulty: 'easy' | 'medium' | 'hard'
        isPracticeMode: boolean
      }
    },
    settings: {
      Settings: {
        theme: 'dark' | 'light' | 'system'
        volume: number
        showHelp: boolean
      }
    },
    stats: {
      Stats: {
        totalGames: number
        wins: number
        losses: number
        playTime: number
        achievements: Achievement[]
        perDifficultyHighScores: Record<string, number>
      }
    },
    achievement: {
      Achievement: {
        id: string
        name: string
        description: string
        tier: 'Common' | 'Rare' | 'Epic' | 'Legendary'
        unlocked: boolean
        progress: number
      }
    }
  }
}
```

### 3D Visualization

```typescript
{
  tresjs: {
    library: "TresJS (Declarative Three.js for Vue 3)",
    version: "4.3.0",
    setup: {
      canvas: "TresCanvas",
      controls: "OrbitControls",
      environment: "Stars + Sky",
      width: "100%",
      height: "100%"
    },
    components: [
      {
        name: "TresCanvas",
        purpose: "3D rendering canvas",
        features: [
          "Auto-resize",
          "Perspective camera",
          "WebGL renderer"
        ]
      },
      {
        name: "OrbitControls",
        purpose: "Camera controls",
        features: [
          "Mouse drag to rotate",
          "Scroll to zoom",
          "Auto-rotation"
        ]
      },
      {
        name: "Stars",
        purpose: "Starfield background",
        features: [
          "Random star positions",
          "Animated rotation",
          "Dystopian atmosphere"
        ]
      },
      {
        name: "Sky",
        purpose: "Sky background",
        features: [
          "Atmospheric gradient",
          "Dynamic lighting",
          "Color transitions"
        ]
      }
    ],
    interactions: [
      {
        type: "Camera Control",
        implementation: "OrbitControls",
        features: [
          "Mouse drag",
          "Touch drag",
          "Scroll zoom"
        ]
      },
      {
        type: "Player Detection",
        implementation: "Position tracking",
        features: [
          "Position monitoring",
          "Movement detection",
          "Red light elimination"
        ]
      }
    ]
  }
}
```

### Features Architecture

```typescript
{
  features: {
    gameModes: {
      normal: {
        purpose: "Standard gameplay",
        elimination: true,
        scoring: true,
        highScore: true
      },
      practice: {
        purpose: "Practice without pressure",
        elimination: false,
        scoring: false,
        highScore: false
      }
    },
    difficulties: {
      easy: {
        description: "More time to react",
        features: ["Longer cycles", "More reaction time", "Lower points"]
      },
      medium: {
        description: "Balanced gameplay",
        features: ["Moderate cycles", "Standard reaction time", "Standard points"]
      },
      hard: {
        description: "Ultimate challenge",
        features: ["Fast cycles", "Quick reaction time", "High points"]
      }
    },
    achievements: {
      purpose: "Track accomplishments",
      categories: [
        "First Win",
        "Win Streaks",
        "High Scores",
        "Total Games",
        "Speed Runner"
      ],
      tiers: [
        "Common",
        "Rare",
        "Epic",
        "Legendary"
      ],
      storage: "LocalStorage",
      tracking: "Progress tracking for each achievement"
    },
    statistics: {
      purpose: "Track performance",
      metrics: [
        "Total games played",
        "Win/Loss ratio",
        "Total play time",
        "Average play time",
        "Per-difficulty high scores",
        "Win streak"
      ],
      features: [
        "Detailed breakdown",
        "Historical data",
        "Trend analysis"
      ]
    },
    settings: {
      purpose: "Customize experience",
      options: [
        {
          name: "Theme",
          options: ["Dark", "Light", "System"],
          default: "Dark"
        },
        {
          name: "Volume",
          range: "0-100",
          default: "50"
        },
        {
          name: "Difficulty",
          options: ["Easy", "Medium", "Hard"],
          default: "Medium"
        }
      ]
    }
  }
}
```

### UI/UX Design

```typescript
{
  design: {
    aesthetic: "Squid Game inspired",
    features: [
      "Dystopian theme",
      "Pink/red/yellow palette",
      "Minimalist interface",
      "Dark mode (default)",
      "Smooth animations",
      "Psychological elements (streak counter)"
    ],
    colors: [
      {
        name: "Squid Pink",
        value: "#ed1b76 - Signature color"
      },
      {
        name: "Red Light",
        value: "#ef4444 - Danger/stop"
      },
      {
        name: "Yellow Warning",
        value: "#eab308 - Warning"
      },
      {
        name: "Green Light",
        value: "#22c55e - Safe/go"
      },
      {
        name: "Background",
        value: "#0a0a0f - Dark base"
      }
    ],
    animations: {
      library: "GSAP",
      types: [
        "Game over fade",
        "Victory celebration",
        "Traffic light transitions",
        "Button hover effects",
        "Streak counter animation"
      ]
    },
    responsiveness: {
      breakpoints: [
        "Mobile (320px)",
        "Tablet (768px)",
        "Desktop (1024px)",
        "Large (1280px)"
      ],
      features: [
        "Responsive grid",
        "Adaptive layouts",
        "Touch-friendly",
        "Keyboard navigation"
      ]
    }
  }
}
```

### Performance Optimization

```typescript
{
  performance: {
    strategies: [
      "Lazy loading components",
      "Debounced inputs",
      "LocalStorage persistence",
      "TresJS auto-disposal",
      "GSAP optimized animations",
      "Vue 3 reactivity optimization",
      "Code splitting"
    ],
    tresjs: {
      optimizations: [
        "Auto-disposal of 3D objects",
        "Efficient rendering",
        "Geometry reuse"
      ]
    },
    vue: {
      optimizations: [
        "Composition API efficiency",
        "Computed properties caching",
        "Watch debouncing",
        "Teleport performance"
      ]
    }
  }
}
```

### Error Handling

```typescript
{
  errorHandling: {
    user: {
      validation: "Input validation",
      features: [
        "Type checking",
        "Range validation",
        "Null checks",
        "Error boundaries"
      ]
    },
    game: {
      validation: "Game state validation",
      features: [
        "State consistency",
        "Prevent invalid transitions",
        "Graceful degradation"
      ]
    }
  }
}
```

### Accessibility

```typescript
{
  accessibility: {
    features: [
      "Keyboard navigation",
      "ARIA labels",
      "Screen reader support",
      "Focus management",
      "Color contrast",
      "Touch support"
    ],
    keyboard: {
      shortcuts: [
        "R - Quick restart",
        "P - Toggle practice mode",
        "ESC - Close modals",
        "Space - Pause/resume"
      ]
    }
  }
}
```

### Build Pipeline

```typescript
{
  build: {
    dev: "npm run dev (Vite dev server)",
    build: "npm run build (vue-tsc -b && vite build)",
    output: "dist/ directory",
    features: [
      "TypeScript compilation",
      "Vue SFC compilation",
      "Code splitting",
      "Tree-shaking",
      "Minification",
      "Optimized bundles"
    ]
  }
}
```

### CI/CD Pipeline

```yaml
Push to main → Build → Test → Deploy
     ↓          ↓        ↓        ↓
  Trigger    Vite      Vitest   Render
             Build     Tests     Deploy
```

- **Build**: Vite production build
- **Test**: Unit tests
- **Deploy**: Render deployment

### Environment Variables

```typescript
{
  envVariables: {
    VITE_APP_TITLE: "Application title",
    VITE_API_URL: "API base URL (optional)"
  }
}
```

### Deployment

```typescript
{
  deployment: {
    render: {
      url: "https://two8-game-squid-net.onrender.com",
      features: [
        "Automatic deployments",
        "HTTPS",
        "Global CDN",
        "Preview deployments"
      ],
      config: "render.yaml"
    }
  }
}
```

### Key Architectural Decisions

**Why TresJS for 3D?**
- Declarative Three.js for Vue 3
- Component-based 3D development
- Auto-disposal of 3D objects
- Type-safe API
- Seamless Vue integration

**Why Pinia for State Management?**
- Official Vue state management
- Simpler than Vuex
- Excellent TypeScript support
- Modular stores
- Built-in devtools

**Why Vue 3 Composition API?**
- Better code organization
- Reusable composables
- Improved TypeScript support
- Better performance
- Smaller bundle size

**Why GSAP for Animations?**
- High-performance animations
- Complex sequencing
- Timeline management
- Easy to use
- Great documentation

**Why Howler.js for Audio?**
- Cross-browser audio
- Audio sprites
- Volume control
- Mobile-friendly
- Reliable playback

**Why Tailwind CSS v4?**
- Zero config setup
- Modern features
- Dark mode support
- Custom themes
- Small bundle size

**Why Vite?**
- Fast development with HMR
- ESBuild-based for speed
- Optimized production builds
- Native ESM support
- Great Vue 3 integration

### Design Philosophy

```typescript
{
  design: {
    principles: [
      "Dystopian aesthetic",
      "Psychological gameplay",
      "Smooth animations",
      "Responsive design",
      "Accessible gameplay"
    ],
    gameplay: {
      focus: "Reaction time",
      elements: [
        "Red light/green light",
        "Yellow warning",
        "Streak counter",
        "Difficulty levels",
        "Practice mode"
      ]
    }
  }
}
```

### Extension Points

```typescript
{
  extensions: [
    "Multiplayer mode",
    "Leaderboard",
    "More game modes",
    "More achievements",
    "More difficulties",
    "Custom sounds",
    "3D character models",
    "More 3D environments",
    "VR support",
    "Mobile app"
  ]
}
```

---

## 🎮 Overview

This project is a high-fidelity recreation of the Red Light Green Light game using modern web technologies. It features:

- **3D Environment**: Immersive WebGL scene using TresJS
- **Reactive State**: Vue 3 Composition API with Pinia
- **Game Mechanics**: Full red light/green light cycle with detection
- **Accessibility**: Full keyboard navigation and ARIA support
- **Theming**: Dark/Light/System theme support
- **Persistence**: High scores and settings saved to localStorage

## ✨ Features

### Before → After

| Feature | Legacy | Upgraded (v1.0) |
|---------|--------|-----------------|
| **Framework** | Vanilla JS | Vue 3 + Vite |
| **3D Engine** | Basic Three.js | TresJS (Declarative) |
| **State** | Local state | Pinia stores |
| **Theming** | Single theme | Dark/Light/System |
| **Accessibility** | None | Full ARIA + Keyboard |
| **Persistence** | None | Settings + Stats |
| **Settings** | None | Full settings panel |
| **Game Modes** | 1 | 3 difficulty levels + Practice Mode |
| **Statistics** | None | Comprehensive stats |
| **Game Flow** | Instant start | Countdown + Yellow warning |

### New Features

- **3-2-1 Countdown**: Game starts with a 3-second countdown for preparation
- **Yellow Warning State**: Visual warning (yellow) before red light for better reaction time
- **Practice Mode**: Toggle practice mode to play without eliminations
- **Keyboard Shortcuts**: Press `P` to toggle practice mode instantly

## 🛠️ Tech Stack

- **Framework**: Vue 3.5 (Composition API, Script Setup)
- **3D Engine**: TresJS + Three.js
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **TypeScript**: Full type safety
- **Icons**: Lucide Vue Next
- **Animations**: CSS + GSAP
- **Audio**: Howler.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/28-game-squid-net.git
cd 28-game-squid-net

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Design Notes (V2)

### Intentional Quirk: The Survival Streak Counter
V2 adds a streak counter showing consecutive successful crossings. It serves no gameplay purpose—it's purely psychological. Humans love seeing numbers go up. The streak creates an "investment" feeling; players play longer to protect their streak. The number is meaningless, but the attachment is real.

### Tradeoff: Pre-determined Timing Patterns
The red/green timing follows predictable patterns (not pure random). This lets skilled players learn the rhythm. The tradeoff: memorization vs. reaction. Pure random feels fair but is frustrating. Pattern-based feels masterable. I chose the illusion of skill over true randomness.

### What I Chose NOT to Build
No "elimination" animation when caught. The screen simply fades to black. Graphic failure states would make the game feel punitive. The soft fade preserves dignity—you stopped, you weren't destroyed. Sometimes less drama is more respectful.

## 🎉 Additional Features (V3)

Three focused improvements to enhance replayability and convenience:

### Per-Difficulty High Scores
**Why added**: Previously, the game tracked a single high score regardless of difficulty. Easy mode scores couldn't compete with hard mode, making comparisons meaningless.

**What changed**: Each difficulty level (Easy, Medium, Hard) now maintains its own high score. The "Best" display updates based on your current difficulty, giving you meaningful goals at each skill level.

### Enhanced Win Streak
**Why added**: The V2 streak counter mentioned in design notes was a concept. V3 implements it fully with visual feedback.

**What changed**: Consecutive wins now build a streak counter displayed in the HUD with fire emojis (🔥). Streak persists across sessions via localStorage. Losing resets your streak to zero, creating stakes to protect it.

### Quick Restart (R Key)
**Why added**: After losing or winning, clicking "Try Again" requires mouse movement. For rapid practice sessions, keyboard-only is faster.

**What changed**: Press `R` during gameplay or after game over to instantly restart. Works during active games if you want to bail out, and on the victory/elimination screens for quick retries.

### Intentionally Rejected: Practice Mode Streaks
I considered tracking streaks separately for Practice Mode. Rejected because practice mode is meant for learning without pressure. Tracking streaks there would make practice feel like "real" games, defeating the purpose. Practice remains stress-free.

---

*Made by MK — Musharraf Kazi*

## 📝 License

MIT

---

*Last updated: 2026-03-01*

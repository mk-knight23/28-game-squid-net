# Squid Game: Red Light Green Light

A modern, production-quality web recreation of the iconic "Red Light Green Light" game from Netflix's Squid Game series. Built with React, TypeScript, Three.js, and Tailwind CSS.

![Squid Game Web](public/preview.png)

## Features

### Core Gameplay
- **Authentic Red Light Green Light mechanics** - Move when the doll faces away, freeze when she turns around
- **1-4 Player Support** - Play solo or compete with friends on the same device
- **Multiple Difficulty Levels** - Easy, Medium, Hard, and Extreme modes with varying timing challenges
- **Responsive Controls** - Keyboard support for desktop, touch controls for mobile

### Visual & Audio
- **3D Game Environment** - Immersive Three.js scene with animated doll character
- **Dynamic Lighting** - Real-time color changes based on game state
- **Smooth Animations** - Powered by Framer Motion for polished UI transitions
- **Sound Effects & Music** - Toggle-able audio with volume control

### User Experience
- **Dark/Light Mode** - Theme toggle for comfortable viewing
- **Persistent Stats** - Track your games played, wins, and best times
- **Mobile Responsive** - Fully playable on phones and tablets
- **Pause/Resume** - Take breaks without losing progress

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component library |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Three.js + React Three Fiber** | 3D graphics engine |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations |
| **Zustand** | State management |
| **Howler.js** | Audio management |

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mk-knight23/31-Squid-Game-Web.git

# Navigate to project directory
cd 31-Squid-Game-Web

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Controls

| Player | Desktop | Mobile |
|--------|---------|--------|
| Player 1 | ↑ Arrow | Touch Button 1 |
| Player 2 | W | Touch Button 2 |
| Player 3 | I | Touch Button 3 |
| Player 4 | Numpad 8 | Touch Button 4 |

**Gameplay Tips:**
- Hold the key/button to move forward
- Release immediately when the doll turns around
- Reach the finish line before time runs out
- Don't get caught moving during "Red Light"!

## Game Modes

### Classic Mode
Standard Red Light Green Light with configurable time limits based on difficulty.

### Difficulty Settings

| Difficulty | Time Limit | Detection Speed |
|------------|------------|-----------------|
| Easy | 30 seconds | Slow |
| Medium | 20 seconds | Normal |
| Hard | 15 seconds | Fast |
| Extreme | 10 seconds | Instant |

## Project Structure

```
src/
├── components/
│   ├── game/          # 3D game components
│   │   └── GameScene.tsx
│   └── ui/            # UI components
│       ├── StartModal.tsx
│       ├── GameOverModal.tsx
│       ├── SettingsPanel.tsx
│       ├── GameHUD.tsx
│       └── MobileControls.tsx
├── hooks/             # Custom React hooks
│   ├── useAudio.ts
│   └── useKeyboard.ts
├── stores/            # Zustand state stores
│   └── gameStore.ts
├── types/             # TypeScript definitions
│   └── game.ts
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Live Demo

[Play Now](https://mk-knight23.github.io/31-Squid-Game-Web)

## Screenshots

### Start Screen
Modern arcade-style interface with player and difficulty selection.

### Gameplay
3D environment with animated doll, progress bar, and player status.

### Game Over
Animated results screen with stats and replay options.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Netflix's Squid Game series
- Built with modern web technologies
- Sound effects from open-source audio libraries

---

Made with ❤️ by [MK Knight](https://github.com/mk-knight23)

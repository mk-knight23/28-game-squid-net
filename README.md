# 28-game-squid-net

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

![Game Screenshot](https://via.placeholder.com/800x450/0a0a0f/ed1b76?text=Squid+Game+Web)

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
git clone https://github.com/mk-knight23/31-Squid-Game-Web.git
cd 31-Squid-Game-Web

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file (optional):

```env
VITE_APP_TITLE=Squid Game Web
VITE_APP_DESCRIPTION=Red Light Green Light Game
```

## 🎯 How to Play

1. **Start Game**: Press `Space` or click "Start Game"
2. **Move Forward**: Press `↑` or `W` key, or tap the screen
3. **Red Light**: Stop moving immediately when you see red!
4. **Goal**: Reach the finish line before time runs out
5. **Lives**: You have 3 lives - get caught moving during red light and lose one

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start Game |
| `↑` / `W` | Move Forward |
| `Escape` | Reset Game |
| `M` | Toggle Sound |
| `T` | Toggle Theme |
| `P` | Toggle Practice Mode |
| `S` | Open Settings |

## 📁 Project Structure

```
31-Squid-Game-Web/
├── src/
│   ├── assets/           # Static assets
│   ├── components/
│   │   ├── game/         # Game-specific components
│   │   └── ui/           # Reusable UI components
│   ├── composables/      # Vue composables
│   │   ├── useAudio.ts
│   │   ├── useGameLogic.ts
│   │   ├── useGameLoop.ts
│   │   └── useKeyboardControls.ts
│   ├── stores/           # Pinia stores
│   │   ├── game.ts
│   │   ├── settings.ts
│   │   └── stats.ts
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── App.vue           # Main app component
│   ├── main.ts           # App entry point
│   └── style.css         # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🏗️ Architecture

### State Management

The app uses three Pinia stores:

1. **Game Store**: Manages game state, player progress, and game logic
2. **Settings Store**: Handles user preferences (sound, theme, difficulty)
3. **Stats Store**: Tracks player statistics and achievements

### Component Structure

- **App.vue**: Main game container with 3D scene and UI overlay
- **SettingsPanel.vue**: Settings and statistics modal
- **Modal.vue**: Reusable modal component

### 3D Scene

The game uses TresJS for declarative 3D rendering:

- Stars background
- Dynamic sky
- Player model (box)
- Ground plane
- Lighting system

## 🎨 Theming

The app supports three theme modes:

- **Dark**: Default dark theme
- **Light**: Light theme for bright environments
- **System**: Follows system preference

Toggle themes with the theme button or `T` key.

## ♿ Accessibility

This project is built with accessibility in mind:

- Full ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support
- High contrast mode support
- Focus management

## 📱 Responsive Design

The game is fully responsive:

- **Desktop**: Full keyboard and mouse support
- **Tablet**: Touch controls and responsive UI
- **Mobile**: Touch-optimized controls

## 🔧 Configuration

### Game Settings

| Setting | Options | Default |
|---------|---------|---------|
| Difficulty | Easy / Normal / Hard | Normal |
| Sound | On / Off | On |
| Music | On / Off | On |
| Vibrations | On / Off | On |
| Theme | Dark / Light / System | System |

### Build Configuration

The project uses Vite for fast builds:

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 📦 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

1. Build: `npm run build`
2. Output: `dist/` folder
3. Deploy to `gh-pages` branch

### Vercel

Deploy to Vercel with zero configuration:

```bash
npm i -g vercel
vercel
```

### Netlify

Deploy to Netlify:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [Wiki](https://github.com/mk-knight23/31-Squid-Game-Web/wiki)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/mk-knight23">mk-knight23</a>
</p>

---

### Live Demo
- GitHub Pages: <https://mk-knight23.github.io/31-Squid-Game-Web/>
- Vercel: [Deploy your own](https://vercel.com/new)
- Netlify: [Deploy your own](https://app.netlify.com/start)

---

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



## ✨ Features

This repository has been upgraded with the following features:

1. **Add Vue 3 Composition API** ✅
2. **Implement Pinia for state** ✅
3. **Add Vue Router guards** ✅
4. **Create composables** ✅
5. **Add Teleport and Suspense** ✅
6. **Implement v-model optimization** ✅
7. **Add TypeScript support** ✅
8. **Create reusable components** ✅
9. **Add transitions and animations** ✅
10. **Implement Vitest tests** ✅

## 📸 Screenshots

### Desktop View

![Desktop View](../../github-upgrades/screenshots/28-game-squid-net-desktop.png)

### Mobile View

![Mobile View](../../github-upgrades/screenshots/28-game-squid-net-mobile.png)


---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Tech Stack

- Modern web framework
- Optimized for performance
- Responsive design
- Accessibility ready

## 🛠️ Installation

```bash
git clone https://github.com/mk-knight23/28-game-squid-net.git
cd 28-game-squid-net
npm install
```

## 📝 License

MIT

---

*Last updated: 2026-02-27*

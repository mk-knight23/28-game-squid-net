<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useSettingsStore } from '@/stores/settings'
import { useKeyboardControls } from '@/composables/useKeyboardControls'
import { KEYBOARD_SHORTCUTS } from '@/utils/constants'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Stars, Sky } from '@tresjs/cientos'
import {
  Trophy,
  Timer,
  Activity,
  Settings,
  Moon,
  Sun,
} from 'lucide-vue-next'
import SettingsPanel from '@/components/ui/SettingsPanel.vue'

const gameStore = useGameStore()
const settingsStore = useSettingsStore()
const { registerShortcut } = useKeyboardControls()

const isMobile = ref(false)
const showSettings = ref(false)
const showHelp = ref(false)

// V3: Register restart shortcut
registerShortcut(KEYBOARD_SHORTCUTS.RESTART, () => {
  if (gameStore.isPlaying || gameStore.isGameOver || gameStore.isVictory) {
    gameStore.quickRestart()
  }
})

const detectionStatus = computed(() => gameStore.detectionStatus)

const backgroundClass = computed(() => {
  if (gameStore.isCountingDown) return 'bg-squid-pink/10'
  if (detectionStatus.value === 'red') return 'bg-red-950/20'
  if (detectionStatus.value === 'yellow') return 'bg-yellow-900/10'
  return 'bg-transparent'
})

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  settingsStore.initializeTheme()

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})

function handleStart(): void {
  gameStore.startGame()
}

function handleReset(): void {
  gameStore.resetGame()
}

function toggleTheme(): void {
  const themes: Array<'dark' | 'light' | 'system'> = ['dark', 'light', 'system']
  const currentIndex = themes.indexOf(settingsStore.settings.theme)
  const nextIndex = (currentIndex + 1) % themes.length
  settingsStore.setTheme(themes[nextIndex])
}

function getThemeIcon() {
  const theme = settingsStore.settings.theme
  if (theme === 'dark') return Moon
  if (theme === 'light') return Sun
  return Sun
}

const themeIcon = computed(getThemeIcon)
</script>

<template>
  <div 
    class="h-screen w-screen flex flex-col transition-colors duration-1000"
    :class="backgroundClass"
    role="application"
    aria-label="Squid Game - Red Light Green Light"
  >
    <!-- 3D Environment Layer -->
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <TresCanvas shadows alpha>
        <TresPerspectiveCamera :position="[0, 5, 10]" :look-at="[0, 0, 0]" />
        <OrbitControls :enable-zoom="false" />
        
        <Stars :radius="100" :depth="50" :count="2000" :factor="2" />
        <Sky :distance="450000" :sun-position="[0, -1, 0]" :inclination="0.5" :azimuth="0.25" />
        
        <TresAmbientLight :intensity="0.2" />
        <TresDirectionalLight :position="[2, 5, 2]" :intensity="0.5" cast-shadow />
        <TresSpotLight :position="[0, 10, 0]" :intensity="2" :angle="0.5" :penumbra="0.5" cast-shadow />

        <TresMesh :position="[0, -1, 0]" receive-shadow :rotation="[-Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[100, 100]" />
          <TresMeshStandardMaterial color="#050505" :roughness="1" />
        </TresMesh>

        <TresMesh :position="[0, 0, 5 - (gameStore.distance / 10)]" cast-shadow>
          <TresCapsuleGeometry :args="[0.3, 1, 4, 8]" />
          <TresMeshStandardMaterial
            :color="gameStore.isEliminated
              ? '#FF005A'
              : detectionStatus === 'yellow'
                ? '#FACD5D'
                : detectionStatus === 'red'
                  ? '#dc2626'
                  : '#037A76'"
            :emissive="gameStore.isEliminated ? '#FF005A' : '#000'"
            :emissiveIntensity="0.5"
          />
        </TresMesh>
      </TresCanvas>
    </div>

    <!-- UI Overlay Layer -->
    <div class="relative z-10 flex flex-col h-full pointer-events-none p-7 lg:p-9">
      
      <!-- HUD Top -->
      <header class="flex justify-between items-start w-full">
        <div class="glass-panel p-4 lg:p-6 flex items-center gap-6 border-l-4 border-l-squid-pink">
          <div class="flex flex-col">
            <span class="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">
              OPERATIVE_456
            </span>
            <div class="flex items-center gap-3">
              <span class="text-xl lg:text-2xl font-mono font-bold text-white uppercase tracking-tighter" :class="{ 'animate-pulse text-squid-pink': gameStore.isPlaying || gameStore.isCountingDown }">
                {{ gameStore.isPlaying || gameStore.isCountingDown ? 'STATUS:ACTIVE' : 'STATUS:STANDBY' }}
              </span>
            </div>
          </div>
          
          <div class="h-10 w-px bg-white/10"></div>
          
          <div class="flex flex-col">
            <span class="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-1">NETWORK_LATENCY</span>
            <div class="flex items-center gap-2">
              <Activity :size="14" class="text-squid-teal" />
              <span class="font-mono text-lg font-bold text-white">42ms</span>
            </div>
          </div>

          <div class="h-10 w-px bg-white/10"></div>

          <div class="flex flex-col items-center">
            <Timer :size="16" class="text-squid-pink mb-1" />
            <span class="font-mono text-xl font-bold text-white tracking-widest">
              {{ gameStore.formattedTime }}
            </span>
          </div>
        </div>

            <div 
              v-for="i in 3" 
              :key="i"
              class="w-8 h-1 transition-all duration-500"
              :class="i <= gameStore.lives ? 'bg-squid-pink shadow-[0_0_8px_rgba(255,0,90,0.6)]' : 'bg-white/10'"
            ></div>

        <div class="flex flex-col items-end gap-4">
          <div class="flex gap-2">
            <button 
              @click="toggleTheme"
              class="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              :aria-label="`Toggle theme. Current: ${settingsStore.settings.theme}`"
            >
              <component :is="themeIcon" :size="18" class="text-white" />
            </button>
            
            <button 
              @click="showSettings = true"
              class="p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Settings :size="18" class="text-white" />
            </button>
          </div>

          <div class="glass-panel px-4 py-2 flex items-center gap-3 text-white border-r-4 border-r-squid-teal">
            <Trophy :size="14" class="text-squid-yellow" />
            <span class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/60">
              PB: <span class="text-white">{{ gameStore.highScore }}</span>
            </span>
          </div>

          <div
            v-if="gameStore.isPlaying || gameStore.isCountingDown"
            class="px-8 py-2 border font-mono font-bold text-xs tracking-[0.3em] transition-all duration-300"
            :class="{
              'bg-red-600 text-white border-white animate-glitch': detectionStatus === 'red',
              'bg-yellow-500 text-black border-yellow-400': detectionStatus === 'yellow',
              'bg-squid-teal text-white border-white': detectionStatus === 'green',
              'bg-squid-pink text-white border-white animate-pulse': gameStore.isCountingDown
            }"
          >
            {{ gameStore.isCountingDown ? `INIT_SEQ_${gameStore.countdown}` : detectionStatus === 'red' ? 'EYES_ON_YOU' : detectionStatus === 'yellow' ? 'CALIBRATING' : 'PROCEED' }}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 flex items-center justify-center">
        <!-- Countdown Overlay -->
        <div
          v-if="gameStore.isCountingDown"
          class="text-center"
          role="status"
          aria-live="assertive"
        >
          <div class="text-9xl lg:text-[12rem] font-mono font-bold text-squid-pink animate-pulse">
            {{ gameStore.countdown }}
          </div>
          <p class="text-xl lg:text-2xl font-mono font-bold text-white uppercase tracking-widest mt-4">
            INITIATING SEQUENCE
          </p>
        </div>

        <!-- Start Screen -->
        <div 
          v-if="gameStore.isIdle" 
          class="glass-panel p-10 lg:p-14 text-center border-t-2 border-t-squid-pink pointer-events-auto max-w-lg"
        >
          <div class="space-y-4 mb-10">
            <div class="inline-block px-3 py-1 bg-squid-pink text-[10px] font-mono font-bold text-white tracking-[0.5em] uppercase mb-4">
              Authorized Personnel Only
            </div>
            <h1 class="text-5xl lg:text-7xl font-mono font-bold tracking-tighter uppercase leading-none text-white">
              SQUID_<span class="text-squid-pink">NET</span>
            </h1>
            <p class="text-xs font-mono font-bold text-white/40 uppercase tracking-[0.4em]">
              High-Stakes Survival Simulation
            </p>
          </div>

          <div class="flex flex-col gap-4">
            <button 
              @click="handleStart"
              class="btn-squid-primary group relative overflow-hidden"
            >
              <span class="relative z-10 transition-transform group-hover:scale-110 block">INITIALIZE_SURVIVAL</span>
            </button>
            
            <button 
              @click="showSettings = true"
              class="btn-squid-outline"
            >
              TERMINAL_CONFIG
            </button>
          </div>

          <p class="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.2em] mt-10">
            [SPACE] INITIALIZE • [R] REBOOT • [ESC] ABORT
          </p>
        </div>

        <!-- Game Over Modal -->
        <div 
          v-if="gameStore.isGameOver" 
          class="glass-panel p-10 lg:p-14 text-center border-t-2 border-t-red-600 bg-red-950/20 pointer-events-auto max-w-lg"
        >
          <div class="inline-block px-3 py-1 bg-red-600 text-[10px] font-mono font-bold text-white tracking-[0.5em] uppercase mb-8">
            Termination Confirmed
          </div>
          
          <div class="space-y-2 mb-10">
            <h2 class="text-5xl lg:text-6xl font-mono font-bold text-white uppercase italic tracking-tighter">
              ELIMINATED
            </h2>
            <p class="text-xs font-mono font-bold uppercase tracking-[0.3em] text-red-400/60">
              Movement Threshold Exceeded
            </p>
          </div>

          <div class="grid grid-cols-2 gap-px bg-white/5 mb-10">
            <div class="p-6 bg-black/40">
              <p class="text-[10px] uppercase font-mono tracking-widest text-white/30 mb-2">SCORE_VAL</p>
              <p class="text-3xl font-mono font-bold text-white">{{ gameStore.distance }}</p>
            </div>
            <div class="p-6 bg-black/40">
              <p class="text-[10px] uppercase font-mono tracking-widest text-white/30 mb-2">BEST_VAL</p>
              <p class="text-3xl font-mono font-bold text-white">{{ gameStore.highScore }}</p>
            </div>
          </div>

          <button @click="handleReset" class="btn-squid-primary w-full">
            REBOOT_SESSION
          </button>
        </div>

        <!-- Victory Modal -->
        <div 
          v-if="gameStore.isVictory" 
          class="glass-panel p-10 lg:p-14 text-center border-t-2 border-t-squid-teal bg-teal-950/20 pointer-events-auto max-w-lg"
        >
          <div class="inline-block px-3 py-1 bg-squid-teal text-[10px] font-mono font-bold text-white tracking-[0.5em] uppercase mb-8">
            Survival Protocol Success
          </div>
          
          <div class="space-y-2 mb-10">
            <h2 class="text-5xl lg:text-6xl font-mono font-bold text-white uppercase italic tracking-tighter">
              SURVIVED
            </h2>
            <p class="text-xs font-mono font-bold uppercase tracking-[0.3em] text-squid-teal/60">
              Objective Reached
            </p>
          </div>

          <div class="glass-panel p-8 mb-10 border-none bg-white/5">
            <p class="text-[10px] uppercase font-mono tracking-widest text-white/30 mb-2">TOTAL_SCORE</p>
            <p class="text-5xl font-mono font-bold text-white text-glow-teal">{{ gameStore.score }}</p>
          </div>

          <button @click="handleReset" class="btn-squid-secondary w-full">
            NEXT_LEVEL
          </button>
        </div>
      </main>

      <!-- HUD Bottom -->
      <footer class="flex justify-between items-end w-full mt-auto">
        <div class="flex flex-col gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-white/20">
          <span>© 2026 SQUID_NET // PROXY_NODE_MK</span>
          <div class="flex items-center gap-4">
            <span class="text-squid-pink">SECURE_CHANNEL: ACTIVE</span>
            <span class="text-squid-teal">ENCRYPTION: AES-256</span>
          </div>
        </div>
 
        <div v-if="gameStore.isPlaying" class="pointer-events-auto flex flex-col items-end gap-4">
          <div class="glass-panel px-4 py-2 flex items-center gap-4 border-none bg-white/5">
            <span class="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Progress_Map</span>
            <div class="w-48 h-1 bg-white/10 overflow-hidden">
              <div 
                class="h-full bg-squid-pink transition-all duration-300"
                :style="{ width: `${gameStore.progress}%` }"
              ></div>
            </div>
            <span class="text-[10px] font-mono font-bold text-white">{{ Math.round(gameStore.progress) }}%</span>
          </div>
          
          <button 
            @click="gameStore.moveForward(10)"
            class="group relative w-20 h-20 bg-black border border-white/20 hover:border-squid-pink flex items-center justify-center overflow-hidden"
          >
            <div class="absolute inset-0 bg-squid-pink opacity-0 group-active:opacity-20 transition-opacity"></div>
            <Activity :size="28" class="text-white relative z-10 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </footer>

    </div>

    <!-- Modals -->
    <SettingsPanel 
      v-model:show="showSettings" 
      v-model:showHelp="showHelp"
    />
  </div>
</template>

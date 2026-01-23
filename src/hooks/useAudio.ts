import { useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';
import { useGameStore } from '@/stores/gameStore';

interface AudioFiles {
  background: Howl | null;
  win: Howl | null;
  lose: Howl | null;
  countdown: Howl | null;
  click: Howl | null;
}

export function useAudio() {
  const { settings } = useGameStore();
  const audioRef = useRef<AudioFiles>({
    background: null,
    win: null,
    lose: null,
    countdown: null,
    click: null,
  });

  useEffect(() => {
    // Initialize audio files
    audioRef.current = {
      background: new Howl({
        src: ['/audio/background.mp3'],
        loop: true,
        volume: settings.volume * 0.5,
      }),
      win: new Howl({
        src: ['/audio/win.mp3'],
        volume: settings.volume,
      }),
      lose: new Howl({
        src: ['/audio/lose.mp3'],
        volume: settings.volume,
      }),
      countdown: new Howl({
        src: ['/audio/countdown.mp3'],
        volume: settings.volume,
      }),
      click: new Howl({
        src: ['/audio/click.mp3'],
        volume: settings.volume * 0.3,
      }),
    };

    return () => {
      // Cleanup
      Object.values(audioRef.current).forEach((howl) => {
        howl?.unload();
      });
    };
  }, []);

  // Update volumes when settings change
  useEffect(() => {
    if (audioRef.current.background) {
      audioRef.current.background.volume(settings.musicEnabled ? settings.volume * 0.5 : 0);
    }
    Object.entries(audioRef.current).forEach(([key, howl]) => {
      if (key !== 'background' && howl) {
        howl.volume(settings.soundEnabled ? settings.volume : 0);
      }
    });
  }, [settings.volume, settings.soundEnabled, settings.musicEnabled]);

  const playBackground = useCallback(() => {
    if (settings.musicEnabled && audioRef.current.background) {
      audioRef.current.background.play();
    }
  }, [settings.musicEnabled]);

  const stopBackground = useCallback(() => {
    audioRef.current.background?.stop();
  }, []);

  const playWin = useCallback(() => {
    if (settings.soundEnabled) {
      audioRef.current.win?.play();
    }
  }, [settings.soundEnabled]);

  const playLose = useCallback(() => {
    if (settings.soundEnabled) {
      audioRef.current.lose?.play();
    }
  }, [settings.soundEnabled]);

  const playCountdown = useCallback(() => {
    if (settings.soundEnabled) {
      audioRef.current.countdown?.play();
    }
  }, [settings.soundEnabled]);

  const playClick = useCallback(() => {
    if (settings.soundEnabled) {
      audioRef.current.click?.play();
    }
  }, [settings.soundEnabled]);

  return {
    playBackground,
    stopBackground,
    playWin,
    playLose,
    playCountdown,
    playClick,
  };
}

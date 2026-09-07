import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  particlesEnabled: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleParticles: () => void;
  setParticlesEnabled: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      particlesEnabled: true,
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      setTheme: (theme) => set({ theme }),
      toggleParticles: () => set((state) => ({ 
        particlesEnabled: !state.particlesEnabled 
      })),
      setParticlesEnabled: (enabled) => set({ particlesEnabled: enabled }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

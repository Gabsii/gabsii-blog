'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)


const STORAGE_KEY = 'theme'

// localStorage is the source of truth for the theme, so it is read through
// useSyncExternalStore rather than mirrored into state via an effect.
const listeners = new Set<() => void>()

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange)
  // `storage` fires for changes made in other tabs, keeping them in sync.
  window.addEventListener('storage', onStoreChange)

  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

const getSnapshot = (): Theme => {
  const savedTheme = localStorage.getItem(STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// The server has no access to localStorage or the OS preference; React
// re-renders with the real value straight after hydration.
const getServerSnapshot = (): Theme => 'light'

const setStoredTheme = (theme: Theme) => {
  localStorage.setItem(STORAGE_KEY, theme)
  listeners.forEach(listener => listener())
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // The colours themselves live in globals.css, keyed off this attribute. Writing
  // them as inline styles here is what used to beat the media query and flash.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setStoredTheme(getSnapshot() === 'light' ? 'dark' : 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

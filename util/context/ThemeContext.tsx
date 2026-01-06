'use client'

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

// pick any colors you like – these should match what you want for light/dark
const LIGHT_PRIMARY = '#fffbee'
const LIGHT_SECONDARY = '#242424'
const DARK_PRIMARY = '#242424'
const DARK_SECONDARY = '#fffbee'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light')

  // initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    }
  }, [])

  // apply theme -> update app variables
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const rootStyle = document.documentElement.style

    if (theme === 'light') {
      rootStyle.setProperty('--app-color-primary', LIGHT_PRIMARY)
      rootStyle.setProperty('--app-color-secondary', LIGHT_SECONDARY)
    } else {
      rootStyle.setProperty('--app-color-primary', DARK_PRIMARY)
      rootStyle.setProperty('--app-color-secondary', DARK_SECONDARY)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

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

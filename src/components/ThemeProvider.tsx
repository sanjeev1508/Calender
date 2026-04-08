'use client'

import { useEffect } from 'react'
import { useCalendarStore } from '@/store/calendarStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useCalendarStore((state) => state.themeMode)
  const setThemeMode = useCalendarStore((state) => state.setThemeMode)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('cal-theme')
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const nextTheme = stored === 'dark' || stored === 'light' ? stored : systemPref
    setThemeMode(nextTheme)
  }, [setThemeMode])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = themeMode
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
    window.localStorage.setItem('cal-theme', themeMode)
  }, [themeMode])

  return <>{children}</>
}

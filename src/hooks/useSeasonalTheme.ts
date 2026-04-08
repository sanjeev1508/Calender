import { useEffect } from 'react'
import { MONTHLY_PALETTES } from '@/lib/seasonalPalettes'

export function useSeasonalTheme(currentMonth: Date) {
  useEffect(() => {
    const palette = MONTHLY_PALETTES[currentMonth.getMonth()]
    const root = document.documentElement
    if (!palette) return
    root.style.setProperty('--cal-accent', palette.accent)
    root.style.setProperty('--cal-bg', palette.bg)
    root.style.setProperty('--cal-text', palette.text)
    root.style.setProperty('--cal-surface', palette.surface)
    root.style.setProperty('--transition-duration', '500ms')
    root.style.transition = 'background-color 500ms ease, color 500ms ease'
  }, [currentMonth])
}

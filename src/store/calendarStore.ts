import { create } from 'zustand'
import type { SelectionState } from '@/types'

interface CalendarState {
  currentMonth: Date
  selectionState: SelectionState
  startDate: Date | null
  endDate: Date | null
  hoverDate: Date | null
  themeMode: 'light' | 'dark'
  setCurrentMonth: (date: Date) => void
  nextMonth: () => void
  prevMonth: () => void
  setSelectionState: (state: SelectionState) => void
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setHoverDate: (date: Date | null) => void
  resetSelection: () => void
  setThemeMode: (mode: 'light' | 'dark') => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentMonth: new Date(),
  selectionState: 'idle',
  startDate: null,
  endDate: null,
  hoverDate: null,
  themeMode: 'light',
  setCurrentMonth: (date) => set({ currentMonth: date }),
  nextMonth: () => set((state) => ({ currentMonth: new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 1) })),
  prevMonth: () => set((state) => ({ currentMonth: new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() - 1, 1) })),
  setSelectionState: (selectionState) => set({ selectionState }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setHoverDate: (hoverDate) => set({ hoverDate }),
  resetSelection: () => set({ selectionState: 'idle', startDate: null, endDate: null, hoverDate: null }),
  setThemeMode: (mode) => set({ themeMode: mode }),
}))

import { useMemo } from 'react'
import { startOfMonth } from 'date-fns'
import { useCalendarStore } from '@/store/calendarStore'
import { getCalendarGrid, formatMonthYear, monthKeyFromDate } from '@/lib/utils'
import type { Holiday } from '@/types'

export function useCalendar(holidays: Holiday[] = [], noteDates: string[] = []) {
  const currentMonth = useCalendarStore((state) => state.currentMonth)
  const nextMonth = useCalendarStore((state) => state.nextMonth)
  const prevMonth = useCalendarStore((state) => state.prevMonth)
  const setCurrentMonth = useCalendarStore((state) => state.setCurrentMonth)

  const monthLabel = useMemo(() => formatMonthYear(currentMonth), [currentMonth])
  const monthKey = useMemo(() => monthKeyFromDate(currentMonth), [currentMonth])
  const grid = useMemo(() => getCalendarGrid(currentMonth, holidays, noteDates), [currentMonth, holidays, noteDates])
  const focusedMonth = useMemo(() => startOfMonth(currentMonth), [currentMonth])

  function goToMonth(monthIndex: number) {
    const next = new Date(currentMonth.getFullYear(), monthIndex, 1)
    setCurrentMonth(next)
  }

  return {
    currentMonth,
    monthLabel,
    monthKey,
    grid,
    nextMonth,
    prevMonth,
    goToMonth,
    focusedMonth,
  }
}

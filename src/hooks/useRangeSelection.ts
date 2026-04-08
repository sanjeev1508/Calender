import { useCallback, useMemo } from 'react'
import { isSameDay } from 'date-fns'
import { useCalendarStore } from '@/store/calendarStore'
import { normalizeDate, toDateString, isSameOrAfter, isSameOrBefore } from '@/lib/utils'
import type { DateRange } from '@/types'

export function useRangeSelection() {
  const selectionState = useCalendarStore((state) => state.selectionState)
  const startDate = useCalendarStore((state) => state.startDate)
  const endDate = useCalendarStore((state) => state.endDate)
  const hoverDate = useCalendarStore((state) => state.hoverDate)
  const setSelectionState = useCalendarStore((state) => state.setSelectionState)
  const setStartDate = useCalendarStore((state) => state.setStartDate)
  const setEndDate = useCalendarStore((state) => state.setEndDate)
  const setHoverDate = useCalendarStore((state) => state.setHoverDate)
  const resetSelection = useCalendarStore((state) => state.resetSelection)

  const selectedRange = useMemo(() => {
    if (!startDate || !endDate) return null
    return { start: startDate, end: endDate }
  }, [startDate, endDate])

  const previewRange = useMemo(() => {
    if (!startDate || endDate || !hoverDate) return null
    if (isSameOrAfter(hoverDate, startDate)) {
      return { start: startDate, end: hoverDate }
    }
    return null
  }, [startDate, endDate, hoverDate])

  const handleSelectDate = useCallback(
    (date: Date) => {
      const normalized = normalizeDate(date)
      if (selectionState === 'idle') {
        setStartDate(normalized)
        setEndDate(null)
        setSelectionState('selecting')
        return
      }

      if (selectionState === 'selecting' && startDate) {
        if (isSameDay(normalized, startDate)) {
          resetSelection()
          return
        }

        if (isSameOrAfter(normalized, startDate)) {
          setEndDate(normalized)
          setSelectionState('selected')
          setHoverDate(null)
          return
        }

        setStartDate(normalized)
        setHoverDate(null)
        return
      }

      if (selectionState === 'selected') {
        setStartDate(normalized)
        setEndDate(null)
        setSelectionState('selecting')
        setHoverDate(null)
      }
    },
    [resetSelection, selectionState, setEndDate, setHoverDate, setSelectionState, setStartDate, startDate],
  )

  const handleHoverDate = useCallback(
    (date: Date | null) => {
      if (selectionState !== 'selecting' || !startDate) {
        setHoverDate(null)
        return
      }
      setHoverDate(date ? normalizeDate(date) : null)
    },
    [selectionState, setHoverDate, startDate],
  )

  const clearSelection = useCallback(() => {
    resetSelection()
  }, [resetSelection])

  const getDateState = useCallback(
    (date: Date) => {
      if (!startDate) return 'default'
      const normalized = normalizeDate(date)
      if (startDate && !endDate && isSameDay(normalized, startDate)) return 'start'
      if (selectedRange && isSameDay(normalized, selectedRange.start)) return 'start'
      if (selectedRange && isSameDay(normalized, selectedRange.end)) return 'end'
      if (selectedRange && isSameOrAfter(normalized, selectedRange.start) && isSameOrBefore(normalized, selectedRange.end)) return 'in-range'
      if (previewRange && (isSameDay(normalized, previewRange.start) || isSameDay(normalized, previewRange.end))) return 'hover-preview'
      if (previewRange && isSameOrAfter(normalized, previewRange.start) && isSameOrBefore(normalized, previewRange.end)) return 'hover-preview'
      if (endDate && isSameDay(normalized, endDate)) return 'end'
      return 'default'
    },
    [endDate, previewRange, selectedRange, startDate],
  )

  return {
    selectionState,
    startDate,
    endDate,
    hoverDate,
    selectedRange,
    previewRange,
    handleSelectDate,
    handleHoverDate,
    clearSelection,
    getDateState,
  }
}

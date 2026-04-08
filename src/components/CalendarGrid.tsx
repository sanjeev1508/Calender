'use client'

import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { format, isToday } from 'date-fns'
import type { DayMeta } from '@/types'
import { DayCell } from './DayCell'

interface CalendarGridProps {
  grid: DayMeta[][]
  onSelect: (date: Date) => void
  onHover: (date: Date | null) => void
  onClearSelection: () => void
  getDateState: (date: Date) => DayMeta['state']
}

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function CalendarGrid({ grid, onSelect, onHover, onClearSelection, getDateState }: CalendarGridProps) {
  const flatDays = useMemo(() => grid.flat(), [grid])
  const todayKey = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])
  const [focusedKey, setFocusedKey] = useState<string>(todayKey)

  useEffect(() => {
    const active = flatDays.find((day) => format(day.date, 'yyyy-MM-dd') === todayKey) || flatDays[0]
    setFocusedKey(format(active.date, 'yyyy-MM-dd'))
  }, [flatDays, todayKey])

  useEffect(() => {
    const node = document.querySelector(`[data-day="${focusedKey}"]`) as HTMLElement | null
    node?.focus()
  }, [focusedKey])

  const focusIndex = flatDays.findIndex((day) => format(day.date, 'yyyy-MM-dd') === focusedKey)

  function moveFocus(offset: number) {
    const nextIndex = Math.max(0, Math.min(flatDays.length - 1, focusIndex + offset))
    setFocusedKey(format(flatDays[nextIndex].date, 'yyyy-MM-dd'))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault(); moveFocus(1); break
      case 'ArrowLeft':
        event.preventDefault(); moveFocus(-1); break
      case 'ArrowDown':
        event.preventDefault(); moveFocus(7); break
      case 'ArrowUp':
        event.preventDefault(); moveFocus(-7); break
      case 'Enter':
      case ' ': {
        event.preventDefault()
        const active = flatDays[focusIndex]
        if (active) onSelect(active.date)
        break
      }
      case 'Escape':
        event.preventDefault()
        onClearSelection()
        break
      default:
        break
    }
  }

  return (
    <div className="rounded-4xl border border-white/10 bg-[var(--cal-surface)] p-4 shadow-calendar paper-noise" role="grid" aria-label="Calendar month" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="mb-3 grid grid-cols-7 gap-2 text-center text-[0.76rem] uppercase tracking-[0.18em] text-[var(--cal-muted)]">
        {dayLabels.map((day) => (
          <div key={day} role="columnheader">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {grid.map((week, weekIndex) =>
          week.map((day) => {
            const key = format(day.date, 'yyyy-MM-dd')
            const computedState = day.state === 'outside-month' ? 'outside-month' : getDateState(day.date)
            const finalState = computedState === 'default' && isToday(day.date) ? 'today' : computedState
            return (
              <DayCell
                key={key}
                date={day.date}
                state={finalState}
                holiday={day.holiday}
                hasNote={day.hasNote}
                onSelect={onSelect}
                onHover={onHover}
                isFocused={focusedKey === key}
              />
            )
          }),
        )}
      </div>
    </div>
  )
}

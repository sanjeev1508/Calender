'use client'

import { format, isToday } from 'date-fns'
import type { DayMeta } from '@/types'
import { HolidayBadge } from './HolidayBadge'

interface DayCellProps {
  date: Date
  state: 'default' | 'today' | 'start' | 'end' | 'in-range' | 'hover-preview' | 'outside-month' | 'disabled'
  holiday?: DayMeta['holiday']
  hasNote?: boolean
  onSelect: (date: Date) => void
  onHover: (date: Date | null) => void
  isFocused?: boolean
}

export function DayCell({ date, state, holiday, hasNote, onSelect, onHover, isFocused }: DayCellProps) {
  const label = `${format(date, 'EEEE, MMMM d, yyyy')}${holiday ? `, ${holiday.name}` : ''}`
  const isTodayDate = isToday(date)

  const baseStyles = 'group relative flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border border-transparent text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cal-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cal-bg)]'
  const stateStyles = {
    default: 'bg-transparent text-[var(--cal-text)] hover:bg-[var(--cal-accent)]/10',
    today: 'bg-[var(--cal-accent)]/10 text-[var(--cal-text)] ring-1 ring-[var(--cal-accent)]/25',
    start: 'bg-[var(--cal-accent)] text-white shadow-sm',
    end: 'bg-[var(--cal-accent)] text-white shadow-sm',
    'in-range': 'bg-[var(--cal-accent)]/15 text-[var(--cal-text)] rounded-none',
    'hover-preview': 'bg-[var(--cal-accent)]/10 text-[var(--cal-text)] rounded-none',
    'outside-month': 'text-slate-400 opacity-60 hover:bg-transparent cursor-default',
    disabled: 'cursor-not-allowed opacity-40',
  }

  const classes = `${baseStyles} ${stateStyles[state] ?? stateStyles.default}`

  return (
    <button
      type="button"
      role="gridcell"
      aria-label={label}
      aria-current={isTodayDate ? 'date' : undefined}
      className={classes}
      data-day={format(date, 'yyyy-MM-dd')}
      onClick={() => onSelect(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      tabIndex={isFocused ? 0 : -1}
    >
      {holiday && <HolidayBadge holiday={holiday} />}
      <span className="relative z-10 flex items-center justify-center rounded-full px-2 py-1">
        {format(date, 'd')}
      </span>
      {hasNote && <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-[var(--cal-accent)] shadow-sm" />}
    </button>
  )
}

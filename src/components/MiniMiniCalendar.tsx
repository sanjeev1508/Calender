'use client'

import { format, getDay, getDaysInMonth } from 'date-fns'
import type { Holiday } from '@/types'

interface MiniMiniCalendarProps {
  year: number
  activeMonth: number
  onMonthSelect: (month: number) => void
  holidays: Holiday[]
}

export function MiniMiniCalendar({ year, activeMonth, onMonthSelect, holidays }: MiniMiniCalendarProps) {
  const months = Array.from({ length: 12 }, (_, month) => new Date(year, month, 1))

  return (
    <section className="mt-8 overflow-x-auto pb-4">
      <div className="flex min-w-full gap-4">
        {months.map((monthDate, index) => {
          const monthStart = getDay(monthDate)
          const days = getDaysInMonth(monthDate)
          const holidayDates = holidays.filter((holiday) => holiday.date.startsWith(format(monthDate, 'yyyy-MM'))).map((holiday) => Number(holiday.date.slice(-2)))
          return (
            <button
              type="button"
              key={index}
              onClick={() => onMonthSelect(index)}
              className={`group flex min-w-[136px] flex-col gap-3 rounded-3xl border p-3 text-left transition ${index === activeMonth ? 'border-[var(--cal-accent)] bg-[var(--cal-surface)] shadow-lg' : 'border-white/10 bg-white/80 hover:border-[var(--cal-accent)]'}`}
            >
              <span className="text-xs uppercase tracking-[0.22em] text-[var(--cal-muted)]">{format(monthDate, 'MMM')}</span>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 42 }).map((_, cellIndex) => {
                  const day = cellIndex - monthStart + 1
                  const isVisible = day > 0 && day <= days
                  const isHoliday = isVisible && holidayDates.includes(day)
                  return (
                    <span key={cellIndex} className={`h-2.5 w-2.5 rounded-full ${isVisible ? 'bg-slate-200' : 'bg-transparent'} ${isHoliday ? 'border border-amber-500 bg-amber-400' : ''}`} />
                  )
                })}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

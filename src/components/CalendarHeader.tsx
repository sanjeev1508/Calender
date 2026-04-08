'use client'

import { ArrowLeft, ArrowRight, Moon, Sun, LayoutDashboard, LayoutList } from 'lucide-react'

interface CalendarHeaderProps {
  monthLabel: string
  themeMode: 'light' | 'dark'
  onPrev: () => void
  onNext: () => void
  onToggleTheme: () => void
  viewMode: 'calendar' | 'overview'
  onToggleView: () => void
}

export function CalendarHeader({ monthLabel, themeMode, onPrev, onNext, onToggleTheme, viewMode, onToggleView }: CalendarHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-[var(--cal-muted)]">Wall calendar</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--cal-text)] sm:text-4xl">{monthLabel}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onPrev} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/80 text-[var(--cal-text)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:bg-slate-900/80 dark:text-white">
          <ArrowLeft size={18} />
        </button>
        <button type="button" onClick={onNext} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/80 text-[var(--cal-text)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:bg-slate-900/80 dark:text-white">
          <ArrowRight size={18} />
        </button>
        <button type="button" onClick={onToggleView} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[var(--cal-surface)] px-4 py-2 text-sm font-medium text-[var(--cal-text)] shadow-sm transition hover:shadow-md">
          {viewMode === 'calendar' ? <LayoutList size={16} /> : <LayoutDashboard size={16} />}
          {viewMode === 'calendar' ? 'Year view' : 'Month view'}
        </button>
        <button type="button" onClick={onToggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cal-surface)] text-[var(--cal-text)] shadow-sm transition hover:-translate-y-0.5">
          {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

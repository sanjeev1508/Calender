'use client'

import { useEffect, useMemo, useState } from 'react'
import { format, getYear } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useCalendar } from '@/hooks/useCalendar'
import { useHolidays } from '@/hooks/useHolidays'
import { useNotes } from '@/hooks/useNotes'
import { useRangeSelection } from '@/hooks/useRangeSelection'
import { useSeasonalTheme } from '@/hooks/useSeasonalTheme'
import { useCalendarStore } from '@/store/calendarStore'
import { getCalendarGrid } from '@/lib/utils'
import { MONTHLY_PALETTES } from '@/lib/seasonalPalettes'
import { CalendarHeader } from './CalendarHeader'
import { CalendarGrid } from './CalendarGrid'
import { HeroImagePanel } from './HeroImagePanel'
import { NotesPanel } from './NotesPanel'
import { MiniMiniCalendar } from './MiniMiniCalendar'
import { PageFlipTransition } from './PageFlipTransition'

export function CalendarApp() {
  const [viewMode, setViewMode] = useState<'calendar' | 'overview'>('calendar')
  const [notesOpen, setNotesOpen] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const themeMode = useCalendarStore((state) => state.themeMode)
  const setThemeMode = useCalendarStore((state) => state.setThemeMode)

  const { holidays } = useHolidays(getYear(new Date()))
  const rangeSelection = useRangeSelection()
  const { currentMonth, monthLabel, monthKey, nextMonth, prevMonth, goToMonth } = useCalendar(holidays)
  useSeasonalTheme(currentMonth)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const rangeKey = useMemo(() => {
    if (!rangeSelection.selectedRange) return undefined
    return `${format(rangeSelection.selectedRange.start, 'yyyy-MM-dd')}_${format(rangeSelection.selectedRange.end, 'yyyy-MM-dd')}`
  }, [rangeSelection.selectedRange])

  const { monthNotes, rangeNotes, noteDates, addNote, removeNote } = useNotes(monthKey, rangeKey)
  const grid = useMemo(() => getCalendarGrid(currentMonth, holidays, noteDates), [currentMonth, holidays, noteDates])

  const heroUrl = useMemo(() => MONTHLY_PALETTES[currentMonth.getMonth()]?.hero ?? MONTHLY_PALETTES[0].hero, [currentMonth])

  const handleToggleTheme = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  const handleToggleView = () => setViewMode((mode) => (mode === 'calendar' ? 'overview' : 'calendar'))

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 lg:grid lg:grid-cols-[40%_60%] lg:items-start">
        <div className="space-y-6">
          <CalendarHeader monthLabel={monthLabel} themeMode={themeMode} onPrev={prevMonth} onNext={nextMonth} onToggleTheme={handleToggleTheme} viewMode={viewMode} onToggleView={handleToggleView} />
          <HeroImagePanel imageUrl={heroUrl} monthLabel={monthLabel} />
        </div>

        <div className="space-y-6">
          <section className="rounded-[2.5rem] border border-white/10 bg-[var(--cal-surface)] p-5 shadow-calendar">
            <PageFlipTransition transitionKey={monthKey}>
              <CalendarGrid grid={grid} onSelect={rangeSelection.handleSelectDate} onHover={rangeSelection.handleHoverDate} onClearSelection={rangeSelection.clearSelection} getDateState={rangeSelection.getDateState} />
            </PageFlipTransition>
            <div className="mt-4 flex items-center justify-between text-sm text-[var(--cal-muted)]">
              <p>{rangeSelection.selectedRange ? `${format(rangeSelection.selectedRange.start, 'MMM d')} → ${format(rangeSelection.selectedRange.end, 'MMM d')}` : 'Select a start date to begin a range.'}</p>
              <button type="button" onClick={rangeSelection.clearSelection} className="text-[var(--cal-accent)] transition hover:underline">
                Clear selection
              </button>
            </div>
          </section>

          <div className="flex items-center justify-between gap-3 md:hidden">
            <p className="text-sm font-medium text-[var(--cal-muted)]">Notes panel</p>
            <button type="button" onClick={() => setNotesOpen((open) => !open)} className="rounded-full bg-[var(--cal-accent)] px-4 py-2 text-sm font-semibold text-white">
              {notesOpen ? 'Hide' : 'Show'} notes
            </button>
          </div>

          <AnimatePresence initial={false}>
            {(notesOpen || isDesktop) && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="md:block">
                <NotesPanel monthLabel={monthLabel} monthNotes={monthNotes} rangeNotes={rangeNotes} selectedRange={rangeSelection.selectedRange} monthKey={monthKey} rangeKey={rangeKey} onAddNote={addNote} onDeleteNote={removeNote} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`mt-6 ${viewMode === 'overview' ? 'block' : 'hidden'} lg:block`}>
            <MiniMiniCalendar year={getYear(currentMonth)} activeMonth={currentMonth.getMonth()} onMonthSelect={goToMonth} holidays={holidays} />
          </div>
        </div>
      </div>
    </main>
  )
}

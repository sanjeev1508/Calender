'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CalendarNote } from '@/types'
import { NoteCard } from './NoteCard'

const colorOptions = ['red', 'amber', 'green', 'blue', 'purple'] as const

interface NotesPanelProps {
  monthLabel: string
  monthNotes: CalendarNote[]
  rangeNotes: CalendarNote[]
  selectedRange?: { start: Date; end: Date } | null
  monthKey: string
  rangeKey?: string
  onAddNote: (note: Omit<CalendarNote, 'id' | 'createdAt' | 'updatedAt'>) => void
  onDeleteNote: (id: string) => void
}

interface NoteFormValues {
  title: string
  body: string
  color: typeof colorOptions[number]
}

export function NotesPanel({ monthLabel, monthNotes, rangeNotes, selectedRange, monthKey, rangeKey, onAddNote, onDeleteNote }: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<'month' | 'range'>('month')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm<NoteFormValues>({ defaultValues: { title: '', body: '', color: 'blue' } })

  const activeNotes = activeTab === 'month' ? monthNotes : rangeNotes
  const rangeEnabled = Boolean(selectedRange)

  const noteCountLabel = useMemo(() => {
    if (activeNotes.length === 0) return 'No notes yet'
    return `${activeNotes.length} note${activeNotes.length > 1 ? 's' : ''}`
  }, [activeNotes.length])

  function onSubmit(data: NoteFormValues) {
    onAddNote({
      title: data.title.trim() || undefined,
      body: data.body.trim(),
      color: data.color,
      monthKey,
      dateRange: activeTab === 'range' && selectedRange ? { start: selectedRange.start.toISOString().slice(0, 10), end: selectedRange.end.toISOString().slice(0, 10) } : undefined,
    })
    reset({ title: '', body: '', color: 'blue' })
    setIsFormOpen(false)
  }

  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-[var(--cal-surface)] p-6 shadow-calendar">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--cal-muted)]">Notes</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--cal-text)]">{monthLabel} memory lane</h2>
        </div>
        <button type="button" onClick={() => setIsFormOpen((open) => !open)} className="rounded-full bg-[var(--cal-accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--cal-accent)]/20 transition hover:brightness-105">
          {isFormOpen ? 'Close note' : 'Add note'}
        </button>
      </div>

      <div className="mt-6 flex gap-2 rounded-full bg-slate-100 p-1 text-sm text-[var(--cal-muted)] dark:bg-slate-800">
        <button type="button" onClick={() => setActiveTab('month')} className={`rounded-full px-4 py-2 transition ${activeTab === 'month' ? 'bg-white text-[var(--cal-text)] shadow-sm dark:bg-slate-900' : 'hover:bg-white/70 dark:hover:bg-slate-700'}`}>
          Month Notes
        </button>
        <button type="button" onClick={() => setActiveTab('range')} className={`rounded-full px-4 py-2 transition ${activeTab === 'range' ? 'bg-white text-[var(--cal-text)] shadow-sm dark:bg-slate-900' : 'hover:bg-white/70 dark:hover:bg-slate-700'}`} disabled={!rangeEnabled}>
          Range Notes
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isFormOpen && (
          <motion.form
            key="note-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/80 p-5 shadow-inner dark:bg-slate-900/80"
          >
            <div className="grid gap-4">
              <input {...register('title')} placeholder="Title (optional)" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--cal-text)] focus:border-[var(--cal-accent)] focus:outline-none" />
              <textarea {...register('body', { required: true })} rows={4} placeholder={rangeEnabled && activeTab === 'range' ? 'Capture memories for this range' : 'Write anything you want to remember this month'} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--cal-text)] focus:border-[var(--cal-accent)] focus:outline-none" />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {colorOptions.map((color) => (
                    <label key={color} className={`cursor-pointer rounded-full p-2 ${color === 'red' ? 'bg-red-500/15' : color === 'amber' ? 'bg-amber-500/15' : color === 'green' ? 'bg-emerald-500/15' : color === 'blue' ? 'bg-sky-500/15' : 'bg-violet-500/15'}`}>
                      <input type="radio" value={color} {...register('color')} className="sr-only" />
                      <span className={`block h-4 w-4 rounded-full ${color === 'red' ? 'bg-red-500' : color === 'amber' ? 'bg-amber-500' : color === 'green' ? 'bg-emerald-500' : color === 'blue' ? 'bg-sky-500' : 'bg-violet-500'}`} />
                    </label>
                  ))}
                </div>
                <button type="submit" disabled={activeTab === 'range' && !rangeEnabled} className="rounded-full bg-[var(--cal-accent)] px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50">
                  Save note
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-6 text-sm text-[var(--cal-muted)]">{noteCountLabel}</div>

      <div className="mt-4 space-y-4">
        {activeNotes.length > 0 ? (
          activeNotes.map((note) => <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />)
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[var(--cal-accent)]/30 bg-[var(--cal-accent)]/5 p-6 text-sm text-[var(--cal-text)]">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[var(--cal-accent)]/20 text-[var(--cal-accent)]">🗓️</div>
            <p className="font-semibold">No notes yet</p>
            <p className="mt-2 leading-6 text-[var(--cal-muted)]">Start a new memory for this month or attach one to a selected date range.</p>
          </div>
        )}
      </div>
    </section>
  )
}

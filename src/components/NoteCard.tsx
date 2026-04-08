'use client'

import { Trash2 } from 'lucide-react'
import type { CalendarNote } from '@/types'

const tagMap = {
  red: 'border-red-500 bg-red-50 text-red-700',
  amber: 'border-amber-500 bg-amber-50 text-amber-700',
  green: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  blue: 'border-sky-500 bg-sky-50 text-sky-700',
  purple: 'border-violet-500 bg-violet-50 text-violet-700',
}

interface NoteCardProps {
  note: CalendarNote
  onDelete: (id: string) => void
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const tagLabel = note.color.charAt(0).toUpperCase() + note.color.slice(1)
  return (
    <article className={`group overflow-hidden rounded-3xl border-l-4 ${tagMap[note.color]} bg-[var(--cal-surface)] p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--cal-text)]">{note.title || 'Untitled note'}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--cal-muted)]">{note.body.length > 110 ? `${note.body.slice(0, 110)}…` : note.body}</p>
        </div>
        <button type="button" onClick={() => onDelete(note.id)} aria-label="Delete note" className="text-[var(--cal-muted)] transition hover:text-red-600">
          <Trash2 size={18} />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-[var(--cal-muted)]">
        <span className="rounded-full border border-current/10 px-2 py-1">{tagLabel}</span>
        {note.dateRange ? (
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.8rem] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {note.dateRange.start} → {note.dateRange.end}
          </span>
        ) : (
          <span className="font-mono">{new Date(note.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
        )}
      </div>
    </article>
  )
}

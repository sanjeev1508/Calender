import { useEffect, useMemo, useState } from 'react'
import { CalendarNote } from '@/types'
import { monthKeyFromDate } from '@/lib/utils'

const NOTE_STORAGE_PREFIX = 'cal-notes'

function storageKeyForMonth(monthKey: string) {
  return `${NOTE_STORAGE_PREFIX}-${monthKey}`
}

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function useNotes(monthKey: string, rangeKey?: string) {
  const [notes, setNotes] = useState<CalendarNote[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const payload = window.localStorage.getItem(storageKeyForMonth(monthKey))
    try {
      const parsed = payload ? (JSON.parse(payload) as CalendarNote[]) : []
      setNotes(parsed)
    } catch {
      setNotes([])
    }
  }, [monthKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKeyForMonth(monthKey), JSON.stringify(notes))
  }, [monthKey, notes])

  const monthNotes = useMemo(
    () => notes.filter((note) => !note.dateRange),
    [notes],
  )

  const rangeNotes = useMemo(
    () => (rangeKey ? notes.filter((note) => note.dateRange?.start && note.dateRange?.end && `${note.dateRange.start}_${note.dateRange.end}` === rangeKey) : []),
    [notes, rangeKey],
  )

  const noteDates = useMemo(
    () => notes.flatMap((note) => {
      if (!note.dateRange) return []
      return [note.dateRange.start, note.dateRange.end]
    }),
    [notes],
  )

  const addNote = (payload: Omit<CalendarNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const nextNote: CalendarNote = {
      ...payload,
      id: createId(),
      createdAt: now,
      updatedAt: now,
    }
    setNotes((current) => [nextNote, ...current])
  }

  const updateNote = (id: string, payload: Partial<Omit<CalendarNote, 'id' | 'monthKey' | 'createdAt'>>) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? {
              ...note,
              ...payload,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const removeNote = (id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  return {
    notes,
    monthNotes,
    rangeNotes,
    noteDates,
    addNote,
    updateNote,
    removeNote,
  }
}

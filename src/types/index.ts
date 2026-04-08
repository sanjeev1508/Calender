export type CalendarNoteColor = 'red' | 'amber' | 'green' | 'blue' | 'purple'

export interface CalendarNote {
  id: string
  title?: string
  body: string
  color: CalendarNoteColor
  dateRange?: { start: string; end: string }
  monthKey: string
  createdAt: string
  updatedAt: string
}

export type SelectionState = 'idle' | 'selecting' | 'selected'

export interface DateRange {
  start: Date
  end: Date
}

export interface DayMeta {
  date: Date
  state: 'default' | 'today' | 'start' | 'end' | 'in-range' | 'hover-preview' | 'outside-month' | 'disabled'
  holiday?: Holiday
  hasNote?: boolean
}

export interface Holiday {
  date: string
  name: string
  type: 'federal' | 'observance'
}

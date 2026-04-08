import { addDays, endOfMonth, format, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, startOfMonth, startOfWeek, subDays } from 'date-fns'
import type { DayMeta, DateRange, Holiday } from '@/types'

export function monthKeyFromDate(date: Date) {
  return format(date, 'yyyy-MM')
}

export function formatMonthYear(date: Date) {
  return format(date, 'MMMM yyyy')
}

export function getHolidayForDate(date: Date, holidays: Holiday[]) {
  const key = format(date, 'yyyy-MM-dd')
  return holidays.find((holiday) => holiday.date === key)
}

export function getCalendarGrid(date: Date, holidays: Holiday[] = [], noteDates: string[] = []) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 })
  const end = addDays(endOfMonth(date), 6 - endOfMonth(date).getDay())
  const rows: DayMeta[][] = []
  let current = start
  while (current <= end) {
    const week: DayMeta[] = []
    for (let index = 0; index < 7; index += 1) {
      const day = current
      const isOutsideMonth = !isSameMonth(day, date)
      week.push({
        date: day,
        state: isOutsideMonth ? 'outside-month' : 'default',
        holiday: getHolidayForDate(day, holidays),
        hasNote: noteDates.includes(format(day, 'yyyy-MM-dd')),
      })
      current = addDays(current, 1)
    }
    rows.push(week)
  }
  return rows
}

export function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isDateInRange(date: Date, range: DateRange) {
  return isWithinInterval(date, { start: range.start, end: range.end })
}

export function isSameOrAfter(date: Date, other: Date) {
  return isSameDay(date, other) || isAfter(date, other)
}

export function isSameOrBefore(date: Date, other: Date) {
  return isSameDay(date, other) || isBefore(date, other)
}

export function toDateString(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

export function getMonthNoteKey(date: Date) {
  return monthKeyFromDate(date)
}

export function getRangeNoteKey(start: Date, end: Date) {
  return `${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`
}

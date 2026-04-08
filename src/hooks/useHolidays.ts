import { useMemo } from 'react'
import { US_HOLIDAYS } from '@/lib/holidays'
import { Holiday } from '@/types'
import { format } from 'date-fns'

export function useHolidays(year: number) {
  const holidays = useMemo(() => US_HOLIDAYS.filter((holiday) => holiday.date.startsWith(String(year))), [year])

  function findHoliday(date: Date): Holiday | undefined {
    return holidays.find((holiday) => holiday.date === format(date, 'yyyy-MM-dd'))
  }

  return { holidays, findHoliday }
}

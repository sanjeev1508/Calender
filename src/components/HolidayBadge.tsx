'use client'

import type { Holiday } from '@/types'

interface HolidayBadgeProps {
  holiday: Holiday
}

export function HolidayBadge({ holiday }: HolidayBadgeProps) {
  return (
    <div className="absolute right-2 top-2 flex h-2.5 w-2.5 items-center justify-center">
      <div className="group relative h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm" />
      <div className="pointer-events-none absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 rounded-xl bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100">
        {holiday.name}
      </div>
    </div>
  )
}

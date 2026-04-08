'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface HeroImagePanelProps {
  imageUrl: string
  monthLabel: string
}

export function HeroImagePanel({ imageUrl, monthLabel }: HeroImagePanelProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--cal-surface)] shadow-calendar sm:min-h-[460px]">
      <div className="absolute inset-x-0 top-0 flex justify-center gap-4 pt-6 md:pt-8">
        <span className="h-4 w-4 rounded-full border-2 border-[var(--cal-text)]/50 bg-[var(--cal-bg)] shadow-sm" />
        <span className="h-4 w-4 rounded-full border-2 border-[var(--cal-text)]/50 bg-[var(--cal-bg)] shadow-sm" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,23,42,0.24)]" />
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt={`${monthLabel} mood image`}
          className="h-full w-full object-cover opacity-90 animate-ken-burns"
          initial={{ opacity: 0.2, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-x-0 bottom-0 p-8 text-white"
      >
        <p className="text-sm uppercase tracking-[0.28em] text-white/80">Seasonal wanderlust</p>
        <h2 className="mt-3 text-4xl font-serif leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">{monthLabel}</h2>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_28%)]" />
    </section>
  )
}

'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface PageFlipTransitionProps {
  transitionKey: string
  children: React.ReactNode
}

export function PageFlipTransition({ transitionKey, children }: PageFlipTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={{ rotateY: -180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 180, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

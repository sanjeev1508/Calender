import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Wall Calendar',
  description: 'Interactive wall calendar with seasonal theming, notes, holidays, and page flip animation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} bg-[var(--cal-bg)] text-[var(--cal-text)] transition-colors duration-300`}> 
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export interface SeasonalPalette {
  accent: string
  bg: string
  surface: string
  text: string
  hero: string
}

export const MONTHLY_PALETTES: Record<number, SeasonalPalette> = {
  0: { accent: '#6EA8D3', bg: '#EEF4FA', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800' },
  1: { accent: '#B18CCF', bg: '#F7F1FB', surface: '#ffffff', text: '#1F2937', hero: 'https://images.unsplash.com/photo-1519752594763-2c6e6d0a0b1d?w=800' },
  2: { accent: '#6FBF73', bg: '#F0FBF3', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=800' },
  3: { accent: '#5AA3B8', bg: '#EFF8FB', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800' },
  4: { accent: '#88B95E', bg: '#F8FBEE', surface: '#ffffff', text: '#111827', hero: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800' },
  5: { accent: '#3E82B6', bg: '#EEF6FB', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
  6: { accent: '#DA8C5A', bg: '#FFF5EB', surface: '#ffffff', text: '#111827', hero: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800' },
  7: { accent: '#4F7BAA', bg: '#EEF3FB', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800' },
  8: { accent: '#9E6F48', bg: '#FCF4EB', surface: '#ffffff', text: '#111827', hero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
  9: { accent: '#E07B39', bg: '#FDF3EC', surface: '#ffffff', text: '#111827', hero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
  10: { accent: '#7C6E8A', bg: '#F6F2F8', surface: '#ffffff', text: '#111827', hero: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
  11: { accent: '#4A90C4', bg: '#EFF7FF', surface: '#ffffff', text: '#0F172A', hero: 'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800' },
}

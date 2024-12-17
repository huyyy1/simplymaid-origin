// src/app/layout.tsx
import './globals.css' // Your global CSS and Tailwind @tailwind directives
import { ThemeProvider, defaultTheme } from '@/core/origintheme'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SimplyMaid',
  description: 'Professional House Cleaning Services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap the entire application in the ThemeProvider */}
        <ThemeProvider theme={defaultTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata = {
  title: 'MentorSpace',
  description: 'Find Your Perfect Mentor Match',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider>
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata = {
  title: 'MentorMatch',
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

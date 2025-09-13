import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/components/auth/AuthProvider'

export const metadata: Metadata = {
  title: 'Profile Elegante',
  description: 'ELEGANT AND MODERN RESUME BUILDER',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

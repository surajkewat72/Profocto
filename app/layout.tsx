import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile Elegante',
  description: 'ELEGANT AND MODERN RESUME BUILDER',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resume Maker',
  description: 'Create professional resumes with AI assistance',
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

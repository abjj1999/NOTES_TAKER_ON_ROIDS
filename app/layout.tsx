import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Note on ROIDS',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: "/loogo.png",
        href: "/loogo.png",
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: "/logo_dark.png",
        href: "/logo_dark.png",
      },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

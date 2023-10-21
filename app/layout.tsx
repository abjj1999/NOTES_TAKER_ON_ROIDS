import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ConvexClientProvider } from "@/components/providers/convex-provider"
import { Toaster } from 'sonner'
import { ModelProvider } from '@/components/providers/model-provider'
import { EdgeStoreProvider } from '@/lib/edgestore';
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>

         
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="ROIDS-theme"
            >
            <Toaster position='bottom-center' />
            <ModelProvider />
        {children}
          </ThemeProvider>
           
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  )
}

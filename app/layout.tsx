import './globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

import { AnalyticsProvider, ThemeProvider } from './providers'

import Footer from '@/components/app-shell/footer'
import { TopNavbar } from '@/components/app-shell/top-nav'
import { JAMES_WALSH, PRODUCTION_URL, SITE_DESCRIPTION } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: JAMES_WALSH,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    images: ['/portraits/front-profile.webp'],
    title: JAMES_WALSH,
    siteName: JAMES_WALSH,
    locale: 'en_us',
    type: 'website',
  },
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cn(`${GeistSans.className} ${GeistMono.className}`, 'scroll-smooth')}
      suppressHydrationWarning // @see https://ui.shadcn.com/docs/dark-mode/next
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="ahrefs-site-verification"
        content="91e1441f7228c69eeb9367bfbbda2c6284d19816253d8178d9087f42f95ab801"
      />
      <AnalyticsProvider>
        <body className="flex flex-col md:items-center">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TopNavbar />
            <main className="mt-4 flex flex-col px-6 py-10 sm:px-4 md:w-[768px]">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </AnalyticsProvider>
    </html>
  )
}

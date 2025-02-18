import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ContentWrapper } from '@/components/ContentWrapper'

import './globals.css'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FashionConnect',
  description: 'Connect, Shop, and Make a Difference',
}

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContentWrapper session={session}>
          {children}
        </ContentWrapper>
      </body>
    </html>
  )
}
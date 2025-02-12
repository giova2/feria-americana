import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'
import { ContentWrapper } from '@/components/ContentWrapper'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FashionConnect',
  description: 'Connect, Shop, and Make a Difference',
}

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
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
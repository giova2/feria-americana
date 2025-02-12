'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { LoadingProvider } from '@/context/Loading'
import { AlertProvider } from '@/context/Alert'
import {HeroUIProvider} from "@heroui/react";

type ContentWrapperProps = {
  session: Session | null
  children: React.ReactNode
}

export const ContentWrapper = ({session, children}: ContentWrapperProps) =>(
  <HeroUIProvider>
    <AlertProvider>
      <LoadingProvider>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </LoadingProvider>
    </AlertProvider>
  </HeroUIProvider>
)
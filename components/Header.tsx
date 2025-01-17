'use client'

import { useSession, signOut } from "next-auth/react"
import { PrimaryButton } from "@/components/ui/button"
import { ShoppingBag, LogIn, LogOut } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <a className="flex items-center justify-center" href="#">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-bold">FashionConnect</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Buy
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Sell
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Donate
        </a>
        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Events
        </a>
        {loading ? (
          <PrimaryButton disabled>Loading...</PrimaryButton>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-ellipsis truncate max-w-64">Welcome, {session?.user?.name}</span>
            <PrimaryButton onPress={() => signOut()} className="w-fit">
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </PrimaryButton>
          </div>
        ) : (
          <Link href={`/login`} className="flex items-center">
            <LogIn className="h-4 w-4 mr-2" />
            Log In
          </Link>
        )}
      </nav>
    </header>
    
  )
}
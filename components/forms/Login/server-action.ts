'use server'

import { signIn } from "@/auth"

export const googleSignIn = async () => {
  "use server"
  await signIn("google", { redirectTo: "/" })
}

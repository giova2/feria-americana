import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { getUserFromEmail } from "./db/helpers/user/user"
import { AuthSession } from "./types/auth"
import { LOGIN_ROUTE, ONBOARDING_ROUTE } from "./constants"
import { Roles } from "@prisma/client"
import { getSellerFromUserId } from "./db/helpers/seller/seller"

class AuthConfig {
  static needsToCompleteProfile = true
  static sellerId?: string | null = null

  static config: NextAuthConfig = {
    providers: [Google],
    pages: {
      signIn: LOGIN_ROUTE,
      newUser: ONBOARDING_ROUTE, // Users land on this page when they first sign up/log
    },
    
    callbacks:{
      async signIn({ user }){
        try {
          if(user.email) {
            const existingUser = await getUserFromEmail(user.email)
            if(existingUser) {
              AuthConfig.needsToCompleteProfile = false
              if( existingUser.role === Roles.SELLER ){
                const existingSeller = await getSellerFromUserId(user.email)
                AuthConfig.sellerId = existingSeller?.id
              }
            }
          }
        } catch (error) {
          console.error("Error en el callback signIn:", error);
          return false; // Manejar errores en la consulta a la base de datos o actualización.
        }
        return true //'/onboarding' //params.account
      },
      async session(params) {
        const session = params.session as AuthSession
        session.needsToCompleteProfile = AuthConfig.needsToCompleteProfile
        session.sellerId = AuthConfig.sellerId
        console.log({ session })
        return params.session
      },
      async jwt(params) {
        return params.token
      }
    }
  }
}
// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
export const config = AuthConfig.config

export const { auth, handlers, signIn, signOut } = NextAuth(config)
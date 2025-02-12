import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jwk from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import GoogleProvider from "next-auth/providers/google";


type LoginCredentials = {
  email: string,
  password: string
}

type GoogleProfile = {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean,
  at_hash: string
  name: string
  picture: string
  given_name: string
  iat: number
  exp: number}

const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

const decode = async (token: string) => {
  const domain = AUTH0_ISSUER_BASE_URL;
  const json = await axios.get<{ keys: [jwkToPem.JWK] }>(
    `${domain}/.well-known/jwks.json`
  );
  const pem = jwkToPem(json.data.keys[0]);
  const decoded = jwk.verify(token, pem, { issuer: `${domain}/` });
  return typeof decoded === "string" || !decoded.sub ? null : decoded;
};


const getAccessToken = async () => {
  try {
    const res = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      grant_type: "client_credentials",
      audience: `${AUTH0_ISSUER_BASE_URL}/api/v2/`,
    });
    return res.data;
  } catch (error: any) {
    return {
      error: error.response.data.error_description,
    };
  }
};

const passwordGrant = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      grant_type: "password",
      username,
      password,
      scope: "profile email openid offline_access",
    });
    return res.data;
  } catch (error) {
    console.error({ error });
    // return {
    //   error:
    //     error.response.data.error_description ||
    //     error.response.data.description,
    // };
  }
}

const postSignUp = () => {
  // here we should create the Seller row, set it as inactive until the user verifies the account
  // then we update the app_metadata to bind the db id with the user data on auth0
}

const login = async (username: string, password: string) => {
  return await passwordGrant(username, password)
};

const signup = async (data: any) => {
  console.log('signup bebe')
  try {
    const res = await axios.post(`${AUTH0_ISSUER_BASE_URL}/dbconnections/signup`, {
      client_id: AUTH0_CLIENT_ID,
      connection: "Username-Password-Authentication",
      username: data.email,
      email: data.email,
      password: data.password,
      given_name: data.first_name,
      family_name: data.last_name,
      nickname: data.email,
      name: `${data.first_name} ${data.last_name}`,
      app_metadata: {
        seller_id: data.sellerId, // Incluye el ID de vendedor en los metadatos
      },
    });
    return res.data;
  } catch (error: any) {
    return {
      code: error.response.data.code,
      error: error.response.data.description,
    };
  }
};


export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      type: 'credentials',
      authorize: async (credentials, req) => {
        const { email, password } = credentials as LoginCredentials

        // External API for users to log in, change it with your own endpoint
        
        const data = await login(email, password);
        if (data.error) {
          throw new Error(data.error);
        }

        const decoded = await decode(data.id_token);
        return {
          id: decoded?.sub || "",
          ...decoded,
          id_token: data.id_token,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async signIn({ account, profile }){
      console.log({ account, profile })
      if (account?.provider === "google") {
        const googleProfile = profile as GoogleProfile
        return googleProfile.email_verified && googleProfile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, session }) {
      const user = session?.user
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.seller_id = user.app_metadata.seller_id; // Función para obtener el ID de vendedor
        // token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      console.log('session', { session, token })
      session.user = token
      // @ts-ignore
      session.user.seller_id = token.seller_id;
      // session.pepe = 'holis eeeaaa'
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jwk from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

type LoginCredentials = {
  email: string,
  password: string
}

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
  } catch (error: any) {
    console.error({ error });
    return {
      error:
        error.response.data.error_description ||
        error.response.data.description,
    };
  }
}

const login = async (username: string, password: string) => {
  return await passwordGrant(username, password)
};

const signup = async (data: any) => {
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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      type: 'credentials',
      authorize: async (credentials, req) => {
        const { email, password } = credentials as LoginCredentials

        // External API for users to log in, change it with your own endpoint
        const action = req.body?.action;
        switch (action) {

        }

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
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, session }) {
      console.log('JWT', { token, session })
      const user = session.user
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        // token.role = user.role;
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log('session', { session, token, user })
      session.user = token;
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
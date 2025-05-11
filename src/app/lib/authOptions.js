// lib/authOptions.ts or app/lib/authOptions.ts (choose consistent path)
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/app/lib/supabase";
import jwt from "jsonwebtoken";
import { SupabaseAdapter } from "@auth/supabase-adapter";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error) throw new Error(error.message);
        if (!data.user.email_confirmed_at) throw new Error("Email not verified");

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name,
        };
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    encode: async ({ secret, token }) => {
      return jwt.sign(token, secret);
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token, secret);
    },
  },
};

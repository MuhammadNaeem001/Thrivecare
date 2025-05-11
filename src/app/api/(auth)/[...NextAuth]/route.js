import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { supabase } from '@/app/lib/supabase.js';

export default NextAuth({
  adapter: SupabaseAdapter({
    url:    process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY      // service-role key
  }),

  providers: [
    CredentialsProvider({
      name: 'Email + Password',
      credentials: {
        email:    { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (creds) {
        if (!creds?.email || !creds?.password) return null;

        // 1 – check credentials against Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email:    creds.email,
          password: creds.password
        });
        if (error) throw new Error(error.message);

        // 2 – block unverified users
        if (!data.user.email_confirmed_at) {
          throw new Error('Email not verified');
        }

        // 3 – return minimal user object for the JWT
        return {
          id:    data.user.id,
          email: data.user.email,
          name:  data.user.user_metadata?.full_name || null
        };
      }
    })
  ],

  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.id    = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session ({ session, token }) {
      if (token?.id && session.user) session.user.id = token.id;
      return session;
    }
  },

  pages: {
    signIn:        '/auth/sign-in',
    verifyRequest: '/auth/verify-email',
    error:         '/auth/error'
  },

  session: { strategy: 'jwt' },
  secret:  process.env.NEXTAUTH_SECRET
});

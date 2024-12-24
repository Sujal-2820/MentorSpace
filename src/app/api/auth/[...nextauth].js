// src/pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { supabase } from '../../../lib/supabase-client'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          throw new Error(error.message)
        }

        const user = data.user

        if (user) {
          // Fetch the user's role from Supabase
          const { data: roleData, error: roleError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

          if (roleError || !roleData) {
            throw new Error('Failed to fetch user role')
          }

          // Return user object with role to be stored in session
          return { id: user.id, email: user.email, role: roleData.role }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role // Add role to token
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.role = token.role // Attach role to session
      return session
    }
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/signin', // Redirect to custom signin page
  }
})

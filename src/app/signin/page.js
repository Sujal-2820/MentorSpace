// src/app/signin/page.js

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../components/home/Navbar'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  // Fetch session using NextAuth's useSession hook
  const { data: session, status } = useSession()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setErrorMessage('') // Clear previous errors

    if (!email || !password) {
      setErrorMessage('Both email and password are required.')
      return
    }

    try {
      // Attempt to sign in with NextAuth
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setErrorMessage(res.error)
      } else {
        // Successful login: session should have role
        if (session?.user?.role === 'Mentor') {
          router.push('/mentorDashboard')
        } else if (session?.user?.role === 'Mentee') {
          router.push('/menteeDashboard')
        } else {
          setErrorMessage('Invalid role. Please contact support.')
        }
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.')
      console.error(err)
    }
  }

  // Handle redirection after session is established
  if (status === 'authenticated') {
    if (session.user.role === 'Mentor') {
      router.push('/mentorDashboard')
    } else if (session.user.role === 'Mentee') {
      router.push('/menteeDashboard')
    }
  }

  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <br/><br/>
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/2 bg-primary">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <h2 className="text-3xl font-bold text-black mb-4">Welcome Back!</h2>
            <p className="text-primary text-center mb-8">
              Sign in to continue your mentorship journey and connect with your community.
            </p>
            <div className="relative w-full max-w-md h-64">
              <Image
                src="https://media.istockphoto.com/id/2169214346/photo/team-engineers-and-designers-teamed-up-to-discuss-and-consult-with-each-other-about-machine.jpg?s=612x612&w=0&k=20&c=ZSG0ep-KRLfRPIhCqP3crnC1yW_D0InRTOVC31ZpvNU="
                alt="Mentorship community"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-8">Sign In to Your Account</h1>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            <form className="space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-foreground hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-opacity-80">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

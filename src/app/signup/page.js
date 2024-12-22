'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '../../lib/supabase-client'
import Navbar from '../components/home/Navbar'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('') // New state for role selection
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
  
    // Validate role selection
    if (!role) {
      setError('Please choose your role (Mentor or Mentee).');
      setLoading(false);
      return;
    }
  
    try {
      // Sign up the user with Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signUpError) {
        throw signUpError;
      }
  
      const userId = signUpData?.user?.id; // Get the user's ID from the response
  
      if (!userId) {
        throw new Error('Failed to retrieve user ID after sign up.');
      }
  
      // Insert user information into the `users` table
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId, // Use the ID from Supabase Auth
          email,
          role, // Insert the selected role
          created_at: new Date().toISOString(),
        },
      ]);
  
      if (insertError) {
        throw insertError;
      }
  
      setSuccessMessage('Signup successful!');
  
      // Redirect based on role
      if (role === 'Mentor') {
        router.push('/mentorOnboarding'); // Redirect to mentor onboarding
      } else if (role === 'Mentee') {
        router.push('/menteeOnboarding'); // Redirect to mentee onboarding
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <br />
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/2 bg-primary">
          <div className="flex flex-col justify-center items-center h-full p-8">
            <Image
              src="https://media.istockphoto.com/id/2153285637/photo/adult-professor-mentor-show-lesson-on-laptop-to-young-student-at-home.jpg?s=612x612&w=0&k=20&c=qDW4LdFC9HGeP7EYc-ssy4lk5Wrh-XVIevZM9z2HKfY="
              alt="Mentorship illustration"
              width={300}
              height={300}
              className="mb-8"
            />
            <h2 className="text-3xl font-bold text-black mb-4">Join Our Mentorship Community</h2>
            <p className="text-primary text-center">
              <span className="text-blue-600">Connect</span> with mentors, <span className="text-blue-600">grow</span> your skills, and <span className="text-blue-600">achieve</span> your goals.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-8">Create Your Account</h1>
            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                    placeholder="•••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                  Choose your role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-background text-foreground"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select a role</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Mentee">Mentee</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-md font-medium text-white bg-foreground border-gray-400 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            </form>
            <p className="mt-4 text-center text-sm text-foreground">
              Already have an account?{' '}
              <Link href="/signin" className="font-medium text-blue-600 hover:text-opacity-80">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

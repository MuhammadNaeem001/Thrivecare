"use client";
import supabase from '@/utils/supabase/client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
const router = useRouter()
  const handleNextAuth = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
       const result = await signIn("credentials", {
  email,
  password,
  redirect: false,
  json: true,          // 👈 forces JSON body
});
        
      if (result.error) {
        throw new Error(result.error)
      }
       router.push("/")
      router.refresh()
    } catch (error) {
        console.log("Error in signing in while using supabase auth and next auth");
    }finally{
        setLoading(false);
    }
      };


        const handleSignInWithSupabase = async (e) => {
    e.preventDefault()
    setLoading(true)
    // setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
          console.log("Error in signing in while using supabase auth");
      }

      if (data.user) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      // setError(error.message || "Invalid login credentials")
      console.log("Error whjile supabbase signin")
    } finally {
      setLoading(false)
    }
  }




  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="flex-1 bg-gray-100 flex justify-center items-center p-8">
        <img
          src="/path-to-your-image.jpg" // Replace with your image path
          alt="Therapy session"
          className="max-h-[90vh] rounded-lg object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="flex-1 max-w-md mx-auto px-10 py-16 flex flex-col">
        {/* Logo */}
        <div className="mb-10">
          <img
            src="/path-to-thrivelycare-logo.png" // Replace with your logo path
            alt="ThrivelyCare Logo"
            className="h-12"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6">Client Login</h2>

        <form onSubmit={handleNextAuth} className="flex flex-col">
          <label className="mb-4 font-medium text-gray-700">
            Email<span className="text-red-600">*</span>
            <input
              type="email"
              placeholder="Enter Full Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </label>

          <label className="mb-4 font-medium text-gray-700 relative">
            Password<span className="text-red-600">*</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </label>

          <button
            type="submit"
            className="bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors duration-200"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="form-checkbox text-teal-600"
              />
              <span>Remember password</span>
            </label>

            <a href="#" className="text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Don&apos;t Have an Account?{' '}
            <a href="#" className="text-teal-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

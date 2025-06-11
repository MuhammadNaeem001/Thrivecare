"use client";
import supabase from '@/utils/supabase/client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
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
  json: true,          
});
        
      if (result.error) {
        throw new Error(result.error)
      }
       router.push("/")
      router.refresh();
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="  flex justify-center items-center p-8">
        <img
          src="/logo.png"
          alt="Therapy session"
          className=" rounded-lg object-contain"
        />
      </div>

      <div className="  mx-auto px-10 py-16 flex items-center justify-center flex-col">
        <div className="mb-10">
          <img
            src="/thrive.png" 
            alt="ThrivelyCare Logo"
            className="h-12"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6">Client Login</h2>

        <form onSubmit={handleNextAuth} className="flex w-full flex-col">
           <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px]leading-[26px]">Email<span className='text-red-600'>*</span></label>
        <input
         type="email"
              placeholder="Enter Full Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
           className=' font-Poppins w-[525px] h-[48px]  text-black gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>
           <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px]leading-[26px]">Password<span className='text-red-600'>*</span></label>
        <input
         type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
           className=' font-Poppins w-[525px] h-[48px]  text-black gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>

          
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

            <Link href="/forgot-password" className="text-teal-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Don&apos;t Have an Account?{' '}
            <Link href="/auth/signup" className="text-teal-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

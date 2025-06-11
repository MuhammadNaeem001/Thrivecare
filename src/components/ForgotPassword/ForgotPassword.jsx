"use client";
import supabase from '@/utils/supabase/client';
import React, { useState } from 'react';
import { ImSpinner } from "react-icons/im";




const ForgotPassword = () => {
const [email,setEmail ] = useState("");
const [loading,setLoading] = useState(false);

// console.log(email)


const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/forgot-password/update-password`,
          })
        if (error) {
            console.log("Error in sending reset password email",error);
        }
        if (data) {
            console.log("Reset password email sent successfully",data);
        }
    } catch (error) {
        console.log("Error in sending reset password email",error); 
    }
    finally{
        setLoading(false);
    }
}


  return (
    <div className="flex  ">
      <div className="  flex  ">
        <img
          src="/logo.png"
          alt="Therapy session"
          className=" object-contain"
        />
      </div>

      <div className="  mx-auto px-10 py-16 flex flex-col">
        <div className="mb-10">
          <img
            src="/thrive.png" 
            alt="ThrivelyCare Logo"
            className="h-12 flex items-center justify-center"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
        <p>We will send you an email to reset your password</p>
        
            <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
                <label className='mt-3' htmlFor="email">Email *</label>
            <input className='bg-gray-300 border-black rounded text-black p-3 my-3' placeholder='Enter Email' type="email " name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />

        </div>
            <button onClick={handleSubmit} type="submit" className=" bg-teal-600 cursor-pointer w-full text-white px-4 py-2 rounded">{loading ?<div className='flex items-center justify-center gap-2' > <ImSpinner className='animate-spin text-white w-6 h-6' /> Sending...</div> :"Send Link"} </button>
            </form>

      </div>
    </div>
  );
};

export default ForgotPassword;

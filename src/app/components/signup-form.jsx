"use client"
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';



const SignupForm=()=> {

  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
    phoneNumber:"",
  })

  const router = useRouter();

  console.log(formData)
  const handleChange= (e)=>{
    const {name,value} = e.target;
    setFormData((prevData)=>{
      return{
        ...prevData,
        [name]:value
      }
    })
  }


  const handleRegister = async (e)=>{
    e.preventDefault();

    // const hashedPassword = await bcrypt.hash(formData.password, 10);
    // try {
      
    //   const {data,error} = await supabase.from("users").insert({
    //     fullName: formData.fullName,
    //     email: formData.email,
    //     password: hashedPassword,
    //     phone: formData.phoneNumber
  
    //   })
    //   if (error) {
    //     console.error('Error signing up:', error.message);
    //     return;
    //   };

    //   console.log('User signed up successfully:', data);
    //   router.push('/')
    // } catch (error) {
    //   console.error('Error signing up:', error.message);
    // }



    try {
      
      const res = await fetch("/api/singup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:formData.email,
          password:formData.password
        })
      })

      const data = await res.json();  
      console.log(data)
      if (res.ok) {
        router.push("/auth/verify-email?email=" + encodeURIComponent(email));
      }
    } catch (error) {
      console.log(error,"Error in signing up while using supabase auth and next auth")
    }
  }

  return (
    <div className='pl-3 pr-3 pt-6'>
      {/* Main Heading */}
      <div className='text-[30px] font-bold mb-6'>
        <h1 className='font-Poppins'>Create Account</h1>
      </div>

   <form action={handleRegister}>
       {/* Full Name Field */}
       <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px] leading-[26px]">Full Name<span className='text-red-600'>*</span></label>
        <input
          type='text'
          value={formData.fullName}
          name='fullName'
          placeholder='Full Name'
          onChange={handleChange}
           className=' font-Poppins w-[525px] h-[48px]  gap-[8px] p-3 border  text-black border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>

      {/* Email Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px]leading-[26px]">Email<span className='text-red-600'>*</span></label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='name@example.com'
          className=' font-Poppins w-[525px] h-[48px]  text-black gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none '
        />
      </div>

      {/* Phone Number Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px]leading-[26px]">Phone Number<span className='text-red-600'>*</span></label>
        <input
          type='number'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='(937) 768 0987'
           className=' font-Poppins w-[525px] h-[48px]  text-black gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>

      {/* Password Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px] leading-[26px]">Password<span className='text-red-600'>*</span></label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='**********'
        className=' font-Poppins w-[525px] h-[48px]  text-black  gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none '
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleRegister} type='submit' className=" font-Poppins cursor-pointer w-[525px] h-[48px] gap-[24px] bg-[#108572] hover:bg-[#108572] text-[#FFFFFF] font-bold text-[16px] py-3 rounded-md mt-4">
        Create
      </button>
   </form>
      
  {/* Text below button */}
  <p className=" font-Poppins text-[16px] font-medium mt-5">
    Already Have an Account? <span className="text-[#696F79] font-bold[500]  text-[16px]cursor-pointer">Login</span>
  </p>
    </div>
  );
}

export default SignupForm;

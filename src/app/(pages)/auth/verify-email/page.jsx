"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import leftImg from  "../../../../../public/images/login-img.png" 
import {  useRouter, useSearchParams } from 'next/navigation';
import VerificationInput from 'react-verification-input';

const Page = ()=> {

  const params = useSearchParams();



  const [otp,setOtp] = useState()
  const [loading,setLoading]  = useState(false);
  const router = useRouter();
const email = params.get("email");



const handleSubmit  =async (e) =>{
  e.preventDefault();
  setLoading(true);


  try {
    
    const res = await fetch("/api/verify-otp",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,otp})
    } )
    if (res.ok) {
      router.push("/auth/signin");
    }
    setLoading(false);
  } catch (error) {
    console.log("Error")
  }finally{
    setLoading(false)
  }
}
return (
    
    <div className=" flex flex-col">
      <div className="flex h-full">
        {/* Left Image */}
        <div className="w-[720px] h-[1024px] ">
          <Image 
            src={leftImg} 
            alt="Login Image" 
            className="object-cover w-[100%] h-full" 
            width={0} 
            height={0} 
          />
        </div>

        {/* Right Logo - Centered and smaller */}
        <div className="w-1/2 h-full">
        {/* inner container  */}
            <div className='flex flex-col  pt-5  px-20'>
        <div>
          <Image 
            src={""} 
            alt="Logo" 
            className="object-contain w-[250px] h-{100px} mx-auto"  // Smaller logo
            width={0} 
            height={0} 
            />
            </div>
            <div className="flex flex-col justify-center items-start p-7 mx-auto">
      {/* Heading */}
      <h1 className="w-[205px] h-[44px] font-poppins text-[36px] font-semibold leading-[44px] mb-2">
        Verify Email
      </h1>
      {/* Subheading */}
      <p className="font-poppins text-[14px] leading-[20px] font-normal text-[#111111] text-center mb-6">
        Enter 6 digits code that you have received in your Email
      </p>
      {/* Verification Input */}
      <VerificationInput
  validChars="0-9"
  value={otp}          
  onChange={(val) => setOtp(val)}
  inputProps={{ inputMode: "numeric" }}
  classNames={{
    container: "flex justify-center gap-[40px] mb-6",
    character: "w-[30px] h-14 border border-gray-300 rounded-md text-center text-2xl",
  }}/>
      {/* Confirm Button */}
      <button onClick={handleSubmit} className="w-[400px] h-[48px] font-poppins bg-[#108572] hover:bg-[#108672] cursor-pointer text-white font-medium text-[16px] leading-[24px] py-2 rounded-md mb-4">
       {loading? "Wait ": "Confirm"}
      </button>
      {/* Already have an account line */}
      <p className="font-poppins text-[14px] text-[#111111]">
        Already have an account? <span className="text-[#108572] cursor-pointer font-semibold">Login</span>
      </p>
    </div>
</div>
        </div>  
      </div>
    </div>
  );
}


export default Page;

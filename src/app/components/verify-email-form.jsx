"use client";
import React from 'react';
import VerificationInput from 'react-verification-input';

const VerifyEmailForm =()=> {
  return (
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
        inputProps={{ inputMode: "numeric" }}
        classNames={{
          container: "flex justify-center gap-[40px] mb-6 ",
          character: "w-[30px] h-14 border border-gray-300 rounded-md text-center text-2xl  ",
        }}
      />

      {/* Confirm Button */}
      <button className="w-[400px] h-[48px] font-poppins bg-[#108572] hover:bg-[#108672] cursor-pointer text-white font-medium text-[16px] leading-[24px] py-2 rounded-md mb-4">
        Confirm
      </button>

      {/* Already have an account line */}
      <p className="font-poppins text-[14px] text-[#111111]">
        Already have an account? <span className="text-[#108572] cursor-pointer font-semibold">Login</span>
      </p>

    </div>
  );
}

export default VerifyEmailForm;

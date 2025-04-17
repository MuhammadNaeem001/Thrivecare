import React from 'react';

const SignupForm=()=> {
  return (
    <div className='pl-3 pr-3 pt-6'>
      {/* Main Heading */}
      <div className='text-[30px] font-bold mb-6'>
        <h1 className='font-Poppins'>Create Account</h1>
      </div>

      {/* Full Name Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px] leading-[26px]">Full Name<span className='text-red-600'>*</span></label>
        <input
          type='text'
          placeholder='Babar Sandhu'
           className=' font-Poppins w-[525px] h-[48px]  gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>

      {/* Email Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text=[16px]leading-[26px]">Email<span className='text-red-600'>*</span></label>
        <input
          type='email'
          placeholder='name@example.com'
          className=' font-Poppins w-[525px] h-[48px]  gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none '
        />
      </div>

      {/* Phone Number Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px]leading-[26px]">Phone Number<span className='text-red-600'>*</span></label>
        <input
          type='tel'
          placeholder='(937) 768 0987'
           className=' font-Poppins w-[525px] h-[48px]  gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none'
        />
      </div>

      {/* Password Field */}
      <div className='mb-4'>
        <label className=" font-Poppins block text-sm font-bold mb-1 h-[26px] text-[16px] leading-[26px]">Password<span className='text-red-600'>*</span></label>
        <input
          type='password'
          placeholder='**********'
        className=' font-Poppins w-[525px] h-[48px]  gap-[8px] p-3 border border-[#A9A9A9] rounded-md bg-[#EDEEF2] outline-none '
        />
      </div>

      {/* Submit Button */}
      <button className=" font-Poppins w-[525px] h-[48px] gap-[24px] bg-[#108572] hover:bg-[#108572] text-[#FFFFFF] font-bold[600] text-[16px] py-3 rounded-md mt-4">
        Create
      </button>
      
  {/* Text below button */}
  <p className=" font-Poppins text-[16px] font-medium mt-5">
    Already Have an Account? <span className="text-[#696F79] font-bold[500]  text-[16px]cursor-pointer">Login</span>
  </p>
    </div>
  );
}

export default SignupForm;

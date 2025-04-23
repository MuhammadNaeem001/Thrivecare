import React from 'react';
import Link from 'next/link';

import { MdCelebration } from "react-icons/md";

function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
          &times;
        </button>

        {/* Success Icon */}
        <div className="  flex justify-center mb-6 text-[#108572] text-6xl">
        <MdCelebration />
        </div>

        {/* Heading */}
        <h1 className="text-[18px] w-[440px] h-[28px] leading-[28px] font-bold[500] font-poppins mb-2">Successful Completion</h1>

        {/* Subtext */}
        <p className=" w-[377] h-[40px] font-poppins text-[14px]leading-[20px] font-bold[400] mb-6">
          Congratulations! Your account has been successfully created.
        </p>

        {/* Dashboard Button */}
        <Link href="/dashboard">
          <button className="w-[380px] h-[48px] gap-[20px] bg-[#108572] hover:bg-[#108572] text-white font-semibold py-3 px-6 rounded">
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Page;

import React from 'react';
import Image from 'next/image';
import loginImg from '../../../public/images/login-img.png';
import Logo from '../../../public/images/Group.png';
import VerifyEmailForm from '../../components/verify-email-form';

const Page = ()=> {
  return (
    
    <div className=" flex flex-col">
      <div className="flex h-full">
        {/* Left Image */}
        <div className="w-[720px] h-[1024px] ">
          <Image 
            src={loginImg} 
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
            src={Logo} 
            alt="Logo" 
            className="object-contain w-[250px] h-{100px} mx-auto"  // Smaller logo
            width={0} 
            height={0} 
            />
            </div>

<div className='items-start'><VerifyEmailForm/></div >

</div>


        </div>
        
      </div>
    </div>
    
  );
}

export default Page;

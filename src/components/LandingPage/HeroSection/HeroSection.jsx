import React from 'react'
import Logos from '../Logos/Logos'

const HeroSection = () => {
  return (
<div>
   <div className="relative w-full overflow-hidden bg-navbar">
  <video 
    className="w-full  h-auto rounded-b-[400px] " 
    src="/hero.mp4" 
    autoPlay 
    muted 
    loop 
  />

 <div className='absolute -bottom-10 left-96'> <img src="/images/hero_img.png" alt=""  />  </div>
 
</div>
 <Logos/>
</div>

  )
}

export default HeroSection
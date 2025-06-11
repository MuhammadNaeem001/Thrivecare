"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

    const pathname = usePathname();
    const navlinks =[
        {
            path:"/",
            name:"Home"
        },
        {
            path:"/provider",
            name:"Provider"
        },
        {
            path:"/about",
            name:"About"
        }
    ]   

  return (
    <div className="bg-navbar text-black py-3 px-8">
      <div className='flex justify-between item-center'>
          <div>
            <img src="/thrive.png" className='w-32' alt="" />
          </div>
        <div>

        <ul className='flex gap-3 h-full items-center justify-center'>
            {
                navlinks.map((item,idx)=>(
                    <li className={` ${[pathname === item.path ? "bg-navbar-active text-button-color border-2 rounded-lg border-button-color":""]} px-2 py-1 text-black`} key={idx}><Link href={item.path}>{item.name} </Link> </li>
                ))
            }
        </ul>

        </div>
        <div className='flex items-center gap-3'>
          <Link href={"#"}>Provider Login</Link>
          <Link href={"#"} className='bg-button-color px-3 py-2 text-white rounded-xl'>Client Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
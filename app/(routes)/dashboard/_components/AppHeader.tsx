import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link' // ✅ Import Next.js Link
import React from 'react'

const menuOptions = [
    { id: 1, name: 'Home', pth: '/dashboard' },
    { id: 2, name: 'History', pth: '/dashboard/history' },
    { id: 3, name: 'Pricing', pth: '/dashboard/billing' }
]

const AppHeader = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow-md text-slate-200 px-10 md:px-20 lg:px-40'>
        
        {/* Logo */}
        <div className='flex items-center'>
            <h2 className='font-bold flex items-center gap-2'>
                <span className='text-[30px] h-[50px] w-[50px] flex items-center justify-center'>
                    🩺
                </span>
                <span className='text-green-500 text-lg'>ClinIQ</span>AI
            </h2>


            {/* <Image src={'/icon.svg'} alt='logo' width={150} height={150} /> */}
        </div>
        
        {/* Navigation Menu */}
        <div className='flex gap-12 items-center'>
            {menuOptions.map((option) => (
                <Link key={option.id} href={option.pth} passHref>
                    <div className="group relative cursor-pointer pb-1">
                        <h2 className="hover:font-bold text-slate-200 dark:text-slate-300">
                            {option.name}
                        </h2>
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                    </div>
                </Link>
            ))}
        </div>

        {/* User Profile */}
        <UserButton />
    </div>
  )
}

export default AppHeader

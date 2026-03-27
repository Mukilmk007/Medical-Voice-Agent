import React from 'react'
import AppHeader from './_components/AppHeader';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-black/90'>
        <AppHeader />
        <div className="w-full h-[0.5px] bg-white" />
    
        <div className='px-10 md:px-20 lg:px-40  '>
            {children}
        </div>
        
    </div>
  )
}

export default DashboardLayout
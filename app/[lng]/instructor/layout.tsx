import { ChildProps } from '@/types/indeex'
import React from 'react'
import Navbar from './_components/navbar'
import SideBar from './_components/side-bar'

function Layout({ children }: ChildProps) {
  return (
    <>
      <Navbar />
      <SideBar />
      <main className='w-full pl-[320px] pt-[12vh] px-4'>
        <div className='size-full rounded-md bg-secondary px-4 pb-4'>
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout

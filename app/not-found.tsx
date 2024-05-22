"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-5 lg:p-10'>
         <div className="pt-3 pl-2 pb-7 top-0 absolute flex items-center justify-center md:w-1/4 w-full bg-blend-color-burn">
          <Image src={"/images/mascot.svg"} width={180} height={100} alt="mascot" />
        </div>
        <div className='flex justify-center  flex-col space-y-5'>
            <div className=' flex items-center justify-center'>
                <Image width={300} height={300} src={'/duo_offline.png'}  alt='page'/>
            </div>
          <div className=' flex flex-col  justify-center items-center space-y-5 '> 
          <p className='text-5xl stroke-[9] text-owl font-extrabold'>
          Error 404 !
          </p>
          <p className='text-xl text-muted-foreground font-semibold text-center'>Sorry, The page you were looking for does not exist.</p>
          <Link href={"/"}><Button variant="secondary"  className='px-8 my-5 font-bold'>Back to Home</Button></Link>
          </div>
        </div>
        

    </div>
  )
}

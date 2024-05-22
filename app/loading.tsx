import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-5 lg:p-10 animate-pulse'>
    
  
     
           <Image width={400} height={400} src={'/duo-load.png'}  alt='page'/>
    


   


</div>
  )
}

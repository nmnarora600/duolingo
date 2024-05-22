import { Progress } from '@/components/ui/progress'
import { useExitModal } from '@/store/use-exit-modal'
import { Heart, InfinityIcon, X } from 'lucide-react'
import React from 'react'

type Props = {
    hearts:number,
    percentage:number,
    hasActiveSubscription:boolean
}

function Header({hearts,percentage,hasActiveSubscription}: Props) {
  //modal on clicking back
  const {open}=useExitModal();
  return (
    <header className='lg:pt-[50px] pt-[20px] px-10 gap-x-7 flex items-center justify-between max-w-[1140px] mx-auto w-full'>
        <X
        onClick={open}
        className='text-slate-500 hover:opacity-75 transition cursor-pointer'/>
        <Progress value={percentage}/>
        <div className='text-rose-500 flex items-center font-bold '>
        <Heart className='border-rose-500 h-6 w-6 mr-2' fill="rgb(244 63 94)"/>
        {hasActiveSubscription?<InfinityIcon className='h-5 w-5 stroke-[3]'/>:hearts} 
        </div>
    </header>
  )
}

export default Header
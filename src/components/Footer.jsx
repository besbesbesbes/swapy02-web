import React from 'react'
import { RiSwap2Line } from "react-icons/ri"

const Footer = () => {
    return (
        <div className='w-full bg-header-pattern bg-my-prim h-full text-my-text text-xs flex justify-center pt-5 pb-2 flex-col items-center gap-2'>
            <div className='flex items-baseline gap-2'>
                <RiSwap2Line className='text-[50px]' />
                <p className='text-lg font-bold font-serif mr-2 -translate-y-2'>Swapy Marketplace</p>
            </div>
            <p>Copyright © 2024 | Swapy Project | Codecamp 18 #23</p>
        </div>
    )
}

export default Footer
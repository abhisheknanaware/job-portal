import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="border-t border-gray-100 mt-20 py-6 bg-gray-50/50">
      <div className='container px-4 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className="flex items-center gap-4 max-sm:flex-col">
          <img width={140} className="opacity-95" src={assets.logo} alt="Logo" />
          <p className='border-l border-gray-300 pl-4 text-xs sm:text-sm text-gray-400 max-sm:hidden max-sm:border-l-0 max-sm:pl-0'>
            Copyright &copy; GreatStack.dev | All rights reserved.
          </p>
        </div>
        <div className='flex gap-3'>
          <img className='w-8 h-8 hover:-translate-y-1 opacity-70 hover:opacity-100 transition-all duration-250 cursor-pointer' src={assets.facebook_icon} alt="Facebook" />
          <img className='w-8 h-8 hover:-translate-y-1 opacity-70 hover:opacity-100 transition-all duration-250 cursor-pointer' src={assets.twitter_icon} alt="Twitter" />
          <img className='w-8 h-8 hover:-translate-y-1 opacity-70 hover:opacity-100 transition-all duration-250 cursor-pointer' src={assets.instagram_icon} alt="Instagram" />
        </div>
      </div>
    </div>
  )
}

export default Footer

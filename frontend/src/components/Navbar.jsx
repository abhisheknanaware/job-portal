import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import {useClerk, useUser,UserButton} from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const {openSignIn}=useClerk();
    const {user}=useUser();

    const navigate=useNavigate();
    const {setRecLogin}=useContext(AppContext);

  return (
    <div className='sticky top-0 z-50 glass-nav shadow-xs py-4 transition-all duration-300'>
      <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between'>
        <img onClick={()=>navigate('/')} className='cursor-pointer h-7 sm:h-8 hover:opacity-90 transition-opacity' src={assets.logo} alt='logo' />
        {
          user?
            <div className="flex items-center gap-4 sm:gap-6">
              <Link 
                to={"/applied-jobs"} 
                className="text-gray-600 hover:text-violet-600 transition-colors duration-250 font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-violet-600 hover:after:w-full after:transition-all after:duration-300"
              >
                Applied Jobs
              </Link>
              <p className="text-gray-300 font-light">|</p>
              <p className='max-sm:hidden text-gray-700 font-medium'>Hi, {user.firstName}</p>
              <div className="border border-violet-100 rounded-full p-0.5 shadow-xs">
                <UserButton />
              </div>
            </div>
            :
            <div className='flex items-center gap-4 sm:gap-6 max-sm:text-xs'>
              <button 
                onClick={e=>setRecLogin(true)} 
                className='text-gray-600 hover:text-violet-600 font-medium transition-colors duration-200 cursor-pointer'
              >
                Recruiter Login
              </button> 
              <button 
                onClick={()=>openSignIn()} 
                className='gradient-btn text-white px-6 sm:px-8 py-2 rounded-full font-medium cursor-pointer shadow-sm hover:shadow-md transition-all'
              >
                Login
              </button>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar

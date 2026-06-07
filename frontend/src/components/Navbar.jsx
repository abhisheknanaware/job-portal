import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import {useClerk, useUser,UserButton} from '@clerk/clerk-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const {openSignIn}=useClerk();
    const {user}=useUser();

    const navigate=useNavigate();
    const location = useLocation();
    const {setRecLogin,companyToken,companyData,setCompanyToken,setCompanyData}=useContext(AppContext);
    const isDashboardPage = location.pathname.startsWith('/dashboard');

    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
    }

  return companyToken===null?(
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
  ):(
    <div className='sticky top-0 z-50 glass-nav shadow-xs py-3.5 px-6'>
                    <div className='flex justify-between items-center w-full'>
                        <img onClick={e => navigate('/')} className='h-7 sm:h-8 cursor-pointer hover:opacity-90 transition-opacity' src={assets.logo} alt="Logo" />
                        {companyData && (
                            <div className='flex items-center gap-3.5'>
                                <button
                                  onClick={() => {
                                    navigate(isDashboardPage ? '/' : '/dashboard/manage-jobs');
                                  }}
                                  className=' cursor-pointer font-semibold text-sm text-gray-700'
                                >
                                  {isDashboardPage ? 'Back' : 'Dashboard'}
                                </button>
                                <p className='max-sm:hidden text-gray-700 font-bold text-sm'>Welcome, {companyData.name}</p>
                                <div className='relative group cursor-pointer'>
                                    <div className="w-9 h-9 rounded-full border-2 border-violet-200 p-0.5 overflow-hidden shadow-xs hover:border-violet-400 transition-colors">
                                        <img className='w-full h-full object-cover rounded-full' src={companyData.img} alt={companyData.name} />
                                    </div>
                                    {/* Hover Dropdown */}
                                    <div className='absolute hidden group-hover:block top-full right-0 z-10 pt-2 animate-fade-in'>
                                        <ul className='list-none m-0 p-1 bg-white rounded-xl shadow-lg border border-gray-100 text-sm w-36 overflow-hidden'>
                                            <li onClick={logout} className='py-2.5 px-4 cursor-pointer text-gray-600 hover:text-rose-600 hover:bg-rose-50 font-semibold transition-colors rounded-lg'>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
  )
}

export default Navbar

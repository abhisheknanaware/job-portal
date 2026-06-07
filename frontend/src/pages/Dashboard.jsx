import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    //function to logout
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])
    return (
        <div className='min-h-screen bg-gray-50/30 flex flex-col'>
            {/* Navbar for Recruiter panel*/}
            <div className='sticky top-0 z-50 glass-nav shadow-xs py-3.5 px-6'>
                <div className='flex justify-between items-center w-full'>
                    <img onClick={e => navigate('/')} className='h-7 sm:h-8 cursor-pointer hover:opacity-90 transition-opacity' src={assets.logo} alt="Logo" />
                    {companyData && (
                        <div className='flex items-center gap-3.5'>
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

            {/* main session layout */}
            <div className='flex flex-1 items-start'>
                {/* sidebar */}
                <div className='min-h-[calc(100vh-68px)] border-r border-gray-200 bg-white shrink-0'>
                    <ul className='flex flex-col pt-5 text-gray-500 space-y-1.5 px-2.5 sm:px-4'>
                        <NavLink className={({ isActive }) => `flex items-center py-3 px-4 sm:px-6 gap-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-violet-50 text-violet-600 font-bold' : 'hover:text-gray-900 hover:bg-gray-50'}`} to={'/dashboard/addjob'}>
                            <img className='w-4 h-4 opacity-70' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden text-sm'>Add Job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center py-3 px-4 sm:px-6 gap-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-violet-50 text-violet-600 font-bold' : 'hover:text-gray-900 hover:bg-gray-50'}`} to={'/dashboard/manage-jobs'}>
                            <img className='w-4 h-4 opacity-70' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden text-sm'>Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center py-3 px-4 sm:px-6 gap-3 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-violet-50 text-violet-600 font-bold' : 'hover:text-gray-900 hover:bg-gray-50'}`} to={'/dashboard/view-applications'}>
                            <img className='w-4 h-4 opacity-70' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden text-sm'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 p-4 sm:p-8 overflow-y-auto max-w-full min-h-[calc(100vh-68px)]'>
                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xs">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

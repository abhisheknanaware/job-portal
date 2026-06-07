import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';

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
            <Navbar/>

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

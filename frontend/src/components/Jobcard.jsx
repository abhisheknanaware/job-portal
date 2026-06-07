import React from 'react'
import {assets} from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const Jobcard = ({job}) => {
  const navigate=useNavigate();

  const handleDetailsClick = () => {
    navigate(`/apply-job/${job._id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='bg-white border border-gray-100 p-6 shadow-xs rounded-2xl hover-lift transition-all duration-300 flex flex-col justify-between h-full'>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <div className='w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden p-2 shadow-xs'>
            <img className='max-h-full max-w-full object-contain' src={job.companyId?.img || job.companyId?.image || assets.company_icon} alt="Company Logo" />
          </div>
          <span className='text-xs font-semibold text-violet-600 bg-violet-50/70 border border-violet-100/50 px-2.5 py-1 rounded-full'>
            {job.category}
          </span>
        </div>
        
        <h4 className='font-bold text-gray-800 text-lg hover:text-violet-600 transition-colors line-clamp-1 cursor-pointer' onClick={handleDetailsClick}>
          {job.title}
        </h4>
        
        <div className='flex items-center gap-2 mt-2 text-xs flex-wrap'>
          <span className='bg-neutral-50 border border-neutral-200 text-neutral-600 px-3 py-1 rounded-lg font-medium flex items-center gap-1'>
            <img src={assets.location_icon} className='h-3 opacity-60' alt=""/>
            {job.location}
          </span>
          <span className='bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1 rounded-lg font-medium flex items-center gap-1'>
            <img src={assets.person_icon} className='h-3 opacity-60' alt=""/>
            {job.level}
          </span>
        </div>
        
        <p className='text-gray-500 mt-4 text-sm leading-relaxed line-clamp-3' dangerouslySetInnerHTML={{ __html: job.description.slice(0,120) + '...'}}></p>
      </div>

      <div className='flex gap-3 mt-6 text-sm w-full'>
        <button 
          onClick={handleDetailsClick} 
          className='gradient-btn text-white px-4 py-2.5 rounded-xl font-semibold hover:opacity-95 transition-all text-center flex-1 cursor-pointer'
        >
          Apply Now
        </button>
        <button 
          onClick={handleDetailsClick} 
          className='border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-2.5 rounded-xl font-semibold transition-colors text-center flex-1 cursor-pointer'
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default Jobcard

import React from 'react'
import {assets} from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
const Jobcard = ({job}) => {

  const navigate=useNavigate();

  return (
    <div className='border p-6 shadow rounded '>
      <div className='flex justify-between items-center mb-4'>
        <img className='h-8' src={assets.company_icon} alt="Company Logo" />
      </div>
      <h4 className='font-medium text-xl'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs '>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p className='text-gray-600 mt-4 text-sm' dangerouslySetInnerHTML={{ __html: job.description.slice(0,150)}}></p>
      <div className='flex gap-4 mt-4 text-sm'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Apply Now</button>
        <button onClick={()=>{navigate(`/job/${job._id}`); scrollTo(0,0)}} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Learn More</button>
      </div>
    </div>
  )
}

export default Jobcard

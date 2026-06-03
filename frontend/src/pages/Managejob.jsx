import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const Managejob = () => {
  const navigate=useNavigate();
  return (
    <div className='container p-4 max-w-5xl '>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm '>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Tilte</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Applicant</th>
              <th className='py-2 px-4 border-b text-left'>visible</th>
            </tr>
          </thead>

          <tbody>
            {manageJobsData.map((job,idx)=>(
              <tr key={idx} className='text-gray-700'>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{idx+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input className='scale-125 ml-4' type='checkbox'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 flex justify-start'>
        <button onClick={()=>navigate('/dashboard/addjob')} className='bg-black text-white py-2 px-4 rounded'>Add new Job</button>
      </div>
    </div>
  )
}

export default Managejob

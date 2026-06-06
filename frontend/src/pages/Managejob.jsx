import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading';

const Managejob = () => {
  const navigate=useNavigate();
  const [jobs,setjobs]=useState(false);
  const {backendUrl,companyToken}=useContext(AppContext);

  //function to fetch company job applications data
  const fetchCompanyJobs=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/company/list-jobs',
        {headers:{token:companyToken}
      })

      if(data.success){
        setjobs(data.jobsData.reverse());
        console.log(data.jobsData)
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const changevisibility=async(id)=>{
    //function to change job visibility
    setjobs(prev =>
    prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
    );
    try {
      const {data}=await axios.post(backendUrl+'/api/company/change-visibility',{
        id,
      },
    {headers:{token:companyToken}})
      if(data.success){
        toast.success(data.message);
      }else{
         toast.error(data.message);
          setjobs(prev =>
          prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
          );
      }
    } catch (error) {
       toast.error(error.message);
       setjobs(prev =>
        prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
      );
    }
  }

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs()
    }
  },[companyToken])

  return jobs ? jobs.length===0?(
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>
    </div>
  ):(
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
            {jobs.map((job,idx)=>(
              <tr key={idx} className='text-gray-700'>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{idx+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b  max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input onChange={()=>changevisibility(job._id)} checked={job.visible} className='scale-125 ml-4' type='checkbox'/>
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
  ):<Loading/>
}

export default Managejob

import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Applications = () => {
  const {user}=useUser();
  const {getToken}=useAuth();

  const [isedited,setisedit]=useState(false);
  const [resume,setresume]=useState(null);

  const {backendUrl,userData,userApplications,fetchUserApplications,fetchUserData }=useContext(AppContext);
  const updateResume=async()=>{
    try {
      const formData=new FormData()
      formData.append('resume',resume);
      const token=await getToken();
      const {data}=await axios.post(backendUrl+'/api/users/update-resume',
        formData,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
        toast.success(data.message);
        await fetchUserData();
      }else{
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setisedit(false);
    setresume(null);
  }

  useEffect(()=>{
    if(user){
      fetchUserApplications();
    }
  },[user])

  return (
    <>
      <Navbar/>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isedited || (userData && !userData.resume?.trim()) ?
            <>
            <label className='flex items-center' htmlFor='resumeupload'>
              <p className='bg-blue-100 text-blue-400 px-2 py-2 rounded-lg mr-2'>{resume?resume.name:"Select resume"}</p>
              <input id='resumeupload' onChange={e=>setresume(e.target.files[0])} accept='application/pdf' type='file' hidden/>
              <img src={assets.profile_upload_icon}></img>
            </label>
            <button className='cursor-pointer bg-green-100 border border-green-400 rounded-lg px-4 py-2
            ' onClick={updateResume}>Save</button>
            </>:
            <div className='flex gap-2'>
              <a target='_' className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={userData?.resume}>Resume</a>
              <button onClick={()=>setisedit(true)} className='text-grap-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>

            </div>
          }
        </div>

        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <table className='min-w-full bg-white border rounded-lg border-gray-400'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left  max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>

          <tbody>
            {userApplications.map((job,idx)=>true?(
              <tr key={idx}>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-10' src={job.companyId.img} alt="" />
                  {job.companyId.name}
                </td>

                <td className='py-2 px-4 border-b'>
                  {job.jobId.title}
                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status==='Accepted'?'bg-green-100':job.status==='Rejected'?'bg-red-100':'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ):(null) )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default Applications

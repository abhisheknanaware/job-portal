import React, { useContext, useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import kconvert from 'k-convert';
import moment from 'moment';
import Footer from '../components/Footer'
import Jobcard from '../components/Jobcard'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const {id}=useParams();
  const {getToken}=useAuth();
  const navigate=useNavigate();

  const [jobData,setJobData]=useState(null);
  const [isalreadyApplied,setAlreadyApplied]=useState(false);

  const {jobs,backendUrl,userData,userApplications,fetchUserApplications}=useContext(AppContext);

  const fetchJob=async(id)=>{
    try {
      const {data}=await axios.get(backendUrl+`/api/jobs/${id}`);
      if(data.success){
        setJobData(data.job)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyhandler=async()=>{
    try { 
        if(!userData){
          return toast.error('Login to Apply for jobs')
        };
        if(!userData.resume?.trim()){
          navigate('/applied-jobs');
          return toast.error('Upload resume to apply')
        }
        const token=await getToken();
        const {data}=await axios.post(backendUrl+'/api/users/apply',
          {jobId:jobData._id,companyId: jobData.companyId._id},
          {headers:{Authorization:`Bearer ${token}`}}
        )

        if(data.success){
          toast.success(data.message);
          fetchUserApplications();
        }else{
          toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const checkAlreadyapplied=()=>{
    const hasapplied=userApplications.some(item=>item.jobId._id===jobData._id)
    setAlreadyApplied(hasapplied);
  }

  useEffect(()=>{
      fetchJob(id);
  },[id,jobs])

  useEffect(()=>{
    if(userApplications.length>0 && jobData){
      checkAlreadyapplied()
    }
  },[jobData,userApplications,id])

  return jobData ? (
    <>
    <Navbar/>

    <div className='min-h-screen py-10 container px-4 2xl:px-20 mx-auto animate-fade-in'>
      {/* Top Banner Card */}
      <div className='bg-linear-to-br from-violet-50/70 via-white to-indigo-50/50 border border-violet-100/80 rounded-3xl w-full p-8 sm:p-12 mb-8 shadow-xs flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex flex-col md:flex-row items-center w-full md:w-auto'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 bg-white border border-gray-150 rounded-2xl p-3 shadow-xs flex items-center justify-center mr-0 md:mr-6 mb-4 md:mb-0 shrink-0 overflow-hidden'>
            <img className='max-h-full max-w-full object-contain' src={jobData.companyId.img || jobData.companyId.image || assets.company_icon} alt={jobData.companyId.name}/>
          </div>
          
          <div className='text-center md:text-left text-neutral-800'>
            <h1 className='text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>{jobData.title}</h1>
            <div className='flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2.5 items-center text-gray-500 mt-3 text-sm font-medium'>
              <span className='flex items-center gap-1.5'>
                <img className="h-4 opacity-75" src={assets.suitcase_icon} alt="" />
                {jobData.companyId.name}
              </span>

              <span className='flex items-center gap-1.5'>
                <img className="h-4 opacity-75" src={assets.location_icon} alt="" />
                {jobData.location}
              </span>

              <span className='flex items-center gap-1.5'>
                <img className="h-4 opacity-75" src={assets.person_icon} alt="" />
                {jobData.level}
              </span>

              <span className='flex items-center gap-1.5 text-violet-600 font-semibold'>
                <img className="h-4 opacity-95" src={assets.money_icon} alt="" />
                CTC: {kconvert.convertTo(jobData.salary)}
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center md:items-end text-sm shrink-0 w-full md:w-auto'>
          <button 
            onClick={applyhandler} 
            disabled={isalreadyApplied}
            className={`w-full md:w-auto text-white px-10 py-3 rounded-xl font-semibold text-center transition-all cursor-pointer shadow-md ${isalreadyApplied ? 'bg-gray-200 text-gray-400 border border-gray-300 shadow-none cursor-not-allowed' : 'gradient-btn shadow-violet-500/20'}`}
          >
            {isalreadyApplied ? 'Already Applied' : 'Apply Now'}
          </button>
          <p className='text-xs mt-2 text-gray-400 font-medium'>Posted {moment(jobData.date).fromNow()}</p>
        </div>
      </div>

      {/* Grid Content */}
      <div className='flex flex-col lg:flex-row justify-between items-start gap-10'>
        <div className='w-full lg:w-2/3 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs'>
          <h2 className='font-bold text-gray-800 text-xl sm:text-2xl mb-4 pb-3 border-b border-gray-100'>
            Job Description
          </h2>
          <div className='rich-text mb-8' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
          
          <div className="border-t border-gray-100 pt-6">
            <button 
              onClick={applyhandler} 
              disabled={isalreadyApplied}
              className={`w-full sm:w-auto text-white px-10 py-3 rounded-xl font-semibold text-center transition-all cursor-pointer shadow-md ${isalreadyApplied ? 'bg-gray-200 text-gray-400 border border-gray-300 shadow-none cursor-not-allowed' : 'gradient-btn shadow-violet-500/20'}`}
            >
              {isalreadyApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        </div>

        {/* right section more job */}
        <div className='w-full lg:w-1/3 space-y-6'>
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs">
            <h2 className='font-bold text-gray-800 text-lg mb-4 pb-3 border-b border-gray-100'>
              More Jobs from {jobData.companyId.name}
            </h2>
            <div className="flex flex-col gap-4">
              {jobs.filter(job=>job._id!==jobData._id && job.companyId._id ===jobData.companyId._id)
              .filter(job=>{
                const appliedJobsIds=new Set(userApplications.map(app=>app.jobId && app.jobId._id))
                return !appliedJobsIds.has(job._id)
              }).slice(0,3).map((job,index)=>(
                <Jobcard key={index} job={job}/>
              ))}
              {jobs.filter(job=>job._id!==jobData._id && job.companyId._id ===jobData.companyId._id)
              .filter(job=>{
                const appliedJobsIds=new Set(userApplications.map(app=>app.jobId && app.jobId._id))
                return !appliedJobsIds.has(job._id)
              }).length === 0 && (
                <p className="text-sm text-gray-400 italic">No other open positions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  ) : (
    <Loading/>
  );
}

export default ApplyJob

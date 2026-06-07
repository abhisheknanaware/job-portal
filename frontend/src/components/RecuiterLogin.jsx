import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecuiterLogin = () => {
    const navigate=useNavigate(); 

    const [state,setstate]=useState('Login');
    const [name,setname]=useState('');
    const [password,setPassword]=useState('');
    const [email,setemail]=useState('');

    const [image,setImage]=useState(false);
    const [istextDatasubmitted,setisTextDataSubmitted]=useState(false);

    const {setRecLogin,backendUrl,setCompanyToken,setCompanyData}=useContext(AppContext);

    const onSubmithandler=async(e)=>{
        e.preventDefault()

        if(state=='sign up' && !istextDatasubmitted){
          return setisTextDataSubmitted(true);
        }

        try {
          if(state=="Login"){
            const {data}=await axios.post(backendUrl+"/api/company/login",{
              email,password
            });

            if(data.success){
              setCompanyData(data.company);
              setCompanyToken(data.token);
              localStorage.setItem('companyToken',data.token);
              setRecLogin(false);
              navigate('/dashboard/manage-jobs');
            }else{
              toast.error(data.message);
            }

          }else{
            const formData=new FormData()
            formData.append('name',name);
            formData.append('password',password);
            formData.append('email',email);
            formData.append('image',image);

            const {data}=await axios.post(backendUrl+"/api/company/register",formData);
            if(data.success){
              setCompanyData(data.company);
              setCompanyToken(data.token);
              localStorage.setItem('companyToken',data.token);
              setRecLogin(false);
              navigate('/dashboard/manage-jobs');
            }else{
              toast.error(data.message);
            }

          }
        } catch (error) {
           console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response?.data);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
      document.body.style.overflow='hidden'

      return()=>{
        document.body.style.overflow='unset'
      }
    },[])

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center p-4 animate-fade-in'>
      <form onSubmit={onSubmithandler} className='relative bg-white p-8 sm:p-10 rounded-3xl shadow-2xl text-slate-500 max-w-md w-full border border-gray-100 animate-scale-up'>
        <h1 className='text-center text-2xl text-neutral-800 font-bold mb-1'>Recruiter {state}</h1>
        <p className='text-center text-sm text-gray-400 mb-6'>
          {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create recruiter account to post jobs'}
        </p>
        
        {state==='sign up' && istextDatasubmitted ?
        <>
          <div className='flex flex-col items-center justify-center my-6 gap-3'>
            <label className='flex flex-col items-center justify-center gap-2 cursor-pointer group' htmlFor='image'>
              <div className='w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-violet-400 transition-colors'>
                <img className={image ? 'w-full h-full object-cover' : 'w-8 h-8 opacity-40'} src={image?URL.createObjectURL(image):assets.upload_area}/>
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
              <p className='text-xs font-semibold text-violet-600 group-hover:text-violet-700 transition-colors'>Upload Company Logo</p>
            </label>
          </div>
        </>
        :
        <div className="space-y-4">
          {state !=='Login'?(
            <div className='border border-gray-200 px-4 py-2.5 flex items-center gap-3 rounded-xl focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 transition-all bg-gray-50/50'>
              <img className="opacity-55 h-4" src={assets.person_icon} alt=""/>
              <input className='outline-none text-sm w-full bg-transparent text-gray-700 font-medium' onChange={e=>setname(e.target.value)} value={name} type="text" placeholder='Company Name' required/>
            </div>
          ):(null)}

           <div className='border border-gray-200 px-4 py-2.5 flex items-center gap-3 rounded-xl focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 transition-all bg-gray-50/50'>
            <img className="opacity-55 h-4" src={assets.email_icon} alt=""/>
            <input className='outline-none text-sm w-full bg-transparent text-gray-700 font-medium' onChange={e=>setemail(e.target.value)} value={email} type="email" placeholder='Email ID' required/>
          </div>

           <div className='border border-gray-200 px-4 py-2.5 flex items-center gap-3 rounded-xl focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 transition-all bg-gray-50/50'>
            <img className="opacity-55 h-4" src={assets.lock_icon} alt=""/>
            <input className='outline-none text-sm w-full bg-transparent text-gray-700 font-medium' onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
          </div>
        </div>
        }

        {state==='Login'&&
          <div className="text-right mt-3">
            <span className='text-xs font-medium text-violet-600 hover:text-violet-700 cursor-pointer transition-colors'>Forgot password?</span>
          </div>
        }
        
        <button type='submit' className='gradient-btn text-white w-full py-3 rounded-xl mt-6 font-semibold cursor-pointer shadow-md shadow-violet-500/20 text-sm sm:text-base'>
          {state==='Login'?'Login':istextDatasubmitted?'Create Account':'Next'}
        </button>

        {
          state==='Login'?
          <p className='mt-6 text-center text-sm text-gray-500'>Don't have a recruiter account? <span className='text-violet-600 font-bold cursor-pointer hover:underline' onClick={()=>setstate('sign up')}>Sign Up</span></p>:
          <p className='mt-6 text-center text-sm text-gray-500'>Already have an account? <span className='text-violet-600 font-bold cursor-pointer hover:underline' onClick={()=>setstate('Login')}>Login</span></p>
        }
      
        <div onClick={e=>setRecLogin(false)} className='absolute top-5 right-5 cursor-pointer p-1.5 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-150 transition-colors duration-200'>
          <img className='h-3 w-3 opacity-60' src={assets.cross_icon} alt="Close"/>
        </div>
      </form>
    </div>
  )
}

export default RecuiterLogin

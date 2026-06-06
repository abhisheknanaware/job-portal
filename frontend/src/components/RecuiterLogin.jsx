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
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmithandler} className='relative bg-white p-10 rounded-xl text-slate-500 '>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm '>Welcome back! Please sFign in to continue</p>
        {state==='sign up' && istextDatasubmitted ?
        <>
          <div className=' my-10'>
            <label className='flex items-center gap-4 cursor-pointer' htmlFor='image'>
              <img className='w-16 rounded-full' src={image?URL.createObjectURL(image):assets.upload_area}/>
              <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden/>
              <p>Upload Company <br/>logo</p>
            </label>
          </div>
        </>
        :
        <>

        {state !=='Login'?(
          <div className='border border-gray-300 px-4 py-2 flex items-center gap-2 rounded mt-5'>
          <img src={assets.person_icon} alt=""/>
          <input className='outline-none text-sm'  onChange={e=>setname(e.target.value)} value={name} type="text" placeholder='Company Name' required/>
        </div>
        ):(null)}


         <div className='border border-gray-300  px-4 py-2 flex items-center gap-2 rounded mt-5'>
          <img src={assets.email_icon} alt=""/>
          <input className='outline-none text-sm' onChange={e=>setemail(e.target.value)} value={email} type="email" placeholder='Email id' required/>
        </div>

         <div className='border border-gray-300  px-4 py-2 flex items-center gap-2 rounded mt-5'>
          <img src={assets.lock_icon} alt=""/>
          <input className='outline-none text-sm'  onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
        </div>

        </>
        }
        {state==='Login'&&
        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
        }
        
        <button type='submit' className='bg-blue-400 w-full text-white py-2 rounded-xl mt-4'>
          {state==='Login'?'login':istextDatasubmitted?'Create Account':'next'}
        </button>

        {
          state==='Login'?
          <p className='mt-5 text-center'>Don't have an Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setstate('sign up')}>Sign Up</span></p>:
          <p className='mt-5 text-center'>Already have an account?<span className='text-blue-400 cursor-pointer' onClick={()=>setstate('Login')}>Login</span></p>
        }
      
        <img onClick={e=>setRecLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon}/>
      </form>
    </div>
  )
}

export default RecuiterLogin

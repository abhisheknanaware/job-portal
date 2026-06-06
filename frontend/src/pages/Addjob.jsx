import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Addjob = () => {
  const [title,settitle]=useState('');
  const [location,setlocation]=useState('Bangalore');
  const [category,setcategory]=useState('Programming');
  const [level,setlevel]=useState('beginner level');
  const [salary,setsalary]=useState(0);
  
  const editorRef=useRef(null);
  const quillRef=useRef(null);
  const {backendUrl,companyToken}=useContext(AppContext);

  const onSubmithandler=async(e)=>{
    e.preventDefault();
    try {
      const description=quillRef.current.root.innerHTML;

      const {data}=await axios.post(backendUrl +'/api/company/post-job',{
        title,description,location,salary,category,level
      },{headers:{token:companyToken}})

      if(data.success){
        toast.success(data.message)
        settitle('');
        setsalary(0);
        quillRef.current.root.innerHTML=""
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    //Initiate Quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current=new Quill(editorRef.current,{
        theme:'snow'
      })
    }
  },[])
  return (
    <form  onSubmit={onSubmithandler}
       className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full '>
        <p className='mb-2'>Job Title</p>
        <input type='text' placeholder='Type here' onChange={e=>settitle(e.target.value)}
         value={title} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded'  onChange={e=>setcategory(e.target.value)}>
            {JobCategories.map((category,idx)=>(
              <option value={category} key={idx}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setlocation(e.target.value)}>
            {JobLocations.map((location,idx)=>(
              <option value={location} key={idx}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setlevel(e.target.value)}>
            <option value="Begineer level">Begineer level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

      </div>

      <div >
          <p className='mb-2'>Job Salary</p>
          <input min={0} className='w-full px-3 py-2 border-2 border-2gray-300 rounded' onChange={e=>setsalary(e.target.value)} type='Number' placeholder='25000'/>
        </div>
          
      <button type='submit' className='w-28 py-3 bg-black text-white rounded'>ADD</button>

    </form>
  )
}

export default Addjob

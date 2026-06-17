import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Addjob = () => {
  const [title, settitle] = useState('');
  const [location, setlocation] = useState('Bangalore');
  const [category, setcategory] = useState('Programming');
  const [level, setlevel] = useState('Beginner level');
  const [salary, setsalary] = useState(0);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(backendUrl + '/api/company/post-job', {
        title, description, location, salary, category, level
      }, { headers: { token: companyToken } })

      if (data.success) {
        toast.success(data.message)
        settitle('');
        setsalary(0);
        quillRef.current.root.innerHTML = ""
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setShowCategoryDropdown(false);
        setShowLocationDropdown(false);
        setShowLevelDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <form onSubmit={onSubmithandler} className='container p-2 flex flex-col w-full items-start gap-5 max-w-3xl animate-fade-in'>
      <div className="border-b border-gray-100 pb-3 w-full">
        <h2 className="text-xl font-bold text-gray-800">Post a New Job</h2>
        <p className="text-xs text-gray-400">Fill in the specifications below to publish your opening.</p>
      </div>

      <div className='w-full'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Job Title</label>
        <input
          type='text'
          placeholder='e.g. Senior Frontend Developer'
          onChange={e => settitle(e.target.value)}
          value={title}
          required
          className='w-full max-w-xl px-4 py-2.5 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-gray-50/30 text-sm font-medium text-gray-700'
        />
      </div>

      <div className='w-full max-w-xl'>
        <label className='block text-sm font-bold text-gray-700 mb-2'>Job Description</label>
        <div className="border border-gray-100 rounded-lg overflow-hidden focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 transition-all bg-white">
          <div ref={editorRef} className="min-h-[180px] text-gray-700 text-sm p-2 "></div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl'>

        {/* Category Dropdown */}
        <div className="dropdown-container relative">
          <label className='block text-sm font-bold text-gray-700 mb-2'>Job Category</label>
          <button
            type="button"
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowLocationDropdown(false);
              setShowLevelDropdown(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-white text-sm font-semibold text-gray-600 text-left cursor-pointer"
          >
            <span>{category}</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCategoryDropdown && (
            <div className="absolute z-35 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto animate-scale-up">
              {JobCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setcategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer font-medium ${cat === category ? 'bg-violet-50 text-violet-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="dropdown-container relative">
          <label className='block text-sm font-bold text-gray-700 mb-2'>Job Location</label>
          <button
            type="button"
            onClick={() => {
              setShowLocationDropdown(!showLocationDropdown);
              setShowCategoryDropdown(false);
              setShowLevelDropdown(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-white text-sm font-semibold text-gray-600 text-left cursor-pointer"
          >
            <span>{location}</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showLocationDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showLocationDropdown && (
            <div className="absolute z-35 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto animate-scale-up">
              {JobLocations.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setlocation(loc);
                    setShowLocationDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer font-medium ${loc === location ? 'bg-violet-50 text-violet-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Level Dropdown */}
        <div className="dropdown-container relative">
          <label className='block text-sm font-bold text-gray-700 mb-2'>Job Level</label>
          <button
            type="button"
            onClick={() => {
              setShowLevelDropdown(!showLevelDropdown);
              setShowCategoryDropdown(false);
              setShowLocationDropdown(false);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-white text-sm font-semibold text-gray-600 text-left cursor-pointer"
          >
            <span>{level}</span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showLevelDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showLevelDropdown && (
            <div className="absolute z-35 w-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1 animate-scale-up">
              {['Beginner level', 'Intermediate level', 'Senior level'].map((lvl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setlevel(lvl);
                    setShowLevelDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer font-medium ${lvl === level ? 'bg-violet-50 text-violet-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-xs">
        <label className='block text-sm font-bold text-gray-700 mb-2'>Job Salary ($)</label>
        <input
          min={0}
          className='w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none bg-gray-50/30 text-sm font-semibold text-gray-700'
          onChange={e => setsalary(e.target.value)}
          value={salary}
          type='number'
          placeholder='e.g. 80000'
          required
        />
      </div>

      <button
        type='submit'
        className='gradient-btn text-white py-3 px-8 rounded-xl font-bold tracking-wide cursor-pointer shadow-md shadow-violet-500/10 text-sm sm:text-base mt-2'
      >
        Post Job
      </button>
    </form>
  )
}

export default Addjob

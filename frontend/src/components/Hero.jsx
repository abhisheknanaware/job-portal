import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const {setSearchFilter,setIsSearched}=useContext(AppContext);
    const titleref=useRef(null)
    const locationref=useRef(null)
    
    const handleSearch=()=>{
        setSearchFilter({
        title:titleref.current.value,
        location:locationref.current.value
        })
        setIsSearched(true);
        
        
    }
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-linear-to-r from-purple-800 to-purple-950 rounded-xl text-white  py-16 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10,000+ jobs to Apply</h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-full font-light px-5">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        <div className="flex sm:w-xl  items-center justify-center gap-4 max-w-2xl mx-auto p-2 bg-white rounded-sm">
            <div className='flex items-center'>
                <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
                <input type="text" placeholder='Search for jobs'
                ref={titleref}
                className='max-sm:text-xs p-2 rounded text-gray-600 outline-none w-full' />
            </div>

            <div className='flex items-center'>
                <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
                <input type="text" 
                    placeholder='Search for jobs'
                    ref={locationref}
                className='max-sm:text-xs p-2 rounded text-gray-600 outline-none w-full' />
            </div>
            <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>

        </div>
      </div>

      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex items-center gap-10 flex-wrap lg:gap-10 justify-center'>
            <p className='font-medium'>Trusted By : </p>
            <img className='h-6' src={assets.microsoft_logo} alt="Company 1" />
            <img className='h-6' src={assets.walmart_logo} alt="Company 2" />
            <img className='h-6' src={assets.accenture_logo} alt="Company 3" />
            <img className='h-6' src={assets.samsung_logo} alt="Company 4" />
            <img className='h-6' src={assets.amazon_logo} alt="Company 5" />
            <img className='h-6' src={assets.adobe_logo} alt="Company 6" />
        </div>
      </div>
      
    </div>
  )
}

export default Hero

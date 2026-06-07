import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleref = useRef(null)
  const locationref = useRef(null)

  const handleSearch = () => {
    setSearchFilter({
      title: titleref.current.value,
      location: locationref.current.value
    })
    setIsSearched(true);
  }
  return (
    <div className="container 2xl:px-20 mx-auto my-10 px-4">
      {/* Premium Gradient Banner with floating circles */}
      <div className="relative bg-linear-to-br from-violet-950 via-indigo-900 to-neutral-950 rounded-3xl text-white py-20 px-6 sm:px-12 text-center overflow-hidden shadow-2xl border border-violet-900/30">

        {/* Floating Glowing Background Circles */}
        <div className="absolute top-[-50px] left-[-50px] w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-200 via-white to-indigo-200 bg-clip-text text-transparent">
            Over 10,000+ Jobs To Apply
          </h2>
          <p className="text-base md:text-xl text-indigo-100/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your next big career move starts right here. Explore the best job opportunities and take the first step toward your dream future.
          </p>

          {/* Glassmorphic Search Container */}
          <div className="glass-search flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto p-3 rounded-2xl">
            <div className='flex items-center w-full md:w-5/12 px-3 border-b md:border-b-0 md:border-r border-gray-200/50 py-2'>
              <img className="h-5 mr-3 opacity-60" src={assets.search_icon} alt="Search" />
              <input
                type="text"
                placeholder='Search for jobs, skills...'
                ref={titleref}
                className='text-sm p-1 text-gray-700 bg-transparent outline-none w-full placeholder-gray-400 font-medium'
              />
            </div>

            <div className='flex items-center w-full md:w-5/12 px-3 py-2'>
              <img className="h-5 mr-3 opacity-60" src={assets.location_icon} alt="Location" />
              <input
                type="text"
                placeholder='City, state or remote...'
                ref={locationref}
                className='text-sm p-1 text-gray-700 bg-transparent outline-none w-full placeholder-gray-400 font-medium'
              />
            </div>

            <button
              onClick={handleSearch}
              className="gradient-btn w-full md:w-auto text-white font-semibold py-3 px-8 rounded-xl shadow-lg cursor-pointer text-sm md:text-base shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section */}
      <div className='bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow mx-auto max-w-6xl mt-8 p-6 rounded-2xl flex justify-center items-center relative z-20'>
        <div className='flex items-center gap-8 md:gap-12 flex-wrap justify-center w-full'>
          <p className='font-semibold text-gray-400 text-sm tracking-wider uppercase mr-2'>Trusted By</p>
          <img className='h-6 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.microsoft_logo} alt="Microsoft" />
          <img className='h-6 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.walmart_logo} alt="Walmart" />
          <img className='h-6 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.accenture_logo} alt="Accenture" />
          <img className='h-5 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.samsung_logo} alt="Samsung" />
          <img className='h-6 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.amazon_logo} alt="Amazon" />
          <img className='h-6 hover:scale-105 transition-transform duration-200 cursor-pointer' src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>

    </div>
  )
}

export default Hero

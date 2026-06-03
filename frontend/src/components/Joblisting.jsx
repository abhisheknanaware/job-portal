import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import Jobcard from './Jobcard';

const Joblisting = () => {
    const {issearched,searchfilter,setSearchFilter,setIsSearched,jobs}=useContext(AppContext);

    const [showfilters,setShowFilters]=useState(true);
    const [currentpage,setCurrentpage]=useState(1);

    const [selectedcategories,setSelectedCategories]=useState([]);
    const [selectedlocations,setSelectedLocations]=useState(jobs);

    const [filteredJobs,setFilteredJobs]=useState(jobs);

    const handleCategoryChange=(category)=>{
        setSelectedCategories(prev=>prev.includes(category)? prev.filter(cat=>cat!==category): [...prev, category]);
    }

    const handleLocationChange=(location)=>{
        setSelectedLocations(prev=>prev.includes(location)? prev.filter(loc=>loc!==location): [...prev, location]);
    }

    useEffect(()=>{
        const matchesCategory=job=>selectedcategories.length===0 || selectedcategories.includes(job.category);
        const matchesLocation=job=>selectedlocations.length===0 || selectedlocations.includes(job.location);

        const matchesTitle=job=>searchfilter.title === "" || job.title.toLowerCase().includes(searchfilter.title.toLowerCase());
        const matchesLocationSearch=job=>searchfilter.location === "" || job.location.toLowerCase().includes(searchfilter.location.toLowerCase());

        const newFilteredjobs=jobs.slice().reverse().filter(
            job=>matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesLocationSearch(job)
        )
        setFilteredJobs(newFilteredjobs);
        setCurrentpage(1);

    },[jobs, selectedcategories, selectedlocations, searchfilter])

  return (
    <div className='container 2xl:px-20 flex flex-col lg:flex-row max-lg:space-y-8 py-8 gap-16 max-lg:gap-0 '>
        {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4' >
        {/* search filter from hero component */}
        {
            issearched && (searchfilter.title !==" " || searchfilter.location !==" ") &&
            (
                <>
                <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                <div className='mb-4 text-gray-600 '> 
                    {searchfilter.title && 
                    (
                        <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                            {searchfilter.title}
                            <img onClick={e=>setSearchFilter(prev=>({...prev, title: ""}))} src={assets.cross_icon} alt="Remove"></img>
                        </span>
                    )}

                    {searchfilter.location && 
                    (
                        <span className='inline-flex ml-2 items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded '>
                            {searchfilter.location}
                            <img onClick={e=>setSearchFilter(prev=>({...prev, location: ""}))} src={assets.cross_icon} alt="Remove"></img>

                        </span>
                    )}
                </div>
                </>
            )
        }

        <button className='px-6  py-1.5 ounded border border-gray-400 lg:hidden'
            onClick={e=>setShowFilters(prev=>!prev)}>
            {showfilters? "Close":"Filters"}
        </button>

        {/* category filter */}
            <div className={showfilters? "":"max-lg:hidden"}>
                <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='text-gray-600 space-y-4' >
                        {
                            JobCategories.map((category,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox" onChange={()=>handleCategoryChange(category)} checked={selectedcategories.includes(category)} />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>
        {/* location filter */}
                <div className={showfilters? "":"max-lg:hidden"}>
                <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                    <ul className='text-gray-600 space-y-4' >
                        {
                            JobLocations.map((location,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox" onChange={()=>handleLocationChange(location)} checked={selectedlocations.includes(location)} />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
        
            </div>
        
        {/* job listing */}
        <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
            <h3 className='font-medium text-3xl py-2' id='job-listing'>
                Latest Job Listing
            </h3>
            <p className='mb-8 '>Get your desired job from top companies</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filteredJobs.slice((currentpage - 1) * 6, currentpage * 6).map((job, index) => (
                    <Jobcard key={index} job={job} />
                ))}
            </div>

            {/* pagination */}
            {filteredJobs.length > 0 && (
                <div className='flex items-center justify-center space-x-2 mt-10'>
                    <a href="#job-list">
                        <img onClick={()=>setCurrentpage(prev=>Math.max(prev-1,1))} src={assets.left_arrow_icon}/>
                    </a>
                    {
                        Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,idx)=>(
                            <a href="#job-list" key={idx}>
                                <button onClick={()=>setCurrentpage(idx+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentpage===idx+1 ?'bg-blue-100 text-blue-500':'text-gray-500'}`}>{idx+1}</button>
                            </a>
                        ))
                    }
                    <a href="#job-list">
                        <img onClick={()=>setCurrentpage(prev=>Math.min(prev+1, Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon}/>
                    </a>
                </div>
            )}

        </section>
    </div>
  )
}

export default Joblisting

import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import Jobcard from './Jobcard';

const Joblisting = () => {
    const {issearched,searchfilter,setSearchFilter,setIsSearched,jobs}=useContext(AppContext);

    const [showfilters,setShowFilters]=useState(true);
    const [currentpage,setCurrentpage]=useState(1);

    const [selectedcategories,setSelectedCategories]=useState([]);
    const [selectedlocations,setSelectedLocations]=useState([]);

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

    useEffect(()=>{
        if(jobs)
        {
            setFilteredJobs(jobs);
        }
    },[jobs])

  return (
    <div className='container 2xl:px-20 flex flex-col lg:flex-row py-12 gap-8 lg:gap-12 px-4 mx-auto'>
        {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs h-fit self-start' >
        {/* search filter from hero component */}
        {
            issearched && (searchfilter.title !== "" || searchfilter.location !== "") &&
            (
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className='font-bold text-gray-800 text-sm tracking-wider uppercase mb-3'>Current Search</h3>
                    <div className='flex flex-wrap gap-2'> 
                        {searchfilter.title && 
                        (
                            <span className='inline-flex items-center gap-2 bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1 rounded-full text-xs font-semibold'>
                                {searchfilter.title}
                                <img className="cursor-pointer h-3 w-3 hover:opacity-80" onClick={e=>setSearchFilter(prev=>({...prev, title: ""}))} src={assets.cross_icon} alt="Remove"></img>
                            </span>
                        )}

                        {searchfilter.location && 
                        (
                            <span className='inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold'>
                                {searchfilter.location}
                                <img className="cursor-pointer h-3 w-3 hover:opacity-80" onClick={e=>setSearchFilter(prev=>({...prev, location: ""}))} src={assets.cross_icon} alt="Remove"></img>
                            </span>
                        )}
                    </div>
                </div>
            )
        }

        <button 
            className='w-full px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors lg:hidden font-semibold cursor-pointer mb-4 flex items-center justify-center gap-2 text-sm'
            onClick={e=>setShowFilters(prev=>!prev)}
        >
            {showfilters ? "Close Filters" : "Show Filters"}
        </button>

        {/* category filter */}
        <div className={showfilters ? "space-y-6 animate-fade-in" : "max-lg:hidden space-y-6"}>
            <div>
                <h4 className='font-bold text-gray-800 text-sm tracking-wider uppercase mb-4'>Search by Categories</h4>
                <ul className='text-gray-600 space-y-3' >
                    {
                        JobCategories.map((category,index)=>(
                            <li className='flex gap-3 items-center hover:text-gray-900 transition-colors cursor-pointer py-0.5' key={index}>
                                <input 
                                    className='w-4.5 h-4.5 accent-violet-600 rounded border-gray-300 focus:ring-violet-500 cursor-pointer' 
                                    type="checkbox" 
                                    onChange={()=>handleCategoryChange(category)} 
                                    checked={selectedcategories.includes(category)} 
                                    id={`cat-${index}`}
                                />
                                <label htmlFor={`cat-${index}`} className="text-sm font-medium cursor-pointer select-none">{category}</label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            
            {/* location filter */}
            <div className="pt-6 border-t border-gray-100">
                <h4 className='font-bold text-gray-800 text-sm tracking-wider uppercase mb-4'>Search by Location</h4>
                <ul className='text-gray-600 space-y-3' >
                    {
                        JobLocations.map((location,index)=>(
                            <li className='flex gap-3 items-center hover:text-gray-900 transition-colors cursor-pointer py-0.5' key={index}>
                                <input 
                                    className='w-4.5 h-4.5 accent-violet-600 rounded border-gray-300 focus:ring-violet-500 cursor-pointer' 
                                    type="checkbox" 
                                    onChange={()=>handleLocationChange(location)} 
                                    checked={selectedlocations.includes(location)} 
                                    id={`loc-${index}`}
                                />
                                <label htmlFor={`loc-${index}`} className="text-sm font-medium cursor-pointer select-none">{location}</label>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
      </div>
        
        {/* job listing */}
        <section className='w-full lg:w-3/4 text-gray-800'>
            <div className="mb-6">
                <h3 className='font-bold text-gray-900 text-2xl sm:text-3xl tracking-tight mb-2' id='job-listing'>
                    Latest Job Openings
                </h3>
                <p className='text-gray-500 text-sm sm:text-base'>Discover your dream role from top-tier global companies</p>
            </div>

            {filteredJobs.length === 0 ? (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-20 px-4 text-center">
                    <img className="h-12 mx-auto mb-4 opacity-30" src={assets.company_icon} alt="Empty" />
                    <h3 className="font-semibold text-gray-700 text-lg mb-1">No Jobs Found</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">We couldn't find any job matches for your current selections. Try relaxing your filters.</p>
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {filteredJobs.slice((currentpage - 1) * 6, currentpage * 6).map((job, index) => (
                            <Jobcard key={index} job={job} />
                        ))}
                    </div>

                    {/* pagination */}
                    {filteredJobs.length > 6 && (
                        <div className='flex items-center justify-center gap-2 mt-12'>
                            <button 
                                onClick={()=>setCurrentpage(prev=>Math.max(prev-1,1))}
                                disabled={currentpage === 1}
                                className='w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer'
                            >
                                <img className="h-3.5" src={assets.left_arrow_icon} alt="Prev"/>
                            </button>
                            
                            {
                                Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,idx)=>(
                                    <button 
                                        onClick={()=>setCurrentpage(idx+1)} 
                                        key={idx}
                                        className={`w-10 h-10 flex items-center justify-center font-bold border rounded-xl transition-all duration-200 cursor-pointer ${currentpage===idx+1 ?'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20':'border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                                    >
                                        {idx+1}
                                    </button>
                                ))
                            }
                            
                            <button 
                                onClick={()=>setCurrentpage(prev=>Math.min(prev+1, Math.ceil(filteredJobs.length/6)))}
                                disabled={currentpage === Math.ceil(filteredJobs.length/6)}
                                className='w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer'
                            >
                                <img className="h-3.5" src={assets.right_arrow_icon} alt="Next"/>
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    </div>
  )
}

export default Joblisting

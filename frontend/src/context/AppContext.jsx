import { createContext, useEffect } from "react";
import { useState } from "react";
import { jobsData } from "../assets/assets.js";

export const AppContext=createContext();

export const AppContextProvider=(props)=>{
    const [searchfilter,setSearchFilter]=useState({
        title:"",
        location:""
    });

    const [issearched,setIsSearched]=useState(false);

    const [jobs,setJobs]=useState([]);
    //Function to fetch jobs

    const fetchJobs=async()=>{
        setJobs(jobsData);
    }

    const [showRecLogin,setRecLogin]=useState(false);

    useEffect(()=>{
        fetchJobs();
    },[])

    const value={
        searchfilter,setSearchFilter,
        issearched,setIsSearched,
        jobs,setJobs,
        showRecLogin,setRecLogin
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
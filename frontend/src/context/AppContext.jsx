import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext=createContext();

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const {user}=useUser();
    const {getToken}=useAuth();

    const [searchfilter,setSearchFilter]=useState({
        title:"",
        location:""
    });

    const [issearched,setIsSearched]=useState(false);

    const [userData,setuserData]=useState(null);
    const [userApplications,setuserApplications]=useState([]);


    const [jobs,setJobs]=useState([]);
    //Function to fetch jobs

    const fetchJobs=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/jobs');
            if(data.success){
                setJobs(data.jobs);
                console.log(data.jobs);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const [showRecLogin,setRecLogin]=useState(false);

    const [companyToken,setCompanyToken]=useState(null);
    const [companyData,setCompanyData]=useState(null);

    //fn to fetch company data
    const fetchCompanyData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/company/companyData',{
                headers:{token:companyToken}
            });

            if(data.success){
                setCompanyData(data.company);
                console.log(data);
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserData=async()=>{
        try {
           const token=await  getToken();
           const {data}=await axios.get(backendUrl+'/api/users/user',
            {headers:{Authorization:`Bearer ${token}`}});

            if(data.success){
                setuserData(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)
        }
    }

    const fetchUserApplications=async()=>{
        try{
            const token=await getToken();
            const {data}=await axios.get(backendUrl+'/api/users/applications',
                {headers:{Authorization:`Bearer ${token}`}}
            )

            if(data.success){
                setuserApplications(data.applications)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs();
        const storedCompanyToken=localStorage.getItem('companyToken');
        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken);
        }
    },[])

    useEffect(()=>{
        if(companyToken){
           fetchCompanyData(); 
        }
    },[companyToken])

    useEffect(()=>{
        if(user){
            fetchUserData();
            fetchUserApplications();
        }
    },[user])

    const value={
        searchfilter,setSearchFilter,
        issearched,setIsSearched,
        jobs,setJobs,
        showRecLogin,setRecLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl,
        userData, setuserData,
        userApplications, setuserApplications,
        fetchUserData,fetchUserApplications
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
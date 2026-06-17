import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loading from '../components/Loading';

const ViewApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false)
  const fetchCompanyApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )
      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchCompanyApplicants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplicants();
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ? (
    <div className='flex flex-col items-center justify-center h-[50vh] animate-fade-in'>
      <p className='text-lg font-semibold text-gray-400'>No applications found.</p>
    </div>
  ) : (
    <div className='container mx-auto animate-fade-in'>
      <div className="border-b border-gray-100 pb-3 mb-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">Job Applications</h2>
        <p className="text-xs text-gray-400">Review, view profiles, download resumes, and change status of applicants.</p>
      </div>

      <div className='overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-xs'>
        <table className='min-w-full text-gray-700'>
          <thead>
            <tr className="bg-gray-50/60 text-gray-500 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 text-left">
              <th className='py-4 px-6 text-center max-sm:hidden'>#</th>
              <th className='py-4 px-6'>Applicant Name</th>
              <th className='py-4 px-6'>Job Title</th>
              <th className='py-4 px-6 max-sm:hidden'>Location</th>
              <th className='py-4 px-6'>Resume</th>
              <th className='py-4 px-6 text-center'>Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-150">
            {applicants.filter(item => item.jobId && item.userId).map((applicant, idx) => (
              <tr key={idx} className='hover:bg-gray-50/40 transition-colors text-sm'>
                <td className='py-4 px-6 text-center max-sm:hidden font-medium text-gray-400'>{idx + 1}</td>
                <td className='py-4 px-6 font-bold text-gray-800'>
                  <div className='flex items-center gap-3'>
                    <img className='w-8 h-8 rounded-full border border-gray-100 shadow-xs object-cover max-sm:hidden' src={applicant.userId.image} alt={applicant.userId.name} />
                    <span>{applicant.userId.name}</span>
                  </div>
                </td>
                <td className='py-4 px-6 font-semibold text-gray-700'>{applicant.jobId.title}</td>
                <td className='py-4 px-6 max-sm:hidden text-gray-500 font-medium'>{applicant.jobId.location}</td>
                <td className='py-4 px-6 sm:px-2'>
                  <a
                    href={applicant.userId.resume}
                    target='_blank'
                    rel="noreferrer"
                    className='inline-flex items-center gap-1.5 bg-violet-50 border border-violet-100 hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs'
                  >
                    Resume
                    <img className='h-3.5 opacity-80' src={assets.resume_download_icon} alt="Download" />
                  </a>
                </td>
                <td className='py-4 px-6 text-center relative'>
                  {applicant.status === "Pending" ?
                    (
                      <div className='flex items-center gap-2 justify-center'>
                        <button 
                          onClick={() => statusHandler(applicant._id, 'Accepted')} 
                          className='px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer'
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => statusHandler(applicant._id, 'Rejected')} 
                          className='px-3 py-1 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer'
                        >
                          Reject
                        </button>
                      </div>
                    )
                    : (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${applicant.status === 'Accepted'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                        {applicant.status}
                      </span>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading></Loading>
}

export default ViewApplication

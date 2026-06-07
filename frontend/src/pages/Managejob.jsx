import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading';

const Managejob = () => {
  const navigate = useNavigate();
  const [jobs, setjobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  //function to fetch company job applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        {
          headers: { token: companyToken }
        })

      if (data.success) {
        setjobs(data.jobsData.reverse());
        console.log(data.jobsData)
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const changevisibility = async (id) => {
    //function to change job visibility
    setjobs(prev =>
      prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
    );
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visibility', {
        id,
      },
        { headers: { token: companyToken } })
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setjobs(prev =>
          prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
        );
      }
    } catch (error) {
      toast.error(error.message);
      setjobs(prev =>
        prev.map(job => job._id === id ? { ...job, visible: !job.visible } : job)
      );
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return jobs ? jobs.length === 0 ? (
    <div className='flex flex-col items-center justify-center h-[50vh] gap-4 animate-fade-in'>
      <p className='text-lg font-semibold text-gray-400'>No jobs posted yet.</p>
      <button onClick={() => navigate('/dashboard/addjob')} className='gradient-btn text-white py-2.5 px-6 rounded-xl font-bold text-sm cursor-pointer'>Post First Job</button>
    </div>
  ) : (
    <div className='container max-w-5xl animate-fade-in'>
      <div className="border-b border-gray-100 pb-3 mb-6 w-full flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manage Posted Jobs</h2>
          <p className="text-xs text-gray-400">View performance metrics and toggle job visibility on the search portal.</p>
        </div>
        <button onClick={() => navigate('/dashboard/addjob')} className='gradient-btn text-white py-2.5 px-6 rounded-xl font-bold text-sm cursor-pointer max-sm:px-2 max-sm:py-2 max-sm:text-xs shadow-sm hidden sm:block'>
          Add New Job
        </button>
      </div>

      <div className='overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-xs mb-6'>
        <table className='min-w-full text-gray-700'>
          <thead>
            <tr className="bg-gray-50/60 text-gray-500 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 text-left">
              <th className='py-4 px-6 max-sm:hidden'>#</th>
              <th className='py-4 px-6'>Job Title</th>
              <th className='py-4 px-6 max-sm:hidden'>Date Posted</th>
              <th className='py-4 px-6 max-sm:hidden'>Location</th>
              <th className='py-4 px-6 text-center'>Applicants</th>
              <th className='py-4 px-6 text-center'>Visible</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-150">
            {jobs.map((job, idx) => (
              <tr key={idx} className='hover:bg-gray-50/40 transition-colors text-sm '>
                <td className='py-4 px-6 max-sm:hidden font-medium text-gray-400'>{idx + 1}</td>
                <td className='py-4 px-6 font-bold text-gray-800'>{job.title}</td>
                <td className='py-4 px-6 max-sm:hidden text-gray-400 font-medium'>{moment(job.date).format('ll')}</td>
                <td className='py-4 px-6 max-sm:hidden text-gray-500 font-medium'>{job.location}</td>
                <td className='py-4 px-6 text-center font-bold text-gray-900'>{job.applicants}</td>
                <td className='py-4 px-6 flex items-center justify-center'>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={job.visible}
                      onChange={() => changevisibility(job._id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-150 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-start sm:hidden'>
        <button onClick={() => navigate('/dashboard/addjob')} className='gradient-btn text-white py-2.5 px-6 rounded-xl font-bold text-sm cursor-pointer w-full text-center'>Add New Job</button>
      </div>
    </div>
  ) : <Loading />
}

export default Managejob

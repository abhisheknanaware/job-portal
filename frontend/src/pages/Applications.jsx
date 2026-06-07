import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isedited, setisedit] = useState(false);
  const [resume, setresume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserApplications, fetchUserData } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume);
      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setisedit(false);
    setresume(null);
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user])

  // Count application statuses
  const totalApplied = userApplications.length;
  const acceptedCount = userApplications.filter(app => app.status === 'Accepted').length;
  const pendingCount = userApplications.filter(app => app.status === 'Pending').length;

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[70vh] 2xl:px-20 mx-auto my-10 animate-fade-in'>

        {/* User Summary Dashboard Header */}
        {user && (
          <div className='bg-linear-to-br from-violet-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden border border-violet-800/30'>
            {/* Background blobs */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-4 max-sm:flex-col text-center sm:text-left">
              <img className="w-20 h-20 rounded-full border-4 border-white/20 shadow-md" src={user.imageUrl} alt={user.fullName} />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{user.fullName}</h2>
                <p className="text-sm text-indigo-200/90 font-medium">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/10 text-center shrink-0">
                <span className="block text-2xl font-extrabold">{totalApplied}</span>
                <span className="text-xs text-indigo-200/90 font-semibold tracking-wider uppercase">Applied</span>
              </div>
              <div className="bg-emerald-500/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-emerald-500/20 text-center shrink-0">
                <span className="block text-2xl font-extrabold text-emerald-300">{acceptedCount}</span>
                <span className="text-xs text-emerald-200/90 font-semibold tracking-wider uppercase">Accepted</span>
              </div>
              <div className="bg-amber-500/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-amber-500/20 text-center shrink-0">
                <span className="block text-2xl font-extrabold text-amber-300">{pendingCount}</span>
                <span className="text-xs text-amber-200/90 font-semibold tracking-wider uppercase">Pending</span>
              </div>
            </div>
          </div>
        )}

        {/* Resume Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-8">
          <h2 className='text-lg font-bold text-gray-800 mb-4'>Your Resume</h2>
          <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
            {
              isedited || (userData && !userData.resume?.trim()) ?
                <div className="w-full max-w-md flex flex-col gap-3">
                  <label
                    className='flex flex-col items-center justify-center border-2 border-dashed border-violet-200 hover:border-violet-400 bg-violet-50/10 hover:bg-violet-50/20 rounded-2xl p-6 transition-all cursor-pointer text-center group'
                    htmlFor='resumeupload'
                  >
                    <img className="h-8 opacity-60 mb-2 group-hover:scale-105 transition-transform" src={assets.profile_upload_icon} alt="Upload" />
                    <span className='text-sm font-semibold text-gray-600 group-hover:text-gray-800'>
                      {resume ? resume.name : "Choose PDF Resume File"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Accepts PDF file up to 5MB</span>
                    <input id='resumeupload' onChange={e => setresume(e.target.files[0])} accept='application/pdf' type='file' hidden />
                  </label>

                  <div className="flex gap-2.5">
                    <button
                      className='gradient-btn text-white px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer shadow-sm w-full sm:w-auto text-center'
                      onClick={updateResume}
                      disabled={!resume}
                    >
                      Save Resume
                    </button>
                    {userData?.resume && (
                      <button
                        className='border border-gray-200 text-gray-600 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer w-full sm:w-auto text-center'
                        onClick={() => { setisedit(false); setresume(null); }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                :
                <div className='flex items-center gap-3 bg-violet-50/50 border border-violet-100 rounded-2xl p-4 w-full max-w-md justify-between'>
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-100 p-2.5 rounded-xl">
                      <img className="h-5" src={assets.resume_selected} alt="ResumeIcon" />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-800 text-sm">Professional CV</span>
                      <a target='_blank' rel="noreferrer" className='text-xs text-violet-600 hover:text-violet-700 hover:underline font-semibold' href={userData?.resume}>
                        View Uploaded Document
                      </a>
                    </div>
                  </div>
                  <button onClick={() => setisedit(true)} className='border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer'>
                    Edit Resume
                  </button>
                </div>
            }
          </div>
        </div>

        {/* Applied Jobs Table */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className='text-lg font-bold text-gray-800'>Jobs Applied</h2>
          </div>

          <div className="overflow-x-auto">
            <table className='min-w-full text-gray-700'>
              <thead>
                <tr className="bg-gray-50/60 text-gray-500 font-semibold uppercase tracking-wider text-xs border-b border-gray-100 text-left">
                  <th className='py-4.5 px-6'>Company</th>
                  <th className='py-4.5 px-6'>Job Title</th>
                  <th className='py-4.5 px-6 max-sm:hidden'>Location</th>
                  <th className='py-4.5 px-6 max-sm:hidden'>Applied Date</th>
                  <th className='py-4.5 px-6'>Status</th>
                </tr>
              </thead>

              <tbody className=" ">
                {userApplications.map((job, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/40 transition-colors text-sm">
                    <td className='py-4 px-6 flex items-center gap-3 font-medium text-gray-900'>
                      <div className='w-8 h-8 rounded-lg border border-gray-100 p-1 flex items-center justify-center overflow-hidden bg-white shrink-0 shadow-xs'>
                        <img className='max-h-full max-w-full object-contain' src={job.companyId.img || job.companyId.image || assets.company_icon} alt="" />
                      </div>
                      {job.companyId.name}
                    </td>

                    <td className='py-4 px-6 font-semibold text-gray-800'>
                      {job.jobId.title}
                    </td>
                    <td className='py-4 px-6 max-sm:hidden text-gray-500'>{job.jobId.location}</td>
                    <td className='py-4 px-6 max-sm:hidden text-gray-400 font-medium'>{moment(job.date).format('ll')}</td>
                    <td className='py-4 px-6'>
                      <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold border ${job.status === 'Accepted'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-xs'
                        : job.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-600 border-rose-100 shadow-xs'
                          : 'bg-amber-50 text-amber-600 border-amber-100 shadow-xs'
                        }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {userApplications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 px-6 text-center text-gray-400 italic">
                      You haven't applied for any jobs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Applications

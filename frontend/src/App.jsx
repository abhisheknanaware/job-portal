import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecuiterLogin from './components/RecuiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import Managejob from './pages/Managejob'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const {showRecLogin,companyToken}=useContext(AppContext);
  return (
    <div>
      {showRecLogin && <RecuiterLogin/>}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applied-jobs' element={<Applications />} />
        {companyToken &&
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='Addjob' element={<Addjob/>}/>
          <Route path='manage-jobs' element={<Managejob/>}/>
          <Route path='view-applications' element={<ViewApplication/>}/>

        </Route>
          }
        
      </Routes>
    </div>
  )
}

export default App


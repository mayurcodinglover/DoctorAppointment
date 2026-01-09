import { useState } from 'react'
import './App.css'
import {Routes,Route,Navigate} from "react-router-dom";
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/dashboard';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Appointments from './pages/admin/Appointments';
import ListDoctor from './pages/admin/ListDoctor';
import AdminLayout from './pages/admin/AdminLayout';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorDashboard from "./pages/doctor/Dashboard";
import AddUser from './pages/admin/AddUser';
import DoctorLayout from './pages/doctor/DoctorLayout';
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorProfile from "./pages/doctor/Profile";


function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Navigate to="/login" />} />

        <Route path='/login' element={<Login/>} />
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments/>}/>
          <Route path="adddoctor" element={<AddDoctor/>}/>
          <Route path="doctorlist" element={<ListDoctor/>}/>
          <Route path='adduser' element={<AddUser/>}/>
        </Route>
        <Route path='/doctor' element={<DoctorLayout/>}>
          <Route path='dashboard' element={<DoctorDashboard/>}/>
          <Route path='appointments' element={<DoctorAppointments/>}/>
          <Route path='profile' element={<DoctorProfile/>}/>
        </Route>
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App

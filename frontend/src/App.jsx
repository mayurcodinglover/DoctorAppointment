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
import AddUser from './pages/admin/AddUser';


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
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App

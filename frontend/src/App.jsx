import { useState } from 'react'
import './App.css'
import {Routes,Route,Navigate} from "react-router-dom";
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/dashboard';

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Navigate to="/login" />} />

        <Route path='/login' element={<Login/>} />
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
     </Routes>
    </>
  )
}

export default App

import React, { useState } from "react";
import { User, Lock, Stethoscope,Mail } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const [name, setname] = useState("");
  const url=import.meta.env.VITE_URL;
  const navigate=useNavigate();
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(signup)
    {
      setLoading(true);
    try {
          const res=await axios.post(url+"admin/register",{name,email,password});
    if(res.data.status)
    {
        localStorage.setItem("token",res.data.token);
        navigate("/user/dashboard")
    }
    else{
      toast.error(res.data.message);
    }
    setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    }
    else{
      setLoading(true);
    try {
          const res=await axios.post(url+"admin/login",{email,password});
    if(res.data.status)
    {
        localStorage.setItem("token",res.data.token);
        console.log(res.data);
        if(res.data.user.role==="Admin")
        {
            navigate("/admin/dashboard")
        }
        if(res.data.user.role==="Doctor")
        {
          navigate("/doctor/dashboard")
        }
        if(res.data.user.role==="User")
        {
          navigate("/user/dashboard")
        }
    }
    else{
      toast.error(res.data.message);
    }
    setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Healthcare Portal
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}

            {signup && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                 <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Name.."
                  required
                />
              </div>
                
              </div>
            )}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {signup ? "Signup":<>{loading ? "Loading..": "Sign In"}</>}
              
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Access for all users
                </span>
              </div>
            </div>
          </div>

          {/* User Types */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-700">Patient</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs font-medium text-green-700">Doctor</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xs font-medium text-purple-700">Admin</p>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" onClick={()=>setSignup(!signup)} className="font-medium text-blue-600 hover:text-blue-500">
                {signup ?"Signin" : "Signup"}
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
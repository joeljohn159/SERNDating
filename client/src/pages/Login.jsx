import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { login as userLogin } from '../api/userService';
import { successToast, errorToast } from '../utilities/toast';
import { useAuth } from '../context/AuthContext';


const Login = () => {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const navigate = useNavigate();
  const {login} = useAuth();

  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Handle the signup logic here (e.g., API call)
    try{
      let x = await userLogin({email:userEmail,password:userPassword})
      if(x.data.status === 'SUCCESS' || x.status === 200 || x.status === 201){
        login(x.data.data)
        successToast('Login Successfully!')
        sessionStorage.setItem('token', x.data.token)
        navigate('/swipe')
      }else{ 
        console.log('AM I ', x.data)
        errorToast(x.data.errors || x.data.msg)
      }
    }catch(err){
      errorToast(err)
    }
  };

  return (
  
  <div className="h-screen font-Nunito" style={{ backgroundColor: '#f6f8fd' }}>
  <Navbar />
  <div className="w-full max-w-md bg-white mx-auto text-center mt-10 rounded-3xl shadow-lg p-8">
    <h1 className="font-bold text-2xl py-2 max-md:text-3xl">Login</h1>
    <form className="flex flex-col" onSubmit={handleSubmit}>
    
      <input
        type="email"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="p-4 rounded-3xl bg-[#f6f8fd] text-xs my-4 max-md:text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="p-4 rounded-3xl bg-[#f6f8fd] text-xs my-4 max-md:text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        required
      />
      <button
        type="submit"
        className="p-3 mt-6 bg-gradient-to-br rounded-3xl from-[#F7CE46] to-[#FBE27E] text-sm font-bold hover:bg-opacity-90 transition duration-200"
      >
        Login
      </button>
      <div className="text-left pt-2 pl-1 text-xs">
      <span>Don't have an account? </span>
      <Link to="/signup" className="text-blue-500 underline">
        Create account
      </Link>
    </div>
    </form>
    
  </div>
</div>
);


};


export default Login
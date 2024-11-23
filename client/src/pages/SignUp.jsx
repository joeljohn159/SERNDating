import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/userService';
import { toast } from 'react-toastify';
import { errorToast, successToast } from '../utilities/toast';
import { useNavigate } from 'react-router-dom';





const SignUp = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the signup logic here (e.g., API call)
    try{
      let x = await registerUser({username,email:userEmail,password:userPassword})
      if(x.data.status === 'SUCCESS' || x.status === '200' || x.status === '201'){
        successToast('User Created Successfully!')
        navigate('/login')
      }else{ 
        errorToast(x.data.errors || x.data.msg)
      }
    }catch(err){
      errorToast(err)
    }
  };

  return (
    <div className="h-screen font-Nunito" style={{ backgroundColor: '#f6f8fd' }}>
      <Navbar />
      <div className="w-full max-w-md bg-white mx-auto text-center mt-10 rounded-3xl shadow-lg p-8 
      ">
        <h1 className="font-bold text-xl pb-5 max-md:text-3xl">Create an Account</h1>
        <form className="flex flex-col " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-3xl bg-[#f6f8fd] text-xs my-4 max-md:text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            required
          />
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
            className="p-3 mt-4 bg-gradient-to-br rounded-3xl font-bold from-[#F7CE46] to-[#FBE27E] text-sm hover:bg-opacity-90 transition duration-200"
          >
            Create
          </button>
          <div className="text-left text-xs pt-2 pl-1">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500 underline">
            Login.
          </Link>
        </div>
        </form>
        
      </div>

    </div>
  );
};

export default SignUp;

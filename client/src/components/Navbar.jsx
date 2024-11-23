import React from 'react';
import { Link } from 'react-router-dom';
import NavbarProfile from './NavbarProfile';

const Navbar = () => {
  return (
    <nav className='bg-white'>
      <div className='max-w-screen-xl mx-auto p-2 flex justify-between items-center'>
        
        {/* Logo on the left */}
        <Link to='/' className='text-black text-2xl font-bold ml-40 font-Nunito max-md:ml-0'>
          DATING
        </Link>
        
        {/* Right side (Swipe Button + NavbarProfile) */}
        <div className='flex items-center space-x-4'>
          <Link to='/swipe' className='flex items-center'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
              Swipe
            </button>
          </Link>

          {/* Navbar Profile */}
          <NavbarProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

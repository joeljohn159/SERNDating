import React, { useState } from 'react';
import leftProfileSample from '../assets/landing/Group2.svg';
import rightProfileSample from '../assets/landing/Group4.svg';
import lady from '../assets/landing/Group7.svg';
import LT from '../assets/landing/LT.svg';
import { Link } from 'react-router-dom';
import AboutPopup from '../components/About';

const Landing = () => {
  const [isAboutPopupVisible, setAboutPopupVisible] = useState(false);

  const handleShowAboutPopup = () => {
    setAboutPopupVisible(true);
  };

  const handleCloseAboutPopup = () => {
    setAboutPopupVisible(false);
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center relative bg-fixed h-screen w-screen overflow-hidden font-Nunito"
      style={{ backgroundImage: `url(${LT})` }}
    >
      {/* Navbar */}
      <nav className="flex justify-center items-center backdrop-blur-md bg-white bg-opacity-75 text-gray-900 py-5 shadow-lg fixed top-0 w-full z-10">
        <ul className="flex justify-between items-center space-x-8">
          <li
            className="text-lg font-semibold cursor-pointer hover:bg-yellow-400 hover:bg-opacity-80 p-2 px-4 rounded-full transition-all"
            onClick={handleShowAboutPopup}
          >
            About
          </li>
          <Link to="/login">
            <li className="text-lg font-semibold cursor-pointer hover:bg-yellow-400 hover:bg-opacity-80 p-2 px-4 rounded-full transition-all">
              Meet People
            </li>
          </Link>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center h-full text-center px-5 relative ">
        <h1 className="absolute text-7xl font-extrabold text-green-600 md:text-6xl sm:text-4xl z-5">
          Meet the
          <br />
          <span className="text-black">Chosen One</span>
        </h1>

        {/* Images */}
        <div className="relative w-full flex justify-center items-center mt-8 md:mt-16">
          <img
            src={leftProfileSample}
            alt="Left Profile"
            className="absolute left-[10rem] w-1/6 md:w-1/5 lg:w-1/4 top-1/2 transform -translate-y-1/2 max-md:hidden z-10"
          />
          <img
            src={lady}
            alt="Main Lady"
            className="w-1/1 max-xs:scale-125 mr-14 md:w-3/4 lg:w-1/2 transform scale-105 mx-auto z-1"
          />
          <img
            src={rightProfileSample}
            alt="Right Profile"
            className="absolute right-2/5 w-1/5 md:w-1/5 lg:w-1/5 bottom-20 transform -translate-y-1/2 max-md:hidden z-10"
          />
        </div>
      </div>

      {/* About Popup */}
      <AboutPopup show={isAboutPopupVisible} onClose={handleCloseAboutPopup} />
    </div>
  );
};

export default Landing;

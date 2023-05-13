import React from 'react';
import { NavLink } from 'react-router-dom';

const Headers = () => {
  var email = sessionStorage.getItem('email');
  const handleClick = () => {
    sessionStorage.removeItem('email');
  };
  return (
    <nav className="bg-gray-900 fixed top-0 z-50 w-full">
  <div className="container mx-auto px-2 md:px-4 ml-0">
    <div className="flex justify-between items-center py-2 md:py-4">
      <div className="flex items-center">
        <img
          src={process.env.PUBLIC_URL + '/images/download.png'}
          alt="IIT Ropar Logo"
          className="h-8 md:h-12 mr-2 md:mr-4"
        />
        {/* <NavLink
          exact
          to="/"
          className="text-white font-bold text-xl md:text-2xl hover:text-gray-300 transition duration-200"
        >IIT Ropar
        </NavLink> */}
        <h1 className="text-white font-bold text-xl md:text-2xl hover:text-gray-300 transition duration-200">IIT Ropar</h1>
      </div>
            <div className="flex items-center">
            <NavLink
              exact
              to="/register"
              className="text-white font-bold text-base md:text-lg mr-4 hover:text-gray-300 transition duration-200"
            >
              Sign Up
            </NavLink>
            {/* <NavLink
              exact
              to="/"
              className="text-white font-bold text-base md:text-lg hover:text-gray-300 transition duration-200"
              onClick={handleClick}
            >
              Logout
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Headers;

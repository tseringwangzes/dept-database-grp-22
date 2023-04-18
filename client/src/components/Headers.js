import React from 'react'
import { NavLink } from "react-router-dom";

const Headers = () => {
  var email = localStorage.getItem('email');
  const handleClick = () => {
    localStorage.removeItem('email');
  };
  return (
    <>
      <nav className="bg-gray-900 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <img src={process.env.PUBLIC_URL + '/images/download.png'} style={{ width: 60, marginRight: 20 }} alt=" " />
              <NavLink to="/" className="text-white font-bold text-lg mt-3 mb-3" >IIT Ropar</NavLink>
            </div>
            <div className="flex items-center">
              <NavLink to="/register" className="text-white font-bold text-lg mt-3 mb-3 mr-4">Signup</NavLink>
              <NavLink to="/" className="text-white font-bold text-lg mt-3 mb-3 mr-4" onClick={handleClick}>Logout</NavLink>
            </div>
          </div>
        </div>
      </nav>
      <div style={{ height: 95 }} />
    </>
  );
};

export default Headers;

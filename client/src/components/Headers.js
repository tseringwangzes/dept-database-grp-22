import {React, useState} from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Headers = () => {
  var email = localStorage.getItem('email');
  const [showModal, setShowModal] = useState(false);
const navigate=useNavigate();
  const logout = () => {
   
    localStorage.removeItem('email');
    setShowModal(false)
    navigate('/');
  };
  const cancel = () => {
    setShowModal(false)
  };
  return (
    <>
      <nav className="bg-gray-900 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <img src={process.env.PUBLIC_URL + '/images/download.png'} style={{ width: 50, marginRight: 20 }} alt=" " />
              {/* <NavLink to="/" className="text-white font-bold text-lg mt-3 mb-3" >IIT Ropar</NavLink> */}
              <h1  className="text-white font-bold text-lg mt-3 mb-3"  >IIT Ropar</h1>
            </div>
            <div className="flex items-center">
              {/* <NavLink to="/register" className="text-white font-bold text-lg mt-3 mb-3 mr-4">Signup</NavLink> */}
              <div className="pr-12 text-white font-bold text-lg mt-3 mb-3">{email}</div>
              <div style={{cursor: 'pointer' }}className="pr-10 text-white font-bold text-lg mt-3 mb-3 mr-4" onClick={()=>setShowModal(true)}><LogoutIcon/></div>
            </div>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-1 py-8">
                            <div className="relative w-90 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                              
                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                       
                                        <p className="mt-2 text-[20px] leading-relaxed text-gray-500">
                                          Do you want to Logout?
                                        </p>
                                        <div className="items-center gap-4 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-1.5 flex-1 text-black rounded-md outline-none ring-offset-2 ring-black-600 focus:ring-2"
                                                onClick={cancel}  >
                                                Cancel
                                            </button>
                                            <button
                                                className="w-full mt-2 p-1.5 flex-1 text-white  bg-red-500 rounded-md outline-none border ring-offset-2  ring-red-600  focus:ring-2"
                                                onClick={logout}  >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </>
            ) : null}
        


          </div>
        </div>
      </nav>
      <div style={{ height: 95 }} />
    </>
  );
};

export default Headers;

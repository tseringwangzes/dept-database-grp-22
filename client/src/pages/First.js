import React from 'react'
import { useNavigate } from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.css';
//import globalStyles from '../../src/assets/global-styles/bootstrap.min.module.css';
import firstStyle from "../styles/mix.module.css"
//import classnames from 'classnames';
import Headers1 from '../components/Headers1';
function First(){
    const styles = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/blue.avif)`,
        overflow: "hidden",
        backgroundSize: "cover",
        minHeight: "100vh"
      };
      const styles2 = {
        fontSize: "3rem",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "1rem",
        fontFamily: "Bahnschrift, Arial",
        transform: "translateZ(30px)",
      };
      
    const history = useNavigate();
    return (
        <>
        
            <Headers1/>
            {/* <div className={firstStyle.form_data}>
                <div className={firstStyle.form_heading}>
                    <h1 className={firstStyle.heading}>Welcome Back!</h1>
                    <p className={firstStyle.para}>Choose your User Type</p>
                </div>
                <form className={firstStyle.my_form}>
                  <button className={firstStyle.btn} onClick={()=>history('/Login',{state:"1"})}>Student</button>  
                  <button className={firstStyle.btn} onClick={()=>history('/Login',{state:"2"})}>Faculty</button>  
                  <button className={firstStyle.btn} onClick={()=>history('/Login',{state:"3"})}>Office Staff</button>  
                  <button className={firstStyle.btn} onClick={()=>history('/Login',{state:"4"})}>Admin</button>  
                </form>
            </div> */}
           <div className="flex flex-col items-center justify-start -mt-5" style={styles}>
           <h1 className = 'text-gray-700' style={styles2}>Welcome to Department Database</h1>
  <div className="flex flex-col md:flex-row items-center mt-1">
    <div className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center" onClick={() => history('/Login', { state: "1" })}>
    <i className="icon fa-solid fa-user-graduate text-6xl mb-2"></i>
      <h2 className="text-lg font-bold">Student</h2>
      <p className="text-gray-700 text-sm mt-2">Click here to sign in or login</p>
    </div>
    <div className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center" onClick={() => history('/Login', { state: "2" })}>
      <i className="fa-sharp fa-solid fa-chalkboard-user text-6xl mb-2 icon"></i>
      <h2 className="text-lg font-bold">Faculty</h2>
      <p className="text-gray-700 text-sm mt-2">Click here to sign in or login</p>
    </div>
  </div>
  <div className="flex flex-col md:flex-row items-center">
    <div className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center" onClick={() => history('/Login', { state: "3" })}>
      <i className="icon fa-solid fa-print text-6xl mb-2"></i>
      <h2 className="text-lg font-bold">Office Staff</h2>
      <p className="text-gray-700 text-sm mt-2">Click here to sign in or login</p>
    </div>
    <div className="card bg-white rounded-lg shadow-lg w-80 p-6 m-4 cursor-pointer transform transition duration-300 hover:shadow-xl hover:scale-105 hover:text-black flex flex-col justify-center items-center" onClick={() => history('/Login', { state: "4" })}>
      <i className="icon fa-solid fa-user-plus text-6xl mb-2"></i>
      <h2 className="text-lg font-bold -ml-5">Admin</h2>
      <p className="text-gray-700 text-sm mt-2">Click here to sign in or login</p>
    </div>
  </div>

  <style>
    {`
      .card:hover .icon {
        animation: rotate 2s infinite linear;
      }

      @keyframes rotate {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }
    `}
  </style>
</div>

        
        </>
    )
}

export default First

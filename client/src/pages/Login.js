import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import loginStyle from "../styles/mix.module.css"
import { useLocation } from "react-router-dom";
import Headers1 from '../components/Headers1';

const Login = () => {

    const [email, setEmail] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();
    const location =useLocation();

    const id=location.state;



    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else {
            setSpiner(true)
            const data = {
                email: email
            }

           const response = await sentOtpFunction(data);

           if (response.status === 200) {
                setSpiner(false)
                navigate("/user/otp",{state:{email:email,idd:id}})
           } else {
                toast.error(response.response.data.error);
           }
        }
    }
    return (
        <>

        
            <section className={loginStyle.page}>
                <Headers1/>
                <div className={loginStyle.form_data}>
                
                    <div className={loginStyle.form_heading}>
                        <h1 className={loginStyle.heading}>Welcome Back, Log In</h1>
                        <p className={loginStyle.para}>Hi, we are you glad you are back. Please login.</p>
                    </div>
                    <form className={loginStyle.my_form}>
                        <div className={loginStyle.form_input}>
                            <label className={loginStyle.myLabel} htmlFor="email">Email</label>
                            <input className = {loginStyle.myData} type="email" name="email" id="" onChange={(e) => setEmail(e.target.value.toLowerCase())} placeholder='Enter Your Email Address' />
                        </div>
                        <button className="bg-blue-500 text-white rounded-full w-full py-3 px-6 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={sendOtp}>
  {!spiner && 'Login'}
  {spiner && <Spinner animation="border" />}
</button>




                        {/* <p className={loginStyle.para}>Don't have an account? <NavLink to="/Register">Sign up</NavLink> </p> */}
                    </form>
                    </div>
                <ToastContainer />
            </section>
        
        </>
    )
}

export default Login
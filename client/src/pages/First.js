import React from 'react'
import { useNavigate } from "react-router-dom"
import firstStyle from "../styles/mix.module.css"
import Headers1 from '../components/Headers1';
import './first.css';

function First(){
    const history = useNavigate();
    return (
        <>
        <Headers1 />
       <section className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex-col items-center justify-center">
 
  <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
  <div className={`${firstStyle.form_data} bg-white rounded-lg p-10 relative z-10 mt-[-60px]`}>
    <h1 className="text-4xl font-bold text-center mb-8">Department Database</h1>
    <div className={firstStyle.form_heading}>
      <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
      <p className="text-gray-500 mb-2">Choose your User Type</p>
    </div>
    <form className={firstStyle.my_form}>
      <button className="bg-blue-500 text-white rounded-full w-full py-4 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => history('/Login', { state: "1" })}>Student</button>
      <button className="bg-blue-500 text-white rounded-full w-full py-4 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => history('/Login', { state: "2" })}>Faculty</button>
      <button className="bg-blue-500 text-white rounded-full w-full py-4 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => history('/Login', { state: "3" })}>Office Staff</button>
      <button className="bg-blue-500 text-white rounded-full w-full py-4 mb-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => history('/Login', { state: "4" })}>Admin</button>
    </form>
  </div>
</section>


        </>
    )
}

export default First





/*
import React from 'react'
import { useNavigate } from "react-router-dom"
//import globalStyles from '../../src/assets/global-styles/bootstrap.min.module.css';
import firstStyle from "../styles/mix.module.css"
//import classnames from 'classnames';
import Headers1 from '../components/Headers1';
function First(){
    const history = useNavigate();
    return (
        <>
        <section>
            <Headers1/>
            <div className={firstStyle.form_data}>
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
            </div>
        </section>
        </>
    )
}

export default First


 */
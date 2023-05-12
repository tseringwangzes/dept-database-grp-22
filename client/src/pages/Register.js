import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {registerfunction} from "../services/Apis";
import { NavLink,useNavigate, useLocation} from "react-router-dom"
import registerStyle from "../styles/mix.module.css"
import Sidebar from "../components/AdminSidebar";

const Register = () => {

  const [inputdata,setInputdata] = useState({
  });

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;  

  // setinputvalue
  const handleChange = (e)=>{
    if(e.target.name==="email"){
      const name = e.target.name;
      const value=e.target.value.toLowerCase();
      setInputdata({...inputdata,[name]:value})
    }
    else{
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})}
  }


  // register data
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {fname,email,usertype} = inputdata;

    if(fname === ""){

      toast.error("Enter User Name")

    }else if(email === ""){

      toast.error("Enter User Email")

    }else if(!email.includes("@iitrpr.ac.in")){

      toast.error("Enter Valid IITRPR Email")
    }
    else if(email.includes(" ")){
      toast.error("Spaces are not allowed in the email id")
    }
    
    else if(usertype === ""){

      toast.error("Enter User Type")

    }else{

      const response = await registerfunction(inputdata);
      
      if(response.status === 200){

        setInputdata({...inputdata,fname:"",email:"",faculty_email:"",password:""});

        if (currentPath === '/register')navigate("/");
        else navigate ('/Admin');

      }else{
        
        toast.error(response.response.data.error);
      }
    }
  }


  return (
    <>
     {currentPath !== '/register' && <Sidebar />}
      <section className={registerStyle.page}>
     
        <div className={registerStyle.form_data}>
          <div className={registerStyle.form_heading}>
            <h1 className={registerStyle.heading}>Sign Up</h1>
            <p className = {registerStyle.para} style={{textAlign:"center"}}>Enter the details of the new user!!</p>
          </div>
          <form className={registerStyle.my_form}>
            <div className={registerStyle.form_input}>
              <label className={registerStyle.myLabel}htmlFor="fname">Name</label>
              <input className={registerStyle.myData} type="text" name="fname" id="" onChange={handleChange} placeholder='Enter User Name' />
            </div>
            <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="email">Email</label>
              <input className = {registerStyle.myData} type="email" name="email" id=""  onChange={handleChange}  placeholder='Enter User Email Address' />
            </div>
            {/* <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="email">Your Faculty Email</label>
              <input className = {registerStyle.myData} type="email" name="email" id=""  onChange={handleChange}  placeholder='Enter Your Faculty Email' />
            </div> */}
            {/* <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="password">Password</label>
              <div className={registerStyle.two}>
              <input className = {registerStyle.myData} type={!passhow ? "password" : "text"} name="password" id=""  onChange={handleChange}  placeholder='Enter User password' />
              <div className={registerStyle.showpass} onClick={()=>setPassShow(!passhow)} >
              {!passhow ? "Show" : "Hide"}
              </div>
              </div>
            </div> */}

            <div className={registerStyle.form_input}>
              <label className = {registerStyle.myLabel} htmlFor="usertype">User Type</label>
              <input className = {registerStyle.myData} type="text" name="usertype" id=""  onChange={handleChange}  placeholder='Enter User Type' />
            </div>

            <h6>Enter user type -1 for Student</h6>
            <h6>Enter user type -2 for Faculty</h6>
            <h6>Enter user type -3 for Office Staff</h6>
            <h6>Enter user type -4 for Admin</h6>
            
            <button className={registerStyle.btn} onClick={handleSubmit}>Sign Up</button>
            
            {/* <p className={registerStyle.para}>Already Registered? <NavLink to="/Login">Login</NavLink> </p> */}
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Register






// import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import {registerfunction} from "../services/Apis";
// import { NavLink,useNavigate, useLocation} from "react-router-dom"
// import registerStyle from "../styles/mix.module.css"
// import Sidebar from "../components/AdminSidebar";
// import Headers1 from '../components/Headers1';
// import './first.css';

// const Register = () => {

//   const [inputdata,setInputdata] = useState({
//     fname:"",
//     email:"",
//     faculty_email:"",
//     password:""
//   });

//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;  

//   // setinputvalue
//   const handleChange = (e)=>{
//     if(e.target.name==="email"){
//       const name = e.target.name;
//       const value=e.target.value.toLowerCase();
//       setInputdata({...inputdata,[name]:value})
//     }
//     const {name,value} = e.target;
//     setInputdata({...inputdata,[name]:value})
//   }


//   // register data
//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     const {fname,email,usertype} = inputdata;

//     if(fname === ""){

//       toast.error("Enter User Name")

//     }else if(email === ""){

//       toast.error("Enter User Email")

//     }else if(!email.includes("@iitrpr.ac.in")){

//       toast.error("Enter Valid IITRPR Email")

//     }else if(usertype === ""){

//       toast.error("Enter User Type")

//     }else{

//       const response = await registerfunction(inputdata);
      
//       if(response.status === 200){

//         setInputdata({...inputdata,fname:"",email:"",faculty_email:"",password:""});

//         if (currentPath === '/register')navigate("/");
//         else navigate ('/Admin');

//       }else{
        
//         toast.error(response.response.data.error);
//       }
//     }
//   }


//   return (
//     <>
//     <Headers1 />
//      {currentPath !== '/register' && <Sidebar />}
     
//      <section className={`${registerStyle.page}`}>
//   <div className={`${registerStyle.form_data} bg-white rounded-lg p-10 relative z-10 mt-[-60px]`}>
//     <div className={registerStyle.form_heading}>
//       <h1 className={registerStyle.heading}>Sign Up</h1>
//       <p className={registerStyle.para} style={{ textAlign: 'center' }}>Enter the details of the new user!!</p>
//     </div>
//     <form className={registerStyle.my_form}>
//       <div className={registerStyle.form_input}>
//         <label className={registerStyle.myLabel} htmlFor="fname">Name</label>
//         <input className={registerStyle.myData} type="text" name="name" id="" onChange={handleChange} placeholder="Enter User Name" />
//       </div>
//       <div className={registerStyle.form_input}>
//         <label className={registerStyle.myLabel} htmlFor="email">Email</label>
//         <input className={registerStyle.myData} type="email" name="email" id="" onChange={handleChange} placeholder="Enter User Email Address" />
//       </div>
//       <div className={registerStyle.form_input}>
//         <label className={registerStyle.myLabel} htmlFor="usertype">User Type</label>
//         <input className={registerStyle.myData} type="text" name="usertype" id="" onChange={handleChange} placeholder="Enter User Type" />
//         <h6>Enter 1 if Student</h6>
//         <h6>Enter 2 if Faculty</h6>
//         <h6>Enter 3 if Office Staff</h6>
//         <h6>Enter 4 if Admin</h6>
//       </div>
//       <button className={registerStyle.btn} onClick={handleSubmit}>Sign Up</button>
//     </form>
//   </div>
//   <ToastContainer />
// </section>




//     </>
//   )
// }

// export default Register


// /*

//  {/* <div className={registerStyle.form_input}>
//               <label className = {registerStyle.myLabel} htmlFor="email">Your Faculty Email</label>
//               <input className = {registerStyle.myData} type="email" name="email" id=""  onChange={handleChange}  placeholder='Enter Your Faculty Email' />
//       //  </div> *}
//         //    {/* <div className={registerStyle.form_input}>
//               <label className = {registerStyle.myLabel} htmlFor="password">Password</label>
//               <div className={registerStyle.two}>
//               <input className = {registerStyle.myData} type={!passhow ? "password" : "text"} name="password" id=""  onChange={handleChange}  placeholder='Enter User password' />
//               <div className={registerStyle.showpass} onClick={()=>setPassShow(!passhow)} >
//               {!passhow ? "Show" : "Hide"}
//               </div>
//               </div>
//             </div> }*/

// /*
// <section className={registerStyle.page}>
     
//         <div className={registerStyle.form_data}>
//           <div className={registerStyle.form_heading}>
//             <h1 className={registerStyle.heading}>Sign Up</h1>
//             <p className = {registerStyle.para} style={{textAlign:"center"}}>Enter the details of the new user!!</p>
//           </div>
//           <form className={registerStyle.my_form}>
//             <div className={registerStyle.form_input}>
//               <label className={registerStyle.myLabel}htmlFor="fname">Name</label>
//               <input className={registerStyle.myData} type="text" name="fname" id="" onChange={handleChange} placeholder='Enter User Name' />
//             </div>
//             <div className={registerStyle.form_input}>
//               <label className = {registerStyle.myLabel} htmlFor="email">Email</label>
//               <input className = {registerStyle.myData} type="email" name="email" id=""  onChange={handleChange}  placeholder='Enter User Email Address' />
//             </div>
           

//             <div className={registerStyle.form_input}>
//               <label className = {registerStyle.myLabel} htmlFor="usertype">User Type</label>
//               <input className = {registerStyle.myData} type="text" name="usertype" id=""  onChange={handleChange}  placeholder='Enter User Type' />
//               <h6>Enter 1 if Student</h6>
//               <h6>Enter 2 if Faculty</h6>
//               <h6>Enter 3 if Office Staff</h6>
//               <h6>Enter 4 if Admin</h6>

//             </div>
            
//             <button className={registerStyle.btn} onClick={handleSubmit}>Sign Up</button>
            
//             {/* <p className={registerStyle.para}>Already Registered? <NavLink to="/Login">Login</NavLink> </p> }
//             </form>
//             </div>
//             <ToastContainer />
//           </section>
//           */
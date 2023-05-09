import React, { useEffect, useState } from "react";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { addmorefunction,getfaculty } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Addmorep2 = () => {
  const { state } = useLocation();
  const utype = state.utype;
  const navigate = useNavigate();
  var email = localStorage.getItem('email');

  // const [femail, setfemail] = useState();

  // const getfaculty = async () => {
   
  //   const response = await getfaculty(email);
  //   // window.location.reload();
  //   if (response.status === 200) {
  //     setfemail(response.data.faculty_name)
  //    // console.log(response.data)
  //   } else {
  //     console.log("error for get user data")
  //   }
  // }
  // useEffect(() => {
  //   getfaculty();
   
  // },[])

  var defaultFormFields = {}
  if (utype === "1" || utype === "4") {
    defaultFormFields = {
      faculty_name: "",
      student_name: "",
      award_name: "",
      award_reason: "",
      date: "",
      shared_with: "",
      status: "Pending..",
    };
  }
  else {
    defaultFormFields = {
      faculty_name: "femail",
      student_name: email,
      award_name: "",
      award_reason: "",
      date: "",
      shared_with: "",
      status: "Pending..",
    };
  }
 

  const [formFields, setFormFields] = useState(defaultFormFields);

  const hanldeInputValueChange = (event) => {
    var { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  //console.log(femail)

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formFields)

    var { award_name, award_reason,date, shared_with, status, faculty_name, student_name } = formFields;
    if (award_name === "") {
      toast.error("Enter Award Name")
    }
    else if (award_reason === "") {
      toast.error("Enter Award Reason")
    }
    else if (date === "") {
      toast.error("Enter Award Date")
    }
   
    else {
      // const dateObject = new Date(date);
      // const isoDate = dateObject.toISOString();
      // date = isoDate;
      const response = await addmorefunction(formFields);
      if (response.status === 200) {
        if (utype === "1" || utype === "4") {
          setFormFields({
            ...formFields, award_name: "",
            award_reason: "",
            date: "",
            shared_with: "",
            status: "Pending",
            faculty_name: "",
            student_name: ""
          });
        }

        else {
          setFormFields({
            ...formFields, award_name: "",
            award_reason: "",
            date: "",
            shared_with: "",
            status: "Pending",
            faculty_name: "2020csb1135@iitrpr.ac.in",
            student_name: email
          });
         }
    
    
     
      
         
         
       

        if(utype==="1"){
          navigate("/StaffHome/StaffStudent")
        }
        else if(utype === "4"){
          navigate("/Admin/AdminStudent")
        }
        else{
        navigate("/Profile/Awards")
        }
      }
      else {
        toast.error(response.response.data.error);
      }
    }
  };

if(utype === "1" || utype === "4")
  {return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Add More Awards</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the name"
              name="award_name"
              type="text"
              value={formFields.award_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle['form-item']} id="award_reason">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Reason</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the Reason"
              name="award_reason"
              type="text"
              value={formFields.award_reason}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="date">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>date</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the date"
              name="date"
              type="date"
              value={formFields.date}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="shared_with">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Shared with whom"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="faculty_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>faculty_name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="faculty_name"
              name="faculty_name"
              type="text"
              value={formFields.faculty_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="student_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>student_name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="student_name"
              name="student_name"
              type="text"
              value={formFields.student_name}
              onChange={hanldeInputValueChange}
            />
          </div>
          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit} >Submit</button>
        </form>
        <ToastContainer />
      </section>
    </body>
  );}
  else{
    return(
       <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Add More Awards</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the name"
              name="award_name"
              type="text"
              value={formFields.award_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle['form-item']} id="award_reason">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Reason</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the Reason"
              name="award_reason"
              type="text"
              value={formFields.award_reason}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="date">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>date</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the date"
              name="date"
              type="date"
              value={formFields.date}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="shared_with">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Shared with whom"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
            />
          </div>
          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit} >Submit</button>
        </form>
        <ToastContainer />
      </section>
    </body>
    );
  }
};

export default Addmorep2;
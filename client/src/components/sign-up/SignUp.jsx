import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer,toast } from "react-toastify";
import { addmorefunction } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const SignUp = () => {

  const { state } = useLocation();

  const id = state.id;
  const utype = state.utype;
  const navigate = useNavigate();
  const dateans = state.date
  console.log(dateans)

  const defaultFormFields = {
    faculty_name:state.faculty_name,
    student_name:state.student_name,
    award_name: state.award_name,
    date: state.date,
    additional_info:state.additional_info,
    shared_with: state.shared_with,
    award_link: state.award_link,
    additional_info:state.additional_info,
    status: "Pending..",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const deleteid=async (id)=>{
    let result= await fetch(`${BACKEND_URL}/user/deleteid/${id}`,{
      method:"Delete"});
      result=await result.json()
  }

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const{award_name,date,shared_with,award_link,additional_info,status,faculty_name,student_name} = formFields;
    if(award_name === ""){

      toast.error("Enter Award Name")

    }
    if(date === ""){

      toast.error("Enter Award Name")

    }
    else{
      const response = await addmorefunction(formFields);
      if(response.status === 200){
        setFormFields({...formFields,award_name: state.award_name,
          date: state.date,
          shared_with: state.shared_with,
          award_link:state.award_link,
          additional_info:state.additional_info,
        status:"Pending",
      faculty_name:state.faculty_name,
    student_name:state.student_name});
    

    deleteid(id);
    if(utype === "1"){
      navigate("/StaffHome/StaffStudent")
    }
    else if(utype === "4"){
      navigate("/Admin/AdminStudent")
    }
    else{
          navigate("/Profile/Awards")
    }
      }
      else{
        toast.error(response.response.data.error);
      }
    }

  };


  return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Edit Award Details</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the award name"
              name="award_name"
              type="text"
              value={formFields.award_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="date">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Date</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the date"
              name="date"
              type="date"
              value={formFields.date}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="shared_with">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma seperated emails of whom you have shared this award with"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
              />
            </div>

             
          <div className={signupStyle["form-item"]} id="award_link">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Awards Link For Reference</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter any link for reference of this award if any"
              name="award_link"
              type="text"
              value={formFields.award_link}
              onChange={hanldeInputValueChange}
            />
          </div>
          <div className={signupStyle["form-item"]} id="additional_info">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter additional information if any"
              name="additional_info"
              type="text"
              value={formFields.additional_info}
              onChange={hanldeInputValueChange}
            />
          </div>
          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit} >Submit</button>
        </form>
        <ToastContainer/>
      </section>
    </body>
  );
};

export default SignUp;
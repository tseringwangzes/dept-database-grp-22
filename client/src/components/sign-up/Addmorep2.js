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

  var defaultFormFields = {}
  if (utype === "1" || utype === "4") {
    defaultFormFields = {
      faculty_name: "",
      student_name: "",
      award_name: "",
      date: "",
      shared_with: "",
      award_link: "",
      additional_info:"",
      status: "Pending..",
    };
  }
  else {
    defaultFormFields = {
      faculty_name: "puneet@iitrpr.ac.in",
      student_name: email,
      award_name: "",
      date: "",
      shared_with: "",
      award_link: "",
      additional_info:"",
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

    var { award_name,date, shared_with,award_link,additional_info, status, faculty_name, student_name } = formFields;
    if (award_name === "") {
      toast.error("Enter Award/Achievement Name")
    }
    else if (date === "") {
      toast.error("Enter Award/Achievement Date")
    }
   
    else {
      // const dateObject = new Date(date);
      // const isoDate = dateObject.toISOString();
      // date = isoDate;
      const response = await addmorefunction(formFields);
      if (response.status === 200) {
        if (utype === "1" || utype === "4") {
          setFormFields({
            ...formFields, 
            award_name: "",
            date: "",
            shared_with: "",
            status: "Pending",
            faculty_name: "",
            student_name: "",
            award_link: "",
            additional_info:"",
          });
        }

        else {
          setFormFields({
            ...formFields, award_name: "",
            date: "",
            shared_with: "",
            status: "Pending",
            faculty_name: "puneet@iitrpr.ac.in",
            student_name: email,
            award_link: "",
            additional_info:"",
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
        <h2 className={signupStyle["form-heading"]}>Add More Award/Achievement Details of Students</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

        <div className={signupStyle["form-item"]} id="student_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Student Email Id</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter student email id"
              name="student_name"
              type="text"
              value={formFields.student_name}
              onChange={hanldeInputValueChange}
            />
          </div>

        <div className={signupStyle["form-item"]} id="faculty_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Email id</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter Faculty email id"
              name="faculty_name"
              type="text"
              value={formFields.faculty_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the Award/Achievement name"
              name="award_name"
              type="text"
              value={formFields.award_name}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="date">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Date</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the date the student received the award/achievement"
              name="date"
              type="date"
              value={formFields.date}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="shared_with">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma separated email id's of people with whom the award/achievement was shared with"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="award_link">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Link</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Attach a link for reference"
              name="award_link"
              type="text"
              value={formFields.award_link}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="additional_info">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Add Additional Information (if any)</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter any additional information (if any)"
              name="additional_info"
              type="text"
              value={formFields.additional_info}
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
        <h2 className={signupStyle["form-heading"]}>Add Your Awards/Achievements</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the award/achievement name"
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
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Shared With</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma seperated email id's of people with whom you shared this award/achievement"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
            />
          </div>
          
          <div className={signupStyle["form-item"]} id="award_link">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Link</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter any link for reference of this award/achievement (if any)"
              name="award_link"
              type="text"
              value={formFields.award_link}
              onChange={hanldeInputValueChange}
            />
          </div>
          <div className={signupStyle["form-item"]} id="additional_info">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter additional information (if any)"
              name="additional_info"
              type="text"
              value={formFields.additional_info}
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
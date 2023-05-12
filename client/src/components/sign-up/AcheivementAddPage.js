import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { achievementEdit } from "../../services/Apis";


const AchievementAddPage = () => {

  var email = localStorage.getItem('email');
  const { state } = useLocation();
  const utype = state.utype;
  const navigate = useNavigate();
  var defaultFormFields={};
if(utype === "1" || utype === "4"){
  defaultFormFields = {
    faculty_name: "",
    student_name: "",
    achievements: "",
    date: "",
    shared_with: "",
    status: "Verified",
  };
}
else{
  defaultFormFields = {
    faculty_name: "puneet@iitrpr.ac.in",
    student_name: email,
    achievements: "",
    date: "",
    shared_with: "",
    status: "Pending..",
  };}



  const [formFields, setFormFields] = useState(defaultFormFields);

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { achievements, date, shared_with, status, faculty_name, student_name } = formFields;
    if (achievements === "") {

      toast.error("Enter achievement Name")

    }
    else {
      const response = await achievementEdit(formFields);
      if (response.status === 200) {
        if(utype === "1" || utype==="4"){
          setFormFields({
            ...formFields,
            faculty_name: "",
            student_name: "",
            achievements: "",
            date: "",
            shared_with: "",
            status: "Verified",
          });
        }
        else{
        setFormFields({
          ...formFields,
          faculty_name: "2020csb1136@iitrpr.ac.in",
          student_name: email,
          achievements: "",
          date: "",
          shared_with: "",
          status: "Pending..",
        });}
        if(utype === "1"){
          navigate("/StaffHome/StaffFaculty")
        }
        else if(utype === "4"){
          navigate("/Admin/AdminFaculty")
        }
        else{
        navigate("/Profile/Achievements")
        }
      }
      else {
        toast.error(response.response.data.error);
      }
    }

  };
  if(utype === "1" || utype === "4"){
    return (
      <body className={signupStyle.rooted}>
        <section className={signupStyle["form-container"]}>
          <h2 className={signupStyle["form-heading"]}>Add More Achievements</h2>
          <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
            <div className={signupStyle["form-item"]} id="achievements">
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Achievement</label>
              <input style={{ height: "30px" }} className={signupStyle.myInput}
                placeholder="Enter your Achievement"
                name="achievements"
                type="text"
                value={formFields.achievements}
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
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
              <input style={{ height: "30px" }} className={signupStyle.myInput}
                placeholder="Faculty Name"
                name="faculty_name"
                type="text"
                value={formFields.faculty_name}
                onChange={hanldeInputValueChange}
              />
  
            </div>

            <div className={signupStyle["form-item"]} id="student_name">
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>student name </label>
              <input style={{ height: "30px" }} className={signupStyle.myInput}
                placeholder="student name"
                name="student_name"
                type="text"
                value={formFields.student_name}
                onChange={hanldeInputValueChange}
              />
  
            </div>
            <br />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit}  >Submit</button>
  
          </form>
          <ToastContainer />
        </section>
      </body>
    );
  }
  else{
  return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Add more Achievements</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="achievements">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Achievement</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter your Achievement"
              name="achievements"
              type="text"
              value={formFields.achievements}
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
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit}  >Submit</button>

        </form>
        <ToastContainer />
      </section>
    </body>
  );}
};

export default AchievementAddPage;
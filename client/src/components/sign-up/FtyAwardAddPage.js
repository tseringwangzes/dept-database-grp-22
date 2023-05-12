import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { FtyAddAwards } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
const FtyAwardAddPage = () => {
  const { state } = useLocation();
  const utype = state.utype;
  var email = localStorage.getItem('email');
  const navigate = useNavigate();
  const id = state.id;
  var defaultFormFields ={}
  if(utype==="1" || utype === "4"){
    defaultFormFields={
    faculty_name:"",
    award_name: "",
    date: "",
    shared_with: "",
    additional_info:"",
    };
  }
  else{
  defaultFormFields = {
    faculty_name:email,
    award_name: "",
    date: "",
    shared_with: "",
    additional_info:"",
    
  };}

  const [formFields, setFormFields] = useState(defaultFormFields);

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    var {award_name,date,shared_with,faculty_name, additional_info} = formFields;
    if(award_name === ""){

      toast.error("Enter Award/Achievement Name")

    }
    if(date === ""){

      toast.error("Enter the date")

    }
    else{
      //       const dateObject = new Date(date);
      // const isoDate = dateObject.toISOString();
      // date = isoDate;
      const response = await FtyAddAwards(formFields);
      if(response.status === 200){
        if(utype === "1" || utype === "4"){
          setFormFields({...formFields,
            award_name: "",
            date: "",
            shared_with: "",
            faculty_name:"",
            additional_info:"",
          });
        }
        else{
        setFormFields({...formFields,
          award_name: "",
          award_reason: "",
          date: "",
          shared_with: "",
          faculty_name:email,
          additional_info:"",
        });}
        if(utype==="1"){
          navigate("/StaffHome/StaffStudent")
        }
        else if(utype === "4"){
          navigate("/Admin/AdminStudent")
        }
        else{
          navigate("/faculty/Awards")
        }
      }
      else{
        toast.error(response.response.data.error);
      }
    }

  };

  if(utype === "1" || utype === "4"){
    return (
      <body className={signupStyle.rooted}>
        <section className={signupStyle["form-container"]}>
          <h2 className={signupStyle["form-heading"]}>Add More Award/Achievement Details of Faculty</h2>
          <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

          <div className={signupStyle["form-item"]} id="faculty_name">
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Email Id</label>
              <input style={{ height: "30px" }} className={signupStyle.myInput}
                placeholder="Enter the email id of faculty"
                name="faculty_name"
                type="text"
                value={formFields.faculty_name}
                onChange={hanldeInputValueChange}
                />
              </div>

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
                placeholder="Enter the date the faculty received the award/achievement"
                name="date"
                type="date"
                value={formFields.date}
                onChange={hanldeInputValueChange}
              />
  
            </div>
  
            <div className={signupStyle["form-item"]} id="shared_with">
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Shared with</label>
              <input style={{ height: "30px" }} className={signupStyle.myInput}
                placeholder="Enter the comma separated email id's of other faculty members who share this award/achievement"
                name="shared_with"
                type="text"
                value={formFields.shared_with}
                onChange={hanldeInputValueChange}
                />
              </div>

              <div className={signupStyle["form-item"]} id="additional_info">
              <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information (if any)</label>
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
          <ToastContainer/>
        </section>
      </body>
    );
  }
  else{
  return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Add More Awards/Achievements</h2>
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
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma separated email id's of people with whom award is shared"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
              />
            </div>
            <div className={signupStyle["form-item"]} id="additional_info">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information (if any)</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter any additional information if you want"
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
  );}
};

export default FtyAwardAddPage;
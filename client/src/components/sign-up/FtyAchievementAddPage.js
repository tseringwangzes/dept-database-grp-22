import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditAchievements } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyAchievementsAddPage = () => {

var email = localStorage.getItem('email');
    const navigate = useNavigate();
    const { state } = useLocation();
  const utype = state.utype;
  var defaultFormFields = {};
  if(utype === "1" || utype === "4"){
    defaultFormFields = {
        faculty_name:"",
        Achievements: "",
        date: "",
        shared_with: "",
        additional_info:"",
    };
  }
  else{
    defaultFormFields = {
        faculty_name:email,
        Achievements: "",
        date: "",
        shared_with: "",
        additional_info:"",
    };}

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { Achievements,date, shared_with,faculty_name,additional_info } = formFields;
        if (Achievements === "") {

            toast.error("Enter Achievement Name")

        }
        else {
            const response = await FtyEditAchievements(formFields);
            if (response.status === 200) {
                if(utype === "1"){
                    setFormFields({
                        ...formFields,
                        Achievements: "",
                        date: "",
                        shared_with: "",
                        faculty_name:"",
                        additional_info:"",
                    });
                    navigate("/StaffHome/StaffFaculty")
                }
                else if(utype === "4"){
                    setFormFields({
                        ...formFields,
                        Achievements: "",
                        date: "",
                        shared_with: "",
                        faculty_name:"",
                        additional_info:"",
                    });
                    navigate("/Admin/AdminFaculty")
                }
                else{
                setFormFields({
                    ...formFields,
                    Achievements: "",
                    date: "",
                    shared_with: "",
                    faculty_name:email,
                    additional_info:"",
                });
                navigate("/faculty/Achievements")}
                
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
                    <h2 className={signupStyle["form-heading"]}> Add more Achievements</h2>
                    <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                        <div className={signupStyle["form-item"]} id="Achievements">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Achievement</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the achievement"
                                name="Achievements"
                                type="text"
                                value={formFields.Achievements}
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
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Faculty Name"
                                name="faculty_name"
                                type="text"
                                value={formFields.faculty_name}
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
                    <ToastContainer />
                </section>
            </body>
        );
    }
    else{
    return (
        <body className={signupStyle.rooted}>
            <section className={signupStyle["form-container"]}>
                <h2 className={signupStyle["form-heading"]}>Add your Achievements here</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                    <div className={signupStyle["form-item"]} id="Achievements">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Achievement</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Achievement name"
                            name="Achievements"
                            type="text"
                            value={formFields.Achievements}
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
                            placeholder="Enter the comma separated email id's of people with whome you shared this achievement"
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
                <ToastContainer />
            </section>
        </body>
    );}
};

export default FtyAchievementsAddPage;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditAchievements } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const FtyAchievementsEditPage = () => {

    const { state } = useLocation();

    const id = state.id;
    const utype = state.utype;
    const navigate = useNavigate();

    const defaultFormFields = {
        faculty_name:state.faculty_name,
        title: state.title,
        date: state.date,
        dept: state.dept,
        institute: state.institute,
        additional_info:state.additional_info,
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteachievements/${id}`, {
            method: "Delete"
        });
        result = await result.json()
    }

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { title,date, dept,faculty_name,additional_info,institute } = formFields;
        if (title === "") {
            toast.error("Enter Lecture Tile")
        }
        if (date === "") {
            toast.error("Enter the date")
        }
        else {
            const response = await FtyEditAchievements(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields,
                    faculty_name:state.faculty_name,
                    title: state.title,
                    date: state.date,
                    dept: state.dept,
                    institute: state.institute,
                    additional_info:state.additional_info,
                });
                if(utype === "1"){
                    navigate("/StaffHome/StaffSeminar")
                }
                else if(utype === "4"){
                    navigate("/Admin/AdminFaculty")
                }
                else{
                navigate("/faculty/Achievements")
                }
            }
            else {
                toast.error(response.response.data.error);
            }
        }


        deleteid(id);
    };


    return (
        <body className={signupStyle.rooted}>
            <section className={signupStyle["form-container"]}>
            <h2 className={signupStyle["form-heading"]}> Edit Details Of Invited Lectures By You</h2>
                    <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                        <div className={signupStyle["form-item"]} id="title">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Lecture Title</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the lecture title"
                                name="title"
                                type="text"
                                value={formFields.title}
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
    
                        <div className={signupStyle["form-item"]} id="dept">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Department</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter your department"
                                name="dept"
                                type="text"
                                value={formFields.dept}
                                onChange={hanldeInputValueChange}
                            />
                        </div>

                        <div className={signupStyle["form-item"]} id="institute">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Institute</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter institute"
                                name="institute"
                                type="text"
                                value={formFields.institute}
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
};

export default FtyAchievementsEditPage;
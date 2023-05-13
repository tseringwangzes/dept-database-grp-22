import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditProjects } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const FtyProjectsEditPage = () => {

    const { state } = useLocation();
    const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        title: state.title,
        start_date: state.start_date,
        dept:state.dept,
        faculty_name:state.faculty_name,    
        funding_agency: state.funding_agency,
        funds: state.funds,    
        ongoing: state.ongoing,
        link: state.link,
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteproject/${id}`, {
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

        const { title,start_date,dept,faculty_name,funding_agency,funds,ongoing,link } = formFields;
        if (title === "") {

            toast.error("Enter title Name")

        }
        if ( start_date=== "") {

            toast.error("Enter the start date")

        }
        else {
            const response = await FtyEditProjects(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields, 
                    title: state.title,
                    start_date: state.start_date,
                    dept:state.dept,
                    faculty_name:state.faculty_name,    
                    funding_agency: state.funding_agency,
                    funds: state.funds,    
                    ongoing: state.ongoing,
                    link: state.link,
                });
                if(utype === "1"){
                    navigate("/StaffHome/StaffProject")
                }
                else if(utype === "4"){
                    navigate("/Admin/AdminProject")
                }
                else{
                navigate("/faculty/Projects")
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
                <h2 className={signupStyle["form-heading"]}>Edit Research Project's Details</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                <div className={signupStyle["form-item"]} id="title">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Project Title</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Project title you want to add"
                            name="title"
                            type="text"
                            value={formFields.title}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="start_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Start Date of Project</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the start date of the project"
                            name="start_date"
                            type="date"
                            value={formFields.start_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="dept">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Department Assosciated</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter department assosciated"
                            name="dept"
                            type="text"
                            value={formFields.dept}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="faculty_name">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter email id of faculty responsible for the project"
                            name="faculty_name"
                            type="text"
                            value={formFields.faculty_name}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="funding_agency">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Funding Agency</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the agency name who funded the project"
                            name="funding_agency"
                            type="text"
                            value={formFields.funding_agency}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="funds">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Funds Provided</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the amount funded by the agency"
                            name="funds"
                            type="text"
                            value={formFields.funds}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="ongoing">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Ongoing/Completed</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the project status, whether ongoing or completed"
                            name="ongoing"
                            type="text"
                            value={formFields.ongoing}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="link">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Project Link</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the project link if any, else leave it blank"
                            name="link"
                            type="text"
                            value={formFields.link}
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

export default FtyProjectsEditPage;
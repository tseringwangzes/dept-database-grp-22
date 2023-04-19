import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { projectEdit } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const ProjectAddPage = () => {

    var email = localStorage.getItem('email');
    const navigate = useNavigate();
    const { state } = useLocation();
    const utype = state.utype;
    var defaultFormFields = {};
    if (utype === "1") {
        defaultFormFields = {
            faculty_name: "",
            student_name: "",
            topic: "",
            date: "",
            granted_money: "",
            description: "",
            status: "Pending..",
            collaboration: "",
        };
    }
    else{
        defaultFormFields = {
            faculty_name: "2020csb1136@iitrpr.ac.in",
            student_name: email,
            topic: "",
            date: "",
            granted_money: "",
            description: "",
            status: "Pending..",
            collaboration: "",
        };
    }

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { topic, date, collaboration, granted_money, description, status, faculty_name, student_name } = formFields;
        if (topic === "") {

            toast.error("Enter topic Name")

        }
        else {
            const response = await projectEdit(formFields);
            if (response.status === 200) {
                if(utype === "1"){
                    setFormFields({
                        ...formFields,
                        faculty_name: "",
                        student_name: "",
                        topic: "",
                        date: "",
                        granted_money: "",
                        description: "",
                        status: "Pending..",
                        collaboration: "",
                    });
                    navigate("/StaffHome/StaffProject")
                }
                else{
                setFormFields({
                    ...formFields,
                    faculty_name: "2020csb1136@iitrpr.ac.in",
                    student_name: email,
                    topic: "",
                    date: "",
                    granted_money: "",
                    description: "",
                    status: "Pending..",
                    collaboration: "",
                });
                navigate("/Profile/Project")}
            }
            else {
                toast.error(response.response.data.error);
            }
        }
    };

    if(utype === "1"){
        return (
            <body className={signupStyle.rooted}>
                <section className={signupStyle["form-container"]}>
                    <h2 className={signupStyle["form-heading"]}>Add More</h2>
                    <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

                    <div className={signupStyle["form-item"]} id="faculty_name">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the Faculty Name"
                                name="faculty_name"
                                type="text"
                                value={formFields.faculty_name}
                                onChange={hanldeInputValueChange}
                            />
                        </div>

                        <div className={signupStyle["form-item"]} id="student_name">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Student Name</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the Student Name"
                                name="student_name"
                                type="text"
                                value={formFields.student_name}
                                onChange={hanldeInputValueChange}
                            />
                        </div>


                        <div className={signupStyle["form-item"]} id="topic">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Topic</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the topic"
                                name="topic"
                                type="text"
                                value={formFields.topic}
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
    
                        <div className={signupStyle["form-item"]} id="collaboration">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>collaboration</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter collaboration with"
                                name="collaboration"
                                type="text"
                                value={formFields.collaboration}
                                onChange={hanldeInputValueChange}
                            />
    
                        </div>
    
                        <div className={signupStyle["form-item"]} id="granted_money">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>granted_money</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="granted_money"
                                name="granted_money"
                                type="text"
                                value={formFields.granted_money}
                                onChange={hanldeInputValueChange}
                            />
                        </div>
    
                        <div className={signupStyle["form-item"]} id="description">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>description</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="description"
                                name="description"
                                type="text"
                                value={formFields.description}
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
                <h2 className={signupStyle["form-heading"]}>Add More</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                    <div className={signupStyle["form-item"]} id="topic">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Topic</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the topic"
                            name="topic"
                            type="text"
                            value={formFields.topic}
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

                    <div className={signupStyle["form-item"]} id="collaboration">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>collaboration</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter collaboration with"
                            name="collaboration"
                            type="text"
                            value={formFields.collaboration}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="granted_money">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>granted_money</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="granted_money"
                            name="granted_money"
                            type="text"
                            value={formFields.granted_money}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="description">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>description</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="description"
                            name="description"
                            type="text"
                            value={formFields.description}
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

export default ProjectAddPage;
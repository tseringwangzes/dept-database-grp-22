import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditProjects } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyProjectsEditPage = () => {

    const { state } = useLocation();
    const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        faculty_name:state.faculty_name,
        topic: state.topic,
        year: state.year,
        date: state.date,
        granted_money: state.granted_money,
        status: state.status,
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`http://localhost:4002/user/ftydeleteproject/${id}`, {
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

        const { topic,year, date,granted_money,status,faculty_name } = formFields;
        if (topic === "") {

            toast.error("Enter topic Name")

        }
        else {
            const response = await FtyEditProjects(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields, 
                    faculty_name:state.faculty_name,
                    topic: state.topic,
                    year: state.year,
                    date: state.date,
                    granted_money: state.granted_money,
                    status: state.status,
                });
                if(utype === "1"){
                    navigate("/StaffHome/StaffProject")
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
                <h2 className={signupStyle["form-heading"]}>Edit</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                    <div className={signupStyle["form-item"]} id="topic">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>topic</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the topic"
                            name="topic"
                            type="text"
                            value={formFields.topic}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="year">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Year</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Year"
                            name="year"
                            type="text"
                            value={formFields.year}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date"
                            name="date"
                            type="text"
                            value={formFields.date}
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

                    <div className={signupStyle["form-item"]} id="status">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>status</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="status"
                            name="status"
                            type="text"
                            value={formFields.status}
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
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditProjects } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyProjectAddPage = () => {

var email = localStorage.getItem('email');
    const navigate = useNavigate();
    const {state} = useLocation();
    const utype = state.utype;
    var defaultFormFields={};
    if(utype === "1" || utype === "4"){
        defaultFormFields = {
            faculty_name:"",
            topic: "",
            date: "",
            granted_money: "",
            status: "",
        }; 
    }
    else{
    defaultFormFields = {
        faculty_name:email,
        topic: "",
        date: "",
        granted_money: "",
        status: "",
    };}

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { topic,date,granted_money,status,faculty_name } = formFields;
        if (topic === "") {

            toast.error("Enter topic Name")

        }
        else {
            const response = await FtyEditProjects(formFields);
            if (response.status === 200) {
                if(utype === "1" || utype === "4"){
                setFormFields({
                    ...formFields, 
                    faculty_name:"",
                    topic: "",
                    date: "",
                    granted_money: "",
                    status: "",
                });
               
            }
            else{
                setFormFields({
                    ...formFields, 
                    faculty_name:email,
                    topic: "",
                    date: "",
                    granted_money: "",
                    status: "",
                });
                
            }
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
    };

if(utype === "1" || utype === "4"){
    return (
        <body className={signupStyle.rooted}>
            <section className={signupStyle["form-container"]}>
                <h2 className={signupStyle["form-heading"]}> Add More Project Grants</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

                <div className={signupStyle["form-item"]} id="faculty_name">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="faculty_name"
                            name="faculty_name"
                            type="text"
                            value={formFields.faculty_name}
                            onChange={hanldeInputValueChange}
                        />
                    </div>


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
}
else{
    return (
        <body className={signupStyle.rooted}>
            <section className={signupStyle["form-container"]}>
                <h2 className={signupStyle["form-heading"]}>Add More Project Grants</h2>
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
    );}
};

export default FtyProjectAddPage;
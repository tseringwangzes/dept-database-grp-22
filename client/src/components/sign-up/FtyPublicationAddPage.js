import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditPublications } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyPublicationAddPage = () => {

    var email = localStorage.getItem('email')
    const navigate = useNavigate();
    const {state} = useLocation();
    const utype = state.utype;
    var defaultFormFields = {};
    if(utype === "1" || utype === "4"){
        defaultFormFields = {
            faculty_name:"",
            topic: "",
            published_date: "",
            accepted_date: "",
            collaboration: "",
        };
    }
    else{
    defaultFormFields = {
        faculty_name:email,
        topic: "",
        published_date: "",
        accepted_date: "",
        collaboration: "",
    };}

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { topic, published_date, accepted_date,collaboration,faculty_name } = formFields;
        if (topic === "") {

            toast.error("Enter topic Name")

        }
        else {
            const response = await FtyEditPublications(formFields);
            if (response.status === 200) {
                if(utype === "1" || utype === "4"){
                setFormFields({
                    ...formFields, 
                    topic: "",
                    faculty_name:"",
                    published_date: "",
                    accepted_date: "",
                    collaboration: "",
                });
                }
                else{
                    setFormFields({
                        ...formFields, 
                        topic: "",
                        faculty_name:email,
                        published_date: "",
                        accepted_date: "",
                        collaboration: "",
                    });
                    
                }
                if(utype === "1"){
                    navigate("/StaffHome/StaffPublications")
                }
                else if(utype === "4"){
                    navigate("/Admin/AdminPublications")
                }
                else{
                    navigate("/faculty/Publications")
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
                <h2 className={signupStyle["form-heading"]}>Add Publications and Patents</h2>
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

                

                    <div className={signupStyle["form-item"]} id="published_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Published Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date"
                            name="published_date"
                            type="date"
                            value={formFields.published_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>


                    <div className={signupStyle["form-item"]} id="accepted_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Accepted Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date"
                            name="accepted_date"
                            type="date"
                            value={formFields.accepted_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>
                    <div className={signupStyle["form-item"]} id="collaboration">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Collaboration</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="collaboration with whom"
                            name="collaboration"
                            type="text"
                            value={formFields.collaboration}
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
                <h2 className={signupStyle["form-heading"]}>Add Publications and Patents</h2>
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


                    <div className={signupStyle["form-item"]} id="published_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Published Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date"
                            name="published_date"
                            type="date"
                            value={formFields.published_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="accepted_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Accepted Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date"
                            name="accepted_date"
                            type="date"
                            value={formFields.accepted_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="collaboration">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Collaboration</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="collaboration with whom"
                            name="collaboration"
                            type="text"
                            value={formFields.collaboration}
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

export default FtyPublicationAddPage;
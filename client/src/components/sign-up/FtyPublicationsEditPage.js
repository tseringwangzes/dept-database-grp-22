import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditPublications } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyPublicationsEditPage = () => {

    const { state } = useLocation();
    const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        faculty_name: state.faculty_name,
        topic: state.topic,
        published_date: state.published_date,
        accepted_date: state.accepted_date,
        collaboration: state.collaboration,
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`http://localhost:4002/user/ftydeletepublication/${id}`, {
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

        const { topic, published_date, accepted_date, collaboration, faculty_name } = formFields;
        if (topic === "") {

            toast.error("Enter topic Name")

        }
        else {
            const response = await FtyEditPublications(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields,
                    topic: state.topic,
                    faculty_name: state.faculty_name,
                    published_date: state.published_date,
                    accepted_date: state.accepted_date,
                    collaboration: state.collaboration,
                });
                if (utype === "1") {
                    navigate("/StaffHome/StaffPublications")
                }
                else if (utype === "4") {
                    navigate("/Admin/AdminPublications")
                }
                else {
                    navigate("/faculty/Publications")
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
                <h2 className={signupStyle["form-heading"]}>Edit Your Publications and Patents</h2>
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
    );
};

export default FtyPublicationsEditPage;
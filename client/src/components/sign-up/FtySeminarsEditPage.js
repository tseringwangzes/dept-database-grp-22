import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditSeminars } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const FtySeminarsEditPage = () => {

    const { state } = useLocation();
const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        speaker:state.speaker,
        title:state.title,
        designation: state.designation,
        institute: state.institute,
        date: state.date,
        venue: state.venue,
        num_participant: state.num_participant,
        dept: state.dept,
        additional_info: state.additional_info
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteseminar/${id}`, {
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

        const { speaker,title,date,venue,dept,institute,designation,additional_info,num_participant} = formFields;
        if (speaker === "") {

            toast.error("Enter the name of speaker ")

        }
        if (date === "") {

            toast.error("Enter the date ")

        }
        else {
            const response = await FtyEditSeminars(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields,  speaker:state.speaker,
                    title:state.title,
                    designation: state.designation,
                    institute: state.institute,
                    date: state.date,
                    venue: state.venue,
                    num_participant: state.num_participant,
                    dept: state.dept,
                    additional_info: state.additional_info
                });
                if(utype === "1"){
                    navigate("/StaffHome/StaffSeminar")
                }
                else if(utype === "4"){
                    navigate("/Admin/AdminSeminar")
                }
                else{
                navigate("/faculty/Seminars")
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
                <h2 className={signupStyle["form-heading"]}>Edit Lectures By Visiting Experts</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

                <div className={signupStyle["form-item"]} id="faculty_name">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Speaker/Guest Name</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the name of speaker/guest"
                            name="speaker"
                            type="text"
                            value={formFields.speaker}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="title">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Title</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the title of lecture"
                            name="title"
                            type="text"
                            value={formFields.title}
                            onChange={hanldeInputValueChange}
                        />
                    </div>


                    <div className={signupStyle["form-item"]} id="type">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Designation Of Speaker </label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the designation of speaker"
                            name="designation"
                            type="text"
                            value={formFields.designation}
                            onChange={hanldeInputValueChange}
                        />
                    </div>
                    <div className={signupStyle["form-item"]} id="institute">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Institute/Organisation Of Speaker</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Institute/Organisation Of Speaker"
                            name="institute"
                            type="text"
                            value={formFields.institute}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Date Of Visit</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the date of visit"
                            name="date"
                            type="date"
                            value={formFields.date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="venue">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Venue</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the venue"
                            name="venue"
                            type="text"
                            value={formFields.venue}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="num_participant">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Participants</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the number of participants"
                            name="num_participant"
                            type="text"
                            value={formFields.num_participant}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="dept">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Department</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the department"
                            name="dept"
                            type="text"
                            value={formFields.dept}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="additional_info">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter any additional information"
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

export default FtySeminarsEditPage;
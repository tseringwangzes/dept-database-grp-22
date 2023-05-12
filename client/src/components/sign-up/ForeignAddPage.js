import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { foreignEdit } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const ForeignAddPage = () => {
    var email = localStorage.getItem('email');
    const navigate = useNavigate();
    const { state } = useLocation();
    const utype = state.utype;
    var defaultFormFields = {};
    if (utype === "1" || utype === "4") {
        defaultFormFields = {
            student_name: "",
            start_date: "",
            end_date: "",
            country: "",
            faculty_name: "",
            visit_details:"",
            visit_link:"",
            status: "Pending..",
        };
    }
    else {
        defaultFormFields = {
            student_name: email,
            faculty_name: "puneet@iitrpr.ac.in",
            topic: "",
            start_date: "",
            end_date: "",
            country: "",
            visit_details:"",
            visit_link:"",
            status: "Pending..",
        };
    }

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { start_date, end_date, country, faculty_name, status, student_name, visit_details,visit_link} = formFields;
        if (start_date === "") {

            toast.error("Enter Start Date")

        }
        if (end_date === "") {

            toast.error("Enter End Date")

        }
        else if (country === "") {

            toast.error("Enter Country Name")

        }
        else {
            const response = await foreignEdit(formFields);
            if (response.status === 200) {
                if (utype === "1" || utype === "4") {
                    setFormFields({
                        ...formFields,
                        student_name: "",
                        faculty_name: "",
                        start_date: "",
                        end_date: "",
                        country: "",
                        visit_details:"",
                        visit_link:"",
                        status: "Pending..",
                    });

                }
                else {
                    setFormFields({
                        ...formFields,
                        student_name: email,
                        faculty_name: "",
                        start_date: "",
                        end_date: "",
                        country: "",
                        visit_details:"",
                        visit_link:"",
                        status: "Pending..",
                    });
                }
                if (utype === "1") {
                    navigate("/StaffHome/StaffForeign")
                }
                else if (utype === "4") {
                    navigate("/Admin/AdminForeign")
                }
                else {
                    navigate("/Profile/Foreign")
                }
            }
            else {
                toast.error(response.response.data.error);
            }
        }
    };

    if (utype === "1" || utype === "4") {
        return (
            <body className={signupStyle.rooted}>
                <section className={signupStyle["form-container"]}>
                    <h2 className={signupStyle["form-heading"]}>Add More Foreign Visits Details</h2>
                    <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                       

                    <div className={signupStyle["form-item"]} id="student_name">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Student Email Id</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the student_name"
                                name="student_name"
                                type="text"
                                value={formFields.student_name}
                                onChange={hanldeInputValueChange}
                            />

                    </div>

                    <div className={signupStyle["form-item"]} id="faculty_name">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Email Id</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the faculty's id with whom you visit"
                                name="faculty_name"
                                type="text"
                                value={formFields.faculty_name}
                                onChange={hanldeInputValueChange}
                            />

                    </div>


                        <div className={signupStyle["form-item"]} id="start_date">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Start date of visit</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the Start Date"
                                name="start_date"
                                type="date"
                                value={formFields.start_date}
                                onChange={hanldeInputValueChange}
                            />
                        </div>

                        <div className={signupStyle["form-item"]} id="end_date">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>End date of visit</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the End Date"
                                name="end_date"
                                type="date"
                                value={formFields.end_date}
                                onChange={hanldeInputValueChange}
                            />

                        </div>

                        <div className={signupStyle["form-item"]} id="country">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Country Visited</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter Country"
                                name="Enter Country name visited"
                                type="text"
                                value={formFields.country}
                                onChange={hanldeInputValueChange}
                            />

                        </div>


                        <div className={signupStyle["form-item"]} id="visit_details">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Visit Details</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter Visit Details"
                            name="visit_details"
                            type="text"
                            value={formFields.visit_details}
                            onChange={hanldeInputValueChange}
                        />
                    </div>
                    <div className={signupStyle["form-item"]} id="visit_link">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Attach Link</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Attach Link"
                            name="visit_link"
                            type="text"
                            value={formFields.visit_link}
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
    else {
        return (
            <body className={signupStyle.rooted}>
                <section className={signupStyle["form-container"]}>
                    <h2 className={signupStyle["form-heading"]}>Add More Foreign Visits Details</h2>
                   
                    <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
                    
                        <div className={signupStyle["form-item"]} id="start_date">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Start date of visit</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the Start Date"
                                name="start_date"
                                type="date"
                                value={formFields.start_date}
                                onChange={hanldeInputValueChange}
                            />
                        </div>

                        <div className={signupStyle["form-item"]} id="end_date">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>End date of visit</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the End Date"
                                name="end_date"
                                type="date"
                                value={formFields.end_date}
                                onChange={hanldeInputValueChange}
                            />

                        </div>

                        <div className={signupStyle["form-item"]} id="country">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Country Visited</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter Country name visited"
                                name="country"
                                type="text"
                                value={formFields.country}
                                onChange={hanldeInputValueChange}
                            />

                        </div>

                        <div className={signupStyle["form-item"]} id="faculty_name">
                            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Name</label>
                            <input style={{ height: "30px" }} className={signupStyle.myInput}
                                placeholder="Enter the faculty's id with whom you visit"
                                name="faculty_name"
                                type="text"
                                value={formFields.faculty_name}
                                onChange={hanldeInputValueChange}
                            />

                        </div>

                        <div className={signupStyle["form-item"]} id="visit_details">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Visit Details</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter Visit Details"
                            name="visit_details"
                            type="text"
                            value={formFields.visit_details}
                            onChange={hanldeInputValueChange}
                        />
                    </div>
                    <div className={signupStyle["form-item"]} id="visit_link">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Attach Link</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Attach the link(if any)"
                            name="visit_link"
                            type="text"
                            value={formFields.visit_link}
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
};

export default ForeignAddPage;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditForeign } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const FtyForeignEditPage = () => {

    const { state } = useLocation();
    const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        faculty_name:state.faculty_name,
        
        start_date: state.start_date,
        end_date: state.end_date,
        country: state.country,
        visit_details:state.visit_details,
        
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteforeign/${id}`, {
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

        const { start_date,end_date,country,faculty_name,visit_details} = formFields;
        if (country === "") {

            toast.error("Enter Country Name")

        }
        if (start_date === "") {

            toast.error("Enter the start date")

        }
        else {
            const response = await FtyEditForeign(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields, 
                    faculty_name:state.faculty_name,
                    
                    start_date: state.start_date,
                    end_date: state.end_date,
                    country: state.country,
                    visit_details:state.visit_details
                });
                if(utype === "1"){
                    navigate("/StaffHome/StaffForeign")
                }
                else if(utype === "4"){
                    navigate("/Admin/AdminForeign")
                }
                else{
                navigate("/faculty/foreign")
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
                <h2 className={signupStyle["form-heading"]}>Edit Your Foreign Visits Details</h2>
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

                    <div className={signupStyle["form-item"]} id="visit_details">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Visit Details</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter visit details"
                            name="visit_details"
                            type="text"
                            value={formFields.visit_details}
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

export default FtyForeignEditPage;
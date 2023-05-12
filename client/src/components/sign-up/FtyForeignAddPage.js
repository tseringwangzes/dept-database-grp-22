import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditForeign } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const FtyForeignAddPage = () => {
    const {state} = useLocation();
    const utype = state.utype;
    var email = localStorage.getItem('email')
    const navigate = useNavigate();
    var defaultFormFields={};
if(utype === "1" || utype === "4"){
    defaultFormFields = {
        faculty_name:"",
       
        start_date: "",
        end_date: "",
        country: "",  
        visit_details:"",   
    };
}
else{
    defaultFormFields = {
        faculty_name:email,
       
        start_date: "",
        end_date: "",
        country: "", 
        visit_details:"",      
    };
}

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { start_date,end_date,country,visit_details,faculty_name} = formFields;
        if (country === "") {

            toast.error("Enter Country Name")

        }
        if (start_date === "") {

            toast.error("Enter the star date")

        }
        else {
            const response = await FtyEditForeign(formFields);
            if (response.status === 200) {
                if(utype === "1" || utype === "4"){
                    setFormFields({
                        ...formFields, 
                        faculty_name:"",
                        
                        start_date: "",
                        end_date: "",
                        country: "",
                        visit_details:"",  
                    });
                                     
                }
                else{
                setFormFields({
                    ...formFields, 
                    faculty_name:email,
                    
                    start_date: "",
                    end_date: "",
                    country: "",
                    visit_details:"",  
                });
                }
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
    };

if(utype === "1" || utype === "4"){
    return(
        <body className={signupStyle.rooted}>
        <section className={signupStyle["form-container"]}>
            <h2 className={signupStyle["form-heading"]}>Add More Foreign Visits Details</h2>
            <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

            <div className={signupStyle["form-item"]} id="faculty_name">
                    <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Email Id</label>
                    <input style={{ height: "30px" }} className={signupStyle.myInput}
                        placeholder="Enter the faculty_name"
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
                        placeholder="Enter the date"
                        name="country"
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


                    <br />
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit} >Submit</button>
                </form>
                <ToastContainer />
            </section>
        </body>
    );}
};

export default FtyForeignAddPage;
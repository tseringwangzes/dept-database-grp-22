import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { publicationEdit } from "../../services/Apis";
import { useNavigate } from "react-router-dom";

const PublicationAddPage = () => {

var email = localStorage.getItem('email');
    const navigate = useNavigate();
    const {state} = useLocation();
    const utype = state.utype;
    var defaultFormFields = {};
    if(utype === "1" || utype === "4"){
        defaultFormFields = {
            title:"",
            author:"",
            type:"",
            title_publish:"",
            patent_no:"",
            accepted_date:"",
            published_date:"",
            assignee:"",
            impact_factor:"",
            additional_info:"",
            link:"",
            faculty_name: "",
            student_name: "",
            status: "Pending..",
        };
    }
    else{
    defaultFormFields = {
        title:"",
            author:"",
            type:"",
            title_publish:"",
            patent_no:"",
            accepted_date:"",
            published_date:"",
            assignee:"",
            impact_factor:"",
            additional_info:"",
            link:"",
        faculty_name: "puneet@iitrpr.ac.in",
        student_name: email,
        status: "Pending..",
    };}

    const [formFields, setFormFields] = useState(defaultFormFields);

    const hanldeInputValueChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,additional_info,link, status, faculty_name, student_name } = formFields;
        if (title === "") {

            toast.error("Enter Title")

        }
        if (accepted_date === "") {

            toast.error("Enter the accepted date")

        }
        else {
            const response = await publicationEdit(formFields);
            if (response.status === 200) {
                if(utype === "1" || utype === "4"){
                    setFormFields({
                        ...formFields,
                        title:"",
                        author:"",
                        type:"",
                        title_publish:"",
                        patent_no:"",
                        accepted_date:"",
                        published_date:"",
                        assignee:"",
                        impact_factor:"",
                        additional_info:"",
                        link:"",
                        faculty_name: "",
                        student_name: "",
                        status: "Pending..",
                    });
                   
                }
                else{
                setFormFields({
                    ...formFields,
                    title:"",
                    author:"",
                    type:"",
                    title_publish:"",
                    patent_no:"",
                    accepted_date:"",
                    published_date:"",
                    assignee:"",
                    impact_factor:"",
                    additional_info:"",
                    link:"",
                    faculty_name: "2020csb1135@iitrpr.ac.in",
                    student_name: email,
                    status: "Pending..",
                });
                }
                if(utype === "1"){
                    navigate("/StaffHome/StaffPublications")
                }
                else if(utype==="4"){
                    navigate("/Admin/AdminPublications")
                }
                else{
                    navigate("/Profile/Publications")
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
                <h2 className={signupStyle["form-heading"]}>Add More Publication/Patents/Journals</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

                <div className={signupStyle["form-item"]} id="student_name">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Student Email Id</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Student Name"
                            name="student_name"
                            type="text"
                            value={formFields.student_name}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="faculty_name">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Faculty Email Id</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Faculty Name"
                            name="faculty_name"
                            type="text"
                            value={formFields.faculty_name}
                            onChange={hanldeInputValueChange}
                        />
                    </div>


                    <div className={signupStyle["form-item"]} id="title">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Title of Articles/Publications/Patents</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Title of Article/Publication/Patents"
                            name="title"
                            type="text"
                            value={formFields.title}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="author">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Authors</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Authors name"
                            name="author"
                            type="text"
                            value={formFields.author}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="type">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Conference Name</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Publications/Journals/Patents"
                            name="type"
                            type="text"
                            value={formFields.type}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="title_publish">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Title of Journal</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the title of Journal"
                            name="title_publish"
                            type="text"
                            value={formFields.title_publish}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="patent_no">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Page/Issue/Patent No.</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Volume/Issue/Patent No."
                            name="patent_no"
                            type="text"
                            value={formFields.patent_no}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="accepted_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Accepted Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Accepted date"
                            name="accepted_date"
                            type="date"
                            value={formFields.accepted_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="published_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Published Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Published date"
                            name="published_date"
                            type="date"
                            value={formFields.published_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>


                   
                    <div className={signupStyle["form-item"]} id="assignee">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>DOI/ISBN/Assignee</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the DOI/ISBN/Assignee"
                            name="assignee"
                            type="text"
                            value={formFields.assignee}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="impact_factor">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Impact Factor</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Impact Factor"
                            name="impact_factor"
                            type="text"
                            value={formFields.impact_factor}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="additional_info">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Additional Information(if any)"
                            name="additional_info"
                            type="text"
                            value={formFields.additional_info}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="link">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Attached Link</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Attach the link for reference"
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
}
else{
    return (
        <body className={signupStyle.rooted}>
            <section className={signupStyle["form-container"]}>
                <h2 className={signupStyle["form-heading"]}>Add More Publication/Patents/Journals</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

                <div className={signupStyle["form-item"]} id="title">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Title of Article/Publication/Patents</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Title of Article/Publication/Patents"
                            name="title"
                            type="text"
                            value={formFields.title}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="author">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Authors</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Authors name"
                            name="author"
                            type="text"
                            value={formFields.author}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="type">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Conference Name</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Publications/Journals/Patents"
                            name="type"
                            type="text"
                            value={formFields.type}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="title_publish">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Title of Journal</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the title of Journal"
                            name="title_publish"
                            type="text"
                            value={formFields.title_publish}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="patent_no">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Page/Issue/Patent No.</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Volume/Issue/Patent No."
                            name="patent_no"
                            type="text"
                            value={formFields.patent_no}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="accepted_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Accepted Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Accepted date"
                            name="accepted_date"
                            type="date"
                            value={formFields.accepted_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>

                    <div className={signupStyle["form-item"]} id="published_date">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Published Date</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Published date"
                            name="published_date"
                            type="date"
                            value={formFields.published_date}
                            onChange={hanldeInputValueChange}
                        />

                    </div>


                   
                    <div className={signupStyle["form-item"]} id="assignee">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>DOI/ISBN/Assignee</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the DOI/ISBN/Assignee"
                            name="assignee"
                            type="text"
                            value={formFields.assignee}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="impact_factor">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Impact Factor</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Impact Factor"
                            name="impact_factor"
                            type="text"
                            value={formFields.impact_factor}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="additional_info">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Enter the Additional Information(if any)"
                            name="additional_info"
                            type="text"
                            value={formFields.additional_info}
                            onChange={hanldeInputValueChange}
                        />
                    </div>

                    <div className={signupStyle["form-item"]} id="link">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Attached Link</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Attach the link for reference"
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
    );}
};

export default PublicationAddPage;
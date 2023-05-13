import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import { FtyEditPublications } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";

const FtyPublicationsEditPage = () => {

    const { state } = useLocation();
    const utype = state.utype;
    const id = state.id;
    const navigate = useNavigate();


    const defaultFormFields = {
        faculty_name: state.faculty_name,
        title:state.title,
        author:state.author,
        type:state.type,
        title_publish:state.title_publish,
        patent_no:state.patent_no,
        accepted_date:state.accepted_date,
        published_date:state.published_date,
        assignee:state.assignee,
        impact_factor:state.impact_factor,
        additional_info:state.additional_info,
        link:state.link,
    };

    const [formFields, setFormFields] = useState(defaultFormFields);

    const deleteid = async (id) => {
        let result = await fetch(`${BACKEND_URL}/user/ftydeletepublication/${id}`, {
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

        const { title,author,type,title_publish,patent_no,accepted_date,published_date,assignee,impact_factor,additional_info,link,faculty_name } = formFields;
        if (title === "") {

            toast.error("Enter Title")

        }
        if (accepted_date === "") {

            toast.error("Enter the accepted date")

        }
        else {
            const response = await FtyEditPublications(formFields);
            if (response.status === 200) {
                setFormFields({
                    ...formFields,
                    title:state.title,
                    faculty_name:state.faculty_name,
                    author:state.author,
                    type:state.type,
                    title_publish:state.title_publish,
                    patent_no:state.patent_no,
                    accepted_date:state.accepted_date,
                    published_date:state.published_date,
                    assignee:state.assignee,
                    impact_factor:state.impact_factor,
                    additional_info:state.additional_info,
                    link:state.link,
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
                <h2 className={signupStyle["form-heading"]}>Edit Publications/Patents/Journals</h2>
                <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>

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
};

export default FtyPublicationsEditPage;
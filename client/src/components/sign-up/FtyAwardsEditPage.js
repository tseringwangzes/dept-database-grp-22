import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "../../pages/Home.module.css";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { FtyAddAwards } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../services/helper";


const FtyAwardsEditPage = () => {

  const { state } = useLocation();

  const id = state.id;
  const utype = state.utype;
const navigate = useNavigate();

  const defaultFormFields = {
    faculty_name:state.faculty_name,
    award_name: state.award_name,
    date: state.date,
    shared_with: state.shared_with,
    additional_info:state.additional_info,
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const deleteid=async (id)=>{
    let result= await fetch(`${BACKEND_URL}/user/ftydeleteaward/${id}`,{
      method:"Delete"});
      result=await result.json()
  }

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const{award_name,date,shared_with,faculty_name,additional_info} = formFields;
    if(award_name === ""){

      toast.error("Enter Award Name")

    }
    if(date === ""){

      toast.error("Enter the date")

    }
    else{
      const response = await FtyAddAwards(formFields);
      if(response.status === 200){
        setFormFields({...formFields,award_name: state.award_name,
          award_reason: state.award_reason,
          date: state.date,
          shared_with: state.shared_with,
          faculty_name:state.faculty_name,
        });
        if(utype === "1"){
          navigate("/StaffHome/StaffStudent")
        }
        else if(utype === "4"){
          navigate("/Admin/AdminStudent")
        }
        else{
          navigate("/faculty/Awards")
        }
      }
      else{
        toast.error(response.response.data.error);
      }
    }


    deleteid(id);
  };


  return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Edit Award/Achievement Details</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="award_name">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Award/Achievement Name</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the award/achievement name"
              name="award_name"
              type="text"
              value={formFields.award_name}
              onChange={hanldeInputValueChange}
            />
          </div>



          <div className={signupStyle["form-item"]} id="date">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Date</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the date"
              name="date"
              type="date"
              value={formFields.date}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="shared_with">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Shared with</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter email id's of faculty with whom the award is shared"
              name="shared_with"
              type="text"
              value={formFields.shared_with}
              onChange={hanldeInputValueChange}
              />
            </div>
            <div className={signupStyle["form-item"]} id="additional_info">
                        <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Additional Information (if any)</label>
                        <input style={{ height: "30px" }} className={signupStyle.myInput}
                            placeholder="Edit additional information (if any)"
                            name="additional_info"
                            type="text"
                            value={formFields.additional_info}
                            onChange={hanldeInputValueChange}
                        />
                    </div>
          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" style={{ marginLeft: "auto", }} onClick={handleSubmit} >Submit</button>
        </form>
        <ToastContainer/>
      </section>
    </body>
  );
};

export default FtyAwardsEditPage;
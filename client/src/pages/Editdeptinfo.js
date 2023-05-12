import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import signupStyle from "./Home.module.css";
import { ToastContainer,toast } from "react-toastify";
import { editdeptinfo } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../services/helper";

const Editdeptinfo = () => {

  const { state } = useLocation();
  const navigate=useNavigate();

  const deleteold=async (id)=>{
  
    let result= await fetch(`${BACKEND_URL}/user/deleteolddeptinfo/${id}`,{
      method:"Delete"});
  
  }


  const defaultFormFields = {
    programs_offered:state.programs_offered,
    st_num_btech:state.st_num_btech,
    st_num_mtech: state.st_num_mtech,
    st_num_ms: state.st_num_ms,
    st_num_phd:state.st_num_phd,
    hod: state.hod,
    ft_num: state.ft_num,
    staff_postdoc:state.staff_postdoc,
    staff_tech: state.staff_tech,
    staff_admin: state.staff_admin,
    thrust: state.thrust,
    num_ug_lab: state.num_ug_lab,
    num_pg_lab: state.num_pg_lab,
    num_research_lab: state.num_research_lab,
    id:state.id,
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  console.log(defaultFormFields);

//   const deleteid=async (id)=>{
//     let result= await fetch(`${BACKEND_URL}/user/deleteid/${id}`,{
//       method:"Delete"});
//       result=await result.json()
//   }

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

     const{programs_offered,  st_num_btech,
        st_num_mtech,
        st_num_ms,
        st_num_phd,
        hod,
        ft_num,
        staff_postdoc,
        staff_tech,
        staff_admin,
        thrust, num_ug_lab,num_pg_lab,num_research_lab} = formFields;

        if(programs_offered === "" || st_num_btech===""|| st_num_mtech===""){

            toast.error("Enter all fields")
      
          }


      const response = await editdeptinfo(formFields);
      console.log(formFields.id)
     console.log(response.status)
      if(response.status === 200){
        toast.success("Data successfully edited")
        deleteold(formFields.id);
        setTimeout(() => {
            setFormFields(defaultFormFields);
       navigate("/StaffHome/StaffDeptInfo")
          }, 5000)
       
    

   
   
    
 
     }

  };


  return (
    <body className={signupStyle.rooted}>
      <section className={signupStyle["form-container"]}>
        <h2 className={signupStyle["form-heading"]}>Edit Department Information</h2>
        <form style={{ fontSize: 15 }} onSubmit={handleSubmit}>
          <div className={signupStyle["form-item"]} id="programs_offered">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Programs Offered</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma seperated programs offered by the department"
              name="programs_offered"
              type="text"
              value={formFields.programs_offered}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="st_num_btech">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of B.Tech. Students</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of B.Tech. students"
              name="st_num_btech"
              type="text"
              value={formFields.st_num_btech}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="st_num_mtech">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of M.Tech. Students</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of M.Tech students"
              name="st_num_mtech"
              type="text"
              value={formFields.st_num_mtech}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="st_num_ms">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of MS(R) Students</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of "
              name="st_num_ms"
              type="text"
              value={formFields.st_num_ms}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="st_num_phd">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of PhD Students</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of phd student"
              name="st_num_phd"
              type="text"
              value={formFields.st_num_phd}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="ft_num">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Faculty</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of faculty"
              name="ft_num"
              type="text"
              value={formFields.ft_num}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="hod">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Head Of The Department</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter the head of the department"
              name="hod"
              type="text"
              value={formFields.hod}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="staff_postdoc">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Postdoc Staff</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of postdoc staff"
              name="staff_postdoc"
              type="text"
              value={formFields.staff_postdoc}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="staff_tech">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Technical Staff</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of technical staff"
              name="staff_tech"
              type="text"
              value={formFields.staff_tech}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="staff_admin">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Administrative Staff</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of administrative staff"
              name="staff_admin"
              type="text"
              value={formFields.staff_admin}
              onChange={hanldeInputValueChange}
            />

          </div>

          <div className={signupStyle["form-item"]} id="thrust">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Thrust Area</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter comma seperated thrust area"
              name="thrust"
              type="text"
              value={formFields.thrust}
              onChange={hanldeInputValueChange}
              />
            </div>

             
          <div className={signupStyle["form-item"]} id="num_ug_lab">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of UG Labs</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of UG labs"
              name="num_ug_lab"
              type="text"
              value={formFields.num_ug_lab}
              onChange={hanldeInputValueChange}
            />
          </div>
          <div className={signupStyle["form-item"]} id="num_pg_lab">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of PG Labs</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of PG labs"
              name="num_pg_lab"
              type="text"
              value={formFields.num_pg_lab}
              onChange={hanldeInputValueChange}
            />
          </div>

          <div className={signupStyle["form-item"]} id="num_research_lab">
            <label style={{ fontSize: 20 }} className={signupStyle.myLabel}>Number Of Research Labs</label>
            <input style={{ height: "30px" }} className={signupStyle.myInput}
              placeholder="Enter number of research labs"
              name="num_research_lab"
              type="text"
              value={formFields.num_research_lab}
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

export default Editdeptinfo;
import {React,useEffect, useState,useRef} from 'react'
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { deptgetallinfo } from '../services/Apis'


function StaffEditDeptInfo() {
    const navigate=useNavigate();

  const [data, setUserData] = useState([]);

  const getdeptinfo = async () => {
  
    const response = await deptgetallinfo();
    if (response.status === 200) {
      setUserData(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    getdeptinfo();
  },[])

  return (
    <>
    
    {/* <div className="absolute right-0 w-3/4 bg-gray-100 text-gray-900"> */}
        <Sidebar />
        <div class="flex flex-col items-center">
    <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./Editdept1",{state:{
      programs_offered: data[0].programs_offered,
      st_num_btech:data[0].st_num_btech,
      st_num_mtech:data[0].st_num_mtech,
      st_num_ms:data[0].st_num_ms,
      st_num_phd:data[0].st_num_phd,
      hod:data[0].hod,
      staff_postdoc:data[0].staff_postdoc,
      staff_tech:data[0].staff_tech,
      staff_admin:data[0].staff_admin,
      thrust:data[0].thrust,
      num_ug_lab:data[0].num_ug_lab,
      num_pg_lab:data[0].num_pg_lab,
      num_research_lab:data[0].num_research_lab,
      id:data[0]._id,

   }})}>Edit</button>        
</div>
    </>
  )
}

export default StaffEditDeptInfo
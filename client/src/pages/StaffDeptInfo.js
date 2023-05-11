import {React,useEffect, useState,useRef} from 'react'
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { deptgetallinfo, ftDept } from '../services/Apis'
import ReactToPrint from "react-to-print";
import { InfoToPrint } from "./InfoToPrint";

function StaffDeptInfo() {
    const navigate=useNavigate();
    let componentRef = useRef();
    const [startDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");

    var handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };
  
    var handleEndDateChange = (event) => {
      setEndDate(event.target.value);
    };

  const [data, setUserData] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await ftDept();
        setDocuments(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const getdeptinfo = async () => {
  
    const response = await deptgetallinfo();
    //const res = await ftDept();
    // window.location.reload();
    if (response.status === 200) {
      setUserData(response.data)
      console.log(data)
    } else {
      console.log("error for get user data")
    }
  };
  useEffect(() => {
    getdeptinfo();
    // setTimeout(() => {
    // }, 1200)
  },[]);

  return (
    <>
    
    <div className="absolute right-0 w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div flex justify-between mt-4>
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

   }})}>Edit Department Details</button>
  
          <div className="mt-4 flex flex-col">
            Choose Start Date 
          {/* </div> */}
         <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        <br></br>
        <br></br>
       Choose End Date
          <input
            type="date"
            value={EndDate}
            onChange={handleEndDateChange}
            className="ml-2 rounded-md px-4 py-2 border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          </div>
<br></br>
            <ReactToPrint
              trigger={() => <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full mb-3">Click Here to Print!</button>}
              content={() => componentRef.current}
              documentTitle="DepartmentInformation"
            />
            <br></br>
            <InfoToPrint ref={componentRef} startDate={startDate} endDate={EndDate}/>         
          </div>
   </main>
</div>

    </>
  )
}

export default StaffDeptInfo
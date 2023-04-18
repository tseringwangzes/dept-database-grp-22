import React, { useState } from "react";
import Papa from 'papaparse';
import { st_achievement_csv } from "../services/Apis";
import Table, { StatusPill } from "./Table2";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function StAchievementCsv(){
    const navigate = useNavigate();

    var file;

    const handleSubmit = async (event) => {
  
    
      file = event.target.files[0];
  
      //await st_award_csv(fileData);
    }
  
    const handleClick=()=>{
      if(!file){
        alert("No file selected!");
      }
      Papa.parse(file, {
        delimiter: ',',
        skipEmptyLines: true,
  
        columns: ['student_name','faculty_name','achievements', 'date', 'shared_with', 'status'],
        header: true, complete: function (results) {
  
          console.log("Finished:", results.data);
          st_achievement_csv(results.data);
          alert("sucessfully uploaded!");
          navigate('/Profile/Achievements');
          window.location.reload();
  
        }
      });
    }
  
    const [data, setUserData] = useState([]);



    const columns = React.useMemo(
      () => [
  
        {
          Header: "Student Name",
          accessor: "student_name",
        },
        {
            Header: "Faculty Name",
            accessor: "faculty_name",
        },
        {
          Header: "Achievement",
          accessor: "Achievement",
        },
        {
          Header: "Date",
          accessor: "date",
        },
        {
          Header: "Shared With",
          accessor: "shared_with",
        },
      
      ],
      []
    );
  
  
  
  
    //  console.log(data);
  
  
    return (
      <>
  
        <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar/>
          <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
  
  
              <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR STUDENT DATA</h1> <br />
  
  <div class="flex flex-row ...">
              <input  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleSubmit}
              /> <br />
  
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={handleClick}>submit</button>
  
  </div>
  
  
            </div>
  
            <Table columns={columns} data={data} />
            
  
  
          </main>
        </div>
       
      </>
  
    );  

}
export default StAchievementCsv;
import React, { useState } from "react";
import Papa from 'papaparse';
import { st_foreign_csv } from "../services/Apis";
import Table, { StatusPill } from "./Table2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function StForeignCsv(){
    
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
  
        columns: ['student_name','faculty_name', 'award_name', 'topic', 'start_date','end_date', 'country', 'status'],
        header: true, complete: function (results) {
  
        console.log("Finished:", results.data[0].faculty_name);
        //           const dateObject = new Date(results.data[0].date);
        // const isoDate = dateObject.toISOString();
        // results.data[0].date = isoDate;
        st_foreign_csv(results.data);
            alert("sucessfully uploaded!");
            navigate('/Profile/Foreign');
            window.location.reload();
    

  
        }
      });
    }
  
    const [data, setUserData] = useState([]);



    const columns = React.useMemo(
      () => [
        {
            Header: " Topic",
            accessor: "topic",
        },
        {
            Header: "Start-Date",
            accessor: "start_date",
        },
        {
            Header: "End-date",
            accessor: "end_date",
        },
        {
            Header: "Country",
            accessor: "country",
        },
        {
            Header: "Faculty-Name",
            accessor: "faculty_name",
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: StatusPill,
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
export default StForeignCsv;
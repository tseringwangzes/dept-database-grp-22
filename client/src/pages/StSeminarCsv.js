import React, { useState } from "react";
import Papa from 'papaparse';
import { st_seminar_csv } from "../services/Apis";
import Table, { StatusPill } from "./Table2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

function StSeminarCsv(){
    const navigate = useNavigate();
    const { state } = useLocation();
    const utype = state.utype;
    const fname=state.fname;

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
  
        columns: ['student_name','title' ,'type', 'date','chief_guest','mode', 'collaborator'],
        header: true, complete: function (results) {
  
        
          let data=results.data;
      
          console.log("Finished:", results.data[0].faculty_name);
          for(const entry of data){
            if(utype==='0') {
               entry.status="pending..";
               entry.faculty_name=fname;
              }
           else if(utype==='4' || utype==='1' || utype==='2')
           { entry.status="verified";}
           
           }
          st_seminar_csv(data);
              alert("sucessfully uploaded!");
              if(utype==='0'){
              navigate('/Profile/Seminars');}
              else if(utype==='4' || utype==='1'){
                navigate('/Admin/AdminSeminar');
                }
                else if(utype==='2'){
                  navigate('/StaffHome/StaffSeminar');
                }
              window.location.reload();
  
        }
      });
    }
  
    const [data, setUserData] = useState([]);



    const columns = React.useMemo(
      () => [
        {
            Header: " Title",
            accessor: "title",
          },
          {
            Header: " Type",
            accessor: "type",
          },
          {
            Header: "Date",
            accessor: "date",
          },
          {
            Header: "Venue",
            accessor: "venue",
          },
          {
            Header: "Chief_guest",
            accessor: "chief_guest",
          },
          {
            Header: "Mode",
            accessor: "mode",
          },
          {
            Header: "Collaborator",
            accessor: "collaborator",
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
export default StSeminarCsv;
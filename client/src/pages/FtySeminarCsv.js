import React, { useState } from "react";
import Papa from 'papaparse';
import { fty_seminar_csv } from "../services/Apis";
import Table from "./Table2";
import FtySidebar from "../components/FtySidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar2 from "../components/staffSide";
import Sidebar3 from "../components/AdminSidebar";

function FtySeminarCsv(){

    const navigate = useNavigate();
    const { state } = useLocation();
    const utype = state.utype;
    const email=state.email;

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
  
        columns: [ 'speaker','title', 'designation','institute','num_participant','venue', 'date', 'dept','additional_info' ],
        header: true, complete: function (results) {
  
          let data=results.data;
        
      
          console.log("Finished:", results.data);
          fty_seminar_csv(results.data);
          alert("sucessfully uploaded!");
          if(utype==='0'){
            navigate('/faculty/Seminars');}
            else if( utype==='4'){
              navigate('/Admin/AdminSeminar');
            }
            else if(utype==='1'){
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
          Header: " Name of Speaker/Chief Guest",
          accessor: "speaker",
        },
        {
          Header: " Title",
          accessor: "title",
        },
        {
          Header: "Designation of speaker",
          accessor: "designation",
        },
        {
          Header: "Institute/Organisation of speaker",
          accessor: "institute",
        },
        {
          Header: "Date of visit",
          accessor: "date",
        },
        {
          Header: "Venue",
          accessor: "venue",
        },
        {
          Header: "Number of Participants",
          accessor: "num_participant",
        },
        {
          Header: "Department",
          accessor: "dept",
        },
        {
          Header: "Additional Information",
          accessor: "additional_info",
        },
      
      ],
      []
    );
  
  
  
  
    //  console.log(data);
  if(utype==='0'){
  
    return (
      <>
  
        <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <FtySidebar/>
          <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="">
  
  
              <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR LECTURE BY EXPERTS</h1> <br />
  
  <div class="flex flex-row ...">
              <input  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleSubmit}
              /> <br />
  
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={handleClick}>Submit</button>
  
  </div>
  
  
            </div>
  
            <Table columns={columns} data={data} />
            
  
  
          </main>
        </div>
       
      </>
  
    );  }
    if(utype==='1'){
  
      return (
        <>
    
          <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
          <Sidebar2/>
            <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="">
    
    
                <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR LECTURE BY EXPERTS</h1> <br />
    
    <div class="flex flex-row ...">
                <input  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleSubmit}
                /> <br />
    
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={handleClick}>Submit</button>
    
    </div>
    
    
              </div>
    
              <Table columns={columns} data={data} />
              
    
    
            </main>
          </div>
         
        </>
    
      );  }
  
      if(utype==='4'){
  
        return (
          <>
      
            <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
            <Sidebar3/>
              <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
      
      
                  <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR LECTURE BY EXPERTS</h1> <br />
      
      <div class="flex flex-row ...">
                  <input  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleSubmit}
                  /> <br />
      
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={handleClick}>Submit</button>
      
      </div>
      
      
                </div>
      
                <Table columns={columns} data={data} />
                
      
      
              </main>
            </div>
           
          </>
      
        );  }
    

}
export default FtySeminarCsv;
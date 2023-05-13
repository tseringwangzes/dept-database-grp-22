import React, { useState } from "react";
import Papa from 'papaparse';
import { fty_publication_csv } from "../services/Apis";
import Table, { StatusPill } from "./Table2";
import FtySidebar from "../components/FtySidebar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar2 from "../components/staffSide";
import Sidebar3 from "../components/AdminSidebar";

function FtyPublicationCsv(){
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
  
        columns: ['faculty_name', 'title', 'author','type','title_publish','patent_no','accepted_date','published_date','assignee','impact_factor','additional_info','link'],
        header: true, complete: function (results) {
       
          let data=results.data;
        
          if(utype==='0')  {  for(const entry of data){
                entry.faculty_name=email;
              }}
    

          console.log("Finished:", results.data);
          fty_publication_csv(data);
          alert("sucessfully uploaded!");
          if(utype==='0'){
          navigate('/faculty/Publications');}
          else if( utype==='4'){
            navigate('/Admin/AdminPublications');
          }
          else if(utype==='1'){
            navigate('/StaffHome/StaffPublications');
          }
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
            Header: "Published Date",
            accessor: "published_date",
          },
          {
            Header: "Accepted Date",
            accessor: "accepted_date",
          },
          {
            Header: "Collaborations",
            accessor: "collaboration",
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
  
  
              <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR FACULTY DATA</h1> <br />
  
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
  
    ); } 

    if(utype==='1'){
      return (
        <>
    
          <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
          <Sidebar2/>
            <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="">
    
    
                <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR FACULTY DATA</h1> <br />
    
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
    
      ); } 

      if(utype==='4'){
        return (
          <>
      
            <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
            <Sidebar3/>
              <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="">
      
      
                  <h1 className="text-xl font-semibold">SELECT A FILE OF GIVEN FORMAT FOR FACULTY DATA</h1> <br />
      
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
      
        ); } 

}
export default FtyPublicationCsv;
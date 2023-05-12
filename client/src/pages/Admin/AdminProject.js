import React, { Component, useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar"; 
import { useNavigate } from "react-router-dom";
import { stproj } from '../../services/Apis';
import { ft_projects } from '../../services/Apis'
import Table, { StatusPill } from "../Table";
import TablesProjects from "../../tables/TablesProjects";
import FtyTablesProjects from "../../tables/FtyTablesProjects";
import {BACKEND_URL} from "../../services/helper";

function StaffProject() {
  const navigate = useNavigate();
  const utype = "4";

  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_St_Project_Header.csv'
  const url2='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Fty_Project_Header.csv'


  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Sample_Student_Projects");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("/Profile/Project/StProjectCsv",{state:{utype:utype}} )
  
    }

    function uploadbulk2(){

      const aTag=document.createElement("a");
      aTag.href=url2;
      aTag.setAttribute("download","Sample_Faculty_Projects");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      console.log(data[0].faculty_name)
      
      navigate("/faculty/Projects/FtyProjectCsv",{state:{utype:utype}} )
      
      }
      const stdeleteRow=async (id)=>{
        let result= await fetch(`${BACKEND_URL}/user/deleteprojectid/${id}`,{
          method:"Delete"});
         // result=await result.json()
          window.location.reload();
      }

      const deleteRow=async (id)=>{
        let result = await fetch(`${BACKEND_URL}/user/ftydeleteproject/${id}`, {
          method:"Delete"});
         // result=await result.json()
          window.location.reload();
      }

      const [data, setUserData] = useState([]);
      const userGet = async () => {
        const response = await stproj("admin");
        if (response.status === 200) {
          setUserData(response.data)
          console.log(response.data)
        } else {
          console.log("error for get user data")
        }
      }
      useEffect(() => {
        userGet();
        setTimeout(() => {
        }, 1200)
      }, [])





   const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "student_name",
      },
      {
        Header: "Project Title",
        accessor: "title",
      },
      {
        Header: "Project Start Date",
        accessor: "start_date",
      },
      {
        Header: "Department",
        accessor: "dept",
      },
      {
        Header: "Faculty Assosciated with",
        accessor: "faculty_name",
      },
      {
        Header: "Funding Agency",
        accessor: "funding_agency",
      },
      {
        Header: "Funds granted",
        accessor: "funds",
      },
      {
        Header: "Ongoing/Completed",
        accessor: "ongoing",
      },
      {
        Header: "Project Link",
        accessor: "link",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;

          return (
            <div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./ProjectsEdit.js/" + original._id, {
                state: {
                  title: original.title,
                  start_date: original.start_date,
                  dept:original.dept,
                  faculty_name:original.faculty_name,    
                  student_name:original.student_name,
                  funding_agency: original.funding_agency,
                  funds: original.funds,    
                  ongoing: original.ongoing,
                  link: original.link,
                  status: original.status,
                  id: original._id,
                  utype: utype
                }
              })}>Edit</button>
            </div>);
        }

      },
      {
        Header: 'Delete',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>stdeleteRow(original._id)}>Delete</button>
          </div>);


        }
      },
    ],
    []
  );


  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_projects("admin");
    if (response.status === 200) {
      setUserData2(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet2();
    setTimeout(() => {
    }, 1200)
  }, [])


  const columns2 = React.useMemo(
    () => [
      {
        Header:"Faculty Name",
        accessor:"faculty_name"
      },
      {
        Header: "Project Title",
        accessor: "title",
      },
      {
        Header: "Project Start Date",
        accessor: "start_date",
      },
      {
        Header: "Department",
        accessor: "dept",
      },
      {
        Header: "Funding Agency",
        accessor: "funding_agency",
      },
      {
        Header: "Funds granted",
        accessor: "funds",
      },
      {
        Header: "Ongoing/Completed",
        accessor: "ongoing",
      },
      {
        Header: "Project Link",
        accessor: "link",
      },
    {
      Header: 'Edit',
      Cell: props => {
        const { original } = props.cell.row;
        return (
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyProjectsEdit.js/" + original._id, {
              state: {
                title: original.title,
                start_date: original.start_date,
                dept:original.dept,
                faculty_name:original.faculty_name,    
                funding_agency: original.funding_agency,
                funds: original.funds,    
                ongoing: original.ongoing,
                link: original.link,
                id: original._id,
                utype: utype
              }
            })}>Edit</button>
          </div>);
      }

    },
    {
      Header: 'Delete',
      Cell: props => {
        const { original } = props.cell.row;
        return (<div>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>deleteRow(original._id)}>Delete</button>
        </div>);


      }
    }
    ],
    []
  );
  

  return (
    <>
      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
            
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={uploadbulk} >Upload Data in Bulk</button>
            <br></br>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Research Projects</h1>
          </div>
          <div className="mt-4">
            <TablesProjects columns={columns} data={data} utype={utype}/>
          </div>
          <br/>
          <div className="">
          
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>
            <br></br>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Research Projects</h1>
          </div>
          <div className="mt-4">
            <FtyTablesProjects columns={columns2} data={data2} utype={utype}/>
          </div>


        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>
  );
}

export default StaffProject
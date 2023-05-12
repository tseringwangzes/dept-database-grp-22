import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userfunc } from '../../services/Apis'
import { ft_awards } from '../../services/Apis'
import FtyTablesAwards, { StatusPill } from "../../tables/FtyTablesAwards";
import TablesAwards from "../../tables/TablesAwards";
import Sidebar from "../../components/AdminSidebar"; 
import jsPDF from 'jspdf';
import {BACKEND_URL} from "../../services/helper";

function StaffStudent() {
  const navigate = useNavigate();
  var email = localStorage.getItem('email');
  const utype = "4";
  const url='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_St_Award_Header.csv'
  const url2='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Fty_Award_Header.csv'

  const [data, setUserData] = useState([]);

  const deleteRowst=async (id)=>{
    let result= await fetch(`${BACKEND_URL}/user/deleteid/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }

  function uploadbulk2(){

    const aTag=document.createElement("a");
    aTag.href=url2;
    aTag.setAttribute("download","Faculty_Awards");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("/faculty/Awards/FtyAwardCsv",{state:{utype:utype}} )
    
    }

  function uploadbulk(){

const aTag=document.createElement("a");
aTag.href=url;
aTag.setAttribute("download","Student_Awards");
document.body.appendChild(aTag);
aTag.click();
aTag.remove();
console.log(data[0].faculty_name)

 navigate("/Profile/Awards/StAwardCsv" ,{state:{
               utype: utype,
            }})

}

  const userGet = async () => {
    const response = await userfunc("admin");
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
        Header: "Student Email Id",
        accessor: "student_name",
      },
      {
        Header: "Faculty Email Id",
        accessor: "faculty_name",
      },

      {
        Header: "Award/Achievements Name",
        accessor: "award_name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Shared With",
        accessor: "shared_with",
      },
      {
        Header: "Attached Link for reference",
        accessor: "award_link",
      },
      {
        Header: "Additional Information (if any)",
        accessor: "additional_info",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./Home.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                student_name: original.student_name,
                award_name: original.award_name,
                date: original.date,
                shared_with: original.shared_with,
                award_link: original.award_link,
                additional_info:original.additional_info,
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

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>deleteRowst(original._id)}>Delete</button>
          </div>);


        }
      }
    ],
    []
  );


  const deleteRow=async (id)=>{
    let result= await fetch(`${BACKEND_URL}/user/ftydeleteaward/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }


  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_awards("admin");
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
        Header: "Faculty Email Id",
        accessor: "faculty_name",
      },
      {
        Header: "Award/Achievement Name",
        accessor: "award_name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Shared With",
        accessor: "shared_with",
      },
      {
        Header: "Additional Information(if any)",
        accessor: "additional_info",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAwardsEdit.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                award_name: original.award_name,
                date: original.date,
                shared_with: original.shared_with,
                additional_info:original.additional_info,
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
            
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
            <br></br>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Awards/Achievements</h1>
          </div>
          <div className="mt-4">
            <TablesAwards columns={columns} data={data} utype={utype}/>
          </div>
          <br/>
          <div className="">
            
            <button class=" p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>
            <br></br>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Awards/Achievements</h1>
          </div>
          <div className="mt-4">
            <FtyTablesAwards columns={columns2} data={data2} utype={utype}/>
          </div>


        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default StaffStudent;
  
import React, { Component, useEffect, useState } from "react";
import Sidebar from "../../components/AdminSidebar"; 
import { useNavigate } from "react-router-dom";
import { stproj } from '../../services/Apis';
import { ft_projects } from '../../services/Apis'

import Table, { StatusPill } from "../Table";
import TablesProjects from "../../tables/TablesProjects";
import FtyTablesProjects from "../../tables/FtyTablesProjects";

export default function StaffProject() {

  const navigate = useNavigate();
  const utype = "4";

  const url='http://localhost:3000/Staff_St_Project_Header.csv'
  const url2='http://localhost:3000/Staff_Fty_Project_Header.csv'

  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Student_Projects");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("/Profile/Project/StProjectCsv",{state:{utype:utype}} )
  
    }

    function uploadbulk2(){

      const aTag=document.createElement("a");
      aTag.href=url2;
      aTag.setAttribute("download","Faculty_Projects");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      console.log(data[0].faculty_name)
      
      navigate("/faculty/Projects/FtyProjectCsv",{state:{utype:utype}} )
      
      }

  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const response = await stproj();
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
        Header: " Student Name",
        accessor: "student_name",
      },
      {
        Header: " Topic",
        accessor: "topic",
      },
     
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Granted-Money",
        accessor: "granted_money",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Collaboration with",
        accessor: "collaboration",
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
                  topic: original.topic,
                  date: original.date,
                  granted_money: original.granted_money,
                  description: original.description,
                  status: original.status,
                  id: original._id,
                  faculty_name: original.faculty_name,
                  student_name: original.student_name,
                  collaboration: original.collaboration,
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

  const stdeleteRow=async (id)=>{
    let result= await fetch(`http://localhost:4002/user/deleteprojectid/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }

  const deleteRow=async (id)=>{
    let result = await fetch(`http://localhost:4002/user/ftydeleteproject/${id}`, {
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }

  function generatePDF() {
    /*
    const doc = new jsPDF();
    fetch('https://akm-img-a-in.tosshub.com/aajtak/images/story/201502/iit_ropar_650_022415062015.jpg?size=948:533')
  .then(response => response.blob())
  .then(blob => {
    const imgUrl = URL.createObjectURL(blob);
    const imageWidth = 46;
    const imageHeight = 26;
    const xPos = 10;
    const yPos = 10;
    const pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.addImage(imgUrl, 'PNG', xPos, yPos, imageWidth, imageHeight);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Indian Institute of Technology, Ropar", pageWidth / 2, 16, {
      align: "center"
    });
  
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Rupnagar,Punjab-140001", pageWidth / 2, 22, { align: "center" });
    doc.text("Tele:+91-1881-235101, email:cs@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(10, 38, pageWidth - 10, 38);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("STUDENTS AWARDS LIST", pageWidth / 2, 45, {
      align: "center"
    });
    doc.setLineWidth(0.2);
    doc.line(90, 46, pageWidth - 90, 46);
    doc.setFont("helvetica", "bold");
    doc.text("Office Staff Name", 20, 60);
    doc.text(":", 70, 60);
    doc.text("Office Staff Email", 20, 65);
    doc.text(": ", 70, 65);
    doc.setFont("helvetica", "normal");
    doc.text(email, 72, 65);
    // doc.setFont("helvetica", "bold");
    // doc.text("Student Programme", 20, 70);
    // doc.text(": ", 70, 70);
    doc.setFont("helvetica", "normal");
    // doc.text("PhD, CSE", 72, 70);
    
    const columns = [["Student Name","Faculty Name","Award Name", "Award Reason", "Date","Shared With","Status"]];

const rows = data.map(user=>[user.student_name,user.faculty_name,user.award_name,user.award_reason,user.date,user.shared_with,user.status]);
    doc.autoTable({
      head: columns,
      columnStyles: {
        0: {columnWidth: 25},
        1: {columnWidth: 25},
        2: {columnWidth: 30},
        3:{columnWidth: 30},
        4:{columnWidth: 25},
        5:{columnWidth: 25},
        6:{columnWidth: 25},
      },
      body: rows,
      startY: 80,
    });
    doc.save('my-document.pdf');

    // add image to PDF here

  });
  */
  }

  function FtygeneratePDF() {
    /* const doc = new jsPDF();
     fetch('https://akm-img-a-in.tosshub.com/aajtak/images/story/201502/iit_ropar_650_022415062015.jpg?size=948:533')
   .then(response => response.blob())
   .then(blob => {
     const imgUrl = URL.createObjectURL(blob);
     const imageWidth = 46;
     const imageHeight = 26;
     const xPos = 10;
     const yPos = 10;
     const pageWidth =
     doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
 
     doc.addImage(imgUrl, 'PNG', xPos, yPos, imageWidth, imageHeight);
 
     doc.setFontSize(16);
     doc.setFont("helvetica", "bold");
     doc.text("Indian Institute of Technology, Ropar", pageWidth / 2, 16, {
       align: "center"
     });
   
     doc.setFontSize(14);
     doc.setFont("helvetica", "normal");
     doc.text("Rupnagar,Punjab-140001", pageWidth / 2, 22, { align: "center" });
     doc.text("Tele:+91-1881-235101, email:cs@iitrpr.ac.in", pageWidth / 2, 28, { align: "center" });
     doc.setLineWidth(0.5);
     doc.line(10, 38, pageWidth - 10, 38);
     doc.setFontSize(12);
     doc.setFont("helvetica", "bold");
     doc.text("FACULTY AWARDS LIST", pageWidth / 2, 45, {
       align: "center"
     });
     doc.setLineWidth(0.2);
     doc.line(90, 46, pageWidth - 90, 46);
     doc.setFont("helvetica", "bold");
     doc.text("Office Staff Name", 20, 60);
     doc.text(":", 70, 60);
     doc.text("Office Staff Email", 20, 65);
     doc.text(": ", 70, 65);
     doc.setFont("helvetica", "normal");
     doc.text(email, 72, 65);
     // doc.setFont("helvetica", "bold");
     // doc.text("Student Programme", 20, 70);
     // doc.text(": ", 70, 70);
     doc.setFont("helvetica", "normal");
     // doc.text("PhD, CSE", 72, 70);
     
     const columns = [["Faculty Name","Award Name", "Award Reason", "Date","Shared With"]];
 
 const rows = data.map(user=>[user.faculty_name,user.award_name,user.award_reason,user.date,user.shared_with]);
     doc.autoTable({
       head: columns,
       columnStyles: {
         0: {columnWidth: 40},
         1: {columnWidth: 40},
         2: {columnWidth: 40},
         3:{columnWidth: 40},
         4:{columnWidth: 30},
       },
       body: rows,
       startY: 80,
     });
     doc.save('my-document.pdf');
 
     // add image to PDF here
 */
   }


  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_projects();
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
    () => [{
      Header: "Faculty Name",
      accessor: "faculty_name",
    },
    {
      Header: " Topic",
      accessor: "topic",
    },
    
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Granted-Money",
      accessor: "granted_money",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: 'Edit',
      Cell: props => {
        const { original } = props.cell.row;
        return (
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyProjectsEdit.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                topic: original.topic,
                date: original.date,
                granted_money: original.granted_money,
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
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Projects</h1>
          </div>
          <div className="mt-4">
            <TablesProjects columns={columns} data={data} utype={utype}/>
          </div>
          <br/>
          <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={FtygeneratePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={uploadbulk2} >Upload Data in Bulk</button>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Projects</h1>
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










import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stproj } from '../services/Apis'
import TablesProjects, { StatusPill } from "../tables/TablesProjects";
import Sidebar from "../components/Sidebar";
import jsPDF from 'jspdf';

function Projects() {
  const navigate = useNavigate();
  var email = localStorage.getItem('email');

  const utype = "0";

  const url='http://localhost:3000/St_Project_Header.csv'

  const deleteRow=async (id)=>{
    let result= await fetch(`http://localhost:4002/user/deleteprojectid/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }

  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const data = {
      email:email
    }
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
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./ProjectsEdit.js/"+original._id, {
              state: {
                topic:original.topic,
                date:original.date,
                granted_money:original.granted_money,
                description:original.description,
                status:original.status,
                id:original._id,
                faculty_name:original.faculty_name,
                student_name:original.student_name,
                collaboration:original.collaboration,
                utype:utype
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
      },
    ],
    []
  );

  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Student_Projects");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("./StProjectCsv" ,{state:{
      utype: utype,
      fname: data[0].faculty_name,

   }})
    
    }

  //  console.log(data);
  function generatePDF() {
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
    doc.text("PROJECT GRANTS LIST", pageWidth / 2, 45, {
      align: "center"
    });
    doc.setLineWidth(0.2);
    doc.line(83, 46, pageWidth - 83, 46);
    doc.setFont("helvetica", "bold");
    doc.text("Student Name", 20, 60);
    doc.text(":", 70, 60);
    doc.setFont("helvetica", "normal");
    doc.text("Vishwas Rathi", 72, 60);
    doc.setFont("helvetica", "bold");
    doc.text("Student Email", 20, 65);
    doc.text(": ", 70, 65);
    doc.setFont("helvetica", "normal");
    doc.text(email, 72, 65);
    doc.setFont("helvetica", "bold");
    doc.text("Student Programme", 20, 70);
    doc.text(": ", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.text("PhD, CSE", 72, 70);
    
    const columns = [["Topic", "Date", "Granted Money","Description","Collaboration With","Status"]];
    const filteredData = data.filter(item => item.student_name === email);

const rows = filteredData.map(user=>[user.topic,user.date,user.granted_money,user.description,user.collaboration,user.status]);
    doc.autoTable({
      head: columns,
      body: rows,
      startY: 80,
    });
    doc.save('my-document.pdf');

    // add image to PDF here
  });
  }

  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "   onClick={uploadbulk} >Upload Data in Bulk</button>
          </div>
          <div className="">
            <br />
            <h1 className="text-center bg-indigo-100  text-xl font-semibold">Your Projects and Grants</h1>
          </div>
          <div className="mt-4">
            <TablesProjects columns={columns} data={data} />
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default Projects;
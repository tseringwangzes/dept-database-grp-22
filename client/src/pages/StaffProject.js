import React, { Component, useEffect, useState } from "react";
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { stproj } from '../services/Apis';
import { ft_projects } from '../services/Apis'

import Table, { StatusPill } from "./Table";
import TablesProjects from "../tables/TablesProjects";
import FtyTablesProjects from "../tables/FtyTablesProjects";
import jsPDF from 'jspdf';

export default function StaffProject() {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const utype = "1";

  const url='http://localhost:3000/Staff_St_Project_Header.csv'
  const url2='http://localhost:3000/Staff_Fty_Project_Header.csv'


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

  function generatePDF() {  {
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
    doc.text("Staff Name", 20, 60);
    doc.text(":", 70, 60);
    doc.setFont("helvetica", "normal");
    doc.text("XYZ", 72, 60);
    doc.setFont("helvetica", "bold");
    doc.text("Staff Email", 20, 65);
    doc.text(": ", 70, 65);
    doc.setFont("helvetica", "normal");
    doc.text(email, 72, 65);
    doc.setFont("helvetica", "bold");
    doc.text("Department", 20, 70);
    doc.text(": ", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.text("CSE", 72, 70);
    
    const columns = [["Student Name","Topic", "Date", "Granted Money","Description","Collaboration With","Status"]];

const rows = data.map(user=>[user.student_name,user.topic,user.date,user.granted_money,user.description,user.collaboration,user.status]);
    doc.autoTable({
      head: columns,
      body: rows,
      startY: 80,
    });
    doc.save('my-document.pdf');

    // add image to PDF here
  });
  }

}



function FtygeneratePDF() {     const doc = new jsPDF();
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
  doc.text("Staff Name", 20, 60);
  doc.text(":", 70, 60);
  doc.setFont("helvetica", "normal");
  doc.text("XYZ", 72, 60);
  doc.setFont("helvetica", "bold");
  doc.text("Staff Email", 20, 65);
  doc.text(": ", 70, 65);
  doc.setFont("helvetica", "normal");
  doc.text(email, 72, 65);
  doc.setFont("helvetica", "bold");
  doc.text("Department", 20, 70);
  doc.text(": ", 70, 70);
  doc.setFont("helvetica", "normal");
  doc.text("CSE", 72, 70);
  
  const columns = [["Faculty Name","Topic", "Date", "Granted Money","Description"]];

const rows = data2.map(user=>[user.faculty_name,user.topic,user.date,user.granted_money,user.status]);
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
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full " onClick={uploadbulk} >Upload Data in Bulk</button>
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
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={FtygeneratePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>

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










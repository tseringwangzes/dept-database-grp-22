import React, { Component, useEffect, useState } from "react";
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { st_ach } from '../services/Apis'
import { ft_achievements } from '../services/Apis'

import TablesAchievements, { StatusPill } from "../tables/TablesAchievements";
import FtyTablesAchievements from "../tables/FtyTablesAchievements";
import jsPDF from 'jspdf';
import {BACKEND_URL} from "../services/helper";

function StaffFaculty() {
  const navigate = useNavigate();
  var email = sessionStorage.getItem('email');
  const utype = "1";

  const url='https://dep-t22-iitropar-department-databas.netlify.app/Staff_St_Achievement_Header.csv'
  const url2='https://dep-t22-iitropar-department-databas.netlify.app/Sample_Staff_Fty_Lecture_Header.csv'


  function uploadbulk(){

    const aTag=document.createElement("a");
    aTag.href=url;
    aTag.setAttribute("download","Student_Achievements");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("/Profile/Achievements/StAchievementCsv" ,{state:{
      utype: utype,
   }})
  }

  function uploadbulk2(){

    const aTag=document.createElement("a");
    aTag.href=url2;
    aTag.setAttribute("download","Faculty_Achievements");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
    console.log(data[0].faculty_name)
    
    navigate("/faculty/Achievements/FtyAchievementCsv",{state:{utype:utype}} )
    
    }

  const deleteRowst=async (id)=>{
    let result= await fetch(`${BACKEND_URL}/user/achdeleteid/${id}`,{
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }

  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const response = await st_ach();
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
        Header: " Achievements",
        accessor: "achievements",
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
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
          return (<div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./AchievementEdit.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                student_name: original.student_name,
                achievements: original.achievements,
                date: original.date,
                shared_with: original.shared_with,
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
    let result = await fetch(`${BACKEND_URL}/user/ftydeleteachievements/${id}`, {
      method:"Delete"});
     // result=await result.json()
      window.location.reload();
  }


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
        doc.text("ACHIEVEMENTS LIST", pageWidth / 2, 45, {
          align: "center"
        });
        doc.setLineWidth(0.2);
        doc.line(85, 46, pageWidth - 85, 46);
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

        const columns = [["Student Name", "Achievement", "Date", "Shared With", "Status"]];

        const rows = data.map(user => [user.student_name, user.achievements, user.date, user.shared_with, user.status]);
        doc.autoTable({
          head: columns,
          body: rows,
          startY: 80,
        });
        doc.save('my-document.pdf');

        // add image to PDF here
      });
  }

  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_achievements();
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
        Header: " Faculty Name",
        accessor: "faculty_name",
      },
      {
        Header: " Achievements",
        accessor: "Achievements",
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
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;
return(
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAchievementsEdit.js/"+original._id, {
              state: {
                faculty_name:original.faculty_name,
                Achievements: original.Achievements,
                date: original.date,
                shared_with: original.shared_with,
                id:original._id,
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
      }
    ],
    []
  );

  function FtygeneratePDF() {
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
        doc.text("ACHIEVEMENTS LIST", pageWidth / 2, 45, {
          align: "center"
        });
        doc.setLineWidth(0.2);
        doc.line(85, 46, pageWidth - 85, 46);
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

        const columns = [["Faculty Name", "Achievement", "Date", "Shared With"]];

        const rows = data2.map(user => [user.faculty_name, user.Achievements, user.date, user.shared_with]);
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
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk} >Upload Data in Bulk</button>
          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Achievements</h1>
          </div>
          <div className="mt-4">
            <TablesAchievements columns={columns} data={data} utype={utype} />
          </div>
          <br />
          <div className="">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={FtygeneratePDF}>Generate PDF</button>
            <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>

          </div>
          <br></br>
          <div className="">
            <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Achievements</h1>
          </div>
          <div className="mt-4">
            <FtyTablesAchievements columns={columns2} data={data2} utype={utype} />
          </div>
        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>
  );
}

export default StaffFaculty;
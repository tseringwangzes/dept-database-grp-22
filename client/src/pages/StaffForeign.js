 import React, { Component, useEffect, useState } from "react";
 import Sidebar from "../components/staffSide";
 import { useNavigate } from "react-router-dom";
 import { stforvisits } from '../services/Apis'
 import Table, { StatusPill } from "./Table";
 import { ft_foreign } from '../services/Apis'
 import TablesForeigns from "../tables/TablesForeigns";
 import FtyTablesForeigns from "../tables/FtyTablesForeigns";
 import jsPDF from 'jspdf';

 function StaffForeign() {
   const navigate = useNavigate();
   const utype = "1";

     const url='http://localhost:3000/Staff_St_Foreign_Header.csv'
     const url2='http://localhost:3000/Staff_Fty_Foreign_Header.csv'

  
   const deleteRowst=async (id)=>{
     let result= await fetch(`http:localhost:4002/user/foreigndeleteid/${id}`,{
       method:"Delete"});
       result=await result.json()
       window.location.reload();
   }

       
   const deleteRow=async (id)=>{
     let result = await fetch(`http:localhost:4002/user/ftydeleteforeign/${id}`, {
       method:"Delete"});
       result=await result.json()
       window.location.reload();
   }


   const [data, setUserData] = useState([]);
   const userGet = async () => {
     const response = await stforvisits("admin");
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
         accessor: "student_name"
       },
       {
        Header: "Faculty Email Id",
        accessor: "faculty_name",
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
        Header: "Details Of Visit",
        accessor: "visit_details",
        
    },
    {
        Header: "Attached Link",
        accessor: "visit_link",
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
             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./ForeignEdit.js/" + original._id, {
               state: {
                 student_name: original.student_name,
                 
                 start_date: original.start_date,
                 end_date: original.end_date,
                 country: original.country,
                 faculty_name: original.faculty_name,
                 status: original.status,
                 id: original._id,
                 visit_details: original.visit_details,
                 visit_link:original.visit_link,
                 utype:utype
               }
             })}>Edit</button>
           </div>);
         }

       } ,
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

   function uploadbulk(){

     const aTag=document.createElement("a");
     aTag.href=url;
     aTag.setAttribute("download","Sample_Student_Foreign_Visits");
     document.body.appendChild(aTag);
     aTag.click();
     aTag.remove();
     console.log(data[0].faculty_name)
    
     navigate("/Profile/Foreign/StForeignCsv",{state:{utype:utype}} )
    
     }

     function uploadbulk2(){

       const aTag=document.createElement("a");
       aTag.href=url2;
       aTag.setAttribute("download","Sample_Faculty_Foreign_visits");
       document.body.appendChild(aTag);
       aTag.click();
       aTag.remove();
       console.log(data[0].faculty_name)
      
       navigate("/faculty/foreign/FtyForeignCsv",{state:{utype:utype}} )
      
       }


   function generatePDF() { 
     const doc = new jsPDF();
     fetch('https:akm-img-a-in.tosshub.com/aajtak/images/story/201502/iit_ropar_650_022415062015.jpg?size=948:533')
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
     doc.text("FOREIGN VISITS LIST", pageWidth / 2, 45, {
       align: "center"
     });
     doc.setLineWidth(0.2);
     doc.line(80, 46, pageWidth - 80, 46);
     doc.setFont("helvetica", "bold");
     doc.text("Staff Name", 20, 60);
     doc.text(":", 70, 60);
     doc.setFont("helvetica", "normal");
     doc.text("XYZ", 72, 60);
     doc.setFont("helvetica", "bold");
     doc.text("Staff Email", 20, 65);
     doc.text(": ", 70, 65);
     doc.setFont("helvetica", "normal");
   //  doc.text(email, 72, 65);
     doc.setFont("helvetica", "bold");
     doc.text("Department", 20, 70);
     doc.text(": ", 70, 70);
     doc.setFont("helvetica", "normal");
     doc.text("CSE", 72, 70);
    
     const columns = [["Student Name","Topic", "Start Date", "End Date","Country","Faculty accompanied"]];

 const rows = data.map(user=>[user.student_name,user.topic,user.start_date,user.end_date,user.country,user.faculty_name,user.status]);
     doc.autoTable({
       head: columns,
       body: rows,
       startY: 80,
     });
     doc.save('my-document.pdf');

    //   add image to PDF here
   });
   }
   const [data2, setUserData2] = useState([]);
   const userGet2 = async () => {
     const response = await ft_foreign("admin");
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
         Header: " Faculty Email Id",
         accessor: "faculty_name",
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
        Header: "Details of Visit",
        accessor: "visit_details",
    },
       {
         Header: 'Edit',
         Cell: props => {
           const { original } = props.cell.row;

           return (<div>
             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyForeignEdit.js/" + original._id, {
               state: {
                 faculty_name: original.faculty_name,
                 start_date: original.start_date,
                 end_date: original.end_date,
                 country: original.country,
                 visit_details:original.visit_details,
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

   function FtygeneratePDF() {/*
        const doc = new jsPDF();
       fetch('https:akm-img-a-in.tosshub.com/aajtak/images/story/201502/iit_ropar_650_022415062015.jpg?size=948:533')
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
       doc.text("FOREIGN VISITS LIST", pageWidth / 2, 45, {
         align: "center"
       });
       doc.setLineWidth(0.2);
       doc.line(80, 46, pageWidth - 80, 46);
       doc.setFont("helvetica", "bold");
       doc.text("Staff Name", 20, 60);
       doc.text(":", 70, 60);
       doc.setFont("helvetica", "normal");
       doc.text("XYZ", 72, 60);
       doc.setFont("helvetica", "bold");
       doc.text("Staff Email", 20, 65);
       doc.text(": ", 70, 65);
       doc.setFont("helvetica", "normal");
      // doc.text(email, 72, 65);
       doc.setFont("helvetica", "bold");
       doc.text("Department", 20, 70);
       doc.text(": ", 70, 70);
       doc.setFont("helvetica", "normal");
       doc.text("CSE", 72, 70);
      
       const columns = [["Faculty Name","Topic", "Start Date", "End Date","Country"]];
  
   const rows = data2.map(user=>[user.faculty_name,user.topic,user.start_date,user.end_date,user.country]);
       doc.autoTable({
         head: columns,
         body: rows,
         startY: 80,
       });
       doc.save('my-document.pdf');
  
        //add image to PDF here
     });
    */  }


 
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
             <h1 className="text-center bg-indigo-100 text-xl font-semibold">Student Foreign Visits</h1>
           </div>
           <div className="mt-4">
             <TablesForeigns columns={columns} data={data} utype={utype}/>
           </div>
           <br/>
           <div className="">
             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={FtygeneratePDF}>Generate PDF</button>
             <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={uploadbulk2} >Upload Data in Bulk</button>

           </div>
           <br></br>
           <div className="">
             <h1 className="text-center bg-indigo-100 text-xl font-semibold">Faculty Foreign Visits</h1>
           </div>
           <div className="mt-4">
             <FtyTablesForeigns columns={columns2} data={data2} utype={utype}/>
           </div>


         </main>
       </div>
       <div className="w-1/2 bg-gray-100 text-gray-900"></div>

      
     </>

   );


 }
 export default StaffForeign


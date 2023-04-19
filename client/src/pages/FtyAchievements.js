// import React, { Component, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ft_achievements } from '../services/Apis'
// import FtyTablesAchievements, { StatusPill } from "../tables/FtyTablesAchievements";
// import FtySidebar from "../components/FtySidebar";
// import * as fs from "fs";
// const { Document, Table, TableCell, TableRow } = require('docx');

// function FtyAchievements() {
//   const navigate = useNavigate();
  
//   var email = localStorage.getItem('email');
  
//   console.log(email)

  
//   const deleteRow=async (id)=>{
//     let result = await fetch(`http://localhost:4002/user/ftydeleteachievements/${id}`, {
//       method:"Delete"});
//      // result=await result.json()
//       window.location.reload();
//   }


//   const utype = "0";
//   const [data, setUserData] = useState([]);
//   const userGet = async () => {
//     const data = {
//       email:email
//     }
//     const response = await ft_achievements(data);
//     if (response.status === 200) {
//       setUserData(response.data)
//       console.log(response.data)
//     } else {
//       console.log("error for get user data")
//     }
//   }
//   useEffect(() => {
//     userGet();
//     setTimeout(() => {
//     }, 1200)
//   }, [])


//   const columns = React.useMemo(
//     () => [

//       {
//         Header: " Achievements",
//         accessor: "Achievements",
//       },
//       {
//         Header: "Date",
//         accessor: "date",
//       },
//       {
//         Header: "Shared With",
//         accessor: "shared_with",
//       },
//       {
//         Header: 'Edit',
//         Cell: props => {
//           const { original } = props.cell.row;
// return(
//           <div>
//             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtyAchievementsEdit.js/"+original._id, {
//               state: {
//                 faculty_name:original.faculty_name,
//                 Achievements: original.Achievements,
//                 date: original.date,
//                 shared_with: original.shared_with,
//                 id:original._id,
//                 utype:utype
//               }
//             })}>Edit</button>
//           </div>);
//         }

//       },
//       {
//         Header: 'Delete',
//         Cell: props => {
//           const { original } = props.cell.row;
//           return (<div>

//             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() =>deleteRow(original._id)}>Delete</button>
//           </div>);


//         }
//       }
//     ],
//     []
//   );


//   function generatePDF() {
//     // Fetch data from the database (replace this with your own fetch code)
//     fetch('http://localhost:4002/user/faculty/achievements')
//       .then(response => response.json())
//       .then(data => {
//         // Create a new document
//         const doc = new Document();
        
//         // Create a table with data
//         const table = new Table({
//           rows: [
//             new TableRow({
//               children: [
//                 new TableCell({
//                   children: [doc.createParagraph(data[0]._id)] // Replace field1 with your actual field names
//             }),
//                 new TableCell({
//                   children: [doc.createParagraph(data[0].faculty_name)]
//             }),
//                 // Add more TableCell for additional fields
//               ]
//             }),
//             // Add more TableRow for additional data rows
//           ]
          
//         });
        
//         // Add the table to the document
//         doc.addTable(table);
        
//         // Create a buffer from the document
//         const buffer = Buffer.from(doc.generate());
        
//         // Create a Blob from the buffer
//         const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        
//         // Create a download link
//         const downloadLink = document.createElement('a');
//         downloadLink.href = URL.createObjectURL(blob);
//         downloadLink.download = 'some.docx';
//         downloadLink.style.display = 'none';
        
//         // Append the download link to the DOM
//         document.body.appendChild(downloadLink);
        
//         // Trigger a click event on the download link
//         downloadLink.click();
        
//         // Clean up by removing the download link from the DOM
//         document.body.removeChild(downloadLink);
//       })
//       .catch(error => console.error(error));
//   }


//   //  console.log(data);


//   return (
//     <>

//       <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
//         <FtySidebar />
//         <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
//         <div className="">
//             <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={generatePDF}>Generate PDF</button>
//             <button class="float-right p-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full "  onClick={() => navigate("./FtyAchievementCsv" )} >Upload Data in Bulk</button>
//           </div>
//           <br />
      
//           <div className="">
//             <h1 className="text-center bg-indigo-100 text-xl font-semibold">Your Achievements</h1>
//           </div>
//           <div className="mt-4">
//             <FtyTablesAchievements columns={columns} data={data} utype={utype} />
//           </div>
//         </main>
//       </div>
//       <div className="w-1/2 bg-gray-100 text-gray-900"></div>
//     </>

//   );
// }

// export default FtyAchievements;
